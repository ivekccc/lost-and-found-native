import { authApi } from "../api";
import { tokenService } from "./token.service";
import { AUTH_STRINGS } from "../constants";
import {
  AuthRequestDTO,
  AuthResponseDTO,
  RegisterRequestDTO,
  VerifyRequestDTO,
} from "@lost-and-found/api";

const saveAuthTokens = async (response: AuthResponseDTO): Promise<void> => {
  const success = await tokenService.setTokens(
    response.token,
    response.refreshToken,
  );
  if (!success) {
    throw new Error(AUTH_STRINGS.TOKEN_SAVE_ERROR);
  }
};

export const authService = {
  async login(data: AuthRequestDTO): Promise<AuthResponseDTO> {
    const response = await authApi.login(data);
    await saveAuthTokens(response.data);
    return response.data;
  },

  async register(data: RegisterRequestDTO): Promise<void> {
    await authApi.register(data);
  },

  async verifyCode(data: VerifyRequestDTO): Promise<AuthResponseDTO> {
    const response = await authApi.verifyCode(data);
    await saveAuthTokens(response.data);
    return response.data;
  },

  async logout(): Promise<void> {
    await tokenService.clearTokens();
  },
};
