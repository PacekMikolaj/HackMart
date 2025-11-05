import { JSX } from "react";
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";

const RedirectIfAuthenticated = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? children : <Navigate to="/" replace />;
};

export default RedirectIfAuthenticated;
