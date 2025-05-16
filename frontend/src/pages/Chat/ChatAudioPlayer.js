import React, { useState, useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Typography, LinearProgress, Box } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import AudiotrackIcon from "@material-ui/icons/Audiotrack";

const useStyles = makeStyles((theme) => ({
  audioContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: 250,
    backgroundColor: "transparent",
    borderRadius: 8,
    padding: theme.spacing(0.5),
    border: "none",
    overflow: "hidden",
  },
  playerControls: {
    display: "flex",
    alignItems: "center",
    backgroundColor: theme.palette.type === "dark" ? "rgba(60, 60, 60, 0.7)" : "rgba(255, 255, 255, 0.7)",
    borderRadius: 24,
    padding: theme.spacing(0.5),
    boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.08)",
  },
  playButton: {
    padding: 6,
    color: theme.palette.primary.main,
  },
  progressContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    marginBottom: 4,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    "& .MuiLinearProgress-bar": {
      backgroundColor: theme.palette.primary.main,
    }
  },
  timeInfo: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timeText: {
    fontSize: 10,
    color: theme.palette.text.secondary,
    fontWeight: 500,
  },
  audioIcon: {
    fontSize: 20,
    color: theme.palette.primary.main,
    marginRight: theme.spacing(1),
  }
}));

const formatTime = (seconds) => {
  // Verificar se o valor é válido
  if (seconds === undefined || seconds === null || !isFinite(seconds) || isNaN(seconds)) {
    return "00:00";
  }
  
  // Garantir que seja um número positivo
  const safeSeconds = Math.max(0, Number(seconds));
  const mins = Math.floor(safeSeconds / 60);
  const secs = Math.floor(safeSeconds % 60);
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

const getFullUrl = (url) => {
  if (!url) return "";
  
  // Se a URL já começa com http ou https, retornar como está
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // Se a URL é relativa, adicionar o endereço do backend
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || window.location.origin;
  
  // Se começa com '/', removemos a barra para evitar duplicação
  const cleanUrl = url.startsWith('/') ? url.substring(1) : url;
  
  // Verificar se já contém o prefixo public/ antes de adicioná-lo
  const urlWithPublic = cleanUrl.startsWith('public/') ? cleanUrl : `public/${cleanUrl}`;
  
  // Construir a URL completa
  let fullUrl = `${BACKEND_URL}/${urlWithPublic}`;
  
  // Para iOS, adicionar parâmetro de timestamp para evitar cache
  if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
    fullUrl = `${fullUrl}?t=${new Date().getTime()}`;
  }
  
  console.log('[DEBUG AUDIO URL]', { original: url, final: fullUrl });
  return fullUrl;
};

// Tenta várias estratégias para construir URLs de áudio
const tryAlternativeUrls = (url) => {
  if (!url) return [];
  
  // URL original
  const originalUrl = getFullUrl(url);
  
  // URL alternativas para tentar em caso de falha
  const alternatives = [originalUrl];
  
  // Se é um dispositivo iOS, tentar outras variações de URL
  if (isIOS) {
    // Variar os caminhos public/ e arquivo/ que são comuns em uploads
    if (url.includes('public/')) {
      const withoutPublic = url.replace('public/', '');
      alternatives.push(getFullUrl(withoutPublic));
    } else {
      alternatives.push(getFullUrl(`arquivo/${url}`));
    }
    
    // Para URLs absolutas, adicionar variações
    if (url.startsWith('http')) {
      // Tentar versão com e sem cache busting
      alternatives.push(`${url}?t=${new Date().getTime()}`);
      // Tentar versão com protocolo alternativo (http<->https)
      if (url.startsWith('https:')) {
        alternatives.push(url.replace('https:', 'http:'));
      } else if (url.startsWith('http:')) {
        alternatives.push(url.replace('http:', 'https:'));
      }
    }
  }
  
  // Tentar caminhos mais comuns como fallback, independente do dispositivo
  if (!url.includes('public/') && !url.includes('arquivo/')) {
    alternatives.push(getFullUrl(`arquivo/${url}`));
  }
  
  // Tentar variações com extensões comuns caso a URL não tenha extensão
  if (!url.match(/\.(mp3|wav|ogg|m4a|aac)$/i)) {
    alternatives.push(getFullUrl(`${url}.mp3`));
    alternatives.push(getFullUrl(`${url}.wav`));
  }
  
  return alternatives;
};

// Detecta se é um dispositivo iOS
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
console.log('[DEBUG] Dispositivo iOS detectado:', isIOS);

// Função para tentar reproduzir áudio em iOS
const attemptIOSAudioPlay = async (audioElement, urls) => {
  console.log('[DEBUG] Tentando reprodução específica para iOS');
  
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    console.log(`[DEBUG] Tentativa ${i+1}/${urls.length} com URL: ${url}`);
    
    // Configurar o elemento de áudio para cada tentativa
    audioElement.src = url;
    audioElement.load();
    
    // Esperar tempo suficiente para carregar o áudio antes de tentar reproduzir
    await new Promise(resolve => setTimeout(resolve, 300));
    
    try {
      // Tentar reproduzir com este URL
      await audioElement.play();
      console.log('[DEBUG] Reprodução bem-sucedida no iOS!');
      return true;
    } catch (error) {
      console.error(`[DEBUG] Falha na tentativa ${i+1} para iOS:`, error.message);
      
      // Se for o último URL, falhar
      if (i === urls.length - 1) {
        throw error;
      }
      
      // Pausar antes de tentar outro URL
      try {
        audioElement.pause();
        // Esperar para evitar conflitos entre play e pause
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (e) {}
    }
  }
  
  throw new Error('Todas as tentativas falharam');
};

export default function ChatAudioPlayer({ audioUrl, duration, isRight }) {
  const classes = useStyles();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(duration || 0);
  const [metadataLoaded, setMetadataLoaded] = useState(false);
  const [loadingFailed, setLoadingFailed] = useState(false);
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0);
  const audioRef = useRef(null);
  const progressInterval = useRef(null);
  const loadAttempts = useRef(0);
  const alternativeUrls = useRef([]);
  const audioContext = useRef(null);
  // Nova referência para controlar operações em andamento
  const isOperationInProgress = useRef(false);

  // Sempre que a duração for definida diretamente via prop, considerar os metadados como carregados
  useEffect(() => {
    const validDuration = validateDuration(duration);
    if (validDuration > 0) {
      console.log(`[DEBUG] Prop de duração válida recebida: ${validDuration}s`);
      setAudioDuration(validDuration);
      setMetadataLoaded(true);
    } else if (audioDuration > 0) {
      // Se já temos uma duração válida no estado, considerar os metadados como carregados
      setMetadataLoaded(true);
    }
  }, [duration, audioDuration]);

  // Validar duração para garantir valor numérico válido
  const validateDuration = (value) => {
    // Verificar se o valor é numérico e finito
    if (value === undefined || value === null || !isFinite(value) || isNaN(value) || value <= 0) {
      return 0;
    }
    return parseFloat(value);
  };

  // Tentar pré-carregar os metadados do áudio para obter a duração correta
  useEffect(() => {
    const loadAudioMetadata = async () => {
      try {
        // Se já temos uma duração válida, não precisamos carregar os metadados
        if (audioDuration > 0) {
          setMetadataLoaded(true);
          return;
        }

        // Evitar tentativas infinitas
        if (loadAttempts.current >= 3) {
          console.warn('[WARN] Número máximo de tentativas de carregamento atingido');
          setMetadataLoaded(true); // Para não mostrar "Carregando..." infinitamente
          setLoadingFailed(true);
          return;
        }

        loadAttempts.current += 1;
        const fullUrl = getFullUrl(audioUrl);
        console.log('[DEBUG] Pré-carregando metadados do áudio:', fullUrl);
        
        // Tentar métodos diferentes para obter a duração
        try {
          // Usar Promise.race com diferentes estratégias
          const result = await Promise.race([
            // Método 1: Carregamento direto via elemento Audio
            getDurationFromAudioElement(fullUrl),
            
            // Método 2: Usando AudioContext (pode ser mais preciso para alguns formatos)
            getDurationFromAudioContext(fullUrl),
            
            // Timeout para não ficar esperando para sempre
            new Promise(resolve => 
              setTimeout(() => resolve({ success: false, reason: 'timeout' }), 5000)
            )
          ]);
          
          if (result.success && result.duration) {
            const validDuration = validateDuration(result.duration);
            if (validDuration > 0) {
              console.log('[DEBUG] Duração válida obtida:', validDuration);
              setAudioDuration(validDuration);
              setMetadataLoaded(true);
            } else {
              throw new Error("Duração obtida mas com valor inválido");
            }
          } else {
            throw new Error("Falha ao obter duração: " + (result.reason || "desconhecida"));
          }
        } catch (metadataError) {
          console.warn('[WARN] Erro ao obter metadados:', metadataError);
          
          // Tentar o método tradicional como fallback
          const tempAudio = new Audio();
          
          // Criar uma promise que resolve quando os metadados estiverem carregados
          await new Promise((resolve, reject) => {
            const onLoadedMetadata = () => {
              // Verificar se a duração é válida
              const validDuration = validateDuration(tempAudio.duration);
              if (validDuration > 0) {
                console.log('[DEBUG] Duração obtida no método tradicional:', validDuration);
                setAudioDuration(validDuration);
                setMetadataLoaded(true);
                resolve();
              } else {
                console.warn('[WARN] Duração inválida obtida no método tradicional:', tempAudio.duration);
                // Usar uma duração padrão razoável (30s) 
                setAudioDuration(30);
                setMetadataLoaded(true);
                resolve();
              }
            };
            
            const onError = (error) => {
              console.error('[ERROR] Erro no método tradicional:', error);
              // Em caso de erro, usar um valor padrão razoável
              setAudioDuration(30);
              setMetadataLoaded(true);
              setLoadingFailed(true);
              resolve();
            };
            
            // Timeout para não travar o processo
            const timeout = setTimeout(() => {
              console.warn('[WARN] Timeout no método tradicional');
              tempAudio.removeEventListener('loadedmetadata', onLoadedMetadata);
              tempAudio.removeEventListener('error', onError);
              setAudioDuration(30);
              setMetadataLoaded(true);
              setLoadingFailed(true);
              resolve();
            }, 3000);
            
            tempAudio.addEventListener('loadedmetadata', () => {
              clearTimeout(timeout);
              onLoadedMetadata();
            });
            
            tempAudio.addEventListener('error', (e) => {
              clearTimeout(timeout);
              onError(e);
            });
            
            tempAudio.preload = 'metadata';
            tempAudio.src = fullUrl;
            tempAudio.load();
          });
        }
      } catch (error) {
        console.error('[ERROR] Exceção geral ao carregar áudio:', error);
        // Usar uma duração padrão para não deixar o usuário sem feedback
        setAudioDuration(30);
        setMetadataLoaded(true);
        setLoadingFailed(true);
      }
    };
    
    if (audioUrl) {
      loadAudioMetadata();
    } else {
      // Se não houver URL, marcar como carregado para não mostrar "Carregando..." infinitamente
      setMetadataLoaded(true);
    }
    
    // Limpar intervalo quando componente desmontar
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [audioUrl, audioDuration]);

  // Implementar método para obter duração via elemento Audio
  const getDurationFromAudioElement = (url) => {
    return new Promise((resolve) => {
      const audio = new Audio();
      
      const onLoadedMetadata = () => {
        const validDuration = validateDuration(audio.duration);
        if (validDuration > 0) {
          console.log(`[DEBUG] Duração via Audio element: ${validDuration}s`);
          resolve({ success: true, duration: validDuration });
        } else {
          console.warn(`[WARN] Audio element retornou duração inválida: ${audio.duration}`);
          resolve({ success: false, reason: 'invalid_duration' });
        }
      };
      
      const onCanPlayThrough = () => {
        const validDuration = validateDuration(audio.duration);
        if (validDuration > 0) {
          console.log(`[DEBUG] Duração via canplaythrough: ${validDuration}s`);
          resolve({ success: true, duration: validDuration });
        }
      };
      
      const onError = (e) => {
        console.error(`[ERROR] Erro ao carregar via Audio element:`, e);
        resolve({ success: false, reason: 'audio_error' });
      };
      
      // Configurar timeouts e listeners
      const timeout = setTimeout(() => {
        console.warn(`[WARN] Timeout ao carregar via Audio element`);
        audio.removeEventListener('loadedmetadata', onLoadedMetadata);
        audio.removeEventListener('canplaythrough', onCanPlayThrough);
        audio.removeEventListener('error', onError);
        resolve({ success: false, reason: 'timeout' });
      }, 4000);
      
      audio.addEventListener('loadedmetadata', () => {
        clearTimeout(timeout);
        onLoadedMetadata();
      });
      
      audio.addEventListener('canplaythrough', () => {
        clearTimeout(timeout);
        onCanPlayThrough();
      });
      
      audio.addEventListener('error', (e) => {
        clearTimeout(timeout);
        onError(e);
      });
      
      audio.preload = 'metadata';
      audio.src = url;
      audio.load();
    });
  };
  
  // Implementar método para obter duração via AudioContext
  const getDurationFromAudioContext = (url) => {
    return new Promise((resolve) => {
      try {
        // Verificar se o navegador suporta AudioContext
        if (!window.AudioContext && !window.webkitAudioContext) {
          return resolve({ success: false, reason: 'no_audio_context' });
        }
        
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        const context = new AudioCtx();
        
        const request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';
        
        request.onload = () => {
          context.decodeAudioData(
            request.response,
            (buffer) => {
              const duration = buffer.duration;
              const validDuration = validateDuration(duration);
              if (validDuration > 0) {
                console.log(`[DEBUG] AudioContext obteve duração: ${validDuration}s`);
                resolve({ success: true, duration: validDuration });
              } else {
                console.warn(`[WARN] AudioContext retornou duração inválida: ${duration}`);
                resolve({ success: false, reason: 'invalid_duration' });
              }
              context.close();
            },
            (error) => {
              console.error('[ERROR] Erro ao decodificar via AudioContext:', error);
              resolve({ success: false, reason: 'decode_error' });
              context.close();
            }
          );
        };
        
        request.onerror = (error) => {
          console.error('[ERROR] Erro na requisição XHR para AudioContext:', error);
          resolve({ success: false, reason: 'xhr_error' });
          context.close();
        };
        
        // Timeout para não esperar indefinidamente
        setTimeout(() => {
          if (request.readyState !== 4) {
            request.abort();
            context.close();
            resolve({ success: false, reason: 'timeout' });
          }
        }, 4000);
        
        request.send();
      } catch (error) {
        console.error('[ERROR] Exceção ao usar AudioContext:', error);
        resolve({ success: false, reason: 'context_exception' });
      }
    });
  };

  // Função para reprodução compativel com iOS
  const togglePlayback = async () => {
    // Evitar múltiplas chamadas simultâneas - previne AbortError
    if (isOperationInProgress.current) {
      console.log('[DEBUG] Operação já em andamento, ignorando nova solicitação');
      return;
    }
    
    isOperationInProgress.current = true;
    
    try {
      if (!audioRef.current) {
        // Gerar todas as URLs alternativas na primeira vez
        if (alternativeUrls.current.length === 0) {
          alternativeUrls.current = tryAlternativeUrls(audioUrl);
          console.log(`[DEBUG] URLs alternativas geradas:`, alternativeUrls.current);
        }
        
        console.log(`[DEBUG] Tentando reproduzir áudio com ${alternativeUrls.current.length} URLs alternativas`);
        
        audioRef.current = new Audio();
        
        // Configurar o contexto de áudio para iOS, necessário para desbloquear o áudio
        if (isIOS && !audioContext.current) {
          try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            audioContext.current = new AudioCtx();
            
            // Executar uma oscilação silenciosa para "desbloquear" o áudio no iOS
            const oscillator = audioContext.current.createOscillator();
            const gainNode = audioContext.current.createGain();
            gainNode.gain.value = 0.01; // Quase silencioso
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.current.destination);
            oscillator.start(0);
            oscillator.stop(0.1);
            
            console.log('[DEBUG] Contexto de áudio inicializado para iOS');
          } catch (error) {
            console.warn('[WARN] Erro ao inicializar contexto de áudio:', error);
          }
        }
        
        // Adicionar atributos para melhor compatibilidade com iOS
        if (isIOS) {
          audioRef.current.setAttribute('playsinline', 'true');
          audioRef.current.setAttribute('webkit-playsinline', 'true');
          audioRef.current.setAttribute('preload', 'auto');
          audioRef.current.setAttribute('controls', 'true');
          audioRef.current.muted = false;
        }
        
        // Adicionar tratamento de eventos
        audioRef.current.addEventListener("loadedmetadata", () => {
          console.log(`[DEBUG] Metadados carregados. Duração: ${audioRef.current.duration}s`);
          const validDuration = validateDuration(audioRef.current.duration);
          if (validDuration > 0) {
            setAudioDuration(validDuration);
            setMetadataLoaded(true);
          } else {
            // Mesmo com duração inválida, marcar como carregado
            setMetadataLoaded(true);
          }
        });
        
        audioRef.current.addEventListener("ended", () => {
          console.log('[DEBUG] Reprodução concluída');
          setIsPlaying(false);
          setCurrentTime(0);
          clearInterval(progressInterval.current);
        });
        
        audioRef.current.addEventListener("error", (e) => {
          const errorCode = audioRef.current.error ? audioRef.current.error.code : 'Desconhecido';
          const errorMessage = audioRef.current.error ? audioRef.current.error.message : 'Erro desconhecido';
          console.error(`[ERROR] Falha ao carregar áudio: Codigo ${errorCode} - ${errorMessage}`);
          console.error(`[ERROR] URL que falhou: ${audioRef.current.src}`);
          
          // Tentar próxima URL alternativa se disponível
          if (currentUrlIndex < alternativeUrls.current.length - 1) {
            console.log(`[DEBUG] Tentando próxima URL alternativa (${currentUrlIndex + 1})`);
            setCurrentUrlIndex(currentUrlIndex + 1);
            audioRef.current.src = alternativeUrls.current[currentUrlIndex + 1];
            audioRef.current.load();
            // Não marcar como falha ainda, estamos tentando outra URL
          } else {
            if (isIOS) {
              window.alert('Não foi possível reproduzir este áudio no iOS. Toque na tela e tente novamente ou use outro dispositivo.');
            } else {
              window.alert('Não foi possível reproduzir o áudio. Verifique a conexão ou tente novamente mais tarde.');
            }
            setLoadingFailed(true);
          }
        });
        
        // Inicialmente, usar a primeira URL alternativa
        audioRef.current.src = alternativeUrls.current[currentUrlIndex];
        audioRef.current.load();
        
        // Pequena pausa para garantir que o elemento de áudio esteja pronto
        await new Promise(resolve => setTimeout(resolve, 300));
      }
      
      if (isPlaying) {
        console.log('[DEBUG] Pausando reprodução');
        // Se já está tocando, pausar
        audioRef.current.pause();
        clearInterval(progressInterval.current);
        
        // Pequena pausa para garantir que a pausa foi concluída
        await new Promise(resolve => setTimeout(resolve, 100));
        setIsPlaying(false);
      } else {
        try {
          console.log('[DEBUG] Iniciando reprodução');
          // Se for iOS, usar nossa função especial para tentar múltiplas estratégias
          if (isIOS) {
            await attemptIOSAudioPlay(audioRef.current, alternativeUrls.current.slice(currentUrlIndex));
            
            // Se chegou aqui, a reprodução foi bem-sucedida
            setIsPlaying(true);
            progressInterval.current = setInterval(() => {
              setCurrentTime(audioRef.current.currentTime);
            }, 100);
          } else {
            // Pequena pausa para garantir que o áudio está pronto para reprodução
            await new Promise(resolve => setTimeout(resolve, 100));
            
            // Para outros navegadores, usar a abordagem padrão
            await audioRef.current.play();
            console.log('[DEBUG] Reprodução iniciada com sucesso');
            setIsPlaying(true);
            progressInterval.current = setInterval(() => {
              setCurrentTime(audioRef.current.currentTime);
            }, 100);
          }
        } catch (error) {
          console.error(`[ERROR] Erro ao iniciar reprodução: ${error.name} - ${error.message}`);
          
          // Tratamento específico para o erro AbortError
          if (error.name === 'AbortError') {
            console.log('[DEBUG] Detectado AbortError, tentando novamente após pequena pausa');
            
            // Pausa para permitir que operações pendentes terminem
            await new Promise(resolve => setTimeout(resolve, 500));
            
            try {
              // Tentar novamente uma vez mais
              await audioRef.current.play();
              console.log('[DEBUG] Reprodução iniciada com sucesso após retry');
              setIsPlaying(true);
              progressInterval.current = setInterval(() => {
                setCurrentTime(audioRef.current.currentTime);
              }, 100);
            } catch (retryError) {
              console.error(`[ERROR] Falha na segunda tentativa: ${retryError.name} - ${retryError.message}`);
              showPlaybackError(retryError);
            }
          } else {
            showPlaybackError(error);
          }
        }
      }
    } finally {
      // Garantir que o flag seja sempre liberado, mesmo em caso de erro
      setTimeout(() => {
        isOperationInProgress.current = false;
      }, 300);
    }
  };
  
  // Função auxiliar para mostrar mensagens de erro de forma consistente
  const showPlaybackError = (error) => {
    if (isIOS) {
      // Tratamento específico para erros iOS comuns
      if (error.name === 'NotAllowedError') {
        window.alert('O iOS bloqueou a reprodução automática. Toque na tela e tente novamente.');
      } else if (error.name === 'NotSupportedError') {
        window.alert('Este tipo de áudio não é suportado pelo seu dispositivo iOS. Tente baixar o arquivo.');
      } else {
        window.alert('Erro ao reproduzir no iOS. Verifique as configurações de som e tente novamente.');
      }
    } else {
      window.alert('Não foi possível reproduzir o áudio. Verifique a conexão ou tente novamente mais tarde.');
    }
    
    setIsPlaying(false);
    setLoadingFailed(true);
  };

  return (
    <Box className={classes.audioContainer} style={{ alignSelf: isRight ? "flex-end" : "flex-start" }}>
      <div className={classes.playerControls}>
        <IconButton 
          className={classes.playButton} 
          onClick={togglePlayback}
          disabled={loadingFailed || isOperationInProgress.current}
          size="small"
        >
          {isPlaying ? <PauseIcon fontSize="small" /> : <PlayArrowIcon fontSize="small" />}
        </IconButton>
        <div className={classes.progressContainer}>
          <LinearProgress 
            className={classes.progressBar} 
            variant="determinate" 
            value={audioDuration > 0 ? (currentTime / audioDuration) * 100 : 0}
          />
          <div className={classes.timeInfo}>
            <Typography className={classes.timeText} variant="caption">
              {formatTime(currentTime)}
            </Typography>
            <Typography className={classes.timeText} variant="caption">
              {loadingFailed 
                ? "Erro" 
                : (!metadataLoaded 
                    ? "Carregando..." 
                    : formatTime(audioDuration))}
            </Typography>
          </div>
        </div>
      </div>
    </Box>
  );
}