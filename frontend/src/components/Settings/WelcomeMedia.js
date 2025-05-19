import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import api from "../../services/api";
import { toast } from "react-toastify";
import { i18n } from "../../translate/i18n";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  textField: {
    margin: theme.spacing(1),
  },
  mediaPreview: {
    margin: theme.spacing(1),
    maxWidth: "100%",
    maxHeight: 400,
    objectFit: "contain",
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  buttonWrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  errorText: {
    color: theme.palette.error.main,
    margin: theme.spacing(1),
  }
}));

const WelcomeMedia = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [loadingFetch, setLoadingFetch] = useState(true);
  const [mediaType, setMediaType] = useState("image");
  const [mediaUrl, setMediaUrl] = useState("");
  const [mediaWidth, setMediaWidth] = useState("50%");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMediaConfig = async () => {
      setLoadingFetch(true);
      try {
        const { data } = await api.get("/settings/welcome-media");
        if (data) {
          setMediaType(data.type || "image");
          setMediaUrl(data.url || "");
          setMediaWidth(data.width || "50%");
        }
      } catch (error) {
        console.error("Erro ao buscar configurações de mídia:", error);
        toast.error("Erro ao carregar configurações de mídia");
        setError("Não foi possível carregar as configurações. Tente novamente mais tarde.");
      } finally {
        setLoadingFetch(false);
      }
    };

    fetchMediaConfig();
  }, []);

  const validateForm = () => {
    if (!mediaUrl) {
      setError("A URL da mídia é obrigatória");
      return false;
    }

    if (!mediaWidth) {
      setMediaWidth("50%");
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await api.put("/settings/welcome-media", {
        type: mediaType,
        url: mediaUrl,
        width: mediaWidth,
      });

      toast.success("Configurações salvas com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar configurações:", error);
      toast.error(error.response?.data?.error || "Erro ao salvar configurações");
      setError(error.response?.data?.error || "Houve um erro ao salvar as configurações. Verifique os dados e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const renderMediaPreview = () => {
    if (!mediaUrl) return null;

    if (mediaType === "youtube") {
      // Extrair ID do vídeo do YouTube a partir da URL
      const getYoutubeVideoId = (url) => {
        // Tenta diferentes formatos de URL do YouTube
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
      };
      
      const videoId = getYoutubeVideoId(mediaUrl);
      if (!videoId) return <div>URL do YouTube inválida</div>;
      
      return (
        <iframe 
          className={classes.mediaPreview}
          width={mediaWidth} 
          height="315" 
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        />
      );
    } else if (mediaType === "video") {
      return (
        <video
          src={mediaUrl}
          className={classes.mediaPreview}
          controls
          width={mediaWidth}
        />
      );
    } else {
      return (
        <img
          src={`${mediaUrl}?v=${Date.now()}`}
          alt="Prévia da mídia"
          className={classes.mediaPreview}
          style={{ width: mediaWidth }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/400x300?text=Imagem+não+encontrada";
            setError("Não foi possível carregar a imagem. Verifique a URL.");
          }}
        />
      );
    }
  };

  if (loadingFetch) {
    return (
      <div className={classes.root} style={{ alignItems: 'center', justifyContent: 'center', minHeight: '200px' }}>
        <CircularProgress />
        <Typography variant="body2" style={{ marginTop: 16 }}>
          Carregando configurações...
        </Typography>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="h6">Configurações de Mídia de Boas-vindas</Typography>
        {error && (
          <Typography variant="body2" className={classes.errorText}>
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl variant="outlined" fullWidth className={classes.formControl}>
                <InputLabel>Tipo de Mídia</InputLabel>
                <Select
                  value={mediaType}
                  onChange={(e) => setMediaType(e.target.value)}
                  label="Tipo de Mídia"
                  disabled={loading}
                >
                  <MenuItem value="image">Imagem</MenuItem>
                  <MenuItem value="video">Vídeo</MenuItem>
                  <MenuItem value="youtube">YouTube</MenuItem>
                </Select>
                <FormHelperText>
                  {mediaType === "youtube" 
                    ? "Insira uma URL do YouTube (ex: https://www.youtube.com/watch?v=ID ou https://youtu.be/ID)" 
                    : mediaType === "video" 
                      ? "Insira um link direto para um arquivo de vídeo MP4, WebM ou Ogg"
                      : "Selecione o tipo de mídia que será exibida"}
                </FormHelperText>
              </FormControl>

              <TextField
                label="URL da Mídia"
                variant="outlined"
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
                fullWidth
                required
                className={classes.textField}
                helperText="Informe a URL completa da imagem ou vídeo"
                error={!mediaUrl && error}
                disabled={loading}
              />

              <TextField
                label="Largura da Mídia"
                variant="outlined"
                value={mediaWidth}
                onChange={(e) => setMediaWidth(e.target.value)}
                fullWidth
                className={classes.textField}
                helperText="Exemplo: 50%, 300px, 100%, etc."
                disabled={loading}
              />

              <div className={classes.buttonWrapper}>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  disabled={loading}
                >
                  {loading ? "Salvando..." : "Salvar"}
                </Button>
                {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">Prévia:</Typography>
              {renderMediaPreview()}
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
};

export default WelcomeMedia; 