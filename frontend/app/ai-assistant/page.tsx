"use client";

import React from "react";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Clock,
  History,
  Mic,
  Paperclip,
  Plus,
  Send,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";

const chats = [
  ["Plan my next 3 months", "2 min ago"],
  ["How can I improve focus?", "Yesterday"],
  ["Why am I behind on tasks?", "2 days ago"],
  ["Break down System Design", "3 days ago"],
  ["Suggest tasks for today", "4 days ago"],
];

const phases = [
  {
    title: "Phase 1",
    heading: "Foundation Building",
    weeks: "Weeks 1-4",
    color: "#06B6D4",
    items: ["DSA Fundamentals", "Basic System Design", "Core CS Concepts", "Daily Coding Practice"],
    goal: "Daily Goal: 1 hr DSA + 1 hr Concepts + 1 hr Practice",
  },
  {
    title: "Phase 2",
    heading: "Skill Building",
    weeks: "Weeks 5-8",
    color: "#A78BFA",
    items: ["Advanced DSA", "System Design (LLD + HLD)", "Database & OS", "Start Mock Interviews"],
    goal: "Daily Goal: 1.5 hr DSA + 1 hr SD + 0.5 hr Mock",
  },
  {
    title: "Phase 3",
    heading: "Polish & Practice",
    weeks: "Weeks 9-12",
    color: "#22C55E",
    items: ["Mock Interviews (Regular)", "Behavioral Preparation", "Resume & Projects Review", "Contest & Problem Solving"],
    goal: "Daily Goal: 1 hr DSA + 1 hr Mock + 1 hr Revision",
  },
];

const actions = [
  "Break down a goal into tasks",
  "Generate study / work plan",
  "Optimize my schedule",
  "Analyze my productivity",
  "Weekly review & summary",
];

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-xl border border-app-border bg-app-panel shadow-[0_16px_50px_rgba(0,0,0,0.14)] ${className}`}>
      {children}
    </section>
  );
}

export default function AiAssistantPage() {
  return (
    <div className="grid min-h-screen min-w-0 gap-4 text-app-primary 2xl:grid-cols-[minmax(0,1fr)_360px] 2xl:gap-5">
      <main className="min-w-0 space-y-5">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="flex items-center gap-3 text-3xl font-semibold tracking-tight">
              <Sparkles className="h-6 w-6 text-[#A855F7]" />
              AI Assistant
            </h1>
            <p className="mt-1 text-base text-app-muted">Your intelligent productivity partner</p>
          </div>
          <div className="flex w-full gap-3 sm:w-auto">
            <button className="flex h-11 flex-1 items-center justify-center gap-2 rounded-lg border border-[#7C3AED] px-5 text-sm font-semibold text-[#7C3AED] dark:text-[#A78BFA] sm:flex-none">
              <Plus className="h-4 w-4" />
              New Chat
            </button>
            <button className="flex h-11 w-11 items-center justify-center rounded-lg border border-app-border bg-app-elevated">
              <History className="h-5 w-5" />
            </button>
          </div>
        </header>

        <Panel className="grid min-h-[calc(100vh-145px)] min-w-0 overflow-hidden xl:grid-cols-[260px_1fr]">
          <aside className="max-h-72 overflow-y-auto border-b border-app-border p-4 sm:p-5 xl:max-h-none xl:border-b-0 xl:border-r">
            <h2 className="mb-5 text-lg font-semibold">Chat History</h2>
            <div className="space-y-2">
              {chats.map(([title, time], index) => (
                <button key={title} className={`w-full rounded-lg p-3 text-left transition ${index === 0 ? "bg-[#6D38E8] text-white" : "hover:bg-app-soft"}`}>
                  <p className="text-sm font-semibold">{title}</p>
                  <p className={`mt-1 text-xs ${index === 0 ? "text-white/70" : "text-app-muted"}`}>{time}</p>
                </button>
              ))}
            </div>
            <button className="mt-4 flex items-center gap-2 px-3 text-sm text-[#7C3AED] dark:text-[#A78BFA]">
              View all conversations
              <ArrowRight className="h-4 w-4" />
            </button>
          </aside>

          <section className="flex min-h-[620px] min-w-0 flex-col p-4 sm:p-5 xl:min-h-[720px]">
            <div className="flex justify-end">
              <div className="max-w-full rounded-xl bg-[#4F2DBE] px-4 py-3 text-white shadow-lg shadow-[#7C3AED]/20 sm:max-w-[620px] sm:px-6 sm:py-4">
                <p>I have interviews in 3 months and can study 3 hours daily.</p>
                <p className="mt-2">Create a plan for me.</p>
                <p className="mt-2 text-right text-xs text-purple-100">10:30 AM</p>
              </div>
            </div>

            <div className="mt-6 flex gap-3 sm:gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#7C3AED]/15 text-[#7C3AED] dark:text-[#A78BFA]">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="min-w-0 max-w-full rounded-xl border border-app-border bg-app-elevated/75 p-4 sm:max-w-[760px] sm:p-5">
                <p className="leading-7 text-app-secondary">
                  Got it. I&apos;ll create a structured 3-month roadmap for your interview preparation with 3 hours daily. Here&apos;s the high-level plan:
                </p>

                <div className="mt-5 rounded-xl border border-app-border bg-app-panel p-5">
                  <h2 className="mb-5 flex items-center gap-2 text-lg font-semibold">
                    <Target className="h-5 w-5 text-rose-400" />
                    3-Month Interview Preparation Plan
                  </h2>
                  <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                    {phases.map((phase) => (
                      <div key={phase.title} className="rounded-lg border border-app-border bg-app-soft p-4">
                        <p className="font-semibold" style={{ color: phase.color }}>{phase.title}</p>
                        <p className="mt-1 font-semibold" style={{ color: phase.color }}>{phase.heading}</p>
                        <p className="text-sm" style={{ color: phase.color }}>({phase.weeks})</p>
                        <div className="mt-4 space-y-3 text-sm text-app-muted">
                          {phase.items.map((item) => (
                            <p key={item} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />{item}</p>
                          ))}
                        </div>
                        <div className="mt-4 rounded-md bg-[#7C3AED]/15 px-3 py-2 text-xs text-[#6D38E8] dark:text-[#C4B5FD]">{phase.goal}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 border-t border-app-border pt-5">
                    <h3 className="mb-3 font-semibold">Weekly Milestones</h3>
                    <div className="space-y-2 text-sm text-app-secondary">
                      <p>Week 4: DSA basics strong, solved around 150 problems</p>
                      <p>Week 8: Comfortable with System Design, solved around 350 problems</p>
                      <p>Week 12: Confident and consistent in mocks, solved 600+ problems</p>
                    </div>
                  </div>
                </div>

                <p className="mt-5">Would you like me to generate the detailed weekly plan with topics and tasks?</p>
              </div>
            </div>

            <div className="mt-auto pt-5">
              <div className="mb-3 flex flex-wrap gap-3">
                {["Yes, generate detailed plan", "Add weekend schedule too", "Also create tasks for Week 1"].map((chip) => (
                  <button key={chip} className="rounded-lg border border-app-border bg-app-elevated px-4 py-2 text-sm text-[#7C3AED] dark:text-[#A78BFA]">{chip}</button>
                ))}
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-app-border bg-app-elevated p-2 sm:gap-3 sm:p-3">
                <input className="min-w-0 flex-1 bg-transparent px-1 text-sm outline-none placeholder:text-app-subtle" placeholder="Ask me anything about your goals, tasks, productivity..." />
                <Paperclip className="h-5 w-5 text-app-subtle" />
                <Mic className="h-5 w-5 text-app-subtle" />
                <button className="rounded-lg bg-[#6D38E8] p-2 text-white sm:p-3"><Send className="h-5 w-5" /></button>
              </div>
              <p className="mt-3 text-center text-xs text-app-subtle">AI can make mistakes. Consider checking important information.</p>
            </div>
          </section>
        </Panel>
      </main>

      <aside className="space-y-4">
        <Panel className="p-5">
          <div className="mb-5 flex items-center gap-2">
            <h2 className="text-lg font-semibold">AI Insights</h2>
            <span className="rounded-md bg-blue-500/15 px-2 py-0.5 text-[10px] font-semibold text-blue-500 dark:text-blue-200">BETA</span>
          </div>
          <div className="divide-y divide-app-border text-sm">
            <div className="flex gap-4 pb-5"><TrendingUp className="h-9 w-9 rounded-full bg-emerald-500/15 p-2 text-emerald-400" /><p><span className="font-semibold">You complete most deep work between 7AM - 10AM.</span><span className="mt-2 block text-app-muted">Consider scheduling difficult tasks in this window.</span></p></div>
            <div className="flex gap-4 py-5"><Clock className="h-9 w-9 rounded-full bg-orange-500/15 p-2 text-orange-400" /><p><span className="font-semibold">System Design tasks are getting delayed frequently.</span><span className="mt-2 block text-app-muted">Break them down into smaller sub-tasks?</span></p></div>
            <div className="flex gap-4 pt-5"><BarIcon /><p><span className="font-semibold">You&apos;re 18% more productive on days you follow a plan.</span><span className="mt-2 block text-app-muted">Keep up the consistency!</span></p></div>
          </div>
          <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-app-border py-3 text-[#7C3AED] dark:text-[#A78BFA]">View all insights <ArrowRight className="h-4 w-4" /></button>
        </Panel>

        <Panel className="p-5">
          <h2 className="mb-4 text-lg font-semibold">Popular Actions</h2>
          <div className="space-y-2">
            {actions.map((action) => (
              <button key={action} className="flex w-full items-center justify-between rounded-lg bg-app-soft px-4 py-3 text-left text-sm hover:bg-app-elevated">
                {action}
                <ChevronRight className="h-4 w-4 text-app-subtle" />
              </button>
            ))}
          </div>
        </Panel>

        <Panel className="p-5">
          <h2 className="text-lg font-semibold">Quick Add</h2>
          <p className="mt-4 text-sm text-app-muted">Add via AI, like &quot;Study Graph for 2 hrs tomorrow&quot;.</p>
          <div className="mt-3 flex rounded-lg border border-app-border bg-app-elevated p-2">
            <input className="min-w-0 flex-1 bg-transparent px-2 text-sm outline-none" />
            <button className="rounded-md bg-[#6D38E8] p-2 text-white"><ArrowRight className="h-5 w-5" /></button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {["Study DSA", "Read System Design", "Mock Interview", "Go to Gym"].map((tag) => (
              <button key={tag} className="rounded-md bg-[#7C3AED]/15 px-2 py-1 text-xs text-[#6D38E8] dark:text-[#C4B5FD]">{tag}</button>
            ))}
          </div>
        </Panel>
      </aside>
    </div>
  );
}

function BarIcon() {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-blue-400">
      <BarChart3 className="h-5 w-5" />
    </span>
  );
}
