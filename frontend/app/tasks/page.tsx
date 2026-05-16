"use client";

import React from "react";
import {
  AlarmClock,
  BarChart3,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Circle,
  ClipboardList,
  Filter,
  Grid2X2,
  List,
  MoreHorizontal,
  Plus,
  Rocket,
  Search,
  Sparkles,
} from "lucide-react";

const stats = [
  { label: "All Tasks", value: "86", sub: "Total tasks", icon: ClipboardList, color: "#CBD5E1" },
  { label: "To Do", value: "32", sub: "37% of tasks", icon: Circle, color: "#94A3B8" },
  { label: "In Progress", value: "18", sub: "21% of tasks", icon: BarChart3, color: "#3B82F6" },
  { label: "Completed", value: "36", sub: "42% of tasks", icon: Check, color: "#22C55E" },
  { label: "Overdue", value: "7", sub: "8% of tasks", icon: AlarmClock, color: "#EF4444" },
];

const tasks = [
  { title: "Solve 2 Graph Problems", desc: "Revise DFS, BFS and Topological Sort", project: "DSA Preparation", priority: "High", status: "In Progress", date: "May 20, 2024", day: "Today", time: "90m", accent: "#7C3AED" },
  { title: "Design Parking Lot", desc: "Low-level design with OOPs principles", project: "System Design", priority: "High", status: "To Do", date: "May 21, 2024", day: "Tomorrow", time: "120m", accent: "#F97316" },
  { title: "Implement JWT Auth", desc: "Spring Security + JWT implementation", project: "Backend Development", priority: "Medium", status: "In Progress", date: "May 22, 2024", day: "Wed", time: "60m", accent: "#22C55E" },
  { title: "Read about Rate Limiting", desc: "Study different algorithms", project: "System Design", priority: "Medium", status: "To Do", date: "May 23, 2024", day: "Thu", time: "45m", accent: "#64748B" },
  { title: "Mock Interview - Round 1", desc: "Behavioral and technical round", project: "Mock Interviews", priority: "High", status: "To Do", date: "May 24, 2024", day: "Fri", time: "90m", accent: "#EF4444" },
  { title: "Create React Dashboard", desc: "Analytics dashboard UI", project: "Frontend Development", priority: "Medium", status: "To Do", date: "May 25, 2024", day: "Sat", time: "180m", accent: "#EC4899" },
  { title: "Optimize SQL Queries", desc: "Indexing and query optimization", project: "Backend Development", priority: "Low", status: "Completed", date: "May 18, 2024", day: "Sat", time: "60m", accent: "#22C55E" },
  { title: "Workout - Upper Body", desc: "Strength training", project: "Health & Fitness", priority: "Low", status: "Completed", date: "May 17, 2024", day: "Fri", time: "45m", accent: "#94A3B8" },
];

const upcoming = [
  { title: "Design Parking Lot", project: "System Design", date: "May 21", day: "Tomorrow", priority: "High", color: "#3B82F6" },
  { title: "Implement JWT Auth", project: "Backend Development", date: "May 22", day: "Wed", priority: "", color: "#22C55E" },
  { title: "Read about Rate Limiting", project: "System Design", date: "May 23", day: "Thu", priority: "Medium", color: "#3B82F6" },
];

const calendarDays = [
  ["29", "30", "1", "2", "3", "4", "5"],
  ["6", "7", "8", "9", "10", "11", "12"],
  ["15", "14", "15", "16", "17", "18", "19"],
  ["20", "21", "22", "23", "24", "25", "26"],
  ["27", "28", "29", "30", "31", "1", "2"],
];

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-xl border border-app-border bg-app-panel shadow-[0_16px_50px_rgba(0,0,0,0.22)] ${className}`}>
      {children}
    </section>
  );
}

function Pill({ children, type }: { children: React.ReactNode; type: "project" | "priority" | "status"; }) {
  const text = String(children);
  const palette =
    type === "status"
      ? text === "Completed"
        ? "bg-emerald-500/15 text-emerald-300"
        : text === "In Progress"
          ? "bg-blue-500/15 text-blue-300"
          : "bg-app-soft text-app-primary"
      : type === "priority"
        ? text === "High"
          ? "bg-rose-500/15 text-rose-300"
          : text === "Medium"
            ? "bg-orange-500/15 text-orange-300"
            : "bg-emerald-500/15 text-emerald-300"
        : text.includes("Backend")
          ? "bg-emerald-500/12 text-emerald-300"
          : text.includes("System")
            ? "bg-blue-500/12 text-blue-300"
            : text.includes("DSA")
              ? "bg-purple-500/12 text-purple-300"
              : text.includes("Frontend")
                ? "bg-pink-500/12 text-pink-300"
                : text.includes("Health")
                  ? "bg-yellow-500/12 text-yellow-300"
                  : "bg-orange-500/12 text-orange-300";

  return <span className={`inline-flex rounded-md px-2.5 py-1 text-xs font-semibold ${palette}`}>{children}</span>;
}

export default function TasksPage() {
  return (
    <div className="grid min-h-screen min-w-0 gap-4 text-app-primary 2xl:grid-cols-[minmax(0,1fr)_360px] 2xl:gap-6">
      <main className="min-w-0 space-y-5">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Tasks</h1>
            <p className="mt-1 text-base text-app-muted">Manage and track all your tasks</p>
          </div>
          <div className="flex w-full flex-wrap items-center gap-3 lg:w-auto">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-app-subtle" />
              <input className="h-11 w-full rounded-lg border border-app-border bg-app-input pl-10 pr-3 text-sm outline-none placeholder:text-[#64748B] focus:border-[#7C3AED]" placeholder="Search tasks..." />
            </div>
            <button className="flex h-11 flex-1 items-center justify-center gap-2 rounded-lg border border-app-border bg-app-input px-4 text-sm text-app-secondary sm:flex-none">
              <Filter className="h-4 w-4" />
              Filter
            </button>
            <button className="flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-[#6D38E8] px-4 text-sm font-semibold shadow-lg shadow-[#7C3AED]/25 sm:flex-none">
              <Plus className="h-4 w-4" />
              New Task
            </button>
          </div>
        </header>

        <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
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

        <Panel className="overflow-hidden">
          <div className="flex flex-col gap-3 border-b border-app-border px-4 py-3 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-wrap gap-7 text-sm">
              {["All Tasks", "My Tasks", "Today", "Upcoming", "Overdue"].map((tab, index) => (
                <button key={tab} className={`relative py-2 ${index === 0 ? "text-app-primary" : "text-app-muted"}`}>
                  {tab}
                  {index === 0 && <span className="absolute inset-x-0 -bottom-3 h-0.5 rounded-full bg-[#7C3AED]" />}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 overflow-x-auto">
              <div className="flex shrink-0 rounded-lg border border-app-border bg-app-elevated p-1 text-sm text-app-muted">
                <button className="flex items-center gap-2 rounded-md bg-[#4F3ACD] px-3 py-2 text-white"><List className="h-4 w-4" />List</button>
                <button className="flex items-center gap-2 rounded-md px-3 py-2"><Grid2X2 className="h-4 w-4" />Board</button>
                <button className="flex items-center gap-2 rounded-md px-3 py-2"><CalendarDays className="h-4 w-4" />Calendar</button>
              </div>
              <button className="flex items-center gap-2 rounded-lg border border-app-border bg-app-elevated px-3 text-sm text-app-muted">
                Sort: Priority
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-[980px] w-full text-left">
              <thead className="bg-app-soft text-sm text-app-muted">
                <tr>
                  <th className="w-12 px-4 py-3"><span className="block h-4 w-4 rounded border border-[#64748B]" /></th>
                  <th className="px-4 py-3 font-medium">Task</th>
                  <th className="px-4 py-3 font-medium">Project</th>
                  <th className="px-4 py-3 font-medium">Priority</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Due Date</th>
                  <th className="px-4 py-3 font-medium">Time Est.</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.title} className="border-t border-app-border bg-app-elevated/30 transition hover:bg-app-soft">
                    <td className="px-4 py-4"><span className="block h-4 w-4 rounded border border-[#64748B]" /></td>
                    <td className="px-4 py-4">
                      <div className="flex gap-3">
                        <span className="mt-1 h-8 w-1 rounded-full" style={{ backgroundColor: task.accent }} />
                        <div>
                          <p className="font-semibold">{task.title} <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" /></p>
                          <p className="mt-1 text-sm text-app-subtle">{task.desc}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4"><Pill type="project">{task.project}</Pill></td>
                    <td className="px-4 py-4"><Pill type="priority">{task.priority}</Pill></td>
                    <td className="px-4 py-4"><Pill type="status">{task.status}</Pill></td>
                    <td className="px-4 py-4">
                      <p className="text-sm">{task.date}</p>
                      <p className={`mt-1 text-sm ${task.day === "Tomorrow" ? "text-orange-300" : task.day === "Today" ? "text-emerald-300" : "text-app-muted"}`}>{task.day}</p>
                    </td>
                    <td className="px-4 py-4 text-sm text-app-muted">{task.time}</td>
                    <td className="px-4 py-4"><MoreHorizontal className="h-5 w-5 text-app-subtle" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-3 border-t border-app-border px-4 py-4 text-sm text-app-muted sm:flex-row sm:items-center sm:justify-between">
            <p>Showing 1 to 8 of 86 tasks</p>
            <div className="flex items-center gap-2">
              <button className="rounded-lg border border-app-border bg-app-elevated p-2 text-[#64748B]"><ChevronLeft className="h-4 w-4" /></button>
              <button className="rounded-lg bg-[#4F3ACD] px-3 py-2 text-white">1</button>
              <button className="rounded-lg border border-app-border bg-app-elevated px-3 py-2 text-app-primary">2</button>
              <button className="rounded-lg border border-app-border bg-app-elevated px-3 py-2 text-app-primary">3</button>
              <button className="rounded-lg border border-app-border bg-app-elevated px-3 py-2 text-app-subtle">...</button>
              <button className="rounded-lg border border-app-border bg-app-elevated px-3 py-2 text-app-primary">11</button>
              <button className="rounded-lg border border-app-border bg-app-elevated p-2 text-app-primary"><ChevronRight className="h-4 w-4" /></button>
            </div>
          </div>
        </Panel>
      </main>

      <aside className="space-y-4">
        <Panel className="p-5">
          <h2 className="mb-5 text-lg font-semibold">Task Summary</h2>
          <div className="grid gap-5 sm:grid-cols-[150px_1fr] 2xl:grid-cols-1">
            <div className="relative h-36 w-36">
              <svg className="h-36 w-36 -rotate-90" viewBox="0 0 144 144" aria-hidden="true">
                <circle cx="72" cy="72" r="52" fill="none" stroke="#334155" strokeWidth="14" />
                <circle cx="72" cy="72" r="52" fill="none" stroke="#22C55E" strokeWidth="14" strokeDasharray="327" strokeDashoffset="104" />
                <circle cx="72" cy="72" r="52" fill="none" stroke="#3B82F6" strokeWidth="14" strokeDasharray="327" strokeDashoffset="254" className="rotate-[245deg] origin-center" />
                <circle cx="72" cy="72" r="52" fill="none" stroke="#EF4444" strokeWidth="14" strokeDasharray="327" strokeDashoffset="300" className="rotate-[318deg] origin-center" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-semibold">68%</span>
                <span className="text-xs text-app-muted">Tasks</span>
                <span className="text-xs text-app-muted">Completed</span>
              </div>
            </div>
            <div className="space-y-4 text-sm">
              {[
                ["Completed", "36", "#22C55E"],
                ["In Progress", "18", "#3B82F6"],
                ["To Do", "32", "#64748B"],
                ["Overdue", "7", "#EF4444"],
              ].map(([label, value, color]) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />{label}</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </Panel>

        <Panel className="p-5">
          <h2 className="mb-5 text-lg font-semibold">Upcoming Tasks</h2>
          <div className="space-y-5">
            {upcoming.map((item) => (
              <div key={item.title} className="grid grid-cols-[34px_1fr_auto] gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full" style={{ backgroundColor: item.color }}>
                  <Rocket className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="mt-1 text-xs" style={{ color: item.color }}>{item.project}</p>
                </div>
                <div className="text-right text-xs">
                  <p>{item.date}</p>
                  <p className={item.day === "Tomorrow" ? "text-orange-300" : "text-app-muted"}>{item.day}</p>
                  {item.priority && <Pill type="priority">{item.priority}</Pill>}
                </div>
              </div>
            ))}
          </div>
          <button className="mt-5 w-full text-sm text-[#A78BFA]">View all upcoming tasks →</button>
        </Panel>

        <Panel className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Calendar</h2>
            <div className="flex items-center gap-3 text-sm">
              <span>May 2024</span>
              <ChevronLeft className="h-4 w-4" />
              <ChevronRight className="h-4 w-4" />
              <span>Today</span>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-2 text-center text-xs text-app-muted">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => <span key={day}>{day}</span>)}
            {calendarDays.flat().map((day, index) => (
              <span key={`${day}-${index}`} className={`rounded-full py-1.5 ${day === "20" ? "bg-[#6D38E8] text-white" : "text-app-secondary"}`}>
                {day}
              </span>
            ))}
          </div>
        </Panel>

        <Panel className="p-5">
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[#A855F7]" />
            <h2 className="text-lg font-semibold">AI Suggestions</h2>
            <span className="rounded-md bg-[#1D2A65] px-2 py-0.5 text-[10px] font-semibold text-blue-200">Beta</span>
          </div>
          <p className="text-sm text-app-muted">Based on your patterns, I suggest:</p>
          <div className="mt-4 space-y-3 text-sm text-app-muted">
            <p>⏱ You have 3 high priority tasks pending</p>
            <p>⚙ Best focus time for deep work: 7AM - 10AM</p>
            <p>↻ Consider rescheduling 2 overdue tasks</p>
          </div>
          <button className="mt-5 w-full rounded-lg bg-[#6D38E8] py-3 text-sm font-semibold">View All Insights</button>
        </Panel>
      </aside>
    </div>
  );
}
