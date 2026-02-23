"use client";

import * as React from "react";
import {
  IconSend,
  IconUsers,
  IconHistory,
  IconWallet,
  IconHome,
  IconSquare,
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
        title: "Review Exams",
        url: "/issuer-dashboard/professor/review-exam",
        icon: IconUsers,
      },
      {
        title: "Exam History",
        url: "/issuer-dashboard/professor/history",
        icon: IconHistory,
      },
      {
        title: "View Violations",
        url: "/issuer-dashboard/professor/violations",
        icon: IconUsers,
      },
    ],
    recruiter: [
      {
        title: "Create Assessments",
        url: "/issuer-dashboard/recruiter/create-assessment",
        icon: IconSend,
      },
      {
        title: "Manage Applicant",
        url: "/issuer-dashboard/recruiter/assessments",
        icon: IconUsers,
      },
      {
        title: "View Violations",
        url: "/issuer-dashboard/recruiter/violations",
        icon: IconUsers,
      },
    ],
    institution: [
      {
        title: "Create Exams",
        url: "/issuer-dashboard/institution/create-exam",
        icon: IconUsers,
      },
      {
        title: "Manage Exams",
        url: "/issuer-dashboard/institution/exams",
        icon: IconUsers,
      },
      {
        title: "View Violations",
        url: "/issuer-dashboard/institution/violations",
        icon: IconUsers,
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
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="p-4 border-b">
        <span className="font-semibold text-3xl ">Axoma</span>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <NavMain items={items} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
