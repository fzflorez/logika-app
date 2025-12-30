import { useCallback, useMemo, useState, type ReactNode } from "react";
import type { AuthContextValue, User, JWTPayload } from "../types";
import { authService } from "../services/authService";
import { storage } from "../utils/storage";
import { AuthContext } from "./AuthContextDefinition";

interface AuthProviderProps {
  children: ReactNode;
}

// Extract user from JWT token (pure function, no hooks needed)
function extractUserFromToken(token: string): User | null {
  const payload = storage.decodeJWT(token) as JWTPayload | null;
  if (!payload) return null;

  return {
    id: payload.id,
    name: payload.name,
    email: payload.sub,
    role: payload.role,
  };
}

// Initialize auth state from storage (runs once on mount)
function getInitialAuthState(): { token: string | null; user: User | null } {
  const storedToken = storage.getToken();

  if (storedToken) {
    // Verify token is not expired
    if (!storage.isTokenExpired(storedToken)) {
      const userData = extractUserFromToken(storedToken);
      if (userData) {
        return { token: storedToken, user: userData };
      }
    }
    // Remove invalid or expired token
    storage.removeToken();
  }

  return { token: null, user: null };
}

export function AuthProvider({ children }: AuthProviderProps) {
  // Use lazy initialization to avoid setState in effect
  const [authState, setAuthState] = useState(getInitialAuthState);
  const { token, user } = authState;

  // Login
  const login = useCallback(
    async (email: string, password: string): Promise<void> => {
      const newToken = await authService.login(email, password);

      // Save token
      storage.setToken(newToken);

      // Extract user and update state
      const userData = extractUserFromToken(newToken);
      setAuthState({ token: newToken, user: userData });
    },
    []
  );

  // Logout
  const logout = useCallback(() => {
    storage.removeToken();
    setAuthState({ token: null, user: null });
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      token,
      user,
      isAuthenticated: !!token && !!user,
      isLoading: false, // No longer needed since we use lazy initialization
      login,
      logout,
    }),
    [token, user, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
