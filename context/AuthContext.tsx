"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { Role, User } from "@/types/auth";

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (data: User) => void;
  logout: () => void;
  setRole: (role: Role) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Hydrate once
  useEffect(() => {
    try {
      const stored = localStorage.getItem("axoma_user");
      if (stored) {
        const parsed: User = JSON.parse(stored);
        setUser(parsed);
      }
    } catch (err) {
      console.error("Auth hydration error:", err);
      localStorage.removeItem("axoma_user");
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback((data: User) => {
    setUser(data);
    localStorage.setItem("axoma_user", JSON.stringify(data));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("axoma_user");
    router.push("/login");
  }, [router]);

  const setRole = useCallback((role: Role) => {
    setUser((prev) => {
      if (!prev) return prev;

      const updated = { ...prev, role };
      localStorage.setItem("axoma_user", JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
        setRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};
