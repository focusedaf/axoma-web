"use client";

import React, { ReactNode } from "react";
import { AppSidebar } from "@/components/ui-elements/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SiteHeader } from "@/components/ui-elements/site-header";

interface IssuerDashLayoutProps {
  children: ReactNode;
  className?: string;
}

export const IssuerDashLayout = ({
  children,
  className,
}: IssuerDashLayoutProps) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="overflow-hidden">
        <SiteHeader />
        <div className={`flex flex-1 flex-col gap-4 p-4 ${className || ""}`}>
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
