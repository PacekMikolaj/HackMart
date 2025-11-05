import { BASE_URL } from "../../config";
import { CartItem } from "../types/cart";

export const createOrder = async (data: CartItem[]) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/order`, {
    method: "POST",
    headers: {
      Authorization: token || "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ items: data }),
  });
  if (!res.ok) throw new Error("Error creating order");
  return res.json();
};
