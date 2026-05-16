"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/app/components/Sidebar";
import { ThemeToggle } from "@/app/components/ThemeToggle";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const isPublicPage = ["/", "/login", "/register", "/signup", "/onboarding"].includes(pathname);

  if (isPublicPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-app-shell transition-colors duration-500 lg:flex">
      <Sidebar />
      <div className="fixed right-3 top-3 z-40 lg:hidden">
        <ThemeToggle />
      </div>
      <main className="min-w-0 flex-1 px-3 py-4 pb-24 transition-all duration-500 sm:px-5 lg:ml-60 lg:p-6">
        <div className="max-w-[1720px] mx-auto animate-fade-in pb-10">
          {children}
        </div>
      </main>
    </div>
  );
}
