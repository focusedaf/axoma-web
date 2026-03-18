export type Role = "professor" | "recruiter" | "institution" | "admin";

export interface User {
  id: string;
  email: string;
  role: Role;
}
