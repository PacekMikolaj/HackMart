import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "../../../api/product";
import { useCart } from "../../../context/cartContext";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";
import EditableQuantity from "../../../components/ui/EditableQuantity";

const CartItem = ({
  productId,
  quantity: defaultQuantity,
}: {
  productId: number;
  quantity: number;
}) => {
  const query = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProduct(productId),
  });
  const [quantity, setQuantity] = useState(defaultQuantity);
  const committedRef = useRef(quantity);

  const { removeFromCart, addToCart } = useCart();
  const { t } = useTranslation();

  if (query.isLoading) return <Typography>Ładowanie...</Typography>;
  if (query.error || !query.data)
    return <Typography>Błąd ładowania</Typography>;

  const product = query.data;

  return (
    <Grid item xs={12} key={productId}>
      <Card
        sx={{
          display: "flex",
          alignItems: "center",
          bgcolor: "background.paper",
          boxShadow: 3,
          borderRadius: 2,
          p: 1,
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: 120,
            height: 120,
            objectFit: "contain",
            borderRadius: 1,
            bgcolor: "#101e35",
            p: 1,
          }}
          image={`http://localhost:7000/uploads/${product.imageUrl}`}
          alt={product.name}
        />
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h6" fontWeight="bold">
            {product.name}
          </Typography>
          <Box display="flex" justifyContent="space-between" mt={1}>
            <Typography variant="body1" fontWeight="bold" color="primary.main">
              {product.price.toFixed(2)} zł
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t("cart.inStock")}: {product.stock}
            </Typography>
          </Box>
          <Box mt={2} display="flex" alignItems="center" gap={2}>
            <EditableQuantity
              value={quantity}
              min={1}
              max={product.stock}
              stockInfo={product.stock}
              onSave={(newVal) => {
                addToCart(productId, newVal - committedRef.current);
                committedRef.current = newVal;
                setQuantity(newVal);
              }}
            />
            <IconButton
              onClick={() => removeFromCart(productId)}
              sx={{
                color: "white",
                bgcolor: "secondary.main",
                "&:hover": {
                  bgcolor: "error.main",
                },
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CartItem;
