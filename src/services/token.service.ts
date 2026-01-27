import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEYS } from "../constants";

type TokenChangeListener = (isAuthenticated: boolean) => void;

class TokenService {
  private listeners: Set<TokenChangeListener> = new Set();

  subscribe(listener: TokenChangeListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners(isAuthenticated: boolean): void {
    this.listeners.forEach((listener) => listener(isAuthenticated));
  }

  async getAccessToken(): Promise<string | null> {
    return AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  }

  async getRefreshToken(): Promise<string | null> {
    return AsyncStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  }

  async setTokens(accessToken: string | null | undefined, refreshToken: string | null | undefined): Promise<boolean> {
    if (!accessToken || !refreshToken) {
      console.warn("TokenService: Invalid tokens provided");
      return false;
    }

    try {
      await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, accessToken);
      await AsyncStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
      this.notifyListeners(true);
      return true;
    } catch (error) {
      console.error("TokenService: Failed to save tokens", error);
      return false;
    }
  }

  async updateAccessToken(accessToken: string): Promise<boolean> {
    if (!accessToken) {
      return false;
    }

    try {
      await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, accessToken);
      return true;
    } catch (error) {
      console.error("TokenService: Failed to update access token", error);
      return false;
    }
  }

  async updateRefreshToken(refreshToken: string): Promise<boolean> {
    if (!refreshToken) {
      return false;
    }

    try {
      await AsyncStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
      return true;
    } catch (error) {
      console.error("TokenService: Failed to update refresh token", error);
      return false;
    }
  }

  async clearTokens(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      await AsyncStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
      this.notifyListeners(false);
    } catch (error) {
      console.error("TokenService: Failed to clear tokens", error);
    }
  }

  async hasTokens(): Promise<boolean> {
    const token = await this.getAccessToken();
    return !!token;
  }
}

export const tokenService = new TokenService();
