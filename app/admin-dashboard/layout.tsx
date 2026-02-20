import { ReactNode } from "react";
import { AdminDashLayout } from "@/components/layout/AdminDashLayout";

export default function Layout({ children }: { children: ReactNode }) {
  return <AdminDashLayout>{children}</AdminDashLayout>;
}
