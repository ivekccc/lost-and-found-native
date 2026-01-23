// ===========================================
// AUTH DTOs - 1:1 SA BACKEND
// ===========================================

// AuthRequestDTO.java
export interface AuthRequestDTO {
  email: string;
  password: string;
}

// RegisterRequestDto.java
export interface RegisterRequestDTO {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  phoneNumber?: string;
}

// AuthResponseDTO.java
export interface AuthResponseDTO {
  token: string;
  refreshToken: string;
  message: string;
}

// RefreshTokenRequestDTO.java
export interface RefreshTokenRequestDTO {
  refreshToken: string;
}

// RefreshTokenResponseDTO.java
export interface RefreshTokenResponseDTO {
  accessToken: string;
  refreshToken: string;
  message: string;
}
