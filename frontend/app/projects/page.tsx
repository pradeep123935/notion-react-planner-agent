"use client";

import React from "react";
import {
  AlertTriangle,
  BarChart3,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Code2,
  Filter,
  Grid2X2,
  List,
  MoreVertical,
  Plus,
  Rocket,
  Search,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";

const stats = [
  { label: "Total Projects", value: "12", sub: "Across all goals", icon: Target, color: "#94A3B8" },
  { label: "On Track", value: "7", sub: "58% of projects", icon: Check, color: "#22C55E" },
  { label: "At Risk", value: "3", sub: "25% of projects", icon: AlertTriangle, color: "#F97316" },
  { label: "Completed", value: "2", sub: "17% of projects", icon: CheckCircle2, color: "#7C3AED" },
];

const projects = [
  { title: "DSA Preparation", goal: "Crack top product based company", icon: Code2, progress: 72, tasks: "16 / 22", deadline: "Dec 31, 2024", status: "On Track", color: "#7C3AED" },
  { title: "System Design", goal: "Crack top product based company", icon: BriefcaseBusiness, progress: 55, tasks: "11 / 20", deadline: "Jan 15, 2025", status: "At Risk", color: "#3B82F6" },
  { title: "Backend Development", goal: "Build a SaaS product", icon: Rocket, progress: 65, tasks: "13 / 20", deadline: "Aug 20, 2024", status: "On Track", color: "#22C55E" },
  { title: "Mock Interviews", goal: "Crack top product based company", icon: BriefcaseBusiness, progress: 40, tasks: "4 / 10", deadline: "May 30, 2024", status: "At Risk", color: "#F97316" },
  { title: "Resume Building", goal: "Crack top product based company", icon: Trophy, progress: 80, tasks: "8 / 10", deadline: "May 25, 2024", status: "On Track", color: "#F59E0B" },
  { title: "Frontend Development", goal: "Build a SaaS product", icon: BookOpen, progress: 20, tasks: "2 / 10", deadline: "Sep 10, 2024", status: "Behind", color: "#F43F5E" },
];

const deadlines = [
  { title: "System Design", date: "Jan 15, 2025", left: "59 days left", icon: BriefcaseBusiness, color: "#7C3AED" },
  { title: "Backend Development", date: "Aug 20, 2024", left: "35 days left", icon: Rocket, color: "#22C55E" },
  { title: "Frontend Development", date: "Sep 10, 2024", left: "56 days left", icon: BookOpen, color: "#F43F5E" },
];

const goalWise = [
  { label: "Crack top product based company", value: "5 / 6", width: 83, color: "#7C3AED" },
  { label: "Build a SaaS product", value: "3 / 4", width: 75, color: "#3B82F6" },
  { label: "Personal Growth", value: "2 / 2", width: 100, color: "#22C55E" },
  { label: "Health & Fitness", value: "2 / 2", width: 100, color: "#F97316" },
];

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-xl border border-app-border bg-app-panel shadow-[0_16px_50px_rgba(0,0,0,0.22)] ${className}`}>
      {children}
    </section>
  );
}

function StatusBadge({ status }: { status: string }) {
  const classes =
    status === "Behind"
      ? "bg-rose-500/15 text-rose-300"
      : status === "At Risk"
        ? "bg-orange-500/15 text-orange-300"
        : "bg-emerald-500/12 text-emerald-300";

  return <span className={`rounded-md px-3 py-2 text-sm font-semibold ${classes}`}>{status}</span>;
}

export default function ProjectsPage() {
  return (
    <div className="grid min-h-screen min-w-0 gap-4 text-app-primary 2xl:grid-cols-[minmax(0,1fr)_360px] 2xl:gap-6">
      <main className="min-w-0 space-y-6">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
            <p className="mt-1 text-base text-app-muted">Manage all your projects and track their progress</p>
          </div>
          <div className="flex w-full flex-wrap items-center gap-3 lg:w-auto">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-app-subtle" />
              <input
                className="h-11 w-full rounded-lg border border-app-border bg-app-input pl-10 pr-3 text-sm outline-none placeholder:text-[#64748B] focus:border-[#7C3AED]"
                placeholder="Search projects..."
              />
            </div>
            <button className="flex h-11 flex-1 items-center justify-center gap-2 rounded-lg border border-app-border bg-app-input px-4 text-sm text-app-secondary sm:flex-none">
              <Filter className="h-4 w-4" />
              Filter
            </button>
            <button className="flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-[#6D38E8] px-4 text-sm font-semibold shadow-lg shadow-[#7C3AED]/25 sm:flex-none">
              <Plus className="h-4 w-4" />
              New Project
            </button>
          </div>
        </header>

        <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Panel key={stat.label} className="p-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-app-soft" style={{ color: stat.color }}>
                    <Icon className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="text-sm text-app-muted">{stat.label}</p>
                    <p className="mt-1 text-3xl font-semibold leading-none">{stat.value}</p>
                    <p className="mt-2 text-sm text-app-muted">{stat.sub}</p>
                  </div>
                </div>
              </Panel>
            );
          })}
        </section>

        <div className="flex flex-col gap-3 border-b border-app-border lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-6 overflow-x-auto text-sm sm:gap-8">
            <button className="relative py-3 text-app-primary">
              All Projects
              <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-[#7C3AED]" />
            </button>
            <button className="py-3 text-app-muted">By Goal</button>
          </div>
          <div className="flex overflow-x-auto rounded-lg border border-app-border bg-app-elevated p-1 text-sm text-app-muted">
            <button className="flex items-center gap-2 rounded-md bg-app-soft px-3 py-2 text-app-primary"><List className="h-4 w-4" />List</button>
            <button className="flex items-center gap-2 rounded-md px-3 py-2"><Grid2X2 className="h-4 w-4" />Board</button>
            <button className="flex items-center gap-2 rounded-md px-3 py-2"><BarChart3 className="h-4 w-4" />Timeline</button>
          </div>
        </div>

        <section className="space-y-3">
          {projects.map((project) => {
            const Icon = project.icon;
            return (
              <Panel key={project.title} className="grid gap-4 p-5 xl:grid-cols-[64px_minmax(220px,1fr)_minmax(150px,210px)_112px_126px_88px_24px] xl:items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full" style={{ backgroundColor: `${project.color}25`, color: project.color }}>
                  <div className="flex h-11 w-11 items-center justify-center rounded-full" style={{ backgroundColor: project.color }}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="min-w-0">
                  <h2 className="text-lg font-semibold">{project.title}</h2>
                  <p className="mt-2 flex min-w-0 items-center gap-1.5 text-sm text-app-muted">
                    <CalendarDays className="h-4 w-4" />
                    <span className="truncate">Goal: {project.goal}</span>
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-lg font-semibold">{project.progress}%</p>
                  <div className="h-1.5 rounded-full bg-app-soft">
                    <div className="h-full rounded-full" style={{ width: `${project.progress}%`, backgroundColor: project.color }} />
                  </div>
                </div>
                <div className="border-t border-app-border pt-3 xl:border-l xl:border-t-0 xl:pl-5 xl:pt-0">
                  <p className="text-base">{project.tasks}</p>
                  <p className="text-sm text-app-muted">Tasks Completed</p>
                </div>
                <div className="border-t border-app-border pt-3 xl:border-l xl:border-t-0 xl:pl-5 xl:pt-0">
                  <p className="text-base">{project.deadline}</p>
                  <p className="text-sm text-app-muted">Deadline</p>
                </div>
                <StatusBadge status={project.status} />
                <button className="justify-self-start text-app-subtle xl:justify-self-auto"><MoreVertical className="h-5 w-5" /></button>
              </Panel>
            );
          })}
        </section>

        <div className="flex flex-col gap-3 px-1 text-sm text-app-muted sm:flex-row sm:items-center sm:justify-between">
          <p>Showing 1 to 6 of 12 projects</p>
          <div className="flex items-center gap-2">
            <button className="rounded-lg border border-app-border bg-app-elevated p-2 text-[#64748B]"><ChevronLeft className="h-4 w-4" /></button>
            <button className="rounded-lg bg-[#4F3ACD] px-3 py-2 text-white">1</button>
            <button className="rounded-lg border border-app-border bg-app-elevated px-3 py-2 text-app-primary">2</button>
            <button className="rounded-lg border border-app-border bg-app-elevated p-2 text-app-primary"><ChevronRight className="h-4 w-4" /></button>
          </div>
        </div>
      </main>

      <aside className="space-y-4">
        <Panel className="p-5">
          <h2 className="mb-5 text-lg font-semibold">Projects Overview</h2>
          <div className="grid gap-5 sm:grid-cols-[160px_1fr] xl:grid-cols-1 2xl:grid-cols-[160px_1fr]">
            <div className="relative h-40 w-40">
              <svg className="h-40 w-40 -rotate-90" viewBox="0 0 160 160" aria-hidden="true">
                <circle cx="80" cy="80" r="58" fill="none" stroke="#334155" strokeWidth="22" />
                <circle cx="80" cy="80" r="58" fill="none" stroke="#22C55E" strokeWidth="22" strokeDasharray="365" strokeDashoffset="153" />
                <circle cx="80" cy="80" r="58" fill="none" stroke="#F59E0B" strokeWidth="22" strokeDasharray="365" strokeDashoffset="274" className="rotate-[209deg] origin-center" />
                <circle cx="80" cy="80" r="58" fill="none" stroke="#F43F5E" strokeWidth="22" strokeDasharray="365" strokeDashoffset="303" className="rotate-[299deg] origin-center" />
                <circle cx="80" cy="80" r="58" fill="none" stroke="#7C3AED" strokeWidth="22" strokeDasharray="365" strokeDashoffset="303" className="rotate-[360deg] origin-center" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-semibold">12</span>
                <span className="text-xs text-app-muted">Total</span>
                <span className="text-xs text-app-muted">Projects</span>
              </div>
            </div>
            <div className="space-y-4 text-sm">
              {[
                ["On Track", "58%", "#22C55E"],
                ["At Risk", "25%", "#F59E0B"],
                ["Behind", "17%", "#F43F5E"],
                ["Completed", "17%", "#7C3AED"],
              ].map(([label, value, color]) => (
                <div key={label} className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-2 text-app-secondary"><span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />{label}</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </Panel>

        <Panel className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Upcoming Deadlines</h2>
            <button className="text-xs text-[#3B82F6]">View Calendar</button>
          </div>
          <div className="space-y-5">
            {deadlines.map((deadline) => {
              const Icon = deadline.icon;
              return (
                <div key={deadline.title} className="grid grid-cols-[34px_1fr_auto] items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full" style={{ backgroundColor: deadline.color }}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-sm font-medium">{deadline.title}</p>
                  <div className="text-right">
                    <p className="text-xs text-app-secondary">{deadline.date}</p>
                    <p className={`mt-1 text-xs ${deadline.left.startsWith("56") ? "text-rose-300" : "text-orange-300"}`}>{deadline.left}</p>
                  </div>
                </div>
              );
            })}
            <p className="text-sm text-app-subtle">+ 2 more deadlines</p>
          </div>
        </Panel>

        <Panel className="border-[#7C3AED]/25 bg-[#101539]/70 p-5">
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[#A855F7]" />
            <h2 className="text-lg font-semibold">AI Project Insights</h2>
            <span className="rounded-md bg-[#1D2A65] px-2 py-0.5 text-[10px] font-semibold text-blue-200">Beta</span>
          </div>
          <p className="text-sm text-app-muted">Based on your projects, here are some insights:</p>
          <div className="mt-4 space-y-3 text-sm text-app-muted">
            <p className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />You have 3 projects at risk.</p>
            <p className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />Consider prioritizing System Design tasks.</p>
            <p className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />You&apos;re most productive in the morning.</p>
          </div>
          <button className="mt-5 w-full rounded-lg bg-[#6D38E8] py-3 text-sm font-semibold">View Detailed Insights</button>
        </Panel>

        <Panel className="p-5">
          <h2 className="text-lg font-semibold">Goal-wise Projects</h2>
          <div className="mt-5 space-y-5">
            {goalWise.map((item) => (
              <div key={item.label}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span>{item.label}</span>
                  <span>{item.value}</span>
                </div>
                <div className="h-1.5 rounded-full bg-app-border">
                  <div className="h-full rounded-full" style={{ width: `${item.width}%`, backgroundColor: item.color }} />
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </aside>
    </div>
  );
}
