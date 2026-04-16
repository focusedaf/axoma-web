"use client";

import * as React from "react";
import {
  IconSend,
  IconUsers,
  IconHistory,
  IconBrandPagekit,
  IconHome,
  IconSquare,
  IconAlertTriangle,
  IconClipboardList,
} from "@tabler/icons-react";

import { NavMain } from "@/components/ui-elements/sidebar/nav-main";
import { NavUser } from "@/components/ui-elements/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";

import { useAuth } from "@/context/AuthContext";

const data = {
  navMain: {
    common: [{ title: "Home", url: "/", icon: IconHome }],

    professor: [
      {
        title: "Create Exams",
        url: "/issuer-dashboard/professor/create-exam",
        icon: IconSend,
      },
      {
        title: "Drafts",
        url: "/issuer-dashboard/professor/drafts",
        icon: IconBrandPagekit,
      },
      {
        title: "Review Exams",
        url: "/issuer-dashboard/professor/review-exam",
        icon: IconClipboardList,
      },
      {
        title: "History",
        url: "/issuer-dashboard/professor/history",
        icon: IconHistory,
      },
      {
        title: "Violations",
        url: "/issuer-dashboard/professor/violations",
        icon: IconAlertTriangle,
      },
    ],

    recruiter: [
      {
        title: "Create Assessments",
        url: "/issuer-dashboard/recruiter/create-assessment",
        icon: IconSend,
      },
      {
        title: "Applicants",
        url: "/issuer-dashboard/recruiter/assessments",
        icon: IconUsers,
      },
      {
        title: "Violations",
        url: "/issuer-dashboard/recruiter/violations",
        icon: IconAlertTriangle,
      },
    ],

    institution: [
      {
        title: "Create Exams",
        url: "/issuer-dashboard/institution/create-exam",
        icon: IconSend,
      },
      {
        title: "Manage Exams",
        url: "/issuer-dashboard/institution/exams",
        icon: IconClipboardList,
      },
      {
        title: "Violations",
        url: "/issuer-dashboard/institution/violations",
        icon: IconAlertTriangle,
      },
    ],
  },
};

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();

  const userRole = user?.role as
    | "professor"
    | "recruiter"
    | "institution"
    | undefined;

  const roleDashboard =
    userRole === "professor"
      ? {
          title: "Dashboard",
          url: "/issuer-dashboard/professor",
          icon: IconSquare,
        }
      : userRole === "recruiter"
        ? {
            title: "Dashboard",
            url: "/issuer-dashboard/recruiter",
            icon: IconSquare,
          }
        : userRole === "institution"
          ? {
              title: "Dashboard",
              url: "/issuer-dashboard/institution",
              icon: IconSquare,
            }
          : null;

  const items = [
    ...data.navMain.common,
    ...(roleDashboard ? [roleDashboard] : []),
    ...(userRole && data.navMain[userRole] ? data.navMain[userRole] : []),
  ];

  return (
    <Sidebar
      collapsible="offcanvas"
      className="border-r bg-background/80 backdrop-blur-xl"
      {...props}
    >
      {/* HEADER */}
      <SidebarHeader className="p-4 border-b flex justify-center ml-5">
        
        <span className="font-bold text-2xl tracking-tight">Axoma</span>
      </SidebarHeader>

      {/* CONTENT */}
      <SidebarContent className="p-4">
        <NavMain items={items} />
      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter className="border-t p-3">
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
