"use client";

import React from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Circle,
  Clock3,
  Plus,
  Settings,
  Sparkles,
} from "lucide-react";

const days = [
  { name: "Mon", date: "May 20", focus: "2h 30m" },
  { name: "Tue", date: "May 21", active: true, focus: "3h 45m" },
  { name: "Wed", date: "May 22", focus: "2h 15m" },
  { name: "Thu", date: "May 23", focus: "3h 0m" },
  { name: "Fri", date: "May 24", focus: "2h 45m" },
  { name: "Sat", date: "May 25", focus: "1h 30m" },
  { name: "Sun", date: "May 26", focus: "1h 0m" },
];

const times = ["6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM"];

const events = [
  { day: 0, start: 1.0, duration: 1.6, title: "System Design", meta: "Deep Work", time: "7:00 - 8:30 AM", type: "deep" },
  { day: 0, start: 3.25, duration: 1.1, title: "Workout", meta: "Health", time: "9:00 - 10:00 AM", type: "health" },
  { day: 0, start: 5.0, duration: 1.6, title: "Design Parking Lot", meta: "System Design", time: "10:30 AM - 12:00 PM", type: "backend" },
  { day: 0, start: 7.5, duration: 0.9, title: "Lunch Break", meta: "", time: "1:00 - 2:00 PM", type: "break" },
  { day: 0, start: 9.1, duration: 1.8, title: "Solve 2 Graph Problems", meta: "DSA Preparation", time: "2:30 - 4:00 PM", type: "deep" },
  { day: 0, start: 13.6, duration: 1.5, title: "Read 24 Books", meta: "Personal Growth", time: "7:00 - 8:00 PM", type: "learning" },
  { day: 1, start: 0.1, duration: 1.15, title: "Meditation", meta: "Habit", time: "6:30 - 7:30 AM", type: "break" },
  { day: 1, start: 1.85, duration: 1.85, title: "DSA: Trees & Graphs", meta: "Deep Work", time: "7:45 - 9:45 AM", type: "deep" },
  { day: 1, start: 4.65, duration: 1.8, title: "Implement JWT Auth", meta: "Backend Development", time: "10:15 AM - 12:00 PM", type: "backend" },
  { day: 1, start: 7.5, duration: 0.9, title: "Lunch Break", meta: "", time: "1:00 - 2:00 PM", type: "break" },
  { day: 1, start: 9.05, duration: 1.6, title: "Read about Rate Limiting", meta: "System Design", time: "2:30 - 4:00 PM", type: "backend" },
  { day: 1, start: 11.8, duration: 1.3, title: "Mock Interview - Round 1", meta: "Mock Interviews", time: "5:00 - 6:00 PM", type: "health" },
  { day: 1, start: 15.0, duration: 1.55, title: "Review & Notes", meta: "Learning", time: "8:00 - 9:00 PM", type: "deep" },
  { day: 2, start: 1.15, duration: 1.55, title: "Backend Development", meta: "Deep Work", time: "7:00 - 8:30 AM", type: "deep" },
  { day: 2, start: 3.3, duration: 1.0, title: "Workout", meta: "Health", time: "9:00 - 10:00 AM", type: "health" },
  { day: 2, start: 5.05, duration: 1.8, title: "System Design Concepts", meta: "Deep Work", time: "10:30 AM - 12:30 PM", type: "deep" },
  { day: 2, start: 7.5, duration: 0.95, title: "Lunch Break", meta: "", time: "1:00 - 2:00 PM", type: "break" },
  { day: 2, start: 9.1, duration: 1.65, title: "Solve DP Problems", meta: "DSA Preparation", time: "2:30 - 4:00 PM", type: "deep" },
  { day: 2, start: 14.4, duration: 1.45, title: "Build a SaaS Product", meta: "Side Project", time: "7:30 - 8:30 PM", type: "learning" },
  { day: 3, start: 0.15, duration: 1.1, title: "Meditation", meta: "Habit", time: "6:30 - 7:30 AM", type: "break" },
  { day: 3, start: 2.2, duration: 1.85, title: "System Design", meta: "Deep Work", time: "8:00 - 10:00 AM", type: "deep" },
  { day: 3, start: 4.9, duration: 1.75, title: "Design Rate Limiter", meta: "System Design", time: "10:30 AM - 12:30 PM", type: "backend" },
  { day: 3, start: 7.5, duration: 0.95, title: "Lunch Break", meta: "", time: "1:00 - 2:00 PM", type: "break" },
  { day: 3, start: 9.1, duration: 1.55, title: "Backend Project Implementation", meta: "Backend Development", time: "2:30 - 4:00 PM", type: "backend" },
  { day: 3, start: 13.05, duration: 1.25, title: "Code Review", meta: "Learning", time: "6:00 - 7:00 PM", type: "health" },
  { day: 4, start: 1.0, duration: 1.5, title: "Frontend Development", meta: "Deep Work", time: "7:00 - 8:30 AM", type: "deep" },
  { day: 4, start: 3.35, duration: 1.7, title: "Create React Dashboard", meta: "Frontend Development", time: "9:00 - 10:30 AM", type: "backend" },
  { day: 4, start: 5.5, duration: 1.35, title: "Optimize SQL Queries", meta: "Backend Development", time: "11:00 AM - 12:30 PM", type: "backend" },
  { day: 4, start: 7.5, duration: 0.95, title: "Lunch Break", meta: "", time: "1:00 - 2:00 PM", type: "break" },
  { day: 4, start: 9.1, duration: 1.45, title: "Mock Interview - Round 2", meta: "Mock Interviews", time: "2:30 - 4:00 PM", type: "deep" },
  { day: 4, start: 13.5, duration: 1.5, title: "Plan Tomorrow", meta: "Planning", time: "7:00 - 8:00 PM", type: "planning" },
  { day: 5, start: 2.15, duration: 1.7, title: "Read Books", meta: "Personal Growth", time: "8:00 - 10:00 AM", type: "learning" },
  { day: 5, start: 4.95, duration: 1.7, title: "Personal Project", meta: "Side Project", time: "10:30 AM - 12:30 PM", type: "learning" },
  { day: 6, start: 2.2, duration: 1.65, title: "Workout & Sport", meta: "Health", time: "8:00 - 10:00 AM", type: "health" },
  { day: 6, start: 5.0, duration: 1.5, title: "Weekly Review", meta: "Planning", time: "10:30 AM - 12:00 PM", type: "break" },
];

const eventStyles: Record<string, string> = {
  deep: "border-[#7C3AED]/45 bg-[#31205F]/88 text-purple-100",
  backend: "border-[#3B82F6]/45 bg-[#073B70]/88 text-blue-100",
  health: "border-[#22C55E]/35 bg-[#14532D]/88 text-green-100",
  learning: "border-[#06B6D4]/40 bg-[#064E57]/88 text-cyan-100",
  planning: "border-[#EC4899]/40 bg-[#6B1738]/88 text-pink-100",
  break: "border-[#F59E0B]/45 bg-[#6B3B05]/88 text-amber-100",
};

const upcoming = [
  { title: "Design Parking Lot", project: "System Design", time: "Tomorrow 10:30 AM", priority: "High", color: "#3B82F6" },
  { title: "Implement JWT Auth", project: "Backend Development", time: "Tomorrow 10:15 AM", priority: "High", color: "#22C55E" },
  { title: "Mock Interview - Round 1", project: "Mock Interviews", time: "Tomorrow 5:00 PM", priority: "Medium", color: "#F59E0B" },
  { title: "Read about Rate Limiting", project: "System Design", time: "May 23 2:30 PM", priority: "Medium", color: "#3B82F6" },
];

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-xl border border-app-border bg-app-panel shadow-[0_16px_50px_rgba(0,0,0,0.22)] ${className}`}>
      {children}
    </section>
  );
}

export default function CalendarPage() {
  return (
    <div className="grid min-h-screen min-w-0 gap-4 text-app-primary 2xl:grid-cols-[minmax(0,1fr)_340px] 2xl:gap-6">
      <main className="min-w-0 space-y-5">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Calendar</h1>
            <p className="mt-1 text-base text-app-muted">Plan your day, stay on track</p>
          </div>
          <button className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#6D38E8] px-5 text-sm font-semibold shadow-lg shadow-[#7C3AED]/25 sm:w-auto lg:self-start">
            <Plus className="h-4 w-4" />
            New Task
          </button>
        </header>

        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button className="h-10 rounded-lg border border-app-border bg-app-elevated px-5 text-sm">Today</button>
            <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-app-border bg-app-elevated"><ChevronLeft className="h-4 w-4" /></button>
            <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-app-border bg-app-elevated"><ChevronRight className="h-4 w-4" /></button>
            <button className="flex h-10 items-center gap-2 rounded-lg px-1 text-base font-medium sm:px-3 sm:text-lg">
              May 20 - May 26, 2024
              <ChevronDown className="h-4 w-4 text-app-subtle" />
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex overflow-x-auto rounded-lg border border-app-border bg-app-elevated p-1 text-sm text-app-muted">
              {["Day", "Week", "Month", "Agenda"].map((item) => (
                <button key={item} className={`rounded-md px-3 py-2 sm:px-4 ${item === "Week" ? "bg-[#4F3ACD] text-white" : ""}`}>{item}</button>
              ))}
            </div>
            <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-app-border bg-app-elevated"><Settings className="h-4 w-4" /></button>
          </div>
        </div>

        <Panel className="overflow-x-auto">
          <div className="min-w-[1120px]">
            <div className="grid grid-cols-[68px_repeat(7,1fr)] border-b border-app-border">
              <div className="border-r border-app-border" />
              {days.map((day) => (
                <div key={day.name} className="border-r border-app-border px-4 py-4 text-center last:border-r-0">
                  <p className="text-base font-semibold">{day.name}</p>
                  <p className="mt-1 text-sm text-app-muted">{day.date}</p>
                  {day.active && <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#6D38E8] text-sm font-semibold">21</span>}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-[68px_repeat(7,1fr)] border-b border-app-border">
              <div className="flex h-14 items-center justify-end border-r border-app-border pr-3 text-xs text-app-muted">
                GMT+5:30
              </div>
              {days.map((day) => (
                <div key={`${day.name}-focus`} className="flex h-14 items-center border-r border-app-border px-5 text-xs text-app-muted last:border-r-0">
                  <span className="inline-flex items-center gap-2">
                    <Clock3 className="h-4 w-4 text-[#7C3AED]" />
                    Focus
                  </span>
                  <span className="ml-2">{day.focus}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-[68px_repeat(7,1fr)]">
              <div className="border-r border-app-border">
                {times.map((time) => (
                  <div key={time} className="flex h-16 items-start justify-end border-b border-app-border pr-3 pt-1 text-sm text-app-subtle">{time}</div>
                ))}
              </div>

              {days.map((day, dayIndex) => (
                <div key={day.name} className="relative border-r border-app-border last:border-r-0" style={{ height: 1142 }}>
                  {times.map((time) => (
                    <div key={`${day.name}-${time}`} className="h-16 border-b border-app-border" />
                  ))}
                  {dayIndex === 2 && (
                    <div className="absolute left-0 right-0 top-[352px] z-20 flex items-center">
                      <span className="h-3 w-3 rounded-full bg-red-500" />
                      <span className="h-px flex-1 bg-red-500" />
                      <span className="absolute left-2 -top-5 text-sm font-semibold text-red-400">10:30 AM</span>
                    </div>
                  )}
                  {events.filter((event) => event.day === dayIndex).map((event) => (
                    <div
                      key={`${event.day}-${event.title}-${event.start}`}
                      className={`absolute left-2 right-2 rounded-lg border p-2.5 text-xs shadow-lg ${eventStyles[event.type]}`}
                      style={{ top: event.start * 64, height: Math.max(56, event.duration * 64) }}
                    >
                      <p className="text-[11px] opacity-90">{event.time}</p>
                      <p className="mt-1 font-semibold text-white">{event.title}</p>
                      {event.meta && <p className="mt-1 font-medium opacity-90">{event.meta}</p>}
                    </div>
                  ))}
                  {(dayIndex === 5 || dayIndex === 6) && (
                    <p className="absolute left-0 right-0 top-[560px] text-center text-sm text-app-muted">Free Time</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Panel>

        <div className="flex flex-wrap justify-center gap-6 text-xs text-app-muted">
          {[
            ["Deep Work", "#7C3AED"],
            ["Backend", "#3B82F6"],
            ["Frontend", "#6D38E8"],
            ["Health", "#22C55E"],
            ["Learning", "#06B6D4"],
            ["Planning", "#EC4899"],
            ["Break", "#F59E0B"],
          ].map(([label, color]) => (
            <span key={label} className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />{label}</span>
          ))}
        </div>
      </main>

      <aside className="space-y-4">
        <Panel className="p-5">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Upcoming Tasks</h2>
            <button className="text-xs text-[#3B82F6]">View all</button>
          </div>
          <div className="space-y-5">
            {upcoming.map((item) => (
              <div key={item.title} className="grid grid-cols-[22px_1fr_auto] gap-3">
                <Circle className="mt-1 h-4 w-4 text-app-muted" />
                <div>
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="mt-1 text-xs" style={{ color: item.color }}>{item.project}</p>
                </div>
                <div className="text-right text-xs">
                  <p>{item.time.split(" ")[0]}</p>
                  <p className="mt-1 text-app-muted">{item.time.replace(item.time.split(" ")[0], "").trim()}</p>
                  <span className={`mt-2 inline-flex rounded-md px-2 py-1 font-semibold ${item.priority === "High" ? "bg-rose-500/15 text-rose-300" : "bg-orange-500/15 text-orange-300"}`}>
                    {item.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel className="p-5">
          <div className="mb-5 flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold">Daily Progress</h2>
              <p className="mt-1 text-sm text-app-muted">May 21, 2024</p>
            </div>
            <button className="text-xs text-[#3B82F6]">Edit Goal</button>
          </div>
          <div className="flex items-center gap-5">
            <div className="relative h-24 w-24">
              <svg className="h-24 w-24 -rotate-90" viewBox="0 0 96 96" aria-hidden="true">
                <circle cx="48" cy="48" r="34" fill="none" stroke="#334155" strokeWidth="9" />
                <circle cx="48" cy="48" r="34" fill="none" stroke="#7C3AED" strokeWidth="9" strokeDasharray="214" strokeDashoffset="54" strokeLinecap="round" />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xl font-semibold">75%</span>
            </div>
            <div>
              <p className="text-sm text-app-muted">Daily Goal</p>
              <p className="mt-1 text-xl font-semibold">3h 30m / 4h 30m</p>
            </div>
          </div>
          <div className="mt-5 space-y-3 text-sm">
            <p className="flex justify-between"><span className="text-app-muted">Focused Time</span><span>3h 15m</span></p>
            <p className="flex justify-between"><span className="text-app-muted">Break Time</span><span>45m</span></p>
            <p className="flex justify-between"><span className="text-app-muted">Remaining</span><span>1h 15m</span></p>
          </div>
          <div className="mt-5 flex h-16 items-end gap-3 border-t border-app-border pt-4">
            {[8, 16, 28, 52, 42, 18, 12, 35, 50, 10, 8, 12, 22].map((height, index) => (
              <span key={index} className="flex-1 rounded-t bg-[#7C3AED]" style={{ height: `${height}%` }} />
            ))}
          </div>
        </Panel>

        <Panel className="p-5">
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[#A855F7]" />
            <h2 className="text-lg font-semibold">AI Schedule Assistant</h2>
            <span className="rounded-md bg-[#1D2A65] px-2 py-0.5 text-[10px] font-semibold text-blue-200">Beta</span>
          </div>
          <div className="rounded-lg border border-app-border bg-app-soft p-4 text-sm leading-6 text-app-muted">
            You have a high task load tomorrow. Consider rescheduling one of your deep work sessions.
          </div>
          <button className="mt-4 w-full rounded-lg bg-[#6D38E8] py-3 text-sm font-semibold">
            Optimize My Schedule
          </button>
        </Panel>
      </aside>
    </div>
  );
}
