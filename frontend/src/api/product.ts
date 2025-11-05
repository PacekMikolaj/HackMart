import { BASE_URL } from "../../config";

export const fetchProducts = async () => {
  const res = await fetch(`${BASE_URL}/products`, {
    method: "GET",
  });
  if (!res.ok) throw new Error("Error fetching products");
  return res.json();
};

export const fetchRecommendedProducts = async () => {
  const res = await fetch(`${BASE_URL}/products/recommended`, {
    method: "GET",
  });
  if (!res.ok) throw new Error("Error fetching products");
  return res.json();
};

export const fetchProduct = async (id: number) => {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: "GET",
  });
  if (!res.ok) throw new Error("Error fetching product");
  return res.json();
};

export const updateProduct = async (formData: any, id?: String) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: "PUT",
    headers: {
      Authorization: token || "",
    },
    body: formData,
  });
  if (!res.ok) throw new Error("Error updating product");
  return res;
};

export const addProduct = async (formData: any) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: {
      Authorization: token || "",
    },
    body: formData,
  });
  if (!res.ok) throw new Error("Error updating product");
  return res;
};
