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

export default function InstitutionProfileForm({
  className,
}: {
  className?: string;
}) {
  const router = useRouter();
  const { onboardingData, setOnboardingData } = useOnboarding();
  const profile = onboardingData.institution;

  const update = (field: keyof typeof profile, value: string) => {
    setOnboardingData((prev) => ({
      ...prev,
      institution: { ...prev.institution, [field]: value },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      institutionName: profile.institutionName,
      industry: profile.industry,
      description: profile.description || undefined,
      location: profile.location,
      institutionType: profile.institutionType,
      institutionWebsite: profile.institutionWebsite || undefined,
      yearEstablished: Number(profile.yearEstablished),
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
          <FieldLabel>Institution Name</FieldLabel>
          <Input
            value={profile.institutionName}
            onChange={(e) => update("institutionName", e.target.value)}
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
          <FieldLabel>Description</FieldLabel>
          <Input
            value={profile.description}
            onChange={(e) => update("description", e.target.value)}
          />
        </Field>
        <Field className="w-full">
          <FieldLabel>Location</FieldLabel>
          <Input
            value={profile.location}
            onChange={(e) => update("location", e.target.value)}
            required
          />
        </Field>
      </FieldGroup>

      <FieldGroup className="flex flex-col sm:flex-row gap-4">
        <Field className="w-full">
          <FieldLabel>Institution Type</FieldLabel>
          <Select
            value={profile.institutionType}
            onValueChange={(val) => update("institutionType", val)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="university">University</SelectItem>
              <SelectItem value="college">College</SelectItem>
              <SelectItem value="school">School</SelectItem>
              <SelectItem value="training_institute">
                Training Institute
              </SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field className="w-full">
          <FieldLabel>Year Established</FieldLabel>
          <Input
            type="number"
            value={profile.yearEstablished}
            onChange={(e) => update("yearEstablished", e.target.value)}
            required
          />
        </Field>
      </FieldGroup>

      <FieldGroup className="flex flex-col sm:flex-row gap-4">
        <Field className="w-full">
          <FieldLabel>Website</FieldLabel>
          <Input
            type="url"
            value={profile.institutionWebsite}
            onChange={(e) => update("institutionWebsite", e.target.value)}
          />
        </Field>
      </FieldGroup>

      <button type="submit" hidden />
    </form>
  );
}
