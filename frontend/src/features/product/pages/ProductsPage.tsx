import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Grid,
  Typography,
  CircularProgress,
  Container,
  Alert,
} from "@mui/material";
import { Product as ProductType } from "../../../types/product";
import Product from "../components/Product";

type ProductsPageProps = {
  fetchProducts: () => Promise<ProductType[]>;
  label: string;
};

const ProductsPage: React.FC<ProductsPageProps> = ({
  fetchProducts,
  label,
}) => {
  const { data, isLoading, isError } = useQuery<ProductType[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return (
      <Container sx={{ mt: 4, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (isError) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">Failed to load products.</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ my: 4 }}>
      <Typography variant="h4" gutterBottom>
        {label}
      </Typography>
      <Grid container spacing={3}>
        {data?.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </Grid>
    </Container>
  );
};

export default ProductsPage