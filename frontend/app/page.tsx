"use client";

import React from "react";
import Link from "next/link";
import {
  AlertTriangle,
  BarChart3,
  Bell,
  BookOpen,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Flame,
  Grid2X2,
  List,
  Plus,
  Rocket,
  Search,
  Send,
  Sparkles,
  Star,
  Target,
  Timer,
  Trophy,
  Zap,
} from "lucide-react";
import { ThemeToggle } from "@/app/components/ThemeToggle";

const metricCards = [
  { label: "Goals Progress", value: "68%", sub: "Overall Progress", icon: Target, color: "#A855F7", bars: [42, 56, 70, 64, 82, 76, 68] },
  { label: "Tasks Completed", value: "18 / 25", sub: "Today", icon: Check, color: "#22C55E", bars: [18, 28, 38, 34, 48, 62, 44, 36, 55, 70, 48, 64] },
  { label: "Focus Time", value: "4h 32m", sub: "Today", icon: Clock3, color: "#3B82F6", bars: [22, 38, 28, 54, 36, 72, 42, 30, 46, 68, 34, 58] },
  { label: "Current Streak", value: "12 days", sub: "Keep it up", icon: Flame, color: "#F97316", bars: [] },
];

const goals = [
  { icon: Target, title: "Crack top product based company", value: 68, target: "Dec 31, 2024", color: "#A855F7" },
  { icon: Rocket, title: "Build a SaaS product", value: 45, target: "Aug 15, 2024", color: "#22C55E" },
  { icon: BookOpen, title: "Read 24 books this year", value: 33, target: "Dec 31, 2024", color: "#FACC15" },
  { icon: Trophy, title: "Get in best physical shape", value: 52, target: "Oct 31, 2024", color: "#FB7185" },
];

const projects = [
  { title: "DSA Preparation", value: 72, tasks: "19 / 27", priority: "High", color: "#A855F7" },
  { title: "System Design", value: 55, tasks: "8 / 14", priority: "High", color: "#3B82F6" },
  { title: "Backend Development", value: 65, tasks: "12 / 18", priority: "Medium", color: "#22C55E" },
  { title: "Mock Interviews", value: 40, tasks: "4 / 10", priority: "Medium", color: "#FB923C" },
];

const schedule = [
  { time: "09:00 AM", title: "System Design: Caching", type: "Deep Work", length: "90m", color: "#8B5CF6" },
  { time: "10:45 AM", title: "Break", type: "", length: "15m", color: "#64748B" },
  { time: "11:00 AM", title: "Solve 2 Graph Problems", type: "Deep Work", length: "90m", color: "#6366F1" },
  { time: "01:00 PM", title: "Lunch", type: "", length: "60m", color: "#2563EB" },
  { time: "02:00 PM", title: "Backend Project", type: "Deep Work", length: "120m", color: "#22C55E" },
  { time: "04:15 PM", title: "Review & Notes", type: "Review", length: "45m", color: "#F43F5E" },
];

const tasks = [
  { title: "Read about Rate Limiting", project: "System Design", priority: "High", date: "Today" },
  { title: "Implement JWT Auth", project: "Backend Development", priority: "Medium", date: "Today" },
  { title: "Solve DP Questions", project: "DSA Preparation", priority: "High", date: "Tomorrow" },
  { title: "Design Parking Lot", project: "System Design", priority: "Medium", date: "Tomorrow" },
  { title: "Mock Interview - Round 1", project: "Mock Interviews", priority: "Low", date: "May 22" },
];

const overview = [
  { label: "Completion Rate", value: "72%", trend: "+12%", color: "#A855F7", line: "M4 38 C22 36, 24 16, 44 18 S66 42, 82 22 S104 38, 122 12" },
  { label: "Focus Time", value: "14h 25m", trend: "+18%", color: "#3B82F6", line: "M4 40 C18 42, 28 14, 46 20 S62 42, 76 18 S98 28, 122 10" },
  { label: "Tasks Completed", value: "87", trend: "+9%", color: "#22C55E", line: "M4 42 C18 40, 22 18, 38 28 S54 16, 70 20 S88 2, 122 16" },
  { label: "Avg. Task Delay", value: "1.2 days", trend: "-8%", color: "#EC4899", line: "M4 8 C20 40, 38 44, 54 22 S74 22, 88 34 S108 48, 122 32" },
];

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-xl border border-app-border bg-app-panel shadow-[0_16px_50px_rgba(0,0,0,0.22)] ${className}`}>
      {children}
    </section>
  );
}

function PriorityBadge({ priority }: { priority: string }) {
  const styles = priority === "High"
    ? "bg-rose-500/15 text-rose-300"
    : priority === "Medium"
      ? "bg-orange-500/15 text-orange-300"
      : "bg-emerald-500/15 text-emerald-300";
  return <span className={`rounded-md px-2.5 py-1 text-xs font-semibold ${styles}`}>{priority}</span>;
}

function LandingPage() {
  const features = [
    { title: "Goals & Planning", text: "Set meaningful goals and turn them into steps.", icon: Target },
    { title: "AI-Powered Planning", text: "Prioritize tasks and stay on track.", icon: Sparkles },
    { title: "Smart Tasks", text: "Organize priorities, due dates, and reminders.", icon: List },
    { title: "Focus Mode", text: "Block distractions with deep work sessions.", icon: Timer },
    { title: "Habits Tracking", text: "Build better habits with daily streaks.", icon: Flame },
    { title: "Analytics", text: "Track progress and improve every week.", icon: BarChart3 },
  ];
  const steps = [
    { title: "Create Your Goals", text: "Start with what you want to achieve and define clear outcomes.", icon: Target },
    { title: "Add Projects", text: "Break each goal into projects that move you closer step by step.", icon: Rocket },
    { title: "Plan Daily Tasks", text: "Turn projects into focused daily tasks with priorities and due dates.", icon: Check },
    { title: "Get AI Feedback", text: "Review progress, spot delays, and get suggestions to improve your plan.", icon: Sparkles },
  ];

  return (
    <div className="min-h-screen bg-app-shell p-3 text-app-primary sm:p-5">
      <div className="overflow-hidden rounded-2xl bg-app-panel shadow-[0_24px_90px_rgba(72,56,160,0.12)]">
        <header className="mx-auto flex max-w-[1380px] flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-10">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F1EDFF] text-[#5B35E5] sm:h-9 sm:w-9">
              <Rocket className="h-4 w-4 fill-current sm:h-5 sm:w-5" />
            </span>
            <span className="text-lg font-extrabold tracking-tight">FlowPlan</span>
          </Link>

          <nav className="hidden items-center gap-10 text-xs font-bold text-app-primary md:flex">
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#about">About</a>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/signup" className="inline-flex h-10 items-center justify-center rounded-md bg-[#5838E8] px-4 text-xs font-bold text-white shadow-[0_12px_28px_rgba(88,56,232,0.28)] sm:px-5">
              Get Started
            </Link>
          </div>
        </header>

        <main>
          <section className="mx-auto max-w-[1380px] px-4 pb-12 pt-10 text-center sm:px-6 lg:px-10 lg:pb-14 lg:pt-16">
            <div className="mx-auto max-w-3xl">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full bg-[#F1EDFF] px-4 py-2 text-[11px] font-extrabold uppercase tracking-wide text-[#5838E8]">
                AI-powered productivity planner
                <Sparkles className="h-3.5 w-3.5" />
              </div>
              <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl [overflow-wrap:anywhere]">
                Plan better.
                <span className="block text-[#5838E8]">Achieve more.</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-app-muted">
                FlowPlan helps you turn your goals into action with AI-powered planning, smart tasks, and deep focus.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link href="/signup" className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#5838E8] px-5 text-sm font-bold text-white shadow-[0_14px_30px_rgba(88,56,232,0.28)] sm:w-auto">
                  Get Started
                  <ArrowRightIcon />
                </Link>
                <Link href="#how-it-works" className="inline-flex h-11 w-full items-center justify-center gap-3 rounded-md border border-[#7C64F2] bg-app-panel px-5 text-sm font-bold text-[#5838E8] sm:w-auto">
                  <span className="h-0 w-0 border-y-[5px] border-l-[8px] border-y-transparent border-l-[#5838E8]" />
                  See How It Works
                </Link>
              </div>
              <div className="mx-auto mt-10 grid max-w-3xl gap-4 text-left sm:grid-cols-3 sm:gap-5">
                {[
                  ["Simple Setup", "All core planning tools in one place."],
                  ["Private & Secure", "Your data is yours. Always."],
                  ["Built to Help You", "Simple, fast, and distraction-light."],
                ].map(([title, text], index) => (
                  <div key={title} className="flex gap-3">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#5838E8] text-[#5838E8]">
                      {index === 0 ? <Check className="h-3.5 w-3.5" /> : index === 1 ? <LockMini /> : <Zap className="h-3.5 w-3.5" />}
                    </span>
                    <span>
                      <span className="block text-xs font-extrabold">{title}</span>
                      <span className="mt-1 block text-xs leading-5 text-app-muted">{text}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="features" className="mx-auto max-w-[1380px] px-4 pb-12 text-center sm:px-6 lg:px-10">
            <p className="text-xs font-extrabold uppercase tracking-wide text-[#5838E8]">Features you&apos;ll love</p>
            <h2 className="mt-2 text-xl font-extrabold">Everything you need to stay productive</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="rounded-lg border border-app-border bg-app-panel p-5 shadow-sm sm:p-6">
                    <Icon className="mx-auto h-9 w-9 text-[#5838E8]" />
                    <h3 className="mt-5 text-xs font-extrabold">{feature.title}</h3>
                    <p className="mt-3 text-xs leading-5 text-app-muted">{feature.text}</p>
                  </div>
                );
              })}
            </div>
          </section>

          <section id="how-it-works" className="mx-auto max-w-[1380px] px-4 pb-10 text-center sm:px-6 lg:px-10">
            <p className="text-xs font-extrabold uppercase tracking-wide text-[#5838E8]">How it works</p>
            <h2 className="mt-2 text-xl font-extrabold">From goals to daily progress</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.title} className="relative rounded-lg border border-app-border bg-app-panel p-5 text-left shadow-sm sm:p-6">
                    <span className="absolute -top-3 right-6 flex h-7 w-7 items-center justify-center rounded-full bg-[#5838E8] text-xs font-extrabold text-white">{index + 1}</span>
                    <Icon className="h-9 w-9 text-[#5838E8]" />
                    <h3 className="mt-5 text-xs font-extrabold">{step.title}</h3>
                    <p className="mt-2 text-xs leading-5 text-app-muted">{step.text}</p>
                  </div>
                );
              })}
            </div>
          </section>
        </main>

        <footer id="about" className="bg-[#211987] px-4 py-8 text-white sm:px-6 lg:px-10">
          <div className="mx-auto grid max-w-[1380px] gap-8 md:grid-cols-[1.5fr_1fr_1fr]">
            <div>
              <div className="flex items-center gap-2 text-xl font-extrabold">
                <Rocket className="h-5 w-5 fill-white" />
                FlowPlan
              </div>
              <p className="mt-3 max-w-xs text-sm leading-6 text-white/75">Productivity made simple. Progress made real.</p>
            </div>
            <div>
              <p className="font-bold">Focused Planning</p>
              <p className="mt-2 text-sm leading-6 text-white/75">Goals, tasks, habits, and focus in one place.</p>
            </div>
            <div className="flex flex-wrap items-start gap-5 text-sm font-bold text-white/85 md:justify-end">
              <Link href="/login">Privacy</Link>
              <Link href="/login">Terms</Link>
              <Link href="/login">Contact</Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

function LockMini() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M6 8V6.5C6 4.3 7.8 2.5 10 2.5C12.2 2.5 14 4.3 14 6.5V8M5 8H15V16.5H5V8Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 10H16M11 5L16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function DashboardPage() {
  return (
    <div className="grid min-h-screen min-w-0 gap-4 text-app-primary xl:grid-cols-[minmax(0,1fr)_320px] xl:gap-6">
      <main className="min-w-0 space-y-4">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Good morning, Arjun!</h1>
            <p className="mt-1 text-sm text-app-subtle">Let&apos;s make today productive.</p>
          </div>
          <div className="flex w-full flex-wrap items-center gap-3 sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-app-subtle" />
              <input className="h-10 w-full rounded-lg border border-app-border bg-app-elevated pl-9 pr-3 text-sm outline-none placeholder:text-[#64748B] focus:border-[#7C3AED]" placeholder="Search everything" />
            </div>
            <button className="flex h-10 flex-1 items-center justify-center gap-2 rounded-lg border border-app-border bg-app-elevated px-4 text-sm text-app-secondary sm:flex-none">
              <CalendarDays className="h-4 w-4" />
              May 20, 2024
              <ChevronDown className="h-4 w-4 text-app-subtle" />
            </button>
            <button className="flex h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-[#6D38E8] px-4 text-sm font-semibold shadow-lg shadow-[#7C3AED]/25 sm:flex-none">
              <Plus className="h-4 w-4" />
              Add
            </button>
          </div>
        </header>

        <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {metricCards.map((card) => {
            const Icon = card.icon;
            return (
              <Panel key={card.label} className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full" style={{ backgroundColor: `${card.color}22`, color: card.color }}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-app-muted">{card.label}</p>
                    <p className="mt-1 text-2xl font-semibold">{card.value}</p>
                    <p className="text-xs text-app-muted">{card.sub}</p>
                  </div>
                </div>
                {card.bars.length > 0 ? (
                  <div className="mt-3 flex h-8 items-end gap-1 pl-14">
                    {card.bars.map((height, index) => (
                      <span key={index} className="w-1.5 rounded-t" style={{ height: `${height}%`, backgroundColor: card.color }} />
                    ))}
                  </div>
                ) : (
                  <div className="mt-4 pl-14 text-xs text-app-subtle">12 day streak</div>
                )}
              </Panel>
            );
          })}
        </section>

        <section className="grid gap-4 lg:grid-cols-[0.95fr_1.35fr]">
          <Panel className="overflow-hidden">
            <div className="flex items-center justify-between border-b border-app-border px-4 py-3">
              <h2 className="font-semibold">Goals</h2>
              <button className="text-xs text-app-muted">View all</button>
            </div>
            <div className="space-y-4 p-4">
              {goals.map((goal) => {
                const Icon = goal.icon;
                return (
                  <div key={goal.title} className="grid grid-cols-[36px_1fr] items-center gap-3 sm:grid-cols-[36px_1fr_auto]">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full text-white" style={{ backgroundColor: goal.color }}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{goal.title}</p>
                      <div className="mt-2 flex items-center gap-3">
                        <div className="h-1.5 flex-1 rounded-full bg-app-soft">
                          <div className="h-full rounded-full" style={{ width: `${goal.value}%`, backgroundColor: goal.color }} />
                        </div>
                        <span className="text-xs text-app-muted">{goal.value}%</span>
                      </div>
                    </div>
                    <span className="col-span-2 text-xs text-app-muted sm:col-span-1">Target: {goal.target}</span>
                  </div>
                );
              })}
            </div>
          </Panel>

          <Panel className="p-3">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex rounded-full bg-app-elevated p-1">
                <button className="rounded-full bg-[#6D38E8] px-4 py-1.5 text-sm font-semibold">Projects</button>
                <button className="rounded-full px-4 py-1.5 text-sm text-app-muted">Tasks</button>
              </div>
              <div className="flex gap-2">
                <button className="rounded-lg bg-app-panel/5 p-2"><Grid2X2 className="h-4 w-4" /></button>
                <button className="rounded-lg bg-app-panel/5 p-2"><List className="h-4 w-4" /></button>
                <button className="rounded-lg border border-app-border p-2"><Plus className="h-4 w-4" /></button>
              </div>
            </div>
            <div className="space-y-2">
              {projects.map((project) => (
                <div key={project.title} className="grid grid-cols-[44px_1fr] items-center gap-3 rounded-lg border border-app-border bg-app-elevated/70 p-3 sm:grid-cols-[44px_1fr_72px_70px]">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full" style={{ backgroundColor: `${project.color}24`, color: project.color }}>
                    <Zap className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{project.title}</p>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="h-1.5 flex-1 rounded-full bg-app-soft">
                        <div className="h-full rounded-full" style={{ width: `${project.value}%`, backgroundColor: project.color }} />
                      </div>
                      <span className="text-xs text-app-muted">{project.value}%</span>
                    </div>
                  </div>
                  <p className="text-sm">{project.tasks}<span className="block text-xs text-app-subtle">Tasks</span></p>
                  <PriorityBadge priority={project.priority} />
                </div>
              ))}
            </div>
          </Panel>
        </section>

        <section className="grid gap-4 lg:grid-cols-[0.9fr_1.25fr]">
          <Panel className="p-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-semibold">Today&apos;s Schedule</h2>
              <button className="text-xs text-app-muted">View calendar</button>
            </div>
            <div className="space-y-3">
              {schedule.map((item) => (
                <div key={`${item.time}-${item.title}`} className="grid grid-cols-[66px_14px_1fr] items-center gap-3 text-sm sm:grid-cols-[74px_14px_1fr_auto]">
                  <span className="text-app-secondary">{item.time}</span>
                  <span className="h-2.5 w-2.5 rounded-full ring-4 ring-white/5" style={{ backgroundColor: item.color }} />
                  <div className="flex items-center gap-2">
                    <span>{item.title}</span>
                    {item.type && <span className="rounded-md border border-[#7C3AED]/30 bg-[#7C3AED]/12 px-2 py-0.5 text-[11px] text-purple-200">{item.type}</span>}
                  </div>
                  <span className="col-start-3 text-xs text-app-subtle sm:col-start-auto">{item.length}</span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel className="overflow-hidden">
            <div className="flex items-center justify-between border-b border-app-border px-4 py-3">
              <h2 className="font-semibold">Upcoming Tasks</h2>
              <button className="text-xs text-app-muted">View all</button>
            </div>
            <div className="overflow-x-auto">
              {tasks.map((task) => (
                <div key={task.title} className="grid min-w-[720px] grid-cols-[24px_1fr_170px_76px_74px] items-center gap-3 border-b border-app-border px-4 py-3 last:border-b-0">
                  <span className="h-5 w-5 rounded-full border border-[#CBD5E1]" />
                  <span className="text-sm">{task.title}</span>
                  <span className="text-xs text-[#3B82F6]">{task.project}</span>
                  <PriorityBadge priority={task.priority} />
                  <span className="text-right text-xs text-app-muted">{task.date}</span>
                </div>
              ))}
            </div>
          </Panel>
        </section>

        <Panel className="p-4">
          <div className="mb-4 flex items-center gap-3">
            <h2 className="font-semibold">Productivity Overview</h2>
            <button className="rounded-lg border border-app-border bg-app-elevated px-3 py-1 text-xs text-app-muted">This Week</button>
          </div>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {overview.map((item) => (
              <div key={item.label} className="rounded-lg border border-app-border bg-app-elevated/75 p-4">
                <p className="text-sm text-[#F9FAFB]">{item.label}</p>
                <p className="mt-1 text-2xl font-semibold">{item.value}</p>
                <p className={`mt-2 text-xs ${item.trend.startsWith("-") ? "text-rose-400" : "text-emerald-400"}`}>{item.trend} vs last week</p>
                <svg className="mt-3 h-12 w-full" viewBox="0 0 126 48" aria-hidden="true">
                  <path d={item.line} fill="none" stroke={item.color} strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>
            ))}
          </div>
        </Panel>
      </main>

      <aside className="hidden rounded-xl border border-app-border bg-[#081225] p-4 shadow-[0_16px_60px_rgba(0,0,0,0.28)] xl:block">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[#A855F7]" />
            <h2 className="font-semibold">AI Assistant</h2>
            <span className="rounded-md bg-[#1D2A65] px-2 py-0.5 text-[10px] font-semibold text-blue-200">Beta</span>
          </div>
          <Bell className="h-4 w-4 text-app-subtle" />
        </div>

        <div className="mb-5 rounded-xl border border-app-border bg-app-panel/7 p-4 text-sm leading-6 text-app-secondary">
          Hi Arjun. I&apos;ve analyzed your schedule and progress. Here are some insights for you.
        </div>

        <Panel className="mb-4 border-[#7C3AED]/35 bg-[#11143A]/70 p-4">
          <h3 className="mb-4 font-semibold">AI Insights</h3>
          <div className="space-y-4 text-sm">
            <p className="flex gap-3"><Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-[#3B82F6]" />You are most productive between 7AM - 10AM</p>
            <p className="flex gap-3"><AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-orange-400" />System Design tasks are getting delayed. Consider scheduling them earlier.</p>
            <p className="flex gap-3"><Star className="mt-0.5 h-5 w-5 shrink-0 text-yellow-300" />You&apos;ve been consistent for 12 days. Amazing progress.</p>
          </div>
        </Panel>

        <Panel className="mb-4 p-4">
          <div className="mb-4 flex items-center gap-2">
            <h3 className="font-semibold">AI Suggestions</h3>
            <span className="rounded-md bg-[#1D2A65] px-2 py-0.5 text-[10px] font-semibold text-blue-200">New</span>
          </div>
          <div className="space-y-3 text-sm text-app-secondary">
            {["Reschedule 2 low priority tasks", "Break down Design Parking Lot into smaller tasks", "Schedule deep work session tomorrow morning"].map((item) => (
              <div key={item} className="rounded-lg border border-app-border bg-app-elevated/80 p-3">{item}</div>
            ))}
          </div>
          <div className="mt-4 flex rounded-lg border border-app-border bg-app-elevated p-2">
            <input className="min-w-0 flex-1 bg-transparent px-2 text-sm outline-none placeholder:text-[#64748B]" placeholder="Ask anything..." />
            <button className="rounded-md bg-[#6D38E8] p-2"><Send className="h-4 w-4" /></button>
          </div>
        </Panel>

        <Panel className="p-4">
          <h3 className="font-semibold">Weekly Summary</h3>
          <p className="mt-1 text-sm text-app-subtle">May 13 - May 19</p>
          <div className="mt-5 space-y-4 text-sm">
            <div className="flex items-center justify-between"><span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" />Tasks Completed</span><span>62 / 86</span></div>
            <div className="h-1.5 rounded-full bg-app-border"><div className="h-full w-[72%] rounded-full bg-[#22C55E]" /></div>
            <div className="flex items-center justify-between"><span className="flex items-center gap-2"><Timer className="h-4 w-4" />Focus Time</span><span>18h 45m</span></div>
            <div className="flex items-center justify-between"><span className="flex items-center gap-2"><BarChart3 className="h-4 w-4" />Completion Rate</span><span>71%</span></div>
          </div>
          <button className="mt-5 w-full rounded-lg bg-[#6D38E8] py-3 text-sm font-semibold">View Detailed Report</button>
        </Panel>
      </aside>
    </div>
  );
}

export default function HomePage() {
  return <LandingPage />;
}
