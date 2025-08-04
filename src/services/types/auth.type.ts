export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  csrfToken: string;
  accessToken: string;
  refreshToken: string;
}
