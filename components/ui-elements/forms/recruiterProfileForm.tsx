"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { upsertProfile } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useOnboarding } from "@/context/OnboardingContext";

export default function RecruiterProfileForm({
  className,
}: {
  className?: string;
}) {
  const router = useRouter();
  const { onboardingData, setOnboardingData } = useOnboarding();
  const profile = onboardingData.recruiter;

  const update = (field: keyof typeof profile, value: string) => {
    setOnboardingData((prev) => ({
      ...prev,
      recruiter: { ...prev.recruiter, [field]: value },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      companyName: profile.companyName,
      industry: profile.industry,
      department: profile.department,
      designation: profile.designation,
      employmentType: profile.employmentType,
      joiningYear: Number(profile.joiningYear),
      companyWebsite: profile.companyWebsite || undefined,
      linkedinProfile: profile.linkedinProfile || undefined,
    };

    try {
      await upsertProfile(payload);
      toast.success("Profile saved successfully!");
      router.push("/onboarding/verify-docs");
    } catch (err: any) {
      console.error(err.response?.data || err);
      toast.error("Failed to save profile. Check your input.");
    }
  };

  return (
    <form
      id="profile-form"
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-6 w-full md:max-w-3xl", className)}
    >
      <FieldGroup className="flex flex-col sm:flex-row gap-4">
        <Field className="w-full">
          <FieldLabel>Company Name</FieldLabel>
          <Input
            value={profile.companyName}
            onChange={(e) => update("companyName", e.target.value)}
            required
          />
        </Field>
        <Field className="w-full">
          <FieldLabel>Industry</FieldLabel>
          <Input
            value={profile.industry}
            onChange={(e) => update("industry", e.target.value)}
            required
          />
        </Field>
      </FieldGroup>

      <FieldGroup className="flex flex-col sm:flex-row gap-4">
        <Field className="w-full">
          <FieldLabel>Department</FieldLabel>
          <Input
            value={profile.department}
            onChange={(e) => update("department", e.target.value)}
            required
          />
        </Field>
        <Field className="w-full">
          <FieldLabel>Designation</FieldLabel>
          <Input
            value={profile.designation}
            onChange={(e) => update("designation", e.target.value)}
            required
          />
        </Field>
      </FieldGroup>

      <FieldGroup className="flex flex-col sm:flex-row gap-4">
        <Field className="w-full">
          <FieldLabel>Employment Type</FieldLabel>
          <Select
            value={profile.employmentType}
            onValueChange={(val) => update("employmentType", val)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full_time">Full-time</SelectItem>
              <SelectItem value="part_time">Part-time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
              <SelectItem value="intern">Intern</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field className="w-full">
          <FieldLabel>Joining Year</FieldLabel>
          <Input
            value={profile.joiningYear}
            type="number"
            onChange={(e) => update("joiningYear", e.target.value)}
            required
          />
        </Field>
      </FieldGroup>

      <FieldGroup className="flex flex-col sm:flex-row gap-4">
        <Field className="w-full">
          <FieldLabel>Company Website</FieldLabel>
          <Input
            type="url"
            value={profile.companyWebsite}
            onChange={(e) => update("companyWebsite", e.target.value)}
          />
        </Field>
        <Field className="w-full">
          <FieldLabel>LinkedIn Profile</FieldLabel>
          <Input
            type="url"
            value={profile.linkedinProfile}
            onChange={(e) => update("linkedinProfile", e.target.value)}
          />
        </Field>
      </FieldGroup>

      <button type="submit" hidden />
    </form>
  );
}
