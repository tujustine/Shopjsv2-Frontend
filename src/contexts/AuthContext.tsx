/**
 * Contexte d'authentification pour la gestion des utilisateurs
 * Gère la connexion, déconnexion, inscription
 */

"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";
import { User, AuthContextType } from "@/types";

interface AuthState {
  user: User | null;
  isLoading: boolean;
}

/**
 * Actions possibles pour le reducer d'authentification
 */
type AuthAction =
  | { type: "LOGIN_START" } // Début de la connexion
  | { type: "LOGIN_SUCCESS"; payload: User } // Connexion réussie
  | { type: "LOGIN_FAILURE" } // Échec de la connexion
  | { type: "LOGOUT" } // Déconnexion
  | { type: "SIGNUP_START" } // Début de l'inscription
  | { type: "SIGNUP_SUCCESS"; payload: User } // Inscription réussie
  | { type: "SIGNUP_FAILURE" }; // Échec de l'inscription

const initialState: AuthState = {
  user: null,
  isLoading: false,
};

/**
 * Reducer pour la gestion de l'état d'authentification
 */
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN_START":
    case "SIGNUP_START":
      return { ...state, isLoading: true };
    case "LOGIN_SUCCESS":
    case "SIGNUP_SUCCESS":
      return { user: action.payload, isLoading: false };
    case "LOGIN_FAILURE":
    case "SIGNUP_FAILURE":
      return { ...state, isLoading: false };
    case "LOGOUT":
      return { user: null, isLoading: false };
    default:
      return state;
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  /**
   * Vérifie la persistance de la session au démarrage de l'application
   * Restaure l'utilisateur connecté depuis le localStorage
   */
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        dispatch({ type: "LOGIN_SUCCESS", payload: user });
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    dispatch({ type: "LOGIN_START" });

    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL ||
          process.env.NEXT_PUBLIC_API_URL_FALLBACK
        }/user/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);

      const user = {
        _id: data._id,
        username: "Utilisateur",
        email: "",
        admin: data.admin || false,
      };

      localStorage.setItem("user", JSON.stringify(user));
      dispatch({ type: "LOGIN_SUCCESS", payload: user });
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE" });
      throw error;
    }
  };

  const signup = async (username: string, email: string, password: string) => {
    dispatch({ type: "SIGNUP_START" });

    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL ||
          process.env.NEXT_PUBLIC_API_URL_FALLBACK
        }/user/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        }
      );

      if (!response.ok) {
        throw new Error("Signup failed");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);

      const user = {
        _id: data._id,
        username: "Utilisateur",
        email: "",
        admin: false,
      };

      localStorage.setItem("user", JSON.stringify(user));
      dispatch({ type: "SIGNUP_SUCCESS", payload: user });
    } catch (error) {
      dispatch({ type: "SIGNUP_FAILURE" });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  const value: AuthContextType = {
    user: state.user,
    login,
    logout,
    signup,
    isLoading: state.isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
