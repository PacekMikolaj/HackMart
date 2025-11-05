import { useCart } from "../../../context/cartContext";
import { useAuth } from "../../../context/authContext";
import { useMutation } from "@tanstack/react-query";
import { createOrder } from "../../../api/order";
import { Link, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Grid } from "@mui/material";
import CartItem from "../components/CartItem";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import { ShoppingCartOutlined } from "@mui/icons-material";

const CartPage = () => {
  const { cartItems, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: () => {
      return createOrder(cartItems);
    },
    onSuccess: () => {
      enqueueSnackbar(t("cart.orderConfirmed"), { variant: "success" });
      clearCart();
      navigate("/");
    },
  });

  if (cartItems.length === 0) {
    return (
      <Box
        sx={{
          textAlign: "center",
          mt: 10,
          color: "text.secondary",
        }}
      >
        <ShoppingCartOutlined
          sx={{ fontSize: 80, mb: 2, color: "primary.main" }}
        />

        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {t("cart.emptyDescription")}
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          {t("cart.emptyTitle")}
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          size="large"
          sx={{ borderRadius: 2 }}
        >
          {t("cart.backToShop")}
        </Button>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        {t("cart.cart")}
      </Typography>
      <Grid container spacing={2}>
        {cartItems.map((item) => (
          <CartItem
            key={item.productId}
            productId={item.productId}
            quantity={item.quantity}
          />
        ))}
      </Grid>

      <Box mt={4}>
        {isAuthenticated ? (
          <Button
            variant="contained"
            onClick={() => mutation.mutate()}
            disabled={mutation.status == "pending" || cartItems.length === 0}
          >
            {t("cart.confirmOrder")}
          </Button>
        ) : (
          <Box display="flex" alignItems="center" gap={2}>
            <Button variant="outlined" component={Link} to="/login">
              {t("cart.loginToProcced")}
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CartPage;
