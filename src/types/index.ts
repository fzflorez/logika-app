// AUTH TYPES
export interface LoginRequest {
  username: string;
  password: string;
}

export type LoginResponse = string;

export interface JWTPayload {
  id: string;
  sub: string;
  name: string;
  role: string;
  exp: number;
  iss: string;
  aud: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// ACTIONS TYPES

export interface Action {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  status: 0 | 1;
  createdAt: string;
}

export interface PaginationInfo {
  pageSize: number;
  pageNumber: number;
  totalElements: number;
  totalPages: number;
}

export interface ActionsListResponse {
  data: PaginationInfo & {
    data: Action[];
  };
}

export interface CreateActionResponse {
  message: string;
  data: {
    id: string;
  };
}

export interface ActionFormData {
  name: string;
  description: string;
  color: string;
  status: string; // "0" o "1"
  icon: FileList;
}

// API ERROR TYPES

export interface ApiError {
  message: string;
  status?: number;
}
