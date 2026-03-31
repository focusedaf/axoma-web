"use client";

import React, { ReactNode, useEffect } from "react";
import { AppSidebar } from "@/components/ui-elements/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SiteHeader } from "@/components/ui-elements/site-header";
import { connectSocket } from "@/lib/socket";
import { fetchMeApi } from "@/lib/api";

interface IssuerDashLayoutProps {
  children: ReactNode;
  className?: string;
}

export const IssuerDashLayout = ({
  children,
  className,
}: IssuerDashLayoutProps) => {
  useEffect(() => {
    const initSocket = async () => {
      try {
        const res = await fetchMeApi();

        const user = {
          id: res.data.user.id,
          role: res.data.user.role,
        };

        const socket = connectSocket(user);

        socket.on("connect", () => {
          console.log("Issuer socket connected");
        });

        socket.on("notification", (data: any) => {
          console.log("ISSUER NOTIF:", data);

          window.dispatchEvent(
            new CustomEvent("issuer-notification", { detail: data }),
          );
        });
      } catch (err) {
        console.error("Socket init failed", err);
      }
    };

    initSocket();
  }, []);

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
