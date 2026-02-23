"use client";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import ProfessorProfileForm from "@/components/ui-elements/forms/professorProfileForm";
import InstitutionProfileForm from "@/components/ui-elements/forms/institutionProfileForm";
import RecruiterProfileForm from "@/components/ui-elements/forms/recruiterProfileForm";
import { Spinner } from "@/components/ui/spinner";
import { OL } from "@/components/layout/OnboardingLayout";

export default function ProfilePage() {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Set up your profile</h1>
      <p className="text-gray-600 mb-8">
        Tell us a bit about yourself to complete your registration
      </p>

      {user.role === "institution" && <InstitutionProfileForm />}
      {user.role === "professor" && <ProfessorProfileForm />}
      {user.role === "recruiter" && <RecruiterProfileForm />}
    </div>
  );
}
