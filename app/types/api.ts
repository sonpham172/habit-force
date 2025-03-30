// Auth Types
export interface LoginResponse {
  id: string;
  email: string;
  name: string;
  access_token: string;
}

export interface RegisterResponse {
  id: string;
  email: string;
  name: string;
}

// Generic API Response Type
export interface ApiResponse<T> {
  message: string;
  status: boolean;
  data: T;
}

// API Error Response
export interface ApiErrorResponse {
  message: string;
  status: false;
  data: null;
} 