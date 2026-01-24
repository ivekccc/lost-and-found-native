export interface RegisterRequestDTO {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  phoneNumber?: string;
}

export interface AuthResponseDTO {
  token?: string;
  refreshToken?: string;
  message?: string;
}

export interface RefreshTokenRequestDTO {
  refreshToken?: string;
}

export interface RefreshTokenResponseDTO {
  accessToken?: string;
  refreshToken?: string;
  message?: string;
}

export interface AuthRequestDTO {
  email: string;
  password: string;
}
