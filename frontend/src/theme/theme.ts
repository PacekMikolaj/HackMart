import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#0b1e3d",
      paper: "#16253d",
    },

    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#d32f2f",
    },
    text: {
      primary: "#ffffff",
      secondary: "#90a4ae",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1b1f3b",
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
