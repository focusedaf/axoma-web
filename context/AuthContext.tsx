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
import { fetchMeApi, logoutIssuer } from "@/lib/api";

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (data: User) => void;
  logout: () => Promise<void>;
  setRole: (role: Role) => void;
  fetchMe: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMe = useCallback(async () => {
    try {
      const res = await fetchMeApi();
      setUser(res.data.user);
      localStorage.setItem("axoma_user", JSON.stringify(res.data.user));
    } catch {
      setUser(null);
      localStorage.removeItem("axoma_user");
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        await fetchMe();
      } finally {
        if (mounted) setLoading(false);
      }
    };

    init();

    return () => {
      mounted = false;
    };
  }, [fetchMe]);

  const login = useCallback((data: User) => {
    setUser(data);
    localStorage.setItem("axoma_user", JSON.stringify(data));
  }, []);

  const logout = useCallback(async () => {
    setUser(null);
    localStorage.removeItem("axoma_user");

    try {
      await logoutIssuer();
    } catch {}

    router.replace("/login");
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
        fetchMe,
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
