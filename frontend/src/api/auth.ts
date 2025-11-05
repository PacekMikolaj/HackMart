import {
  LoginForm,
  RegisterForm,
  RegisterResponse,
  LoginResponse,
} from "../types/auth";
import { BASE_URL } from "../../config";

export const registerUser = async (
  userData: Omit<RegisterForm, "confirmPassword">
): Promise<RegisterResponse> => {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Registration failed");
  }
  return response.json();
};

export async function loginUser(data: LoginForm): Promise<LoginResponse> {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Niepoprawne dane logowania");
  }

  return res.json();
}
