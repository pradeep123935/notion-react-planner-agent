"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  BarChart3,
  Bot,
  Brain,
  CalendarDays,
  FolderKanban,
  Goal,
  LayoutDashboard,
  ListTodo,
  LogOut,
  NotebookTabs,
  Rocket,
  Settings,
  Sparkles,
  Sprout,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/app/components/ThemeToggle";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Goals", href: "/goals", icon: Goal },
  { name: "Projects", href: "/projects", icon: FolderKanban },
  { name: "Tasks", href: "/tasks", icon: ListTodo },
  { name: "Calendar", href: "/calendar", icon: CalendarDays },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Focus Mode", href: "/focus-mode", icon: Brain },
  { name: "AI Assistant", href: "/ai-assistant", icon: Bot },
  { name: "Habits", href: "/habits", icon: Sprout },
  { name: "Notes", href: "/notes", icon: NotebookTabs },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const mobileItems = navItems.slice(0, 5);
  const displayName = session?.user?.name ?? "FlowPlan User";
  const displayEmail = session?.user?.email ?? "Signed in";
  const initials = displayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <>
    <aside className="fixed bottom-0 left-0 right-0 z-50 border-t border-app-border bg-app-panel/95 px-2 py-2 shadow-[0_-18px_50px_rgba(0,0,0,0.18)] backdrop-blur lg:hidden">
      <nav className="grid grid-cols-5 gap-1">
        {mobileItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link key={item.href} href={item.href} className="group">
              <div className={cn(
                "flex min-h-14 flex-col items-center justify-center gap-1 rounded-lg px-1 text-[10px] font-semibold transition",
                isActive ? "bg-[#4F3ACD] text-white" : "text-app-subtle hover:bg-app-soft hover:text-app-primary"
              )}>
                <Icon className="h-5 w-5" />
                <span className="max-w-full truncate">{item.name}</span>
              </div>
            </Link>
          );
        })}
      </nav>
    </aside>

    <aside className="fixed bottom-0 left-0 top-0 z-50 hidden w-60 flex-col overflow-hidden border-r border-app-border bg-app-panel p-3 shadow-[18px_0_50px_rgba(0,0,0,0.16)] lg:flex">
      <div className="flex items-center justify-between px-1.5 pb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#7C3AED]/15 text-[#A855F7] shadow-lg shadow-[#7C3AED]/20">
            <Rocket className="h-6 w-6 fill-current" />
          </div>
          <div className="hidden lg:block">
            <span className="block text-lg font-semibold leading-tight tracking-tight text-app-primary">FlowPlan</span>
            <span className="text-xs font-medium text-app-subtle">AI Productivity Planner</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className="block group"
            >
              <div className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200 relative overflow-hidden",
                isActive 
                  ? "bg-[#4F3ACD] text-white shadow-lg shadow-[#4F3ACD]/20" 
                  : "text-app-subtle hover:bg-app-soft hover:text-app-primary"
              )}>
                <Icon className={cn("h-5 w-5 transition-colors", isActive ? "text-white" : "text-app-subtle group-hover:text-app-primary")} />
                <span className="hidden lg:block text-sm font-medium whitespace-nowrap">{item.name}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="mt-3 hidden rounded-lg border border-app-border bg-app-elevated p-3 lg:block">
        <div className="mb-2 flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#111A36] text-[#A855F7]">
            <Sparkles className="h-3.5 w-3.5" />
          </span>
          <p className="text-sm font-semibold text-app-primary">Focus Timer</p>
        </div>
        <div className="flex justify-center">
          <div className="relative h-28 w-28 shrink-0">
            <svg className="h-28 w-28 -rotate-90" viewBox="0 0 120 120" aria-hidden="true">
              <circle
                cx="60"
                cy="60"
                r="49"
                fill="none"
                stroke="currentColor"
                strokeWidth="9"
                className="text-[#26344f]"
              />
              <circle
                cx="60"
                cy="60"
                r="49"
                fill="none"
                stroke="currentColor"
                strokeWidth="9"
                strokeDasharray="308"
                strokeDashoffset="92"
                strokeLinecap="round"
                className="text-[#7C3AED]"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-semibold leading-none text-app-primary">25:00</span>
              <span className="mt-1 text-[10px] font-medium text-app-subtle">Deep Work</span>
            </div>
          </div>
        </div>

        <button className="mt-3 w-full rounded-md bg-[#6D38E8] px-3 py-2 text-xs font-semibold text-white shadow-md shadow-[#7C3AED]/20 transition hover:bg-[#7C3AED]">
          Start Focus
        </button>

        <div className="mt-3">
          <p className="text-xs font-medium text-app-subtle">Today&apos;s Focus</p>
          <p className="mt-1 text-base font-medium text-app-primary">2h 15m</p>
        </div>

        <svg className="mt-1 h-9 w-full text-[#7C3AED]" viewBox="0 0 180 48" aria-hidden="true">
          <path
            d="M4 38 C24 24, 34 30, 48 20 S78 8, 92 18 S118 42, 136 24 S162 10, 176 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M4 38 C24 24, 34 30, 48 20 S78 8, 92 18 S118 42, 136 24 S162 10, 176 16 L176 48 L4 48 Z"
            fill="currentColor"
            className="opacity-10"
          />
        </svg>
      </div>

      <div className="mt-3 flex items-center gap-3 border-t border-app-border px-2 pt-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#E0F2FE] to-[#7DD3FC] text-sm font-bold text-[#0F172A]">
          {initials}
        </div>
        <div className="hidden min-w-0 lg:block">
          <p className="truncate text-sm font-semibold text-app-primary">{displayName}</p>
          <p className="truncate text-[11px] font-medium text-app-subtle">{displayEmail}</p>
        </div>
        <div className="ml-auto hidden lg:block">
          <ThemeToggle />
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="hidden rounded-lg p-2 text-app-subtle transition hover:bg-app-soft hover:text-app-primary lg:block"
          aria-label="Log out"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </aside>
    </>
  );
}
