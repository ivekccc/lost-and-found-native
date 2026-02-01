import http from './http';
import { AuthRequestDTO, AuthResponseDTO, RegisterRequestDTO } from '@lost-and-found/api';

export const authApi = {
  login: (data: AuthRequestDTO) =>
    http.post<AuthResponseDTO>('/auth/login', data),

  register: (data: RegisterRequestDTO) =>
    http.post<AuthResponseDTO>('/auth/register', data),
};
