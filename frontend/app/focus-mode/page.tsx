"use client";

import React from "react";
import { BarChart3, CheckCircle2, Code2, Database, Link2, Pause, Play, Settings, SkipForward, Sparkles, Square, Target, Timer, Trophy } from "lucide-react";

const playlist = [
  { title: "Implement Authentication Module", meta: "Backend Development", time: "90m", icon: Code2, color: "#7C3AED", active: true },
  { title: "Design Database Schema", meta: "Backend Development", time: "60m", icon: Database, color: "#3B82F6" },
  { title: "Write Unit Tests", meta: "Backend Development", time: "45m", icon: CheckCircle2, color: "#22C55E" },
  { title: "API Integration", meta: "Backend Development", time: "60m", icon: Link2, color: "#F59E0B" },
];

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`rounded-xl border border-app-border bg-app-panel shadow-[0_16px_50px_rgba(0,0,0,0.14)] ${className}`}>{children}</section>;
}

function HeaderButton({ children, primary = false }: { children: React.ReactNode; primary?: boolean }) {
  return <button className={`flex h-11 items-center gap-2 rounded-lg px-4 text-sm font-semibold ${primary ? "bg-[#6D38E8] text-white shadow-lg shadow-[#7C3AED]/25" : "border border-app-border bg-app-elevated text-app-secondary"}`}>{children}</button>;
}

export default function FocusModePage() {
  return (
    <div className="grid min-h-screen min-w-0 gap-4 text-app-primary 2xl:grid-cols-[minmax(0,1fr)_420px] 2xl:gap-5">
      <main className="min-w-0 space-y-5">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Focus Mode</h1>
            <p className="mt-1 text-base text-app-muted">Eliminate distractions and get deep work done</p>
          </div>
          <div className="flex w-full flex-wrap gap-3 lg:w-auto">
            <HeaderButton><Settings className="h-4 w-4" />Focus Settings</HeaderButton>
            <HeaderButton primary><Square className="h-4 w-4" />End Session</HeaderButton>
          </div>
        </header>

        <Panel className="relative min-h-[520px] overflow-hidden p-4 sm:p-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.16),transparent_42%)]" />
          <div className="relative flex min-h-[480px] flex-col items-center justify-center">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#7C3AED]/15 px-4 py-2 text-sm text-[#A855F7]">
              <Timer className="h-4 w-4" />
              Deep Work Session
            </span>
            <div className="relative h-64 w-64 sm:h-80 sm:w-80">
              <svg className="h-64 w-64 -rotate-90 sm:h-80 sm:w-80" viewBox="0 0 320 320" aria-hidden="true">
                <circle cx="160" cy="160" r="132" fill="none" stroke="currentColor" strokeWidth="16" className="text-app-border" />
                <circle cx="160" cy="160" r="132" fill="none" stroke="#6D38E8" strokeWidth="16" strokeDasharray="829" strokeDashoffset="207" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-semibold tracking-tight sm:text-7xl">25:00</span>
                <span className="mt-4 text-base text-app-secondary sm:text-lg">Stay focused</span>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button className="flex h-12 min-w-28 items-center justify-center gap-2 rounded-full bg-[#6D38E8] px-5 text-sm font-semibold text-white"><Pause className="h-5 w-5" />Pause</button>
              <button className="flex h-12 min-w-28 items-center justify-center gap-2 rounded-full border border-app-border bg-app-elevated px-5 text-sm font-semibold"><SkipForward className="h-5 w-5" />Skip</button>
              <button className="flex h-12 min-w-28 items-center justify-center gap-2 rounded-full border border-app-border bg-app-elevated px-5 text-sm font-semibold"><Square className="h-5 w-5" />Stop</button>
            </div>
          </div>
        </Panel>

        <section className="grid gap-4 xl:grid-cols-3">
          {[
            ["Today's Focus", "2h 15m", Target],
            ["Completed Sessions", "23", Trophy],
            ["Avg. Session Time", "48m", BarChart3],
          ].map(([label, value, Icon]) => (
            <Panel key={label as string} className="p-5">
              <Icon className="h-8 w-8 rounded-full bg-app-soft p-2 text-[#7C3AED]" />
              <p className="mt-4 text-sm text-app-muted">{label as string}</p>
              <p className="mt-1 text-3xl font-semibold">{value as string}</p>
            </Panel>
          ))}
        </section>
      </main>

      <aside className="space-y-4">
        <Panel className="p-5">
          <h2 className="mb-5 font-semibold">Current Task</h2>
          <div className="flex gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#7C3AED]/20 text-[#A855F7]"><Code2 className="h-7 w-7" /></div>
            <div>
              <h3 className="font-semibold">Implement Authentication Module</h3>
              <p className="mt-1 text-sm text-[#A78BFA]">Backend Development</p>
              <p className="mt-5 text-sm leading-6 text-app-muted">Implement JWT authentication with refresh tokens and role-based access control.</p>
            </div>
          </div>
        </Panel>

        <Panel className="p-5">
          <h2 className="mb-4 font-semibold">Session Playlist</h2>
          <div className="space-y-2">
            {playlist.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className={`grid grid-cols-[42px_1fr_46px] items-center gap-3 rounded-lg border p-3 ${item.active ? "border-[#7C3AED] bg-[#7C3AED]/10" : "border-app-border bg-app-elevated"}`}>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full" style={{ backgroundColor: item.color }}>
                    {item.active ? <Play className="h-4 w-4 fill-white text-white" /> : <Icon className="h-4 w-4 text-white" />}
                  </div>
                  <div><p className="text-sm font-medium">{item.title}</p><p className="mt-1 text-xs text-app-muted">{item.meta}</p></div>
                  <span className="text-sm text-app-muted">{item.time}</span>
                </div>
              );
            })}
          </div>
        </Panel>

        <Panel className="p-5">
          <div className="mb-4 flex items-center gap-2"><Sparkles className="h-5 w-5 text-[#A855F7]" /><h2 className="font-semibold">AI Focus Coach</h2></div>
          <p className="text-sm leading-6 text-app-muted">You are most productive between 7AM and 10AM. Consider scheduling deep work in that window.</p>
        </Panel>
      </aside>
    </div>
  );
}
