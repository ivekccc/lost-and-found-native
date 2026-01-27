import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApi } from "../api/auth.api";
import { AuthRequestDTO, AuthResponseDTO } from "../types";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: AuthRequestDTO) => Promise<AuthResponseDTO>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      setIsAuthenticated(!!token);
    } catch {
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (data: AuthRequestDTO): Promise<AuthResponseDTO> => {
    const response = await authApi.login(data);
    const result = response.data;

    await AsyncStorage.setItem("authToken", result.token!);
    await AsyncStorage.setItem("refreshToken", result.refreshToken!);
    setIsAuthenticated(true);

    return result;
  };

  const logout = async () => {
    await AsyncStorage.removeItem("authToken");
    await AsyncStorage.removeItem("refreshToken");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
