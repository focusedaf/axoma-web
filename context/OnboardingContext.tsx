"use client";

import React, { createContext, useContext, useState } from "react";

export interface ProfessorProfile {
  universityName: string;
  collegeName: string;
  department: string;
  designation: string;
  employmentType: string;
  joiningYear: string;
}

export interface InstitutionProfile {
  institutionName: string;
  industry: string;
  description: string;
  location: string;
  institutionType: string;
  institutionWebsite: string;
  yearEstablished: string;
}

export interface RecruiterProfile {
  companyName: string;
  industry: string;
  department: string;
  designation: string;
  employmentType: string;
  companyWebsite: string;
  linkedinProfile: string;
  joiningYear: string;
}

export interface OnboardingData {
  professor: ProfessorProfile;
  institution: InstitutionProfile;
  recruiter: RecruiterProfile;
}

interface ContextType {
  onboardingData: OnboardingData;
  setOnboardingData: React.Dispatch<React.SetStateAction<OnboardingData>>;
}

const OnboardingContext = createContext<ContextType | undefined>(undefined);

export const useOnboarding = (): ContextType => {
  const ctx = useContext(OnboardingContext);
  if (!ctx)
    throw new Error("useOnboarding must be used inside OnboardingProvider");
  return ctx;
};

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    professor: {
      universityName: "",
      collegeName: "",
      department: "",
      designation: "",
      employmentType: "",
      joiningYear: "",
    },
    institution: {
      institutionName: "",
      industry: "",
      description: "",
      location: "",
      institutionType: "",
      institutionWebsite: "",
      yearEstablished: "",
    },
    recruiter: {
      companyName: "",
      industry: "",
      department: "",
      designation: "",
      employmentType: "",
      companyWebsite: "",
      linkedinProfile: "",
      joiningYear: "",
    },
  });

  return (
    <OnboardingContext.Provider value={{ onboardingData, setOnboardingData }}>
      {children}
    </OnboardingContext.Provider>
  );
};
