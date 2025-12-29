import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { AuthContextValue, User, JWTPayload } from "../types";
import { authService } from "../services/authService";
import { storage } from "../utils/storage";

export const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Extract user from JWT token
  const extractUserFromToken = useCallback((token: string): User | null => {
    const payload = storage.decodeJWT(token) as JWTPayload | null;
    if (!payload) return null;

    return {
      id: payload.id,
      name: payload.name,
      email: payload.sub,
      role: payload.role,
    };
  }, []);

  // Initialize: verify existing token
  useEffect(() => {
    const storedToken = storage.getToken();

    if (storedToken) {
      // Verify expired token
      if (!storage.isTokenExpired(storedToken)) {
        const userData = extractUserFromToken(storedToken);
        if (userData) {
          setToken(storedToken);
          setUser(userData);
        } else {
          // Remove invalid token
          storage.removeToken();
        }
      } else {
        // Remove espired token
        storage.removeToken();
      }
    }

    setIsLoading(false);
  }, [extractUserFromToken]);

  // Login
  const login = useCallback(
    async (email: string, password: string): Promise<void> => {
      const newToken = await authService.login(email, password);

      // Save token
      storage.setToken(newToken);
      setToken(newToken);

      // Extract user
      const userData = extractUserFromToken(newToken);
      setUser(userData);
    },
    [extractUserFromToken]
  );

  // Logout
  const logout = useCallback(() => {
    storage.removeToken();
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      token,
      user,
      isAuthenticated: !!token && !!user,
      isLoading,
      login,
      logout,
    }),
    [token, user, isLoading, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
