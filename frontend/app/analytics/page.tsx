"use client";

import React from "react";
import {
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Flame,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";

const kpis = [
  { label: "Tasks Completed", value: "86", sub: "+18% vs last week", icon: CheckCircle2, color: "#7C3AED", line: "M4 38 C16 38, 18 18, 32 30 S50 10, 64 28 S82 10, 96 28 S114 16, 126 24" },
  { label: "Focus Time", value: "18h 45m", sub: "+14% vs last week", icon: Clock3, color: "#3B82F6", line: "M4 42 C16 42, 18 24, 32 34 S50 8, 64 30 S82 10, 96 28 S114 16, 126 28" },
  { label: "Completion Rate", value: "72%", sub: "+8% vs last week", icon: Target, color: "#22C55E", line: "M4 40 C18 38, 22 18, 38 28 S54 12, 70 28 S88 8, 126 24" },
  { label: "Current Streak", value: "12 days", sub: "Best: 18 days", icon: Flame, color: "#F97316", line: "M4 40 C18 36, 18 20, 34 34 S50 6, 64 30 S80 10, 92 34 S106 16, 126 42" },
  { label: "Avg. Task Delay", value: "1.2 days", sub: "-0.4 vs last week", icon: TrendingUp, color: "#E11D48", line: "M4 38 C18 40, 18 22, 32 30 S50 8, 64 28 S82 12, 96 32 S112 18, 126 26" },
];

const projects = [
  ["DSA Preparation", "16 / 22", 73, "#7C3AED"],
  ["System Design", "11 / 20", 55, "#3B82F6"],
  ["Backend Development", "13 / 20", 65, "#22C55E"],
  ["Mock Interviews", "4 / 10", 40, "#F97316"],
  ["Resume Building", "8 / 10", 80, "#F59E0B"],
  ["Frontend Development", "2 / 10", 20, "#E11D48"],
];

const goals = [
  ["Crack top product based company", "68%", 68, "#7C3AED"],
  ["Build a SaaS product", "45%", 45, "#22C55E"],
  ["Read 24 books this year", "33%", 33, "#F59E0B"],
  ["Get in best physical shape", "52%", 52, "#E11D48"],
];

const heat = [
  [20, 26, 28, 30, 22, 10, 14],
  [65, 45, 58, 52, 36, 72, 16],
  [38, 46, 70, 74, 58, 20, 50],
  [28, 50, 68, 62, 58, 20, 18],
  [16, 24, 52, 48, 44, 34, 18],
  [8, 10, 36, 34, 30, 22, 42],
];

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

export default function AnalyticsPage() {
  return (
    <div className="grid min-h-screen min-w-0 gap-4 text-app-primary 2xl:grid-cols-[minmax(0,1fr)_310px] 2xl:gap-5">
      <main className="min-w-0 space-y-4">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Analytics</h1>
            <p className="mt-1 text-base text-app-muted">Track your progress, patterns and productivity insights</p>
          </div>
          <div className="flex w-full flex-wrap items-center gap-3 lg:w-auto">
            <HeaderButton><CalendarDays className="h-4 w-4" />May 13 - May 19, 2024</HeaderButton>
            <HeaderButton>This Week <ChevronDown className="h-4 w-4" /></HeaderButton>
          </div>
        </header>

        <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {kpis.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <Panel key={kpi.label} className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full" style={{ backgroundColor: `${kpi.color}22`, color: kpi.color }}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{kpi.label}</p>
                    <p className="mt-1 text-3xl font-semibold leading-none">{kpi.value}</p>
                    <p className={`mt-2 text-xs ${kpi.sub.startsWith("-") ? "text-rose-400" : kpi.sub.startsWith("+") ? "text-emerald-400" : "text-app-muted"}`}>{kpi.sub}</p>
                  </div>
                </div>
                <svg className="mt-5 h-10 w-full" viewBox="0 0 130 48" aria-hidden="true">
                  <path d={kpi.line} fill="none" stroke={kpi.color} strokeWidth="3" strokeLinecap="round" />
                </svg>
              </Panel>
            );
          })}
        </section>

        <section className="grid gap-4 xl:grid-cols-[1.45fr_1fr]">
          <Panel className="p-5">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="font-semibold">Productivity Overview</h2>
              <div className="flex flex-wrap items-center gap-3 text-xs sm:gap-4">
                <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-[#22C55E]" />Completed</span>
                <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-[#3B82F6]" />Created</span>
                <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-[#E11D48]" />Overdue</span>
                <HeaderButton>Daily <ChevronDown className="h-4 w-4" /></HeaderButton>
              </div>
            </div>
            <div className="relative h-64 rounded-lg border border-app-border bg-[#081120] p-4">
              <div className="absolute inset-4 grid grid-rows-5">
                {[25, 20, 15, 10, 5].map((n) => <div key={n} className="border-t border-app-border text-xs text-app-subtle">{n}</div>)}
              </div>
              <svg className="absolute inset-4 h-[calc(100%-2rem)] w-[calc(100%-2rem)] overflow-visible" viewBox="0 0 600 220" preserveAspectRatio="none">
                <path d="M0 170 C80 90, 120 70, 180 82 S280 160, 340 120 S450 40, 600 78" fill="none" stroke="#22C55E" strokeWidth="4" />
                <path d="M0 198 C80 140, 130 95, 200 120 S310 170, 380 150 S480 100, 600 128" fill="none" stroke="#3B82F6" strokeWidth="4" />
                <path d="M0 220 C70 180, 110 165, 170 180 S280 210, 340 186 S470 170, 600 196" fill="none" stroke="#E11D48" strokeWidth="4" />
              </svg>
              <div className="absolute bottom-3 left-8 right-8 hidden justify-between text-xs text-app-subtle sm:flex">
                {["May 13", "May 14", "May 15", "May 16", "May 17", "May 18", "May 19"].map((day) => <span key={day}>{day}</span>)}
              </div>
            </div>
          </Panel>

          <Panel className="p-5">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="font-semibold">Time Distribution</h2>
              <HeaderButton>This Week <ChevronDown className="h-4 w-4" /></HeaderButton>
            </div>
            <div className="grid gap-5 sm:grid-cols-[190px_1fr] xl:grid-cols-1 2xl:grid-cols-[190px_1fr]">
              <div className="relative h-48 w-48">
                <svg className="h-48 w-48 -rotate-90" viewBox="0 0 192 192" aria-hidden="true">
                  <circle cx="96" cy="96" r="66" fill="none" stroke="#7C3AED" strokeWidth="30" strokeDasharray="415" strokeDashoffset="228" />
                  <circle cx="96" cy="96" r="66" fill="none" stroke="#3B82F6" strokeWidth="30" strokeDasharray="415" strokeDashoffset="311" className="rotate-[162deg] origin-center" />
                  <circle cx="96" cy="96" r="66" fill="none" stroke="#22C55E" strokeWidth="30" strokeDasharray="415" strokeDashoffset="353" className="rotate-[252deg] origin-center" />
                  <circle cx="96" cy="96" r="66" fill="none" stroke="#F97316" strokeWidth="30" strokeDasharray="415" strokeDashoffset="374" className="rotate-[306deg] origin-center" />
                  <circle cx="96" cy="96" r="66" fill="none" stroke="#EC4899" strokeWidth="30" strokeDasharray="415" strokeDashoffset="394" className="rotate-[342deg] origin-center" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-semibold">18h 45m</span>
                  <span className="text-xs text-app-muted">Total Focus Time</span>
                </div>
              </div>
              <div className="space-y-4 text-sm">
                {[
                  ["Deep Work", "45%", "8h 25m", "#7C3AED"],
                  ["Shallow Work", "25%", "4h 41m", "#3B82F6"],
                  ["Learning", "15%", "2h 48m", "#22C55E"],
                  ["Meetings", "10%", "1h 51m", "#F97316"],
                  ["Breaks", "5%", "1h 00m", "#EC4899"],
                ].map(([label, pct, time, color]) => (
                  <div key={label} className="grid grid-cols-[1fr_44px_58px] items-center gap-3">
                    <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />{label}</span>
                    <span className="text-app-muted">{pct}</span>
                    <span>{time}</span>
                  </div>
                ))}
              </div>
            </div>
          </Panel>
        </section>

        <section className="grid gap-4 xl:grid-cols-[0.8fr_1fr_1fr]">
          <Panel className="p-5">
            <h2 className="mb-5 font-semibold">Focus Time Heatmap</h2>
            <div className="grid grid-cols-[34px_repeat(7,1fr)] gap-1 text-xs text-app-subtle">
              <span />
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => <span key={d} className="text-center">{d}</span>)}
              {["5 AM", "8 AM", "11 AM", "2 PM", "5 PM", "8 PM"].map((time, row) => (
                <React.Fragment key={time}>
                  <span className="py-2">{time}</span>
                  {heat[row].map((value, col) => (
                    <span key={`${row}-${col}`} className="h-8 rounded-md border border-app-border" style={{ backgroundColor: `rgba(124,58,237,${value / 90})` }} />
                  ))}
                </React.Fragment>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-app-subtle">
              <span>Less</span><span className="h-3 w-8 rounded bg-[#1E1B4B]" /><span className="h-3 w-8 rounded bg-[#4C1D95]" /><span className="h-3 w-8 rounded bg-[#7C3AED]" /><span className="h-3 w-8 rounded bg-[#C4B5FD]" /><span>More</span>
            </div>
          </Panel>

          <Panel className="p-5">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="font-semibold">Task Completion by Project</h2>
              <HeaderButton>This Week <ChevronDown className="h-4 w-4" /></HeaderButton>
            </div>
            <div className="space-y-4">
              {projects.map(([label, count, pct, color]) => (
                <div key={label}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span>{label}</span>
                    <span className="text-app-muted">{count} <span className="ml-2">{pct}%</span></span>
                  </div>
                  <div className="h-1.5 rounded-full bg-app-border">
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color as string }} />
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel className="p-5">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="font-semibold">Task Status Breakdown</h2>
              <HeaderButton>This Week <ChevronDown className="h-4 w-4" /></HeaderButton>
            </div>
            <div className="grid gap-5 sm:grid-cols-[170px_1fr] xl:grid-cols-1 2xl:grid-cols-[170px_1fr]">
              <div className="relative h-44 w-44">
                <svg className="h-44 w-44 -rotate-90" viewBox="0 0 176 176" aria-hidden="true">
                  <circle cx="88" cy="88" r="60" fill="none" stroke="#22C55E" strokeWidth="28" strokeDasharray="377" strokeDashoffset="219" />
                  <circle cx="88" cy="88" r="60" fill="none" stroke="#3B82F6" strokeWidth="28" strokeDasharray="377" strokeDashoffset="298" className="rotate-[151deg] origin-center" />
                  <circle cx="88" cy="88" r="60" fill="none" stroke="#94A3B8" strokeWidth="28" strokeDasharray="377" strokeDashoffset="238" className="rotate-[227deg] origin-center" />
                  <circle cx="88" cy="88" r="60" fill="none" stroke="#E11D48" strokeWidth="28" strokeDasharray="377" strokeDashoffset="354" className="rotate-[360deg] origin-center" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-semibold">86</span>
                  <span className="text-xs text-app-muted">Total Tasks</span>
                </div>
              </div>
              <div className="space-y-4 text-sm">
                {[
                  ["Completed", "86 (42%)", "#22C55E"],
                  ["In Progress", "18 (21%)", "#3B82F6"],
                  ["To Do", "32 (37%)", "#94A3B8"],
                  ["Overdue", "7 (6%)", "#E11D48"],
                ].map(([label, value, color]) => (
                  <p key={label} className="flex justify-between gap-3"><span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />{label}</span><span>{value}</span></p>
                ))}
              </div>
            </div>
          </Panel>
        </section>

        <Panel className="p-5">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <h2 className="font-semibold">Weekly Trend</h2>
            <HeaderButton>Last 6 Weeks <ChevronDown className="h-4 w-4" /></HeaderButton>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {[
              ["Tasks Completed", "86", "#22C55E"],
              ["Focus Time", "18h 45m", "#3B82F6"],
              ["Completion Rate", "72%", "#22C55E"],
              ["Avg. Task Delay", "1.2 days", "#E11D48"],
            ].map(([label, value, color]) => (
              <div key={label} className="border-r border-app-border pr-5 last:border-r-0">
                <p className="text-sm">{label}</p>
                <p className="mt-1 text-2xl font-semibold">{value}</p>
                <svg className="mt-4 h-14 w-full" viewBox="0 0 180 58" aria-hidden="true">
                  <path d="M2 46 C22 46, 24 18, 44 28 S70 44, 86 22 S116 34, 136 18 S160 46, 178 24" fill="none" stroke={color as string} strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>
            ))}
          </div>
        </Panel>
      </main>

      <aside className="space-y-4">
        <Panel className="p-5">
          <div className="mb-5 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[#A855F7]" />
            <h2 className="text-lg font-semibold">AI Insights</h2>
            <span className="rounded-md bg-[#1D2A65] px-2 py-0.5 text-[10px] font-semibold text-blue-200">Beta</span>
          </div>
          <div className="space-y-6 text-sm">
            <p><span className="mb-2 block font-semibold">You&apos;re most productive between 7AM - 10AM</span><span className="text-app-subtle">Try to schedule deep work in this window.</span></p>
            <p><span className="mb-2 block font-semibold">System Design tasks are getting delayed frequently.</span><span className="text-app-subtle">Consider breaking them into smaller tasks.</span></p>
            <p><span className="mb-2 block font-semibold">You completed 18% more tasks than last week.</span><span className="text-app-subtle">Great consistency. Keep it up.</span></p>
          </div>
          <button className="mt-6 w-full rounded-lg bg-[#6D38E8] py-3 text-sm font-semibold">View All Insights</button>
        </Panel>

        <Panel className="p-5">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-semibold">Goal Progress Overview</h2>
            <HeaderButton>This Week <ChevronDown className="h-4 w-4" /></HeaderButton>
          </div>
          <div className="space-y-5">
            {goals.map(([label, value, pct, color]) => (
              <div key={label}>
                <div className="mb-2 flex justify-between text-sm"><span>{label}</span><span>{value}</span></div>
                <div className="h-1.5 rounded-full bg-app-border"><div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color as string }} /></div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel className="p-5">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-semibold">Productivity Score</h2>
            <HeaderButton>This Week <ChevronDown className="h-4 w-4" /></HeaderButton>
          </div>
          <div className="flex items-center gap-5">
            <div className="relative h-32 w-32">
              <svg className="h-32 w-32 -rotate-90" viewBox="0 0 128 128" aria-hidden="true">
                <circle cx="64" cy="64" r="45" fill="none" stroke="#334155" strokeWidth="12" />
                <circle cx="64" cy="64" r="45" fill="none" stroke="#7C3AED" strokeWidth="12" strokeDasharray="283" strokeDashoffset="62" strokeLinecap="round" />
                <circle cx="64" cy="64" r="45" fill="none" stroke="#22C55E" strokeWidth="12" strokeDasharray="283" strokeDashoffset="190" className="rotate-[220deg] origin-center" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-semibold">78</span>
                <span className="text-sm text-app-muted">/100</span>
              </div>
            </div>
            <div className="text-sm">
              <p className="font-semibold text-emerald-400">+12% <span className="text-app-muted">vs last week</span></p>
              <p className="mt-4 text-app-muted">Great. Your consistency is improving.</p>
            </div>
          </div>
        </Panel>
      </aside>
    </div>
  );
}
