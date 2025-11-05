import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Product } from "../../../types/product";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../../api/product";
import { useTranslation } from "react-i18next";

const ProductsPanel = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
  const { t } = useTranslation();

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
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ my: 4 }}>
        {t('admin.manageProducts')}
      </Typography>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('product.name')}</TableCell>
              <TableCell>{t('product.stock')}</TableCell>
              <TableCell>{t('product.price')}</TableCell>
              <TableCell align="right">{t('product.actions')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    onClick={() =>
                      navigate(`/admin/products/${product.id}/edit`)
                    }
                  >
                    {t('product.editProduct')}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/admin/products/add")}
        sx={{ m: 1 }}
      >
       {t('product.addProduct')}
      </Button>
    </Container>
  );
};

export default ProductsPanel;
