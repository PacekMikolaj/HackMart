import { createTheme } from "@mui/material/styles";

const hackerTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    primary: {
      main: "#00ff88",
    },
    secondary: {
      main: "#00c080",
    },
    text: {
      primary: "#e0ffe0",
      secondary: "#8affc1",
    },
  },
  shape: {
    borderRadius: 6,
  },
  typography: {
    fontFamily: "'IBM Plex Mono', monospace",
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
