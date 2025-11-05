import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchProduct } from "../../../api/product";
import { Product } from "../../../types/product";
import { useTranslation } from "react-i18next";

type ProductPanelProps = {
  fetchFunction: (formData: FormData, id?: String) => Promise<any>;
};

const ProductPanel: React.FC<ProductPanelProps> = ({ fetchFunction }) => {
  const { id } = useParams<{ id: string }>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  const [formState, setFormState] = useState<Product>({
    name: "",
    price: 0,
    stock: 0,
    imageUrl: "",
    id: 0,
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(Number(id)),
    enabled: !!id,
  });

  useEffect(() => {
    if (product && id) {
      setFormState(product);
      setPreviewUrl(`http://localhost:7000/uploads/${product.imageUrl}`);
    }
  }, [product, id]);

  const mutation = useMutation({
    mutationFn: (formData: FormData) => fetchFunction(formData, id),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  const handleFileChange = () => {
    const file = fileInputRef.current?.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", formState.name);
    formData.append("price", String(formState.price));
    formData.append("stock", String(formState.stock));

    const file = fileInputRef.current?.files?.[0];
    if (file) {
      formData.append("image", file);
    }

    mutation.mutate(formData);
  };

  if (id && isLoading) return <CircularProgress />;
  if (id && isError)
    return <Alert severity="error">Failed to load product</Alert>;

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
        {id ? t('product.editProduct') : t('product.addProduct')}
      </Typography>

      {mutation.isError && (
        <Alert severity="error">Something went wrong.</Alert>
      )}
      {mutation.isSuccess && <Alert severity="success">Product saved!</Alert>}

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label={t('product.name')}
          name="name"
          value={formState.name}
          onChange={handleChange}
          required
        />
        <TextField
          label={t('product.stock')}
          name="stock"
          type="number"
          value={formState.stock}
          onChange={handleChange}
          required
        />
        <TextField
          label={t('product.price')}
          name="price"
          type="number"
          value={formState.price}
          onChange={handleChange}
          required
        />

        {previewUrl && (
          <Box>
            <Typography variant="subtitle1">{t('product.imagePreview')}:</Typography>
            <img
              src={previewUrl}
              alt="preview"
              width="100%"
              style={{ maxWidth: 300 }}
            />
          </Box>
        )}

        <Button variant="outlined" component="label">
          {t('product.uploadImage')}
          <input
            type="file"
            accept="image/*"
            hidden
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </Button>

        <Button type="submit" variant="contained" disabled={mutation.isPending}>
          {mutation.isPending
            ? t("auth.saving")
            : id
            ? t("auth.saveChanges")
            : t('product.addProduct')}
        </Button>
      </Box>
    </Container>
  );
};

export default ProductPanel;
