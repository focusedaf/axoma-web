"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import Metamask from "../buttons/Metamask";
import RoleSelector from "../roleSelector";
import { registerIssuer } from "@/lib/api";
import { Role } from "@/types/auth";
import { useAuth } from "@/context/AuthContext";
interface RegisterFormData {
  firstName: string;
  lastName: string;
  institutionName: string;
  mobileNumber: string;
  role: Role | null;
  email: string;
  password: string;
}

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: "",
    lastName: "",
    institutionName: "",
    mobileNumber: "",
    role: null,
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.role) {
      toast.error("Please select a role");
      return;
    }

    if (formData.role === "institution" && !formData.institutionName) {
      toast.error("Institution name is required");
      return;
    }

    if (
      formData.role !== "institution" &&
      (!formData.firstName || !formData.lastName)
    ) {
      toast.error("First and last name are required");
      return;
    }

    if (!walletAddress) {
      toast.error("Please connect your MetaMask wallet");
      return;
    }

    try {
      setIsLoading(true);

      const res = await registerIssuer({
        ...formData,
        role: formData.role,
        walletAddress,
      });

      login(res.data.user);
      toast.success("Account created successfully!");
      router.push("/onboarding");
    } catch (error) {
      toast.error("Error creating account");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-xl font-bold">Welcome to Axoma</h1>
            <FieldDescription>
              Already have an account?{" "}
              <a href="#" onClick={() => router.push("/login")}>
                Login
              </a>
            </FieldDescription>
          </div>

          <Field>
            <FieldLabel>I am a</FieldLabel>
            <RoleSelector
              value={formData.role}
              onChange={(value: Role) =>
                setFormData((prev) => ({ ...prev, role: value }))
              }
            />
          </Field>

          {formData.role && formData.role !== "institution" && (
            <FieldGroup className="flex flex-col sm:flex-row gap-2">
              <Field>
                <FieldLabel>First Name</FieldLabel>
                <Input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </Field>
              <Field>
                <FieldLabel>Last Name</FieldLabel>
                <Input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </Field>
            </FieldGroup>
          )}

          {formData.role === "institution" && (
            <Field>
              <FieldLabel>Institution Name</FieldLabel>
              <Input
                name="institutionName"
                value={formData.institutionName}
                onChange={handleInputChange}
                required
              />
            </Field>
          )}

          <Field>
            <FieldLabel>Mobile Number</FieldLabel>
            <Input
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleInputChange}
              required
            />
          </Field>

          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </Field>

          <Field>
            <FieldLabel>Password</FieldLabel>
            <div className="relative">
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleInputChange}
                required
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </Field>

          <Field>
            <FieldLabel>Wallet Address</FieldLabel>
            <Input value={walletAddress} readOnly className="bg-gray-50" />
          </Field>

          <FieldGroup>
            <div className="flex flex-col sm:flex-row gap-3">
              <Metamask
                onConnect={setWalletAddress}
                className="w-full sm:flex-1"
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full sm:flex-1 h-11 font-semibold"
              >
                {isLoading ? <Spinner /> : "Register"}
              </Button>
            </div>
          </FieldGroup>
        </FieldGroup>
      </form>
    </div>
  );
}
