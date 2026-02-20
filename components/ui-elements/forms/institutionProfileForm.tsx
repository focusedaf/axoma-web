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
import { Textarea } from "@/components/ui/textarea";

interface InstitutionProfile {
  institutionName?: string;
  industry?: string;
  description?: string;
  location?: string;
  institutionType?: string;
  institutionWebsite?: string;
  yearEstablished?: string;
}

interface InstitutionProfileFormProps {
  className?: string;
  existingData?: InstitutionProfile;
  onSuccess?: () => void;
}

export default function InstitutionProfileForm({
  className,
  existingData,
  onSuccess,
}: InstitutionProfileFormProps) {
  const [formData, setFormData] = useState<InstitutionProfile>({
    institutionName: "",
    industry: "",
    description: "",
    location: "",
    institutionType: "",
    institutionWebsite: "",
    yearEstablished: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (existingData) setFormData(existingData);
  }, [existingData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = {
        ...formData,
        yearEstablished: formData.yearEstablished
          ? Number(formData.yearEstablished)
          : undefined,
      };

      //  axios shit

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
            <FieldLabel>Institution Name</FieldLabel>
            <Input
              name="institutionName"
              value={formData.institutionName}
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
            <FieldLabel>Location</FieldLabel>
            <Input
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </Field>

          <Field className="w-full max-w-xl">
            <FieldLabel>Website</FieldLabel>
            <Input
              name="institutionWebsite"
              type="url"
              value={formData.institutionWebsite}
              onChange={handleChange}
            />
          </Field>
        </FieldGroup>

        <FieldGroup className="flex flex-col sm:flex-row gap-2 justify-between items-stretch">
          <Field className="w-full max-w-xl">
            <FieldLabel>Year Established</FieldLabel>
            <Input
              name="yearEstablished"
              value={formData.yearEstablished}
              onChange={handleChange}
              pattern="\d{4}"
              placeholder="e.g. 1998"
              required
            />
          </Field>

          <Field className="w-full max-w-xl">
            <FieldLabel>Institution Type</FieldLabel>
            <Select
              value={formData.institutionType}
              onValueChange={(val) =>
                setFormData((prev) => ({ ...prev, institutionType: val }))
              }
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
        </FieldGroup>

        <Field className="w-full max-w-7xl mt-2">
          <FieldLabel>Description</FieldLabel>
          <Textarea
            name="description"
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            rows={4}
            placeholder="Briefly describe your institution..."
          />
        </Field>
      </form>
    </div>
  );
}
