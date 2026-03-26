"use client";

import { usePathname, useRouter } from "next/navigation";
import { OL } from "@/components/layout/OnboardingLayout";
import { OnboardingProvider, useOnboarding } from "@/context/OnboardingContext";

function InnerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isDocsUploaded } = useOnboarding();

  const getStepInfo = () => {
    switch (pathname) {
      case "/onboarding":
        return {
          step: 1,
          hideBack: true,
          nextRoute: "/onboarding/profile",
          nextLabel: "Get Started",
        };

      case "/onboarding/profile":
        return {
          step: 2,
          hideBack: false,
          formId: "profile-form",
          backRoute: "/onboarding",
          nextLabel: "Continue",
        };

      case "/onboarding/verify-docs":
        return {
          step: 3,
          hideBack: false,
          backRoute: "/onboarding/profile",
          nextRoute: "/onboarding/success",
          nextLabel: "Continue",
          isNextDisabled: !isDocsUploaded,
        };

      case "/onboarding/success":
        return {
          step: 4,
          hideBack: true,
          nextRoute: "/issuer-dashboard",
          nextLabel: "Go to Dashboard",
        };

      default:
        return {
          step: 1,
          hideBack: true,
          nextRoute: "/onboarding/profile",
          nextLabel: "Get Started",
        };
    }
  };

  const {
    step,
    hideBack,
    nextRoute,
    formId,
    backRoute,
    nextLabel,
    isNextDisabled,
  } = getStepInfo();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-50">
      <OL
        step={step}
        totalSteps={4}
        onBack={() => backRoute && router.push(backRoute)}
        onNext={() => nextRoute && router.push(nextRoute)}
        hideBack={hideBack}
        formId={formId}
        nextLabel={nextLabel}
        isNextDisabled={isNextDisabled}
      >
        {children}
      </OL>
    </div>
  );
}

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <OnboardingProvider>
      <InnerLayout>{children}</InnerLayout>
    </OnboardingProvider>
  );
}
