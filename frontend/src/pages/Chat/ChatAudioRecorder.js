import React, { useState, useRef, useEffect } from 'react';
import { 
  IconButton, 
  makeStyles, 
  CircularProgress, 
  Paper,
  Typography, 
  Box, 
  LinearProgress,
  Tooltip 
} from '@material-ui/core';
import MicIcon from '@material-ui/icons/Mic';
import StopIcon from '@material-ui/icons/Stop';
import DeleteIcon from '@material-ui/icons/Delete';
import SendIcon from '@material-ui/icons/Send';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  recordingButton: {
    color: theme.palette.error.main,
    animation: '$pulse 1.5s infinite'
  },
  '@keyframes pulse': {
    '0%': {
      boxShadow: '0 0 0 0 rgba(244, 67, 54, 0.4)'
    },
    '70%': {
      boxShadow: '0 0 0 10px rgba(244, 67, 54, 0)'
    },
    '100%': {
      boxShadow: '0 0 0 0 rgba(244, 67, 54, 0)'
    }
  },
  // Estilo para a barra de gravação estilo WhatsApp
  recorderBar: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 30, 30, 0.95)',
    width: '100%',
    padding: theme.spacing(0.5, 1),
    borderRadius: 24,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.15)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  timerText: {
    color: '#FFFFFF',
    fontSize: '0.9rem',
    fontWeight: 'bold',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  waveform: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 24,
    margin: theme.spacing(0, 1),
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: theme.spacing(0.5),
  },
  waveformCanvas: {
    width: '100%',
    height: '100%',
  },
  sendButton: {
    backgroundColor: '#00A884',
    color: 'white',
    '&:hover': {
      backgroundColor: '#008F72',
    },
    borderRadius: '50%',
    padding: 8,
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
    margin: theme.spacing(0, 0.5),
    border: '2px solid rgba(255, 255, 255, 0.3)',
    transition: 'all 0.2s ease-in-out',
    '&:disabled': {
      backgroundColor: 'rgba(0, 168, 132, 0.6)',
      color: 'rgba(255, 255, 255, 0.7)',
    },
  },
  pauseResumeButton: {
    color: 'white',
    padding: 8,
  },
  trashButton: {
    color: 'white',
    padding: 8,
  },
  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'red',
    marginRight: theme.spacing(1),
    animation: '$blink 1s infinite',
  },
  '@keyframes blink': {
    '0%': { opacity: 1 },
    '50%': { opacity: 0.3 },
    '100%': { opacity: 1 },
  },
  reviewContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1.2),
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 24,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    border: 'none',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      boxShadow: '0 3px 10px rgba(0, 0, 0, 0.12)',
    },
  },
  reviewAudioInfo: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  progressBar: {
    width: '100%',
    height: 6,
    marginTop: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    '& .MuiLinearProgress-bar': {
      backgroundColor: '#00A884',
      borderRadius: 3,
    },
  },
  audioLength: {
    fontSize: '0.7rem',
    color: theme.palette.text.secondary,
    marginTop: 2,
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

// Função auxiliar para detectar o iOS
const isIOSDevice = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
  console.log(`[DEBUG] Detectado iOS: ${isIOS}, UserAgent: ${userAgent}`);
  return isIOS;
};

// Função para converter blob para formato mais compatível com iOS se necessário
const convertBlobForIOSIfNeeded = async (blob) => {
  if (!isIOSDevice() || !blob) return Promise.resolve(blob);
  
  console.log('[DEBUG] Iniciando conversão de blob para formato compatível com iOS');
  
  return new Promise((resolve, reject) => {
    try {
      // Se já for MP3 ou MP4/AAC, apenas retornar
      if (blob.type.includes('mp3') || blob.type.includes('mp4') || blob.type.includes('aac')) {
        console.log('[DEBUG] Blob já está em formato compatível:', blob.type);
        return resolve(blob);
      }
  
      // Criar elemento de áudio temporário para conversão
      const audio = new Audio();
      const blobUrl = URL.createObjectURL(blob);
      
      audio.src = blobUrl;
      
      // Configurar callbacks
      audio.oncanplay = async () => {
        try {
          console.log('[DEBUG] Áudio carregado, iniciando conversão para WAV');
          
          // Criar contexto de áudio para processamento
          const audioContext = new (window.AudioContext || window.webkitAudioContext)();
          const audioSource = audioContext.createMediaElementSource(audio);
          
          // Configurar nó de destino para gravação
          const destination = audioContext.createMediaStreamDestination();
          audioSource.connect(destination);
          
          // Reproduzir e gravar em um formato compatível
          audio.play();
          
          const chunks = [];
          const options = { mimeType: 'audio/wav' };
          
          // Tentar usar formatos que o iOS suporta
          const recorder = new MediaRecorder(destination.stream, options);
          
          recorder.ondataavailable = (e) => {
            if (e.data.size > 0) chunks.push(e.data);
          };
          
          recorder.onstop = () => {
            URL.revokeObjectURL(blobUrl);
            const newBlob = new Blob(chunks, { type: 'audio/wav' });
            console.log('[DEBUG] Conversão concluída, novo blob:', newBlob.type, newBlob.size, 'bytes');
            resolve(newBlob);
          };
          
          recorder.onerror = (err) => {
            console.error('[ERROR] Erro na conversão:', err);
            URL.revokeObjectURL(blobUrl);
            // Se falhar, retornar o blob original
            resolve(blob);
          };
          
          recorder.start();
          
          // Parar a gravação quando o áudio terminar
          audio.onended = () => {
            recorder.stop();
            audio.pause();
          };
        } catch (error) {
          console.error('[ERROR] Falha ao configurar conversão:', error);
          URL.revokeObjectURL(blobUrl);
          // Em caso de erro, retornar o blob original
          resolve(blob);
        }
      };
      
      audio.onerror = (err) => {
        console.error('[ERROR] Erro ao carregar áudio para conversão:', err);
        URL.revokeObjectURL(blobUrl);
        // Em caso de erro, retornar o blob original
        resolve(blob);
      };
      
      // Iniciar carregamento
      audio.load();
      
    } catch (error) {
      console.error('[ERROR] Exceção na conversão:', error);
      // Em caso de exceção, retornar o blob original
      resolve(blob);
    }
  });
};

// Componente de gravação de áudio estilo WhatsApp
const ChatAudioRecorder = ({ onAudioRecorded, disabled = false }) => {
  const classes = useStyles();
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [audioError, setAudioError] = useState(null);
  
  // Refs
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioStreamRef = useRef(null);
  const timerRef = useRef(null);
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationRef = useRef(null);
  const audioRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const audioPlayTriesRef = useRef(0);
  
  // Formatação de tempo (mm:ss)
  const formatTime = (seconds) => {
    // Verificar se o valor é válido
    if (seconds === undefined || seconds === null || isNaN(seconds) || !isFinite(seconds)) {
      return "00:00";
    }
    
    // Garantir que é um número e limitar a valores razoáveis
    const safeSeconds = Math.min(Math.max(0, Number(seconds)), 3600); // Limitar a 1 hora
    
    const mins = Math.floor(safeSeconds / 60);
    const secs = Math.floor(safeSeconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Função para iniciar o visualizador de áudio
  const startVisualizer = () => {
    if (!canvasRef.current || !analyserRef.current) return;
    
    const canvas = canvasRef.current;
    const canvasCtx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    analyserRef.current.fftSize = 256;
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    const draw = () => {
      if (!isRecording || isPaused) return;
      
      animationRef.current = requestAnimationFrame(draw);
      analyserRef.current.getByteFrequencyData(dataArray);
      
      canvasCtx.clearRect(0, 0, width, height);
      
      // Desenhar forma de onda estilo WhatsApp
      const barWidth = 2;
      const gap = 1;
      const barCount = Math.floor(width / (barWidth + gap));
      const step = Math.floor(bufferLength / barCount) || 1;
      
      for (let i = 0; i < barCount; i++) {
        const dataIndex = i * step;
        if (dataIndex >= bufferLength) break;
        
        // Usar a média de alguns valores para suavizar
        let sum = 0;
        let count = 0;
        for (let j = 0; j < step && dataIndex + j < bufferLength; j++) {
          sum += dataArray[dataIndex + j];
          count++;
        }
        
        const average = count > 0 ? sum / count : 0;
        const barHeight = Math.max(1, (average / 255) * height);
        const x = i * (barWidth + gap);
        const y = (height - barHeight) / 2;
        
        // Cor cinza claro para as barras de visualização
        canvasCtx.fillStyle = '#CCCCCC';
        canvasCtx.fillRect(x, y, barWidth, barHeight);
      }
    };
    
    draw();
  };
  
  // Função para tentar reproduzir áudio usando diferentes métodos
  const attemptPlayAudio = async (audioElement, url, mimeType) => {
    try {
      console.log(`[DEBUG] Tentativa de reprodução #${audioPlayTriesRef.current + 1} - URL: ${url.substring(0, 50)}...`);
      
      // Verificar se é iOS
      const isIOS = isIOSDevice();
      
      // Para iOS, tentar abordagens específicas
      if (isIOS && audioPlayTriesRef.current === 0) {
        console.log('[DEBUG] Estratégia para iOS: usando atributos específicos');
        
        // Configurar atributos auxiliares para iOS
        audioElement.setAttribute('playsinline', 'true');
        audioElement.setAttribute('webkit-playsinline', 'true');
        audioElement.setAttribute('controls', 'true');
      }
      
      // Limpar eventos anteriores
      audioElement.oncanplay = null;
      audioElement.oncanplaythrough = null;
      
      // Registrar eventos de diagnóstico
      audioElement.oncanplay = () => {
        console.log('[DEBUG] Evento canplay disparado');
      };
      
      audioElement.oncanplaythrough = () => {
        console.log('[DEBUG] Evento canplaythrough disparado');
      };
      
      // Tentar reproduzir
      await audioElement.play();
      
      console.log('[DEBUG] Reprodução iniciada com sucesso');
      audioPlayTriesRef.current = 0; // Resetar contador após sucesso
      return true;
    } catch (error) {
      audioPlayTriesRef.current++;
      console.error(`[ERROR] Tentativa #${audioPlayTriesRef.current} falhou:`, error.message);
      
      // Verificar se devemos tentar outra abordagem
      if (audioPlayTriesRef.current < 3) {
        // Se falhou no iOS, tentar abordagem alternativa no próximo retry
        if (isIOSDevice()) {
          console.log('[DEBUG] Tentando método alternativo para iOS');
          
          // Tentar criar um novo elemento de áudio
          if (audioPlayTriesRef.current === 1) {
            const tempAudio = new Audio();
            audioRef.current = tempAudio;
            
            // Configurar novo elemento de áudio
            tempAudio.src = url;
            tempAudio.preload = "auto";
            tempAudio.crossOrigin = "anonymous";
            
            // Tentar reproduzir com este novo elemento
            return await attemptPlayAudio(tempAudio, url, mimeType);
          }
          
          // Na última tentativa, tentar usar um formato diferente
          if (audioPlayTriesRef.current === 2) {
            if (recordedAudio && recordedAudio.blob) {
              try {
                // Converter para formato mais compatível com iOS
                const convertedBlob = await convertBlobForIOSIfNeeded(recordedAudio.blob);
                const newUrl = URL.createObjectURL(convertedBlob);
                
                // Configurar elemento com a nova URL
                audioElement.src = newUrl;
                audioElement.load();
                
                return await attemptPlayAudio(audioElement, newUrl, convertedBlob.type);
              } catch (convError) {
                console.error('[ERROR] Falha na conversão:', convError);
              }
            }
          }
        }
        
        return false;
      } else {
        // Registrar o erro após todas as tentativas
        setAudioError(error.message);
        return false;
      }
    }
  };
  
  // Função para reproduzir o áudio gravado
  const playRecordedAudio = async () => {
    if (!audioRef.current || !recordedAudio || isLoadingAudio) return;
    
    // Evitar operações simultâneas
    if (isLoadingAudio) {
      console.log('[DEBUG] Operação de áudio em andamento, ignorando');
      return;
    }
    
    if (isPlaying) {
      audioRef.current.pause();
      clearInterval(progressIntervalRef.current);
      setIsPlaying(false);
      return;
    }
    
    // Resetar contador de tentativas
    audioPlayTriesRef.current = 0;
    setAudioError(null);
    setIsLoadingAudio(true);
    
    try {
      // Verificar se a URL do áudio ainda é válida
      if (recordedAudio.url) {
        console.log('[DEBUG] Tentando reproduzir áudio gravado:', recordedAudio.url.substring(0, 50) + '...');
        console.log('[DEBUG] Tipo MIME:', recordedAudio.mimeType || 'desconhecido');
        
        // Adicionar tratamento de erros
        audioRef.current.onerror = (e) => {
          console.error('[ERROR] Falha ao reproduzir áudio:', e);
          setIsPlaying(false);
          setIsLoadingAudio(false);
          
          // Mensagem mais informativa para iOS
          if (isIOSDevice()) {
            setAudioError(`Falha ao reproduzir (iOS): ${audioRef.current.error && audioRef.current.error.message || 'Erro desconhecido'}`);
          } else {
            setAudioError(`Erro: ${audioRef.current.error && audioRef.current.error.message || 'Erro desconhecido'}`);
          }
        };
        
        // Adicionar mais diagnósticos
        audioRef.current.onloadstart = () => {
          console.log('[DEBUG] Carregamento de áudio iniciado');
        };
        
        audioRef.current.onloadeddata = () => {
          console.log('[DEBUG] Dados de áudio carregados');
        };
        
        // Adicionar atributos específicos para iOS
        if (isIOSDevice()) {
          console.log('[DEBUG] Adicionando atributos específicos para iOS');
          audioRef.current.setAttribute('playsinline', 'true');
          audioRef.current.setAttribute('webkit-playsinline', 'true');
          audioRef.current.setAttribute('controls', 'true');
          audioRef.current.setAttribute('crossorigin', 'anonymous');
          audioRef.current.muted = false;
        }
        
        // Registrar eventos adicionais para diagnóstico
        audioRef.current.oncanplay = () => {
          console.log('[DEBUG] Evento canplay disparado');
        };
        
        audioRef.current.oncanplaythrough = () => {
          console.log('[DEBUG] Evento canplaythrough disparado');
        };
        
        // Resetar para o início
        audioRef.current.currentTime = 0;
        
        // Pequena pausa para garantir que tudo esteja pronto
        await new Promise(resolve => setTimeout(resolve, 100));
        
        try {
          // Tentar reproduzir o áudio
          await audioRef.current.play();
          console.log('[DEBUG] Reprodução iniciada com sucesso');
          
          // Configurar intervalo para atualizar a posição atual
          progressIntervalRef.current = setInterval(() => {
            if (audioRef.current) {
              setCurrentTime(audioRef.current.currentTime);
            }
          }, 100);
          
          setIsPlaying(true);
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
              
              // Configurar intervalo para atualizar a posição atual
              progressIntervalRef.current = setInterval(() => {
                if (audioRef.current) {
                  setCurrentTime(audioRef.current.currentTime);
                }
              }, 100);
              
              setIsPlaying(true);
            } catch (retryError) {
              console.error(`[ERROR] Falha na segunda tentativa: ${retryError.name} - ${retryError.message}`);
              
              // Estratégias adicionais específicas para iOS
              if (isIOSDevice() && audioPlayTriesRef.current < 2) {
                audioPlayTriesRef.current++;
                console.log(`[DEBUG] Tentando método alternativo #${audioPlayTriesRef.current} para iOS`);
                
                try {
                  if (audioPlayTriesRef.current === 1) {
                    // Criar um novo elemento de áudio
                    console.log('[DEBUG] Estratégia 1: Criando novo elemento de áudio');
                    const tempAudio = new Audio();
                    audioRef.current = tempAudio;
                    
                    tempAudio.src = recordedAudio.url;
                    tempAudio.preload = "auto";
                    tempAudio.crossOrigin = "anonymous";
                    tempAudio.setAttribute('playsinline', 'true');
                    tempAudio.setAttribute('webkit-playsinline', 'true');
                    tempAudio.setAttribute('controls', 'true');
                    
                    // Esperar um pouco para carregar
                    await new Promise(resolve => setTimeout(resolve, 300));
                    
                    await tempAudio.play();
                    console.log('[DEBUG] Reprodução iniciada com sucesso com elemento alternativo');
                    
                    // Configurar intervalo para atualizar a posição atual
                    progressIntervalRef.current = setInterval(() => {
                      if (tempAudio) {
                        setCurrentTime(tempAudio.currentTime);
                      }
                    }, 100);
                    
                    setIsPlaying(true);
                  } else if (audioPlayTriesRef.current === 2 && recordedAudio.blob) {
                    // Tentar usar formato diferente
                    console.log('[DEBUG] Estratégia 2: Convertendo para formato compatível com iOS');
                    const convertedBlob = await convertBlobForIOSIfNeeded(recordedAudio.blob);
                    const newUrl = URL.createObjectURL(convertedBlob);
                    
                    audioRef.current.src = newUrl;
                    audioRef.current.load();
                    
                    // Esperar carregar o novo formato
                    await new Promise(resolve => setTimeout(resolve, 300));
                    
                    await audioRef.current.play();
                    console.log('[DEBUG] Reprodução iniciada com sucesso após conversão');
                    
                    // Configurar intervalo para atualizar a posição atual
                    progressIntervalRef.current = setInterval(() => {
                      if (audioRef.current) {
                        setCurrentTime(audioRef.current.currentTime);
                      }
                    }, 100);
                    
                    setIsPlaying(true);
                  }
                } catch (specialError) {
                  console.error(`[ERROR] Falha na estratégia especial para iOS: ${specialError.message}`);
                  handlePlayError(specialError);
                }
              } else {
                handlePlayError(retryError);
              }
            }
          } else {
            handlePlayError(error);
          }
        }
      } else {
        setAudioError('URL de áudio inválida');
      }
    } catch (error) {
      console.error('[ERROR] Exceção ao tentar reproduzir áudio:', error);
      handlePlayError(error);
    } finally {
      setIsLoadingAudio(false);
    }
  };
  
  // Função auxiliar para tratar erros de reprodução
  const handlePlayError = (error) => {
    console.error('[ERROR] Tratando erro de reprodução:', error);
    setIsPlaying(false);
    
    // Mensagens mais amigáveis com base no tipo de erro
    if (error.name === 'NotAllowedError') {
      setAudioError('Reprodução bloqueada pelo navegador. Toque na tela e tente novamente.');
    } else if (error.name === 'NotSupportedError') {
      setAudioError('Formato de áudio não suportado pelo seu dispositivo.');
    } else {
      setAudioError(`Erro ao reproduzir: ${error.message || 'Desconhecido'}`);
    }
  };
  
  // Função para enviar o áudio gravado
  const sendRecordedAudio = async () => {
    if (!recordedAudio || !recordedAudio.blob) {
      console.error('[ERROR] Nenhum áudio disponível para envio');
      return;
    }
    
    if (recordedAudio.blob.size === 0) {
      console.error('[ERROR] Blob de áudio vazio');
      window.alert('O arquivo de áudio está vazio. Tente gravar novamente.');
      return;
    }
    
    try {
      // Verificar se estamos em um dispositivo iOS
      const isIOS = isIOSDevice();
      
      // Determinar a extensão com base no tipo MIME
      let extension = 'webm';
      let mimeType = recordedAudio.mimeType || recordedAudio.blob.type;
      
      console.log('[DEBUG] MIME type original para envio:', mimeType);
      
      // Para iOS, preferir formatos mais compatíveis
      if (isIOS) {
        console.log('[DEBUG] Preparando formato otimizado para iOS');
        
        // Tentar converter o blob para um formato mais compatível com iOS
        const iosCompatibleBlob = await convertBlobForIOSIfNeeded(recordedAudio.blob);
        
        // Se o blob foi convertido, usar o novo tipo
        if (iosCompatibleBlob !== recordedAudio.blob) {
          mimeType = iosCompatibleBlob.type;
          console.log('[DEBUG] Blob convertido para:', mimeType);
        }
        
        // iOS tem melhor compatibilidade com MP4/AAC ou MP3
        if (mimeType.includes('mp4') || mimeType.includes('aac')) {
          extension = 'mp4';
        } else if (mimeType.includes('mp3') || mimeType.includes('mpeg')) {
          extension = 'mp3';
        } else if (mimeType.includes('wav')) {
          extension = 'wav';
        } else {
          // Fallback para tipo genérico no iOS
          mimeType = 'audio/mp4';
          extension = 'mp4';
        }
      } else {
        // Mapear o tipo MIME para a extensão correta
        if (mimeType.includes('mp3') || mimeType.includes('mpeg')) {
          extension = 'mp3';
        } else if (mimeType.includes('ogg')) {
          extension = 'ogg';
        } else if (mimeType.includes('wav')) {
          extension = 'wav';
        } else if (mimeType.includes('mp4')) {
          extension = 'mp4';
        } else if (mimeType.includes('webm')) {
          extension = 'webm';
        }
      }
      
      console.log('[DEBUG] Extensão determinada:', extension);
      console.log('[DEBUG] MIME type final:', mimeType);
      
      // Usar o blob original ou o convertido
      const finalBlob = isIOS ? 
        await convertBlobForIOSIfNeeded(recordedAudio.blob) : 
        recordedAudio.blob;
      
      // Criar arquivo para envio com o nome usando timestamp para evitar conflitos
      const fileName = `audio_${Date.now()}.${extension}`;
      const audioFile = new File(
        [finalBlob], 
        fileName, 
        { type: mimeType }
      );
      
      console.log(`[DEBUG] Arquivo de áudio criado: ${audioFile.name}, tipo: ${audioFile.type}, ${audioFile.size} bytes`);
      
      // Limpar erro se existente
      setAudioError(null);
      
      // Iniciar upload
      setIsUploading(true);
      
      // Callback para o componente pai
      onAudioRecorded(
        audioFile,
        (progress) => {
          setUploadProgress(progress);
        },
        () => {
          setIsUploading(false);
          // Limpar gravação após envio
          if (recordedAudio && recordedAudio.url) {
            URL.revokeObjectURL(recordedAudio.url);
          }
          setRecordedAudio(null);
          setRecordingTime(0);
          setCurrentTime(0);
        }
      );
      
    } catch (error) {
      console.error('[ERROR] Falha ao processar arquivo de áudio:', error);
      window.alert('Erro ao processar o áudio. Tente novamente.');
      setIsUploading(false);
    }
  };
  
  // Função para iniciar gravação
  const startRecording = async () => {
    console.log('[DEBUG] Iniciando gravação');
    
    try {
      // Revogar URL de qualquer gravação anterior
      if (recordedAudio && recordedAudio.url) {
        URL.revokeObjectURL(recordedAudio.url);
        setRecordedAudio(null);
      }
      
      // Limpar erro se existente
      setAudioError(null);
      
      // Verificar se estamos em um dispositivo iOS
      const isIOS = isIOSDevice();
      
      // Solicitar permissão para o microfone com configurações otimizadas
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });
      
      console.log('[DEBUG] Permissão de microfone concedida');
      audioStreamRef.current = stream;
      
      // Configurar o contexto de áudio para visualização
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      audioContextRef.current = audioContext;
      
      const analyser = audioContext.createAnalyser();
      analyserRef.current = analyser;
      
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);
      
      // Redefinir o array de chunks
      audioChunksRef.current = [];
      
      // Testar formatos suportados - em ordem de preferência
      // Para iOS, priorizar formatos compatíveis
      const tryFormats = isIOS ? [
        'audio/mp4',
        'audio/mp4;codecs=mp4a',
        'audio/aac',
        'audio/mpeg',
        'audio/mp3',
        'audio/wav',
        'audio/ogg;codecs=opus',
        'audio/webm;codecs=opus',
        'audio/webm',
        'audio/ogg'
      ] : [
        'audio/webm;codecs=opus',
        'audio/mp4;codecs=mp4a',
        'audio/ogg;codecs=opus',
        'audio/webm',
        'audio/ogg',
        'audio/mp3',
        'audio/mpeg'
      ];
      
      // Detectar formatos disponíveis e suportados
      let supportedFormats = [];
      for (const format of tryFormats) {
        if (MediaRecorder.isTypeSupported(format)) {
          supportedFormats.push(format);
          console.log(`[DEBUG] Formato suportado: ${format}`);
        }
      }
      
      console.log(`[DEBUG] Total de formatos suportados: ${supportedFormats.length}`);
      
      let selectedMimeType = '';
      
      // Escolher o formato mais adequado
      if (supportedFormats.length > 0) {
        // Para iOS, preferir MP4 ou AAC
        if (isIOS) {
          const iosFormats = supportedFormats.filter(f => 
            f.includes('mp4') || 
            f.includes('aac') || 
            f.includes('mp3') || 
            f.includes('mpeg')
          );
          
          if (iosFormats.length > 0) {
            selectedMimeType = iosFormats[0];
          } else {
            selectedMimeType = supportedFormats[0];
          }
        } else {
          // Para outros dispositivos, usar o primeiro formato suportado
          selectedMimeType = supportedFormats[0];
        }
      } else {
        console.warn('[WARN] Nenhum formato específico é suportado. Usando padrão do navegador.');
        selectedMimeType = '';
      }
      
      console.log(`[DEBUG] Usando formato de gravação: ${selectedMimeType || 'padrão do navegador'}`);
      
      // Configurações adicionais para iOS
      const recorderOptions = {
        mimeType: selectedMimeType
      };
      
      // Adicionar configuração de bitrate apenas para formatos que suportam
      if (!isIOS || !selectedMimeType.includes('mp4')) {
        recorderOptions.audioBitsPerSecond = 128000; // 128kbps
      }
      
      console.log('[DEBUG] Opções do recorder:', JSON.stringify(recorderOptions));
      
      // Criar MediaRecorder com configurações otimizadas
      const recorder = new MediaRecorder(stream, recorderOptions);
      
      mediaRecorderRef.current = recorder;
      
      // Configurar eventos para o MediaRecorder
      recorder.addEventListener('dataavailable', (event) => {
        if (event.data.size > 0) {
          console.log(`[DEBUG] Chunk de dados recebido: ${event.data.size} bytes`);
          audioChunksRef.current.push(event.data);
        }
      });
      
      recorder.addEventListener('start', () => {
        console.log('[DEBUG] Gravação iniciada');
        setIsRecording(true);
        setIsPaused(false);
      
        // Iniciar timer
        timerRef.current = setInterval(() => {
            setRecordingTime(prev => prev + 1);
        }, 1000);
      
        // Iniciar visualizador
        if (canvasRef.current) {
          startVisualizer();
        }
      });
      
      recorder.addEventListener('stop', handleRecordingStopped);
      
      recorder.addEventListener('error', (event) => {
        console.error('[ERROR] Erro no MediaRecorder:', event);
        window.alert('Erro na gravação. Verifique o microfone.');
        setIsRecording(false);
      });
      
      // Iniciar gravação
      recorder.start(1000); // Captura chunks a cada 1 segundo
      
    } catch (error) {
      console.error('[ERROR] Erro ao iniciar gravação:', error);
      window.alert('Erro ao acessar o microfone. Verifique as permissões do navegador.');
    }
  };
  
  // Manipulador de interrupção da gravação
  const handleRecordingStopped = async () => {
    console.log('[DEBUG] Gravação parada. Total de chunks:', audioChunksRef.current.length);
    
    // Parar o stream de áudio
    if (audioStreamRef.current) {
      audioStreamRef.current.getTracks().forEach(track => track.stop());
    }
    
    // Verificar se capturamos algum dado
    if (!audioChunksRef.current || audioChunksRef.current.length === 0) {
      console.error('[ERROR] Nenhum dado de áudio capturado');
      window.alert('Não foi possível capturar áudio. Verifique o microfone.');
      return;
    }
    
    // Obter o tipo MIME usado na gravação
    const mimeType = mediaRecorderRef.current ? mediaRecorderRef.current.mimeType : 'audio/webm';
    console.log('[DEBUG] MimeType usado na gravação:', mimeType);
    
    // Criar o blob de áudio com o tipo MIME correto
    const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
    
    console.log(`[DEBUG] Blob de áudio criado: ${audioBlob.size} bytes, tipo: ${audioBlob.type}`);
    
    if (audioBlob.size === 0) {
      console.error('[ERROR] Blob de áudio vazio');
      window.alert('Erro na gravação. Tente novamente.');
      return;
    }
    
    // Para iOS, tentar otimizar o formato
    let finalBlob = audioBlob;
    if (isIOSDevice()) {
      console.log('[DEBUG] Otimizando formato para iOS');
      try {
        finalBlob = await convertBlobForIOSIfNeeded(audioBlob);
      } catch (error) {
        console.error('[ERROR] Falha ao otimizar para iOS:', error);
        // Continuar com o blob original
      }
    }
    
    // Guardar a duração da gravação (verificar se é válida)
    const finalDuration = recordingTime > 0 ? recordingTime : 0;
    console.log(`[DEBUG] Duração da gravação: ${finalDuration} segundos`);
    
    // Criar URL do blob para reprodução
    const audioUrl = URL.createObjectURL(finalBlob);
    
    // Salvar áudio gravado imediatamente com a duração da gravação
    setAudioDuration(finalDuration);
    setRecordedAudio({
      blob: finalBlob,
      url: audioUrl,
      duration: finalDuration,
      mimeType: finalBlob.type
    });
    
    // Inicializar o elemento de áudio para reprodução
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    
    // Configurar atributos adicionais para iOS
    if (isIOSDevice()) {
      audioRef.current.setAttribute('playsinline', 'true');
      audioRef.current.setAttribute('webkit-playsinline', 'true');
      audioRef.current.setAttribute('controls', 'true');
      audioRef.current.muted = false;
    }
    
    audioRef.current.src = audioUrl;
    audioRef.current.preload = "auto";
    audioRef.current.load();
    
    // Tentar obter a duração exata do áudio
    try {
      const tempAudio = new Audio();
      tempAudio.preload = "metadata";
      
      // Configurar atributos para iOS também no elemento temporário
      if (isIOSDevice()) {
        tempAudio.setAttribute('playsinline', 'true');
        tempAudio.setAttribute('webkit-playsinline', 'true');
      }
      
      tempAudio.src = audioUrl;
      
      tempAudio.addEventListener('loadedmetadata', () => {
        const actualDuration = tempAudio.duration;
        console.log(`[DEBUG] Duração real do áudio: ${actualDuration} segundos`);
        
        // Verificar se a duração é válida antes de usar
        if (!isNaN(actualDuration) && isFinite(actualDuration) && actualDuration > 0) {
          setAudioDuration(actualDuration);
          
          // Atualizar objeto de áudio com a duração correta
          setRecordedAudio(prev => ({
            ...prev,
            duration: actualDuration
          }));
        }
      });
      
      // Adicionar tratamento de erro
      tempAudio.addEventListener('error', (error) => {
        console.error('[ERROR] Erro ao carregar metadados do áudio:', error);
      });
      
      // Iniciar carregamento
      tempAudio.load();
    } catch (error) {
      console.warn('[WARN] Erro ao tentar obter duração do áudio:', error);
      // Continuar usando a duração da gravação
    }
  };
  
  // Função para pausar/continuar a gravação
  const togglePauseRecording = () => {
    if (!mediaRecorderRef.current) return;
    
    if (isPaused) {
      // Continuar gravação
      if (mediaRecorderRef.current.state === 'paused') {
        mediaRecorderRef.current.resume();
      }
      
      // Reiniciar timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prevTime => prevTime + 1);
      }, 1000);
      
      // Reiniciar visualizador
      startVisualizer();
      
      setIsPaused(false);
    } else {
      // Pausar gravação
      if (mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.pause();
      }
      
      // Pausar timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      // Pausar visualizador
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      setIsPaused(true);
    }
  };
  
  // Função para parar a gravação
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      console.log('[DEBUG] Parando gravação');
      mediaRecorderRef.current.stop();
      
      // Limpar timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      
      // Parar visualizador
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      
      setIsRecording(false);
      setIsPaused(false);
    }
  };
  
  // Função para cancelar a gravação
  const cancelRecording = () => {
    console.log('[DEBUG] Cancelando gravação');
    
    // Parar a gravação se estiver ativa
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      
      // Parar o stream de áudio
      if (audioStreamRef.current) {
        audioStreamRef.current.getTracks().forEach(track => track.stop());
      }
    }
    
    // Limpar timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    // Parar visualizador
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    
    // Resetar estado
    setIsRecording(false);
    setIsPaused(false);
    setRecordingTime(0);
    
    // Limpar gravação se existir
    if (recordedAudio && recordedAudio.url) {
      URL.revokeObjectURL(recordedAudio.url);
      setRecordedAudio(null);
    }
  };
  
  // Eventos de áudio
  useEffect(() => {
    if (audioRef.current && recordedAudio) {
      // Carregar metadados do áudio quando disponível
      audioRef.current.onloadedmetadata = () => {
        const audioElementDuration = audioRef.current.duration;
        
        if (!isNaN(audioElementDuration) && isFinite(audioElementDuration) && audioElementDuration > 0) {
          console.log(`[DEBUG] Duração do áudio carregada: ${audioElementDuration}s`);
          setAudioDuration(audioElementDuration);
          
          // Atualizar objeto de áudio com a duração correta
          setRecordedAudio(prev => ({
            ...prev,
            duration: audioElementDuration
          }));
        } else {
          console.warn('[WARN] Duração inválida do elemento de áudio:', audioElementDuration);
        }
      };
      
      audioRef.current.onended = () => {
        setIsPlaying(false);
        setCurrentTime(0);
        clearInterval(progressIntervalRef.current);
      };
    }
    
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [recordedAudio]);
  
  // Ajustar o canvas quando necessário
  useEffect(() => {
    if (isRecording && canvasRef.current) {
      setTimeout(() => {
        canvasRef.current.width = canvasRef.current.offsetWidth;
        canvasRef.current.height = canvasRef.current.offsetHeight;
        if (!isPaused) startVisualizer();
      }, 100);
    }
  }, [isRecording, isPaused]);
  
  // Limpar recursos quando o componente for desmontado
  useEffect(() => {
    return () => {
      cancelRecording();
      
      if (recordedAudio && recordedAudio.url) {
        URL.revokeObjectURL(recordedAudio.url);
      }
      
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);
  
  // Renderizar a barra de gravação estilo WhatsApp
  if (isRecording) {
    return (
      <div className={classes.recorderBar}>
        <IconButton className={classes.trashButton} onClick={cancelRecording}>
          <DeleteIcon fontSize="small" />
        </IconButton>
        
        <div className={classes.recordingDot}></div>
        
        <Typography className={classes.timerText}>
          {formatTime(recordingTime)}
        </Typography>
        
        <div className={classes.waveform}>
          <canvas ref={canvasRef} className={classes.waveformCanvas} />
        </div>
        
        <IconButton className={classes.pauseResumeButton} onClick={togglePauseRecording}>
          {isPaused ? <PlayArrowIcon fontSize="small" /> : <PauseIcon fontSize="small" />}
        </IconButton>
        
        <IconButton 
          className={classes.sendButton} 
          onClick={stopRecording}
          disabled={recordingTime < 1}
        >
          <SendIcon fontSize="small" />
        </IconButton>
      </div>
    );
  }
  
  // Renderizar o player de revisão se um áudio foi gravado
  if (recordedAudio) {
    // Garantir que a duração seja sempre um número válido
    const displayDuration = (!isNaN(audioDuration) && isFinite(audioDuration) && audioDuration > 0) ? 
      audioDuration : 
      (!isNaN(recordedAudio.duration) && isFinite(recordedAudio.duration) && recordedAudio.duration > 0) ? 
        recordedAudio.duration : 0;
    
    // Calcular a porcentagem de progresso de forma segura
    const progressPercentage = (isPlaying && displayDuration > 0) ? 
      Math.min(100, Math.max(0, (currentTime / displayDuration) * 100)) : 0;
    
    return (
      <div className={classes.reviewContainer}>
        <IconButton onClick={cancelRecording} size="small">
          <DeleteIcon fontSize="small" />
        </IconButton>
        
        <div className={classes.reviewAudioInfo}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={playRecordedAudio} size="small" disabled={isLoadingAudio}>
              {isLoadingAudio ? 
                <CircularProgress size={20} color="inherit" /> : 
                (isPlaying ? <PauseIcon fontSize="small" /> : <PlayArrowIcon fontSize="small" />)
              }
            </IconButton>
            <Typography variant="caption">
              Áudio gravado {isIOSDevice() ? " (iOS)" : ""}
              {audioError && (
                <Typography variant="caption" style={{color: 'red', display: 'block', fontSize: '0.7rem'}}>
                  {audioError}
                </Typography>
              )}
            </Typography>
          </div>
          
          <LinearProgress 
            className={classes.progressBar} 
            variant="determinate" 
            value={progressPercentage}
          />
          
          <div className={classes.audioLength}>
            <span>{formatTime(isPlaying ? currentTime : 0)}</span>
            <span>{formatTime(displayDuration)}</span>
          </div>
        </div>
        
        <IconButton 
          className={classes.sendButton}
          onClick={sendRecordedAudio}
          disabled={isUploading}
          size="small"
        >
          {isUploading ? <CircularProgress size={20} color="inherit" /> : <SendIcon fontSize="small" />}
        </IconButton>
        
        <audio 
          ref={audioRef} 
          src={recordedAudio.url} 
          style={{ display: 'none' }} 
          preload="metadata"
          playsInline
          webkit-playsinline="true"
        />
      </div>
    );
  }
  
  // Renderizar apenas o botão de microfone
  return (
    <Tooltip title="Gravar áudio">
      <span className={classes.root}>
        <IconButton
          color="primary"
          aria-label="gravar áudio"
          onClick={startRecording}
          disabled={disabled || isUploading}
        >
          <MicIcon />
        </IconButton>
      </span>
    </Tooltip>
  );
};

export default ChatAudioRecorder; 