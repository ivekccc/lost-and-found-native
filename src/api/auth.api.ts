import http from './http';
import { AuthRequestDTO, AuthResponseDTO, RegisterRequestDTO } from '../types';

export const authApi = {
  login: (data: AuthRequestDTO) =>
    http.post<AuthResponseDTO>('/auth/login', data),

  register: (data: RegisterRequestDTO) =>
    http.post<AuthResponseDTO>('/auth/register', data),
};
