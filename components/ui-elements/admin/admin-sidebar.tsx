"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Clock,
  ShieldBan,
  ShieldCheck,
  Settings,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { AdminNavUser } from "./admin-navuser";
import { cn } from "@/lib/utils";

export const AdminSidebar = () => {
  const pathname = usePathname();

  const items = [
    { title: "Dashboard", href: "/admin-dashboard", icon: LayoutDashboard },
    { title: "All Issuers", href: "/admin-dashboard/issuers", icon: Users },
    { title: "Pending", href: "/admin-dashboard/issuers/pending", icon: Clock },
    {
      title: "Suspended",
      href: "/admin-dashboard/issuers/suspended",
      icon: ShieldBan,
    },
  ];

  return (
    <Sidebar className="border-r bg-gradient-to-b from-background to-muted/30">
      <SidebarHeader className="px-4 py-5 h-16 border-b">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold">Admin Panel</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="flex flex-col px-2 py-6">
        <SidebarMenu className="space-y-5">
          {items.map((item) => {
            const isActive = pathname === item.href;

            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  className={cn(
                    "transition-all duration-200 rounded-lg",
                    isActive && "bg-primary/10 text-primary shadow-sm",
                  )}
                >
                  <Link href={item.href} className="flex items-center gap-3">
                    <item.icon
                      className={cn(
                        "h-4 w-4",
                        isActive ? "text-primary" : "text-muted-foreground",
                      )}
                    />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>

        <div className="mt-auto pt-6">
          <Separator className="mb-4" />
          <AdminNavUser />
        </div>
      </SidebarContent>
    </Sidebar>
  );
};
