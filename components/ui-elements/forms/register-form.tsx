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

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    institutionName: "",
    mobileNumber: "",
    role: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = () => {
    router.push("/login");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleWalletConnect = (address: string) => {
    setWalletAddress(address);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.role) {
      toast.error("Please select a role");
      return;
    }

    if (formData.role === "institution" && !formData.institutionName) {
      toast.error("institution name is required");
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

      

      toast.success("Account created successfully!");
      router.push("/onboarding/profile");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Error in creating account",
      );
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
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogin();
                }}
              >
                Login
              </a>
            </FieldDescription>
          </div>

          {/* Role */}
          <Field>
            <FieldLabel htmlFor="role">I am a</FieldLabel>
            <RoleSelector
              value={formData.role}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, role: value }))
              }
            />
          </Field>

          {/* Individual (Professor / Recruiter) */}
          {formData.role && formData.role !== "institution" && (
            <FieldGroup className="flex flex-col sm:flex-row gap-2 items-stretch">
              <Field>
                <FieldLabel htmlFor="firstName">First Name</FieldLabel>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="momo"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="momo"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </Field>
            </FieldGroup>
          )}

          {/* Institution */}
          {formData.role === "institution" && (
            <Field>
              <FieldLabel htmlFor="institutionName">
                Institution Name
              </FieldLabel>
              <Input
                id="institutionName"
                name="institutionName"
                type="text"
                placeholder="Axoma University"
                value={formData.institutionName}
                onChange={handleInputChange}
                required
              />
            </Field>
          )}

          {/* Common Fields */}
          <Field>
            <FieldLabel htmlFor="mobileNumber">Mobile Number</FieldLabel>
            <Input
              id="mobileNumber"
              name="mobileNumber"
              type="tel"
              placeholder="+91 3456789876"
              value={formData.mobileNumber}
              onChange={handleInputChange}
              required
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleInputChange}
                placeholder="8 characters only"
                required
                className="pr-10"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </Field>

          <Field>
            <FieldLabel htmlFor="wallet">Wallet Address</FieldLabel>
            <Input
              id="wallet"
              name="walletAddress"
              type="text"
              value={walletAddress}
              placeholder="0x..."
              readOnly
              className={cn(
                "font-mono text-xs sm:text-sm cursor-not-allowed",
                walletAddress ? "bg-green-50 border-green-300" : "bg-gray-50",
              )}
            />
          </Field>
          <FieldGroup>
            <div className="flex flex-col sm:flex-row gap-3">
              <Metamask
                onConnect={handleWalletConnect}
                className="w-full sm:flex-1"
              />
              <Button
                type="submit"
                disabled={isLoading}
                className=" w-full sm:flex-1 h-11 text-sm sm:text-base font-semibold tracking-wide cursor-pointer"
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
