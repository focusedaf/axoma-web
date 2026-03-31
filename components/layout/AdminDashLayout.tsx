"use client";

import { ReactNode, useEffect } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AdminHeader } from "../ui-elements/admin/admin-header";
import { AdminSidebar } from "../ui-elements/admin/admin-sidebar";
import { connectSocket } from "@/lib/socket";
import { fetchMeApi } from "@/lib/api";

interface AdminDashLayoutProps {
  children: ReactNode;
  className?: string;
}

export const AdminDashLayout = ({
  children,
  className,
}: AdminDashLayoutProps) => {
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
          console.log("Admin socket connected");
        });

        socket.on("notification", (data: any) => {
          console.log("ADMIN NOTIF:", data);

          // you can later replace with toast
          window.dispatchEvent(
            new CustomEvent("admin-notification", { detail: data }),
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
