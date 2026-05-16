"use client";

import React from "react";
import {
  BookOpen,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Droplet,
  Dumbbell,
  Flame,
  Lightbulb,
  MoreHorizontal,
  PenLine,
  Plus,
  Search,
  Sparkles,
  Target,
} from "lucide-react";

const stats = [
  { label: "Total Habits", value: "12", sub: "Active habits", icon: CheckCircle2, color: "#7C3AED", line: "M4 30 C18 20, 22 28, 36 24 S54 38, 66 28 S84 34, 100 24 S116 30, 132 16" },
  { label: "Completion Rate", value: "78%", sub: "+12% vs last week", icon: CalendarDays, color: "#3B82F6", line: "M4 38 C18 18, 28 22, 38 34 S56 12, 76 28 S92 20, 112 28 S124 18, 136 24" },
  { label: "Current Streak", value: "12 days", sub: "Best: 28 days", icon: Flame, color: "#22C55E", line: "M4 34 C18 24, 26 28, 36 34 S56 18, 70 30 S86 20, 100 34 S118 24, 136 18" },
  { label: "Total Completions", value: "156", sub: "This month", icon: Target, color: "#F59E0B", line: "M4 36 C18 36, 24 26, 38 36 S56 18, 72 32 S88 24, 102 34 S118 18, 136 28" },
];

const habits = [
  { title: "Morning Meditation", sub: "10 minutes daily", streak: "12 days", progress: 85, icon: Sparkles, color: "#7C3AED" },
  { title: "Read Books", sub: "20 pages daily", streak: "7 days", progress: 70, icon: BookOpen, color: "#3B82F6" },
  { title: "Workout", sub: "45 minutes daily", streak: "15 days", progress: 92, icon: Dumbbell, color: "#22C55E" },
  { title: "Drink Water", sub: "8 glasses daily", streak: "9 days", progress: 60, icon: Droplet, color: "#14B8A6" },
  { title: "Learn Something New", sub: "30 minutes daily", streak: "5 days", progress: 40, icon: Lightbulb, color: "#F59E0B" },
  { title: "Journaling", sub: "5 minutes daily", streak: "6 days", progress: 50, icon: PenLine, color: "#EC4899" },
];

const today = [
  { title: "Morning Meditation", sub: "10 minutes daily", done: true, time: "7:15 AM", icon: Sparkles, color: "#7C3AED" },
  { title: "Workout", sub: "45 minutes daily", done: false, time: "Mark Done", icon: Dumbbell, color: "#22C55E" },
  { title: "Read Books", sub: "20 pages daily", done: true, time: "9:30 AM", icon: BookOpen, color: "#3B82F6" },
];

const achievements = [
  { title: "Consistency Master", sub: "7 days streak", color: "#F59E0B" },
  { title: "Habit Builder", sub: "Add 5 habits", color: "#06B6D4" },
  { title: "Unstoppable", sub: "10 days streak", color: "#F43F5E" },
];

const heatmap = Array.from({ length: 7 }, (_, row) =>
  Array.from({ length: 30 }, (_, col) => ((row * 7 + col * 11) % 5) + 1)
);

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-xl border border-app-border bg-app-panel shadow-[0_16px_50px_rgba(0,0,0,0.22)] ${className}`}>
      {children}
    </section>
  );
}

function HeaderButton({ children }: { children: React.ReactNode }) {
  return <button className="flex h-9 items-center gap-2 rounded-lg border border-app-border bg-app-elevated px-3 text-sm text-app-secondary">{children}</button>;
}

export default function HabitsPage() {
  return (
    <div className="min-h-screen min-w-0 space-y-5 text-app-primary">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Habits</h1>
          <p className="mt-1 text-base text-app-muted">Build consistency. Create lasting change.</p>
        </div>
        <div className="flex w-full flex-wrap items-center gap-3 lg:w-auto lg:gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-app-subtle" />
            <input className="h-11 w-full rounded-full border border-app-border bg-app-input pl-10 pr-12 text-sm outline-none placeholder:text-[#64748B] focus:border-[#7C3AED]" placeholder="Search habits..." />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md bg-app-soft px-2 py-1 text-xs text-app-muted">⌘ K</span>
          </div>
          <button className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#6D38E8] px-5 text-sm font-semibold shadow-lg shadow-[#7C3AED]/25 sm:w-auto">
            <Plus className="h-4 w-4" />
            New Habit
          </button>
        </div>
      </header>

      <div className="flex overflow-x-auto rounded-lg border border-app-border bg-app-elevated text-sm text-app-muted sm:inline-flex">
        {["Overview", "All Habits", "Streaks", "Insights"].map((tab, index) => (
          <button key={tab} className={`min-w-32 border-r border-app-border px-5 py-3 last:border-r-0 sm:min-w-36 sm:px-8 ${index === 0 ? "bg-[#31205F] text-white shadow-[inset_0_-2px_0_#7C3AED]" : ""}`}>
            {tab}
          </button>
        ))}
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Panel key={stat.label} className="p-5">
              <div className="flex items-center gap-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl" style={{ backgroundColor: stat.color, color: "#fff" }}>
                  <Icon className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-sm text-app-muted">{stat.label}</p>
                  <p className="mt-1 text-3xl font-semibold">{stat.value}</p>
                  <p className={`mt-2 text-sm ${stat.sub.startsWith("+") ? "text-emerald-400" : "text-app-muted"}`}>{stat.sub}</p>
                </div>
              </div>
              <svg className="mt-5 h-10 w-full" viewBox="0 0 140 48" aria-hidden="true">
                <path d={stat.line} fill="none" stroke={stat.color} strokeWidth="3" strokeLinecap="round" />
              </svg>
            </Panel>
          );
        })}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1fr_1fr]">
        <Panel className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold">Habit List</h2>
            <div className="hidden gap-1 lg:flex">
              {["All", "Active", "Paused", "Completed"].map((filter, index) => (
                <button key={filter} className={`rounded-md border border-app-border px-3 py-1.5 text-xs ${index === 1 ? "bg-[#4F3ACD] text-white" : "text-app-muted"}`}>{filter}</button>
              ))}
              <MoreHorizontal className="h-5 w-5 text-app-subtle" />
            </div>
          </div>
          <div className="divide-y divide-white/10 overflow-x-auto">
            {habits.map((habit) => {
              const Icon = habit.icon;
              return (
                <div key={habit.title} className="grid min-w-[680px] grid-cols-[42px_1fr_90px_54px_120px_24px] items-center gap-3 py-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: habit.color }}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">{habit.title}</p>
                    <p className="text-sm text-app-muted">{habit.sub}</p>
                  </div>
                  <p className="text-sm text-app-muted">🔥 {habit.streak}</p>
                  <p>{habit.progress}%</p>
                  <div className="h-1.5 rounded-full bg-app-border">
                    <div className="h-full rounded-full" style={{ width: `${habit.progress}%`, backgroundColor: habit.color }} />
                  </div>
                  <MoreHorizontal className="h-5 w-5 text-app-subtle" />
                </div>
              );
            })}
          </div>
          <button className="mt-4 flex w-full justify-center gap-2 text-sm text-[#A78BFA]">View All Habits <span>→</span></button>
        </Panel>

        <Panel className="p-5">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-semibold">Habit Calendar</h2>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <span className="text-xs text-app-muted">Less</span>
              <div className="flex gap-1">{["#1E1B4B", "#312E81", "#4C1D95", "#6D38E8", "#A78BFA"].map((c) => <span key={c} className="h-3 w-3 rounded-sm" style={{ backgroundColor: c }} />)}</div>
              <span className="text-xs text-app-muted">More</span>
              <HeaderButton>May 2025 <ChevronDown className="h-4 w-4" /></HeaderButton>
              <ChevronLeft className="h-4 w-4 text-app-muted" />
              <ChevronRight className="h-4 w-4 text-app-muted" />
            </div>
          </div>
          <div className="overflow-x-auto">
          <div className="grid min-w-[720px] grid-cols-[44px_1fr] gap-3">
            <div className="grid grid-rows-7 gap-1 text-xs text-app-subtle">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => <span key={day} className="flex h-3.5 items-center">{day}</span>)}
            </div>
            <div className="grid grid-cols-30 gap-1">
              {heatmap.flat().map((value, index) => (
                <span key={index} className="h-3.5 rounded-sm" style={{ backgroundColor: ["#111827", "#1E1B4B", "#312E81", "#4C1D95", "#6D38E8", "#8B5CF6"][value] }} />
              ))}
            </div>
          </div>
          </div>
          <div className="mt-3 flex flex-col gap-2 text-sm text-app-muted sm:flex-row sm:items-center sm:justify-between">
            <span>Consistency is the key to mastery.</span>
            <button className="text-[#A78BFA]">View Full Calendar →</button>
          </div>
        </Panel>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.85fr_0.9fr_0.65fr_0.65fr]">
        <Panel className="p-5">
          <h2 className="mb-5 font-semibold">Today&apos;s Habits</h2>
          <div className="space-y-4">
            {today.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="grid grid-cols-[42px_1fr_auto] items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: item.color }}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-app-muted">{item.sub}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full border ${item.done ? "border-[#7C3AED] text-[#A78BFA]" : "border-[#334155]"}`}>
                      {item.done && <Check className="h-5 w-5" />}
                    </span>
                    <p className={`mt-1 text-sm ${item.done ? "text-app-muted" : "text-[#A78BFA]"}`}>{item.done ? "Completed" : item.time}</p>
                    {item.done && <p className="text-xs text-app-subtle">{item.time}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </Panel>

        <Panel className="p-5">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-semibold">Weekly Progress</h2>
            <HeaderButton>This Week <ChevronDown className="h-4 w-4" /></HeaderButton>
          </div>
          <div className="relative h-44">
            <div className="absolute inset-y-0 left-0 flex flex-col justify-between text-xs text-app-subtle">
              {["100%", "75%", "50%", "25%", "0%"].map((n) => <span key={n}>{n}</span>)}
            </div>
            <svg className="ml-10 h-full w-[calc(100%-2.5rem)]" viewBox="0 0 420 170" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0 126 L70 86 L140 112 L210 50 L280 108 L350 142 L420 124" fill="none" stroke="#7C3AED" strokeWidth="4" />
              <path d="M0 126 L70 86 L140 112 L210 50 L280 108 L350 142 L420 124 L420 170 L0 170 Z" fill="#7C3AED" opacity="0.16" />
            </svg>
            <div className="ml-10 mt-2 flex justify-between text-xs text-app-subtle">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => <span key={day}>{day}</span>)}
            </div>
          </div>
        </Panel>

        <Panel className="p-5">
          <h2 className="mb-5 font-semibold">Top Streaks</h2>
          <div className="space-y-3 text-sm">
            {["Workout|15 days", "Morning Meditation|12 days", "Drink Water|9 days", "Read Books|7 days"].map((row) => {
              const [name, value] = row.split("|");
              return <p key={name} className="flex justify-between"><span>{name}</span><span className="text-app-muted">{value}</span></p>;
            })}
          </div>
          <button className="mt-5 w-full text-sm text-[#A78BFA]">View all streaks →</button>
        </Panel>

        <Panel className="p-5">
          <h2 className="mb-5 font-semibold">Completion Rate</h2>
          <div className="flex items-center gap-5">
            <div className="relative h-24 w-24 sm:h-28 sm:w-28">
              <svg className="h-24 w-24 -rotate-90 sm:h-28 sm:w-28" viewBox="0 0 112 112" aria-hidden="true">
                <circle cx="56" cy="56" r="39" fill="none" stroke="#334155" strokeWidth="12" />
                <circle cx="56" cy="56" r="39" fill="none" stroke="#7C3AED" strokeWidth="12" strokeDasharray="245" strokeDashoffset="54" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center"><span className="text-2xl font-semibold">78%</span><span className="text-xs text-app-muted">This Week</span></div>
            </div>
            <div className="space-y-3 text-sm">
              <p className="flex gap-2"><span className="h-2.5 w-2.5 rounded-full bg-[#7C3AED]" />Completed 78%</p>
              <p className="flex gap-2"><span className="h-2.5 w-2.5 rounded-full bg-[#EC4899]" />Missed 22%</p>
            </div>
          </div>
          <button className="mt-5 w-full text-sm text-[#A78BFA]">View full analytics →</button>
        </Panel>
      </section>

      <Panel className="p-5">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-semibold">Achievements</h2>
          <button className="rounded-lg border border-app-border px-3 py-1 text-sm text-app-muted">View All</button>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {achievements.map((item) => (
            <div key={item.title} className="flex items-center gap-4 rounded-lg bg-app-soft p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ backgroundColor: `${item.color}22`, color: item.color }}>
                <Target className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-app-muted">{item.sub}</p>
              </div>
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
