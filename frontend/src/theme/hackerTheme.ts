import { createTheme } from "@mui/material/styles";

const hackerTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212", // głębokie ciemnoszare tło
      paper: "#1e1e1e", // panele, karty
    },
    primary: {
      main: "#00ff88", // neonowa zieleń
    },
    secondary: {
      main: "#00c080", // ciemniejsza mięta
    },
    text: {
      primary: "#e0ffe0", // jasnozielonkawy tekst
      secondary: "#8affc1", // pomocniczy / opisowy
    },
  },
  shape: {
    borderRadius: 6,
  },
  typography: {
    fontFamily: "'IBM Plex Mono', monospace", // klimatycznie terminalowo
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          "&:hover": {
            backgroundColor: "#00cc66",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#1e1e1e",
        },
      },
    },
  },
});

export default hackerTheme;
