"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Spinner } from "@/components/ui/spinner";
import { IssuerDashLayout } from "@/components/layout/IssuerDashLayout";

interface InstitutionLayoutProps {
  children: ReactNode;
}

export default function InstitutionLayout({
  children,
}: InstitutionLayoutProps) {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    if (user?.role !== "institution") {
      router.replace("/issuer-dashboard");
    }
  }, [user, isAuthenticated, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return <IssuerDashLayout>{children}</IssuerDashLayout>;
}
