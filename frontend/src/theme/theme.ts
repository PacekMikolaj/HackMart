// theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#0b1e3d", // tło całej strony
      paper: "#16253d", // karty i kontenery (zamiast białego)
    },

    primary: {
      main: "#1976d2", // niebieski
    },
    secondary: {
      main: "#d32f2f", // czerwony
    },
    text: {
      primary: "#ffffff", // 🟢 Biały tekst – główny
      secondary: "#90a4ae", // 🔵 Jasnoszary (np. opisy, stocki)
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1b1f3b", // granatowe tło nagłówka
          color: "#fff",
        },
      },
    },
  },
  typography: {
    fontFamily: "'IBM Plex Sans', sans-serif",
    h1: { fontFamily: "'IBM Plex Mono', monospace" },
    h2: { fontFamily: "'IBM Plex Mono', monospace" },
    button: { textTransform: "none" },
  },
});

export default theme;
