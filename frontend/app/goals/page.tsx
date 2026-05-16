"use client";

import React from "react";
import { AlertTriangle, BarChart3, BookOpen, BriefcaseBusiness, Check, HeartPulse, Plus, Rocket, Search, Target, Trophy } from "lucide-react";

const stats = [
  { label: "Total Goals", value: "5", sub: "Active goals", icon: Target, color: "#7C3AED" },
  { label: "Progress", value: "68%", sub: "+12% this month", icon: BarChart3, color: "#3B82F6" },
  { label: "On Track", value: "3", sub: "Goals", icon: Check, color: "#22C55E" },
  { label: "At Risk", value: "1", sub: "Needs attention", icon: AlertTriangle, color: "#F97316" },
];

const goals = [
  { title: "Crack top product based company", desc: "Prepare for interviews at top product companies", icon: BriefcaseBusiness, progress: 68, target: "Dec 31, 2024", status: "On Track", color: "#7C3AED" },
  { title: "Get in best physical shape", desc: "Build a sustainable fitness routine", icon: HeartPulse, progress: 52, target: "Oct 31, 2024", status: "At Risk", color: "#22C55E" },
  { title: "Read 24 books this year", desc: "Read consistently across useful topics", icon: BookOpen, progress: 33, target: "Dec 31, 2024", status: "On Track", color: "#F59E0B" },
  { title: "Build a SaaS product", desc: "Launch and iterate on a real product", icon: Rocket, progress: 45, target: "Aug 15, 2024", status: "On Track", color: "#3B82F6" },
  { title: "Learn Advanced System Design", desc: "Master practical system design concepts", icon: Trophy, progress: 80, target: "Jul 31, 2024", status: "Completed", color: "#8B5CF6" },
];

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`rounded-xl border border-app-border bg-app-panel shadow-[0_16px_50px_rgba(0,0,0,0.14)] ${className}`}>{children}</section>;
}

function StatusBadge({ status }: { status: string }) {
  const cls = status === "Completed" ? "bg-purple-500/15 text-purple-300" : status === "At Risk" ? "bg-orange-500/15 text-orange-300" : "bg-emerald-500/15 text-emerald-300";
  return <span className={`rounded-md px-3 py-1.5 text-sm font-semibold ${cls}`}>{status}</span>;
}

export default function GoalsPage() {
  return (
    <div className="grid min-h-screen min-w-0 gap-4 text-app-primary xl:grid-cols-[minmax(0,1fr)_340px] xl:gap-6">
      <main className="min-w-0 space-y-5">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Goals</h1>
            <p className="mt-1 text-base text-app-muted">Your high-level objectives and life targets</p>
          </div>
          <div className="flex w-full flex-wrap gap-3 lg:w-auto">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-app-subtle" />
              <input className="h-11 w-full rounded-lg border border-app-border bg-app-input pl-10 pr-3 text-sm outline-none placeholder:text-app-subtle focus:border-[#7C3AED]" placeholder="Search goals..." />
            </div>
            <button className="flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-[#6D38E8] px-4 text-sm font-semibold text-white shadow-lg shadow-[#7C3AED]/25 sm:flex-none">
              <Plus className="h-4 w-4" />
              New Goal
            </button>
          </div>
        </header>

        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Panel key={stat.label} className="p-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-app-soft" style={{ color: stat.color }}>
                    <Icon className="h-6 w-6" />
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

        <Panel className="overflow-hidden">
          <div className="flex gap-6 overflow-x-auto border-b border-app-border px-5 py-3 text-sm">
            {["All Goals", "On Track", "At Risk", "Completed"].map((tab, index) => (
              <button key={tab} className={`relative shrink-0 py-2 ${index === 0 ? "text-app-primary" : "text-app-muted"}`}>
                {tab}
                {index === 0 && <span className="absolute inset-x-0 -bottom-3 h-0.5 rounded-full bg-[#7C3AED]" />}
              </button>
            ))}
          </div>

          {goals.map((goal) => {
            const Icon = goal.icon;
            return (
              <div key={goal.title} className="grid gap-4 border-b border-app-border p-5 last:border-b-0 lg:grid-cols-[60px_minmax(0,1fr)_190px_120px] lg:items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full" style={{ backgroundColor: `${goal.color}25`, color: goal.color }}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-lg font-semibold">{goal.title}</h2>
                  <p className="mt-1 text-sm text-app-muted">{goal.desc}</p>
                  <p className="mt-3 text-sm text-app-muted">Target: {goal.target}</p>
                </div>
                <div>
                  <div className="mb-2 flex items-center gap-3">
                    <span className="font-semibold">{goal.progress}%</span>
                    <div className="h-1.5 flex-1 rounded-full bg-app-border">
                      <div className="h-full rounded-full" style={{ width: `${goal.progress}%`, backgroundColor: goal.color }} />
                    </div>
                  </div>
                </div>
                <StatusBadge status={goal.status} />
              </div>
            );
          })}
        </Panel>
      </main>

      <aside className="space-y-4">
        <Panel className="p-5">
          <h2 className="text-lg font-semibold">AI Goal Insights</h2>
          <p className="mt-3 text-sm leading-6 text-app-muted">Focus on your at-risk goals and break large outcomes into smaller milestones.</p>
          <button className="mt-5 w-full rounded-lg bg-[#6D38E8] py-3 text-sm font-semibold text-white">View Detailed Insights</button>
        </Panel>
      </aside>
    </div>
  );
}
