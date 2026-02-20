"use client";
import React, { useState, useEffect } from "react";
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

interface RecruiterProfile {
  companyName?: string;
  industry?: string;
  department?: string;
  designation?: string;
  employmentType?: string;
  companyWebsite?: string;
  linkedinProfile?: string;
  joiningYear?: string;
}

interface RecruiterProfileFormProps {
  className?: string;
  existingData?: RecruiterProfile;
  onSuccess?: () => void;
}

export default function RecruiterProfileForm({
  className,
  existingData,
  onSuccess,
}: RecruiterProfileFormProps) {
  const [formData, setFormData] = useState<RecruiterProfile>({
    companyName: "",
    industry: "",
    department: "",
    designation: "",
    employmentType: "",
    companyWebsite: "",
    linkedinProfile: "",
    joiningYear: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (existingData) {
      setFormData({
        companyName: existingData.companyName ?? "",
        industry: existingData.industry ?? "",
        department: existingData.department ?? "",
        designation: existingData.designation ?? "",
        employmentType: existingData.employmentType ?? "",
        companyWebsite: existingData.companyWebsite ?? "",
        linkedinProfile: existingData.linkedinProfile ?? "",
        joiningYear: existingData.joiningYear ?? "",
      });
    }
  }, [existingData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = {
        companyName: formData.companyName,
        industry: formData.industry,
        department: formData.department,
        designation: formData.designation,
        employmentType: formData.employmentType,
        companyWebsite: formData.companyWebsite,
        linkedinProfile: formData.linkedinProfile,
        joiningYear: formData.joiningYear
          ? Number(formData.joiningYear)
          : undefined,
      };

      // axios call here

      toast.success("Profile saved successfully!");
      onSuccess?.();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Error saving profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-8 w-full md:max-w-7xl", className)}>
      <form onSubmit={handleSubmit} id="profile-form">
        <FieldGroup className="flex flex-col sm:flex-row gap-2 justify-between items-stretch">
          <Field className="w-full max-w-xl">
            <FieldLabel>Company Name</FieldLabel>
            <Input
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
            />
          </Field>

          <Field className="w-full max-w-xl">
            <FieldLabel>Industry</FieldLabel>
            <Input
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              required
            />
          </Field>
        </FieldGroup>

        <FieldGroup className="flex flex-col sm:flex-row gap-2 justify-between items-stretch">
          <Field className="w-full max-w-xl">
            <FieldLabel>Department</FieldLabel>
            <Input
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            />
          </Field>

          <Field className="w-full max-w-xl">
            <FieldLabel>Designation</FieldLabel>
            <Input
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              required
            />
          </Field>
        </FieldGroup>

        <FieldGroup className="flex flex-col sm:flex-row gap-2 justify-between items-stretch">
          <Field className="w-full max-w-xl">
            <FieldLabel>Joining Year</FieldLabel>
            <Input
              name="joiningYear"
              value={formData.joiningYear}
              onChange={handleChange}
              pattern="\d{4}"
              placeholder="YYYY"
              required
            />
          </Field>

          <Field className="w-full max-w-xl">
            <FieldLabel>Employment Type</FieldLabel>
            <Select
              value={formData.employmentType}
              onValueChange={(val) =>
                setFormData((prev) => ({
                  ...prev,
                  employmentType: val,
                }))
              }
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
        </FieldGroup>

        <FieldGroup className="flex flex-col sm:flex-row gap-2 justify-between items-stretch">
          <Field className="w-full max-w-xl">
            <FieldLabel>Company Website</FieldLabel>
            <Input
              name="companyWebsite"
              value={formData.companyWebsite}
              onChange={handleChange}
              type="url"
              placeholder="https://example.com"
            />
          </Field>

          <Field className="w-full max-w-xl">
            <FieldLabel>LinkedIn Profile</FieldLabel>
            <Input
              name="linkedinProfile"
              value={formData.linkedinProfile}
              onChange={handleChange}
              type="url"
              placeholder="https://linkedin.com/in/username"
            />
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
