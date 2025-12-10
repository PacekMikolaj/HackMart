import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
  Stack,
  Box,
  CardActions,
} from "@mui/material";
import { useCart } from "../../../context/cartContext";
import { Product as ProductType } from "../../../types/product";
import altImage from "../../../assets/alt.png";
import { useTranslation } from "react-i18next";

const Product = ({ product }: { product: ProductType }) => {
  const { addToCart } = useCart();
  const { t } = useTranslation();

  const handleAddToCart = () => {
    addToCart(product.id);
  };

  return (
    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          transition: "transform .2s ease, box-shadow .2s ease",
          "&:hover": { transform: "translateY(-4px)", boxShadow: 6 },
          bgcolor: "background.paper",
        }}
      >
        <CardMedia
          component="img"
          height="160"
          image={`http://localhost:7000/uploads/${product.imageUrl}`}
          alt={product.name}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = altImage;
          }}
          sx={{
            maxWidth: "100%",
            maxHeight: 160,
            objectFit: "contain",
            backgroundColor: "#101e35",
          }}
        />

        <CardContent
          sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 1 }}
        >
          <Typography
            variant="h6"
            title={product.name}
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              minHeight: "3.2em",
            }}
          >
            {product.name}
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="body1">${product.price.toFixed(2)}</Typography>
            <Typography variant="body2" color="text.secondary">
              {t("cart.inStock")}: {product.stock}
            </Typography>
          </Stack>
          <Box sx={{ flexGrow: 1 }} />
        </CardContent>
        <CardActions
          sx={{ pt: 0, pb: 2, justifyContent: "center", mt: "auto" }}
        >
          <Button
            variant="contained"
            onClick={handleAddToCart}
            sx={{ width: { xs: "90%", sm: "85%" } }}
          >
            {t("cart.addToCart")}
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Product;
