import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRouter from "./router/AppRouter"; // Importujemy router aplikacji
import { AuthProvider } from "./context/authContext";
import { CartProvider } from "./context/cartContext"; // Importujemy kontekst koszyka
import { ThemeProvider, CssBaseline } from "@mui/material";
import HackerPanel from "./components/HackerPanel/HackerPanel";
import { SnackbarProvider } from "notistack";
import "./i18n";
import theme from "./theme/theme";
import "@fontsource/ibm-plex-sans/latin.css";
import "@fontsource/ibm-plex-mono/latin.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        preventDuplicate
      >
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <CartProvider>
              <>
                <CssBaseline />
                <AppRouter /> {/* Cała aplikacja przechodzi przez router */}
                <HackerPanel /> {/* Dodajemy panel hakera */}
              </>
            </CartProvider>
          </AuthProvider>
        </QueryClientProvider>
      </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode>
);
