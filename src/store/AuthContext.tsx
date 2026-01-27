import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { authApi } from "../api/auth.api";
import { tokenService } from "../services";
import { AuthRequestDTO, AuthResponseDTO, RegisterRequestDTO } from "../types";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: AuthRequestDTO) => Promise<AuthResponseDTO>;
  register: (data: RegisterRequestDTO) => Promise<AuthResponseDTO>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const hasTokens = await tokenService.hasTokens();
        setIsAuthenticated(hasTokens);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    const unsubscribe = tokenService.subscribe((authState) => {
      setIsAuthenticated(authState);
    });

    return unsubscribe;
  }, []);

  const login = useCallback(async (data: AuthRequestDTO): Promise<AuthResponseDTO> => {
    const response = await authApi.login(data);
    const result = response.data;
    const success = await tokenService.setTokens(result.token, result.refreshToken);

    if (!success) {
      throw new Error("Failed to save authentication tokens");
    }

    return result;
  }, []);

  const register = useCallback(async (data: RegisterRequestDTO): Promise<AuthResponseDTO> => {
    const response = await authApi.register(data);
    const result = response.data;
    const success = await tokenService.setTokens(result.token, result.refreshToken);

    if (!success) {
      throw new Error("Failed to save authentication tokens");
    }

    return result;
  }, []);

  const logout = useCallback(async () => {
    await tokenService.clearTokens();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, register, logout }}>
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
