import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { tokenService, toastService } from "../services";
import { COMMON_STRINGS } from "../constants";

const API_BASE_URL = "http://localhost:8082";

const http = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use(
  async (config) => {
    const token = await tokenService.getAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

interface QueuedRequest {
  resolve: (token: string) => void;
  reject: (error: Error) => void;
}

let isRefreshing = false;
let failedQueue: QueuedRequest[] = [];

const processQueue = (error: Error | null, token: string | null = null): void => {
  failedQueue.forEach((request) => {
    if (error) {
      request.reject(error);
    } else if (token) {
      request.resolve(token);
    }
  });
  failedQueue = [];
};

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
  _silent?: boolean;
}

interface ApiErrorResponse {
  message?: string;
  error?: string;
  status?: number;
}

const showErrorToast = (error: AxiosError<ApiErrorResponse>): void => {
  const message =
    error.response?.data?.message ||
    error.response?.data?.error ||
    error.message ||
    COMMON_STRINGS.ERROR_GENERIC;

  toastService.error(COMMON_STRINGS.ERROR_TITLE, message);
};

http.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiErrorResponse>) => {
    const originalRequest = error.config as RetryableRequestConfig;
    const status = error.response?.status;
    const isSilent = originalRequest?._silent;
    const isAuthError = status === 401 || status === 403;

    if (isAuthError && !originalRequest._retry) {
      const refreshToken = await tokenService.getRefreshToken();

      if (!refreshToken) {
        if (!isSilent) {
          showErrorToast(error);
        }
        await tokenService.clearTokens();
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return http(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
          refreshToken,
        });

        const { accessToken, refreshToken: newRefreshToken } = response.data;

        await tokenService.updateAccessToken(accessToken);
        if (newRefreshToken) {
          await tokenService.updateRefreshToken(newRefreshToken);
        }

        http.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        processQueue(null, accessToken);
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return http(originalRequest);
      } catch (refreshError) {
        if (!isSilent) {
          showErrorToast(error);
        }
        processQueue(refreshError as Error, null);
        await tokenService.clearTokens();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    if (!isSilent) {
      showErrorToast(error);
    }

    return Promise.reject(error);
  }
);

export default http;
