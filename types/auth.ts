export type Role = "professor" | "recruiter" | "institution";

export interface User {
  id: string;
  email: string;
  role: Role;
}
