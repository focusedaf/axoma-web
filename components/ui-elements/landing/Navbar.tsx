"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Home, Menu, Users, Package, X, User, LogOut } from "lucide-react";

type NavItem = { label: string; href: string; icon: React.ReactNode };

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout, user, loading } = useAuth();
  const router = useRouter();

  if (loading) return null;

  const publicNavLinks: NavItem[] = [
    { href: "#hero", label: "Home", icon: <Home className="h-4 w-4" /> },
    {
      href: "#features",
      label: "Features",
      icon: <Package className="h-4 w-4" />,
    },
    {
      href: "#benefits",
      label: "Benefits",
      icon: <Users className="h-4 w-4" />,
    },
    {
      href: "#how-it-works",
      label: "How It Works",
      icon: <Package className="h-4 w-4" />,
    },
    {
      href: "#why-axoma",
      label: "Why Axoma",
      icon: <Users className="h-4 w-4" />,
    },
  ];

  
  const getDashboardRoute = () => {
    if (!user?.role) return "/dashboard";

    switch (user.role as string) {
      case "admin":
        return "/admin/dashboard";
      case "issuer":
        return "/issuer/dashboard";
      default:
        return "/dashboard";
    }
  };

  const authenticatedNavLinks: NavItem[] = [
    {
      href: getDashboardRoute(),
      label: "Dashboard",
      icon: <Home className="h-4 w-4" />,
    },
  ];

  const navLinks = isAuthenticated ? authenticatedNavLinks : publicNavLinks;

  return (
    <motion.header
      className="border-b bg-white/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-6 py-5 flex items-center justify-between relative">
        {/* LEFT */}
        <div className="flex items-center gap-4 flex-none">
          <button className="md:hidden" onClick={() => setIsOpen(true)}>
            <Menu className="h-6 w-6" />
          </button>

          <motion.h1
            className="text-xl font-bold cursor-pointer"
            onClick={() => router.push("/")}
            whileHover={{ scale: 1.05 }}
          >
            Axoma
          </motion.h1>
        </div>

        {/* CENTER NAV */}
        <nav className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 gap-8 text-md font-semibold text-gray-600">
          {navLinks.map((item, i) => (
            <motion.button
              key={item.label}
              onClick={() => {
                if (item.href.startsWith("#")) {
                  document.querySelector(item.href)?.scrollIntoView({
                    behavior: "smooth",
                  });
                } else {
                  router.push(item.href);
                }
              }}
              className="hover:text-gray-900"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + i * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              {item.label}
            </motion.button>
          ))}
        </nav>

        {/* RIGHT */}
        <div className="hidden md:flex items-center gap-4 flex-none">
          {isAuthenticated ? (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/profile")}
              >
                <User className="mr-2 h-4 w-4" /> Profile
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="text-destructive"
              >
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
            </>
          ) : (
            <Button
              size="sm"
              variant="outline"
              onClick={() => router.push("/login")}
            >
              Sign In
            </Button>
          )}
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <motion.aside
          initial={{ x: -200 }}
          animate={{ x: 0 }}
          exit={{ x: -200 }}
          transition={{ duration: 0.4 }}
          className="fixed top-0 left-0 h-screen w-full bg-background z-50 md:hidden flex flex-col"
        >
          <div className="flex items-center justify-between h-16 border-b px-4">
            <h1 className="text-lg font-bold">Axoma</h1>
            <Button size="icon" onClick={() => setIsOpen(false)}>
              <X />
            </Button>
          </div>

          <ScrollArea className="flex-1">
            <nav className="flex flex-col p-2 space-y-2">
              {navLinks.map((link, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setIsOpen(false);

                    if (link.href.startsWith("#")) {
                      document.querySelector(link.href)?.scrollIntoView({
                        behavior: "smooth",
                      });
                    } else {
                      router.push(link.href);
                    }
                  }}
                  className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-accent"
                >
                  {link.icon}
                  <span className="text-sm font-medium">{link.label}</span>
                </button>
              ))}
            </nav>
          </ScrollArea>

          <div className="p-4 border-t space-y-2">
            {isAuthenticated ? (
              <>
                <Button
                  onClick={() => {
                    router.push("/profile");
                    setIsOpen(false);
                  }}
                  className="w-full"
                >
                  Profile
                </Button>

                <Button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  variant="destructive"
                  className="w-full"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                onClick={() => {
                  router.push("/login");
                  setIsOpen(false);
                }}
                className="w-full"
              >
                Sign In
              </Button>
            )}
          </div>
        </motion.aside>
      )}
    </motion.header>
  );
}
