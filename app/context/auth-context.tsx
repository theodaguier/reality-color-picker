import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (
    username: string,
    email: string,
    password: string
  ) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const TOKEN_KEY = "your-secret-key";
export const API_URL = "http://localhost:3000";
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({ token: null, authenticated: null });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      console.log("💫 ~ file AuthContext.tsx:29 ~ loadToken ~ token", token);

      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        setAuthState({
          token: token,
          authenticated: true,
        });
      }
    };
  }, []);

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    console.log("body", username, email, password);

    try {
      const result = await axios.post(`${API_URL}/auth/register`, {
        username,
        email,
        password,
      });
      console.log("💫 ~ file AuthContext.tsx:41 ~ login ~ result:", result);
      return result;
    } catch (e) {
      console.error(e);
      return { error: true, msg: (e as any).response.data.msg };
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const result = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      console.log("💫 ~ file AuthContext.tsx:41 ~ login ~ result:", result);
      return result;
    } catch (e) {
      console.error(e);
      return { error: true, msg: (e as any).response.data.msg };
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);

    axios.defaults.headers.common["Authorization"] = "";

    setAuthState({
      token: null,
      authenticated: false,
    });
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
