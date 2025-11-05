import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Badge,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../context/authContext";
import { useCart } from "../context/cartContext";
import logoImage from "../assets/logo.png";
import LanguageSwitcher from "./ui/LanguageSwitcher";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { PersonRounded } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { isAuthenticated, isAdmin, firstName, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const { t } = useTranslation();

  console.log(isAuthenticated, isAdmin, firstName);

  const cartItemsCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          bgcolor: "background.paper",
          borderBottom: `1px solid`,
          borderColor: "primary.main",
        }}
      >
        <Button component={Link} to="/" sx={{ p: 0, minWidth: "auto" }}>
          <img
            src={logoImage}
            alt="HackMart Logo"
            style={{ height: 60, objectFit: "contain" }}
          />
        </Button>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button component={Link} sx={{ color: "white" }} to="/products">
            {t("product.title")}
          </Button>

          {!isAuthenticated ? (
            <>
              <Button component={Link} sx={{ color: "white" }} to="/login">
                {t("auth.logIn")}
              </Button>
              <Button
                component={Link}
                to="/register"
                sx={{
                  bgcolor: "primary.main",
                  color: "white",
                  "&:hover": {
                    bgcolor: "primary.dark",
                  },
                }}
              >
                {t("auth.register")}
              </Button>
            </>
          ) : (
            <>
              {isAdmin && (
                <Button component={Link} to="/admin">
                  {t("admin.panel")}
                </Button>
              )}

              <Button
                component={Link}
                to="/profile"
                variant="outlined"
                endIcon={<PersonRounded />}
                sx={{ textTransform: "none", fontWeight: 500 }}
              >
                <span dangerouslySetInnerHTML={{ __html: firstName! }} />
              </Button>
              <Button onClick={handleLogout}>{t("auth.logOut")}</Button>
            </>
          )}

          <IconButton component={Link} to="/cart" sx={{ color: "inherit" }}>
            <Badge badgeContent={cartItemsCount} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          <LanguageSwitcher />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
