"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Spinner } from "@/components/ui/spinner";

export default function IssuerDashboard() {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    if (!user?.role) return;

    if (user.role === "professor") {
      router.replace("/issuer-dashboard/professor");
    } else if (user.role === "recruiter") {
      router.replace("/issuer-dashboard/recruiter");
    } else if (user.role === "institution") {
      router.replace("/issuer-dashboard/institution");
    }
  }, [user, isAuthenticated, loading, router]);

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Spinner />
    </div>
  );
}
