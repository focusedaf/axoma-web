"use client";

import { ReactNode } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AdminHeader } from "../ui-elements/admin/admin-header";
import { AdminSidebar } from "../ui-elements/admin/admin-sidebar";

interface AdminDashLayoutProps {
  children: ReactNode;
  className?: string;
}

export const AdminDashLayout = ({
  children,
  className,
}: AdminDashLayoutProps) => {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <AdminHeader />
        <div className={`flex flex-1 flex-col gap-6 p-6 ${className ?? ""}`}>
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
