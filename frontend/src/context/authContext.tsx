import React, { createContext, useContext, useState, useEffect } from "react";
import { LoginResponse } from "../types/auth";
import { fetchUserProfile } from "../api/user";

type AuthContextType = {
  isAuthenticated: boolean;
  id: number | null;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  isAdmin: boolean;
  login: (response: LoginResponse) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  id: null,
  username: null,
  isAdmin: false,
  firstName: null,
  lastName: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<
    Pick<
      AuthContextType,
      | "isAuthenticated"
      | "id"
      | "username"
      | "isAdmin"
      | "firstName"
      | "lastName"
    >
  >({
    isAuthenticated: false,
    id: null,
    username: null,
    isAdmin: false,
    firstName: null,
    lastName: null,
  });

  useEffect(() => {
    let cancelled = false;

    const decodedToken = decodeToken(localStorage.getItem("token") ?? "");

    if (!decodedToken) {
      localStorage.removeItem("token");
      setAuth({
        isAuthenticated: false,
        id: null,
        username: null,
        isAdmin: false,
        firstName: null,
        lastName: null,
      });
      return;
    }

    (async () => {
      try {
        const data = await fetchUserProfile();
        console.log(data);
        if (cancelled) return;
        setAuth({
          isAdmin: decodedToken.isAdmin,
          isAuthenticated: true,
          id: decodedToken.id,
          username: decodedToken.username,
          firstName: data.firstName,
          lastName: data.lastName,
        });
      } catch (e) {
        localStorage.removeItem("token");
        if (cancelled) return;
        setAuth({
          isAuthenticated: false,
          id: null,
          username: null,
          isAdmin: false,
          firstName: null,
          lastName: null,
        });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const login = (data: LoginResponse) => {
    localStorage.setItem("token", data.token);

    setAuth({
      isAuthenticated: true,
      id: decodeToken(data.token)?.id ?? null,
      username: data.username,
      isAdmin: data.isAdmin,
      firstName: data.firstName,
      lastName: data.lastName,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuth({
      isAuthenticated: false,
      id: null,
      username: null,
      isAdmin: false,
      firstName: null,
      lastName: null,
    });
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

function decodeToken(
  token: string
): { id: number; username: string; isAdmin: boolean } | null {
  try {
    const decoded = atob(token);
    console.log(decoded);
    const [id, username, isAdmin] = decoded.split(":");
    console.log(isAdmin, isAdmin === "true");
    return {
      id: parseInt(id),
      username,
      isAdmin: isAdmin === "true",
    };
  } catch (e) {
    return null;
  }
}
