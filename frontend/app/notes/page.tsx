"use client";

import React from "react";
import {
  Archive,
  Bold,
  CheckCircle2,
  CheckSquare,
  Code2,
  ExternalLink,
  FileText,
  Folder,
  ImageIcon,
  Italic,
  Link2,
  List,
  ListOrdered,
  MoreHorizontal,
  Plus,
  Search,
  Share2,
  Star,
  Table,
  Trash2,
  Underline,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const folders: Array<{ name: string; count: string; icon: LucideIcon }> = [
  { name: "All Notes", count: "128", icon: FileText },
  { name: "Favorites", count: "24", icon: Star },
  { name: "Work", count: "45", icon: Folder },
  { name: "Personal", count: "32", icon: Folder },
  { name: "Ideas", count: "18", icon: Folder },
  { name: "Archive", count: "14", icon: Archive },
  { name: "Trash", count: "3", icon: Trash2 },
];

const labels = [
  ["Important", "18", "#F43F5E"],
  ["Ideas", "24", "#7C3AED"],
  ["Meeting", "12", "#3B82F6"],
  ["Research", "16", "#22C55E"],
  ["Daily Logs", "20", "#FACC15"],
];

const notes = [
  ["Project Roadmap Plan", "Outline of the roadmap for Q2 and upcoming milestones...", "10:30 AM", true, "#FACC15"],
  ["Daily Reflection – May 12", "What went well today: - Focused for 3 deep work sessions...", "Yesterday", false, ""],
  ["Content Ideas Brainstorm", "List of content ideas for the next 4 weeks across platforms...", "Yesterday", false, "#7C3AED"],
  ["User Interview Notes", "Key takeaways from the interview with 5 users...", "May 11", false, "#3B82F6"],
  ["Book Notes – Atomic Habits", "Tiny changes, remarkable results. Key concepts:", "May 10", false, "#22C55E"],
  ["Workout Plan", "Weekly workout routine and progress tracking...", "May 10", false, ""],
  ["Product Launch Checklist", "Pre-launch tasks and checklist for the product launch...", "May 9", true, "#FACC15"],
];

const milestones = [
  ["Research & User Feedback Analysis", "Completed"],
  ["Define MVP Scope", "In Progress"],
  ["Design System Updates", "Planned"],
  ["Core Feature Development", "Planned"],
  ["Beta Testing", "Planned"],
  ["Official Launch", "Planned"],
];

const pinned = [
  ["Product Vision", "Defining the long-term vision and impact...", "May 8"],
  ["Q2 Goals", "Goals and key results for this quarter...", "May 7"],
  ["Meeting Notes – Team Sync", "Discussion points and decisions from today&apos;s...", "May 6"],
];

const recent = [
  ["Learning Plan – Web Dev", "May 12, 2025", "#22C55E"],
  ["Daily Journal – May 11", "May 11, 2025", "#7C3AED"],
  ["Blog Post Draft", "May 12, 2025", "#EC4899"],
  ["Competitor Analysis", "May 10, 2025", "#3B82F6"],
  ["Ideas for Mobile App", "May 11, 2025", "#F59E0B"],
  ["Travel Plan – Goa Trip", "May 10, 2025", "#14B8A6"],
];

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-xl border border-app-border bg-app-panel shadow-[0_16px_50px_rgba(0,0,0,0.22)] ${className}`}>
      {children}
    </section>
  );
}

export default function NotesPage() {
  return (
    <div className="min-h-screen min-w-0 space-y-4 text-app-primary">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Notes</h1>
          <p className="mt-1 text-base text-app-muted">Capture ideas. Organize thoughts. Build knowledge.</p>
        </div>
        <div className="flex w-full flex-wrap items-center gap-3 lg:w-auto lg:gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-app-subtle" />
            <input className="h-11 w-full rounded-full border border-app-border bg-app-input pl-11 pr-12 text-sm outline-none placeholder:text-[#64748B] focus:border-[#7C3AED]" placeholder="Search notes..." />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md bg-app-soft px-2 py-1 text-xs text-app-muted">⌘ K</span>
          </div>
          <button className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#6D38E8] px-5 text-sm font-semibold shadow-lg shadow-[#7C3AED]/25 sm:w-auto">
            <Plus className="h-4 w-4" />
            New Note
          </button>
        </div>
      </header>

      <section className="grid min-w-0 gap-4 xl:grid-cols-[250px_360px_minmax(0,1fr)]">
        <Panel className="overflow-hidden">
          <div className="border-b border-app-border p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-semibold">Folders</h2>
              <button className="rounded-md bg-white/5 p-1.5"><Plus className="h-4 w-4" /></button>
            </div>
            <div className="space-y-1">
              {folders.map(({ name, count, icon: Icon }, index) => (
                <button key={name} className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm ${index === 0 ? "bg-[#31205F]" : "hover:bg-app-soft"}`}>
                  <span className="flex items-center gap-3"><Icon className="h-4 w-4 text-[#A78BFA]" />{name}</span>
                  <span className="text-app-muted">{count}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-semibold">Labels</h2>
              <button className="rounded-md bg-white/5 p-1.5"><Plus className="h-4 w-4" /></button>
            </div>
            <div className="space-y-2">
              {labels.map(([name, count, color]) => (
                <button key={name as string} className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-app-soft">
                  <span className="flex items-center gap-3"><span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color as string }} />{name}</span>
                  <span className="text-app-muted">{count}</span>
                </button>
              ))}
            </div>
          </div>
        </Panel>

        <Panel className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-app-border p-5">
            <h2 className="font-semibold">All Notes⌄</h2>
            <button className="text-sm text-app-muted">Newest</button>
          </div>
          <div className="divide-y divide-white/10">
            {notes.map(([title, body, time, starred, dot], index) => (
              <button key={title as string} className={`w-full p-4 text-left ${index === 0 ? "bg-[#101A2E] shadow-[inset_3px_0_0_#7C3AED]" : "hover:bg-app-soft"}`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold">{title}</p>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-app-muted">{body}</p>
                  </div>
                  <div className="text-right">
                    {starred && <Star className="mb-6 h-4 w-4 fill-[#FACC15] text-[#FACC15]" />}
                    {dot && !starred && <span className="mb-6 ml-auto block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: dot as string }} />}
                    <p className="text-xs text-app-muted">{time}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </Panel>

        <Panel className="min-w-0 p-4 sm:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="flex items-center gap-3 text-xl font-semibold sm:text-2xl">Project Roadmap Plan <Star className="h-5 w-5 fill-[#FACC15] text-[#FACC15]" /></h2>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
                <span className="rounded-full bg-[#7C3AED]/20 px-3 py-1 text-[#C4B5FD]">Work</span>
                <span className="rounded-full bg-[#3B82F6]/20 px-3 py-1 text-[#93C5FD]">Important</span>
                <span className="text-app-subtle">+ Add label</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-app-muted">
              <span>Edited 10:30 AM</span>
              <Share2 className="h-5 w-5" />
              <MoreHorizontal className="h-5 w-5" />
              <ExternalLink className="h-5 w-5" />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4 rounded-lg border border-app-border bg-app-elevated px-4 py-3 text-app-muted">
            <span>H1</span><span>H2</span><span>H3</span><List className="h-5 w-5" /><ListOrdered className="h-5 w-5" /><CheckSquare className="h-5 w-5" /><Bold className="h-5 w-5" /><Italic className="h-5 w-5" /><Underline className="h-5 w-5" /><span className="text-red-300">A</span><Link2 className="h-5 w-5" /><ImageIcon className="h-5 w-5" /><Table className="h-5 w-5" /><Code2 className="h-5 w-5" />
          </div>

          <article className="mt-6 space-y-6">
            <section>
              <h3 className="mb-3 text-lg font-semibold text-[#A78BFA]">Overview</h3>
              <p className="max-w-4xl leading-7 text-[#F9FAFB]">This roadmap outlines the major milestones and deliverables for Q2. Our goal is to improve user experience, performance, and add key new features based on user feedback.</p>
            </section>
            <div className="h-px bg-app-border" />
            <section>
              <h3 className="mb-3 text-lg font-semibold text-[#A78BFA]">Milestones</h3>
              <div className="space-y-3">
                {milestones.map(([title, status], index) => (
                  <div key={title} className="flex flex-wrap items-center gap-3">
                    <span className={`flex h-5 w-5 items-center justify-center rounded border ${index === 0 ? "border-emerald-400 bg-emerald-500" : "border-[#94A3B8]"}`}>{index === 0 && <CheckCircle2 className="h-4 w-4 text-white" />}</span>
                    <span>{title}</span>
                    <span className={`rounded-md px-2 py-1 text-xs ${status === "Completed" ? "bg-emerald-500/15 text-emerald-300" : status === "In Progress" ? "bg-blue-500/15 text-blue-300" : "bg-[#7C3AED]/15 text-[#C4B5FD]"}`}>{status}</span>
                  </div>
                ))}
              </div>
            </section>
            <div className="h-px bg-app-border" />
            <section>
              <h3 className="mb-3 text-lg font-semibold text-[#A78BFA]">Notes</h3>
              <ul className="list-disc space-y-2 pl-6 text-[#F9FAFB]">
                <li>Focus on speed and quality.</li>
                <li>Keep users in the loop.</li>
                <li>Validate assumptions early and often.</li>
              </ul>
            </section>
          </article>
          <p className="mt-8 text-right text-sm text-app-subtle">524 words  |  3 min read</p>
        </Panel>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1fr_1fr]">
        <Panel className="p-5">
          <div className="mb-5 flex items-center justify-between"><h2 className="font-semibold">Pinned Notes</h2><button className="text-sm text-app-muted">View All</button></div>
          <div className="grid gap-4 md:grid-cols-3">
            {pinned.map(([title, body, date], index) => (
              <div key={title} className="rounded-lg border border-app-border p-4">
                <p className="flex justify-between font-semibold">{title}<Star className={`h-4 w-4 ${index !== 1 ? "fill-[#FACC15] text-[#FACC15]" : "text-transparent"}`} /></p>
                <p className="mt-4 text-sm leading-6 text-app-muted">{body}</p>
                <p className="mt-6 text-sm text-app-muted">{date}</p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel className="p-5">
          <div className="mb-5 flex items-center justify-between"><h2 className="font-semibold">Recent Notes</h2><button className="text-sm text-app-muted">View All</button></div>
          <div className="grid gap-4 md:grid-cols-2">
            {recent.map(([title, date, color]) => (
              <div key={title} className="flex items-center gap-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ backgroundColor: color as string }}>
                  <FileText className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-medium">{title}</p>
                  <p className="text-sm text-app-muted">{date}</p>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </section>
    </div>
  );
}
