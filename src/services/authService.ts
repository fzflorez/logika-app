import type { LoginRequest, LoginResponse } from "../types";
import { authApi } from "./api";

export const authService = {
  login: async (username: string, password: string): Promise<LoginResponse> => {
    const payload: LoginRequest = { username, password };

    const response = await authApi.post<LoginResponse>(
      "/Authentication/Login",
      payload
    );

    return response.data;
  },
};
