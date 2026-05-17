"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  BarChart3,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  ChevronDown,
  Check,
  HeartPulse,
  Loader2,
  Pencil,
  Plus,
  Rocket,
  Search,
  Target,
  Trash2,
  Trophy,
  X,
} from "lucide-react";

type GoalStatus = "not_started" | "active" | "paused" | "completed" | "archived";
type GoalPriority = "low" | "medium" | "high";
type GoalCategory = "career" | "health" | "learning" | "finance" | "personal" | "project" | "other";

type Goal = {
  id: string;
  title: string;
  description?: string | null;
  category: GoalCategory;
  priority: GoalPriority;
  status: GoalStatus;
  target_date?: string | null;
  progress: number;
  created_at: string;
};

type GoalForm = {
  title: string;
  description: string;
  category: GoalCategory;
  priority: GoalPriority;
  status: GoalStatus;
  target_date: string;
};

type GoalTab = "All Goals" | "On Track" | "At Risk" | "Not Started" | "Completed";

const emptyForm: GoalForm = {
  title: "",
  description: "",
  category: "personal",
  priority: "medium",
  status: "not_started",
  target_date: "",
};

const categoryMeta: Record<GoalCategory, { label: string; color: string; icon: React.ElementType }> = {
  career: { label: "Career", color: "#7C3AED", icon: BriefcaseBusiness },
  health: { label: "Health", color: "#22C55E", icon: HeartPulse },
  learning: { label: "Learning", color: "#F59E0B", icon: BookOpen },
  finance: { label: "Finance", color: "#3B82F6", icon: BarChart3 },
  personal: { label: "Personal", color: "#8B5CF6", icon: Trophy },
  project: { label: "Project", color: "#06B6D4", icon: Rocket },
  other: { label: "Other", color: "#94A3B8", icon: Target },
};

const statusLabels: Record<GoalStatus, string> = {
  not_started: "Not Started",
  active: "Active",
  paused: "Paused",
  completed: "Completed",
  archived: "Archived",
};

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`rounded-xl border border-app-border bg-app-panel shadow-[0_16px_50px_rgba(0,0,0,0.14)] ${className}`}>{children}</section>;
}

function getGoalHealth(goal: Goal) {
  if (goal.status === "completed") return "Completed";
  if (goal.status === "paused") return "Paused";
  if (!goal.target_date || goal.status === "not_started") return "Not Started";

  const created = new Date(goal.created_at).getTime();
  const target = new Date(goal.target_date).getTime();
  const now = Date.now();

  if (Number.isNaN(target) || target <= created) return goal.progress >= 100 ? "Completed" : "At Risk";
  if (now > target && goal.progress < 100) return "At Risk";

  const expectedProgress = Math.min(100, Math.max(0, ((now - created) / (target - created)) * 100));
  return goal.progress + 15 < expectedProgress ? "At Risk" : "On Track";
}

function StatusBadge({ label }: { label: string }) {
  const cls =
    label === "Completed"
      ? "bg-purple-500/15 text-purple-500 dark:text-purple-300"
      : label === "At Risk"
        ? "bg-orange-500/15 text-orange-500 dark:text-orange-300"
        : label === "Paused"
          ? "bg-slate-500/15 text-slate-500 dark:text-slate-300"
          : label === "Not Started"
            ? "bg-blue-500/15 text-blue-500 dark:text-blue-300"
            : "bg-emerald-500/15 text-emerald-500 dark:text-emerald-300";
  return <span className={`rounded-md px-3 py-1.5 text-sm font-semibold ${cls}`}>{label}</span>;
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="text-sm font-semibold text-app-secondary">{children}</label>;
}

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<GoalTab>("All Goals");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [deletingGoalId, setDeletingGoalId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<GoalForm>(emptyForm);

  async function loadGoals() {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/goals", { cache: "no-store" });
      if (!response.ok) throw new Error("Failed to load goals");
      setGoals(await response.json());
    } catch {
      setError("Could not load goals. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadGoals();
  }, []);

  const filteredGoals = useMemo(() => {
    const term = query.trim().toLowerCase();
    return goals.filter((goal) => {
      const matchesQuery = !term || `${goal.title} ${goal.description ?? ""} ${goal.category}`.toLowerCase().includes(term);
      const matchesTab = activeTab === "All Goals" || getGoalHealth(goal) === activeTab;
      return matchesQuery && matchesTab;
    });
  }, [activeTab, goals, query]);

  const stats = useMemo(() => {
    const activeGoals = goals.filter((goal) => !["completed", "archived"].includes(goal.status));
    const completed = goals.filter((goal) => goal.status === "completed").length;
    const onTrack = goals.filter((goal) => getGoalHealth(goal) === "On Track").length;
    const atRisk = goals.filter((goal) => getGoalHealth(goal) === "At Risk").length;
    const averageProgress = goals.length ? Math.round(goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length) : 0;

    return [
      { label: "Total Goals", value: String(goals.length), sub: `${activeGoals.length} active`, icon: Target, color: "#7C3AED" },
      { label: "Progress", value: `${averageProgress}%`, sub: `${completed} completed`, icon: BarChart3, color: "#3B82F6" },
      { label: "On Track", value: String(onTrack), sub: "Healthy goals", icon: Check, color: "#22C55E" },
      { label: "At Risk", value: String(atRisk), sub: "Need attention", icon: AlertTriangle, color: "#F97316" },
    ];
  }, [goals]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      const response = await fetch(editingGoal ? `/api/goals/${editingGoal.id}` : "/api/goals", {
        method: editingGoal ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title.trim(),
          description: form.description.trim() || null,
          category: form.category,
          priority: form.priority,
          status: form.status,
          target_date: form.target_date || null,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.detail ?? "Failed to create goal");
      }

      const savedGoal = (await response.json()) as Goal;
      setGoals((current) => editingGoal ? current.map((goal) => goal.id === savedGoal.id ? savedGoal : goal) : [savedGoal, ...current]);
      setForm(emptyForm);
      setEditingGoal(null);
      setIsFormOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create goal");
    } finally {
      setIsSaving(false);
    }
  }

  function openCreateForm() {
    setEditingGoal(null);
    setForm(emptyForm);
    setIsFormOpen(true);
  }

  function openEditForm(goal: Goal) {
    setEditingGoal(goal);
    setForm({
      title: goal.title,
      description: goal.description ?? "",
      category: goal.category,
      priority: goal.priority,
      status: goal.status === "archived" ? "not_started" : goal.status,
      target_date: goal.target_date ?? "",
    });
    setIsFormOpen(true);
  }

  function closeForm() {
    setIsFormOpen(false);
    setEditingGoal(null);
    setForm(emptyForm);
  }

  async function deleteGoal(goal: Goal) {
    const confirmed = window.confirm(`Delete "${goal.title}"? This will archive the goal.`);
    if (!confirmed) return;

    setDeletingGoalId(goal.id);
    setError(null);

    try {
      const response = await fetch(`/api/goals/${goal.id}`, { method: "DELETE" });
      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.detail ?? "Failed to delete goal");
      }
      setGoals((current) => current.filter((item) => item.id !== goal.id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete goal");
    } finally {
      setDeletingGoalId(null);
    }
  }

  return (
    <div className="min-h-screen min-w-0 text-app-primary">
      <main className="min-w-0 space-y-5">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Goals</h1>
            <p className="mt-1 text-base text-app-muted">Create goals manually first. AI planning can build on this later.</p>
          </div>
          <div className="flex w-full flex-wrap gap-3 lg:w-auto">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-app-subtle" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} className="h-11 w-full rounded-lg border border-app-border bg-app-input pl-10 pr-3 text-sm outline-none placeholder:text-app-subtle focus:border-[#7C3AED]" placeholder="Search goals..." />
            </div>
            <button onClick={openCreateForm} className="flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-[#6D38E8] px-4 text-sm font-semibold text-white shadow-lg shadow-[#7C3AED]/25 sm:flex-none">
              <Plus className="h-4 w-4" />
              New Goal
            </button>
          </div>
        </header>

        {error && <div className="rounded-lg border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-500 dark:text-rose-300">{error}</div>}

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
            {(["All Goals", "On Track", "At Risk", "Not Started", "Completed"] as GoalTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative shrink-0 py-2 transition ${activeTab === tab ? "text-app-primary" : "text-app-muted hover:text-app-primary"}`}
              >
                {tab}
                {activeTab === tab && <span className="absolute inset-x-0 -bottom-3 h-0.5 rounded-full bg-[#7C3AED]" />}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="flex min-h-64 items-center justify-center text-app-muted">
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Loading goals
            </div>
          ) : filteredGoals.length === 0 ? (
            <div className="min-h-64 px-5 py-12 text-center">
              <Target className="mx-auto h-10 w-10 text-[#7C3AED]" />
              <h2 className="mt-4 text-lg font-semibold">{goals.length === 0 ? "No goals yet" : "No matching goals"}</h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-app-muted">
                {goals.length === 0 ? "Create your first goal with the manual fields. Projects and tasks can come next." : "Try a different tab or search term."}
              </p>
            </div>
          ) : (
            filteredGoals.map((goal) => {
              const meta = categoryMeta[goal.category];
              const Icon = meta.icon;
              const health = getGoalHealth(goal);
              return (
                <div key={goal.id} className="grid gap-4 border-b border-app-border p-5 last:border-b-0 lg:grid-cols-[60px_minmax(0,1fr)_190px_120px_92px] lg:items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full" style={{ backgroundColor: `${meta.color}25`, color: meta.color }}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-lg font-semibold">{goal.title}</h2>
                      <span className="rounded-md bg-app-soft px-2 py-1 text-xs text-app-muted">{meta.label}</span>
                      <span className="rounded-md bg-app-soft px-2 py-1 text-xs capitalize text-app-muted">{goal.priority}</span>
                    </div>
                    <p className="mt-1 text-sm text-app-muted">{goal.description || "No description added."}</p>
                    <p className="mt-3 text-sm text-app-muted">Target: {goal.target_date ? new Date(goal.target_date).toLocaleDateString() : "No fixed deadline"} · Status: {statusLabels[goal.status]}</p>
                  </div>
                  <div>
                    <div className="mb-2 flex items-center gap-3">
                      <span className="font-semibold">{goal.progress}%</span>
                      <div className="h-1.5 flex-1 rounded-full bg-app-border">
                        <div className="h-full rounded-full" style={{ width: `${goal.progress}%`, backgroundColor: meta.color }} />
                      </div>
                    </div>
                  </div>
                  <StatusBadge label={health} />
                  <div className="flex items-center gap-2 lg:justify-end">
                    <button
                      onClick={() => openEditForm(goal)}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-app-border bg-app-elevated text-app-muted transition hover:text-app-primary"
                      aria-label={`Edit ${goal.title}`}
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => void deleteGoal(goal)}
                      disabled={deletingGoalId === goal.id}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-app-border bg-app-elevated text-rose-500 transition hover:bg-rose-500/10 disabled:opacity-60"
                      aria-label={`Delete ${goal.title}`}
                    >
                      {deletingGoalId === goal.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </Panel>
      </main>

      {isFormOpen && (
        <div className="fixed inset-0 z-[70] flex items-end bg-black/45 p-3 backdrop-blur-sm sm:items-center sm:justify-center">
          <Panel className="max-h-[92vh] w-full max-w-2xl overflow-y-auto p-5 sm:p-6">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">{editingGoal ? "Edit Goal" : "Create Goal"}</h2>
                <p className="mt-1 text-sm text-app-muted">Add the manual fields needed for tracking and future AI planning.</p>
              </div>
              <button onClick={closeForm} className="rounded-lg p-2 text-app-subtle transition hover:bg-app-soft hover:text-app-primary" aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <FieldLabel>Goal title</FieldLabel>
                <input required minLength={2} maxLength={160} value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} className="h-11 w-full rounded-lg border border-app-border bg-app-input px-3 text-sm outline-none focus:border-[#7C3AED]" placeholder="Crack product company interview" />
              </div>

              <div className="space-y-2">
                <FieldLabel>Description</FieldLabel>
                <textarea value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} rows={4} maxLength={1200} className="w-full resize-none rounded-lg border border-app-border bg-app-input px-3 py-3 text-sm outline-none focus:border-[#7C3AED]" placeholder="What does this goal mean and what should be included?" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <FieldLabel>Category</FieldLabel>
                  <div className="relative">
                    <select value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value as GoalCategory })} className="h-11 w-full appearance-none rounded-lg border border-app-border bg-app-input px-3 pr-10 text-sm text-app-primary outline-none transition [color-scheme:light] focus:border-[#7C3AED] dark:[color-scheme:dark]">
                      {Object.entries(categoryMeta).map(([value, meta]) => <option key={value} value={value}>{meta.label}</option>)}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-app-subtle" />
                  </div>
                </div>

                <div className="space-y-2">
                  <FieldLabel>Priority</FieldLabel>
                  <div className="relative">
                    <select value={form.priority} onChange={(event) => setForm({ ...form, priority: event.target.value as GoalPriority })} className="h-11 w-full appearance-none rounded-lg border border-app-border bg-app-input px-3 pr-10 text-sm text-app-primary outline-none transition [color-scheme:light] focus:border-[#7C3AED] dark:[color-scheme:dark]">
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-app-subtle" />
                  </div>
                </div>

                <div className="space-y-2">
                  <FieldLabel>Target date</FieldLabel>
                  <div className="relative">
                    <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-app-subtle" />
                    <input type="date" value={form.target_date} onChange={(event) => setForm({ ...form, target_date: event.target.value })} className="h-11 w-full rounded-lg border border-app-border bg-app-input px-10 text-sm text-app-primary outline-none transition [color-scheme:light] focus:border-[#7C3AED] dark:[color-scheme:dark] [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-60 dark:[&::-webkit-calendar-picker-indicator]:invert" />
                  </div>
                </div>

                <div className="space-y-2">
                  <FieldLabel>Status</FieldLabel>
                  <div className="relative">
                    <select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value as GoalStatus })} className="h-11 w-full appearance-none rounded-lg border border-app-border bg-app-input px-3 pr-10 text-sm text-app-primary outline-none transition [color-scheme:light] focus:border-[#7C3AED] dark:[color-scheme:dark]">
                      <option value="not_started">Not Started</option>
                      <option value="active">Active</option>
                      <option value="paused">Paused</option>
                      <option value="completed">Completed</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-app-subtle" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <button type="button" onClick={closeForm} className="h-11 rounded-lg border border-app-border px-5 text-sm font-semibold text-app-secondary">Cancel</button>
                <button disabled={isSaving} className="flex h-11 items-center justify-center gap-2 rounded-lg bg-[#6D38E8] px-5 text-sm font-semibold text-white shadow-lg shadow-[#7C3AED]/25 disabled:opacity-70">
                  {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
                  {editingGoal ? "Save Changes" : "Create Goal"}
                </button>
              </div>
            </form>
          </Panel>
        </div>
      )}
    </div>
  );
}
