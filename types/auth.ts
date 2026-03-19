
export type IssuerRole = "professor" | "recruiter" | "institution";

export type Role = IssuerRole | "admin";
export interface User {
  id: string;
  email: string;
  role: Role;
}
