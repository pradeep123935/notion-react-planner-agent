"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  FolderKanban,
  Loader2,
  Pencil,
  Plus,
  Search,
  Target,
  Trash2,
  X,
} from "lucide-react";

type ProjectStatus = "not_started" | "active" | "paused" | "completed" | "archived";
type ProjectPriority = "low" | "medium" | "high";
type ProjectType = "learning" | "build" | "practice" | "research" | "admin" | "health" | "other";

type GoalOption = {
  id: string;
  title: string;
};

type Project = {
  id: string;
  title: string;
  goal_id: string;
  goal_title: string;
  description?: string | null;
  type: ProjectType;
  priority: ProjectPriority;
  status: ProjectStatus;
  target_date?: string | null;
  progress: number;
  created_at: string;
};

type ProjectForm = {
  title: string;
  goal_id: string;
  description: string;
  type: ProjectType;
  priority: ProjectPriority;
  status: ProjectStatus;
  target_date: string;
};

const emptyForm: ProjectForm = {
  title: "",
  goal_id: "",
  description: "",
  type: "other",
  priority: "medium",
  status: "not_started",
  target_date: "",
};

const typeMeta: Record<ProjectType, { label: string; color: string; icon: React.ElementType }> = {
  learning: { label: "Learning", color: "#F59E0B", icon: Target },
  build: { label: "Build", color: "#7C3AED", icon: FolderKanban },
  practice: { label: "Practice", color: "#22C55E", icon: CheckCircle2 },
  research: { label: "Research", color: "#3B82F6", icon: Search },
  admin: { label: "Admin", color: "#94A3B8", icon: BriefcaseBusiness },
  health: { label: "Health", color: "#F97316", icon: Target },
  other: { label: "Other", color: "#06B6D4", icon: FolderKanban },
};

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`rounded-xl border border-app-border bg-app-panel shadow-[0_16px_50px_rgba(0,0,0,0.14)] ${className}`}>{children}</section>;
}

function getProjectHealth(project: Project) {
  if (project.status === "completed") return "Completed";
  if (project.status === "paused") return "Paused";
  if (!project.target_date || project.status === "not_started") return "Not Started";

  const created = new Date(project.created_at).getTime();
  const target = new Date(project.target_date).getTime();
  const now = Date.now();

  if (Number.isNaN(target) || target <= created) return project.progress >= 100 ? "Completed" : "At Risk";
  if (now > target && project.progress < 100) return "At Risk";

  const expectedProgress = Math.min(100, Math.max(0, ((now - created) / (target - created)) * 100));
  return project.progress + 15 < expectedProgress ? "At Risk" : "On Track";
}

function StatusBadge({ label }: { label: string }) {
  const classes =
    label === "Completed"
      ? "bg-purple-500/15 text-purple-500 dark:text-purple-300"
      : label === "At Risk"
        ? "bg-orange-500/15 text-orange-500 dark:text-orange-300"
        : label === "Paused"
          ? "bg-slate-500/15 text-slate-500 dark:text-slate-300"
          : label === "Not Started"
            ? "bg-blue-500/15 text-blue-500 dark:text-blue-300"
            : "bg-emerald-500/15 text-emerald-500 dark:text-emerald-300";

  return <span className={`rounded-md px-3 py-1.5 text-sm font-semibold ${classes}`}>{label}</span>;
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="text-sm font-semibold text-app-secondary">{children}</label>;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [goals, setGoals] = useState<GoalOption[]>([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deletingProjectId, setDeletingProjectId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<ProjectForm>(emptyForm);

  async function loadData() {
    setIsLoading(true);
    setError(null);
    try {
      const [projectsResponse, goalsResponse] = await Promise.all([
        fetch("/api/projects", { cache: "no-store" }),
        fetch("/api/goals", { cache: "no-store" }),
      ]);

      if (!projectsResponse.ok || !goalsResponse.ok) throw new Error("Failed to load projects");
      setProjects(await projectsResponse.json());
      setGoals(await goalsResponse.json());
    } catch {
      setError("Could not load projects. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadData();
  }, []);

  const filteredProjects = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return projects;
    return projects.filter((project) => `${project.title} ${project.description ?? ""} ${project.goal_title} ${project.type}`.toLowerCase().includes(term));
  }, [projects, query]);

  const stats = useMemo(() => {
    const completed = projects.filter((project) => project.status === "completed").length;
    const onTrack = projects.filter((project) => getProjectHealth(project) === "On Track").length;
    const atRisk = projects.filter((project) => getProjectHealth(project) === "At Risk").length;

    return [
      { label: "Total Projects", value: String(projects.length), sub: "Across all goals", icon: Target, color: "#7C3AED" },
      { label: "On Track", value: String(onTrack), sub: "Healthy projects", icon: Check, color: "#22C55E" },
      { label: "At Risk", value: String(atRisk), sub: "Need attention", icon: AlertTriangle, color: "#F97316" },
      { label: "Completed", value: String(completed), sub: "Finished projects", icon: CheckCircle2, color: "#3B82F6" },
    ];
  }, [projects]);

  function openCreateForm() {
    setEditingProject(null);
    setForm({ ...emptyForm, goal_id: goals[0]?.id ?? "" });
    setIsFormOpen(true);
  }

  function openEditForm(project: Project) {
    setEditingProject(project);
    setForm({
      title: project.title,
      goal_id: project.goal_id,
      description: project.description ?? "",
      type: project.type,
      priority: project.priority,
      status: project.status === "archived" ? "not_started" : project.status,
      target_date: project.target_date ?? "",
    });
    setIsFormOpen(true);
  }

  function closeForm() {
    setIsFormOpen(false);
    setEditingProject(null);
    setForm(emptyForm);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      const response = await fetch(editingProject ? `/api/projects/${editingProject.id}` : "/api/projects", {
        method: editingProject ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title.trim(),
          goal_id: form.goal_id,
          description: form.description.trim() || null,
          type: form.type,
          priority: form.priority,
          status: form.status,
          target_date: form.target_date || null,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.detail ?? "Failed to save project");
      }

      const savedProject = (await response.json()) as Project;
      setProjects((current) => editingProject ? current.map((project) => project.id === savedProject.id ? savedProject : project) : [savedProject, ...current]);
      closeForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save project");
    } finally {
      setIsSaving(false);
    }
  }

  async function deleteProject(project: Project) {
    const confirmed = window.confirm(`Delete "${project.title}"? This will archive the project.`);
    if (!confirmed) return;

    setDeletingProjectId(project.id);
    setError(null);

    try {
      const response = await fetch(`/api/projects/${project.id}`, { method: "DELETE" });
      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.detail ?? "Failed to delete project");
      }
      setProjects((current) => current.filter((item) => item.id !== project.id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete project");
    } finally {
      setDeletingProjectId(null);
    }
  }

  return (
    <div className="min-h-screen min-w-0 text-app-primary">
      <main className="min-w-0 space-y-6">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
            <p className="mt-1 text-base text-app-muted">Create workstreams under your goals and track progress manually.</p>
          </div>
          <div className="flex w-full flex-wrap items-center gap-3 lg:w-auto">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-app-subtle" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="h-11 w-full rounded-lg border border-app-border bg-app-input pl-10 pr-3 text-sm outline-none placeholder:text-app-subtle focus:border-[#7C3AED]"
                placeholder="Search projects..."
              />
            </div>
            <button
              onClick={openCreateForm}
              disabled={goals.length === 0}
              className="flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-[#6D38E8] px-4 text-sm font-semibold text-white shadow-lg shadow-[#7C3AED]/25 disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none"
            >
              <Plus className="h-4 w-4" />
              New Project
            </button>
          </div>
        </header>

        {error && <div className="rounded-lg border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-500 dark:text-rose-300">{error}</div>}

        <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
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

        <section className="space-y-3">
          {isLoading ? (
            <Panel className="flex min-h-64 items-center justify-center text-app-muted">
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Loading projects
            </Panel>
          ) : goals.length === 0 ? (
            <Panel className="min-h-64 px-5 py-12 text-center">
              <FolderKanban className="mx-auto h-10 w-10 text-[#7C3AED]" />
              <h2 className="mt-4 text-lg font-semibold">Create a goal first</h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-app-muted">Projects belong to goals, so add at least one goal before creating a project.</p>
            </Panel>
          ) : filteredProjects.length === 0 ? (
            <Panel className="min-h-64 px-5 py-12 text-center">
              <FolderKanban className="mx-auto h-10 w-10 text-[#7C3AED]" />
              <h2 className="mt-4 text-lg font-semibold">{projects.length === 0 ? "No projects yet" : "No matching projects"}</h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-app-muted">{projects.length === 0 ? "Create your first project under a goal." : "Try a different search term."}</p>
            </Panel>
          ) : (
            filteredProjects.map((project) => {
              const meta = typeMeta[project.type];
              const Icon = meta.icon;
              const health = getProjectHealth(project);
              return (
                <Panel key={project.id} className="grid gap-4 p-5 xl:grid-cols-[64px_minmax(220px,1fr)_minmax(150px,210px)_126px_120px_92px] xl:items-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full" style={{ backgroundColor: `${meta.color}25`, color: meta.color }}>
                    <div className="flex h-11 w-11 items-center justify-center rounded-full" style={{ backgroundColor: meta.color }}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-lg font-semibold">{project.title}</h2>
                      <span className="rounded-md bg-app-soft px-2 py-1 text-xs text-app-muted">{meta.label}</span>
                      <span className="rounded-md bg-app-soft px-2 py-1 text-xs capitalize text-app-muted">{project.priority}</span>
                    </div>
                    <p className="mt-2 flex min-w-0 items-center gap-1.5 text-sm text-app-muted">
                      <CalendarDays className="h-4 w-4" />
                      <span className="truncate">Goal: {project.goal_title}</span>
                    </p>
                    <p className="mt-1 line-clamp-2 text-sm text-app-muted">{project.description || "No description added."}</p>
                  </div>
                  <div>
                    <p className="mb-2 text-lg font-semibold">{project.progress}%</p>
                    <div className="h-1.5 rounded-full bg-app-soft">
                      <div className="h-full rounded-full" style={{ width: `${project.progress}%`, backgroundColor: meta.color }} />
                    </div>
                  </div>
                  <div className="border-t border-app-border pt-3 xl:border-l xl:border-t-0 xl:pl-5 xl:pt-0">
                    <p className="text-base">{project.target_date ? new Date(project.target_date).toLocaleDateString() : "No deadline"}</p>
                    <p className="text-sm text-app-muted">Deadline</p>
                  </div>
                  <StatusBadge label={health} />
                  <div className="flex items-center gap-2 xl:justify-end">
                    <button onClick={() => openEditForm(project)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-app-border bg-app-elevated text-app-muted transition hover:text-app-primary" aria-label={`Edit ${project.title}`}>
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button onClick={() => void deleteProject(project)} disabled={deletingProjectId === project.id} className="flex h-9 w-9 items-center justify-center rounded-lg border border-app-border bg-app-elevated text-rose-500 transition hover:bg-rose-500/10 disabled:opacity-60" aria-label={`Delete ${project.title}`}>
                      {deletingProjectId === project.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                    </button>
                  </div>
                </Panel>
              );
            })
          )}
        </section>
      </main>

      {isFormOpen && (
        <div className="fixed inset-0 z-[70] flex items-end bg-black/45 p-3 backdrop-blur-sm sm:items-center sm:justify-center">
          <Panel className="max-h-[92vh] w-full max-w-2xl overflow-y-auto p-5 sm:p-6">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">{editingProject ? "Edit Project" : "Create Project"}</h2>
                <p className="mt-1 text-sm text-app-muted">Attach this project to a goal and define the workstream clearly.</p>
              </div>
              <button onClick={closeForm} className="rounded-lg p-2 text-app-subtle transition hover:bg-app-soft hover:text-app-primary" aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <FieldLabel>Project title</FieldLabel>
                <input required minLength={2} maxLength={160} value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} className="h-11 w-full rounded-lg border border-app-border bg-app-input px-3 text-sm outline-none focus:border-[#7C3AED]" placeholder="DSA Preparation" />
              </div>

              <div className="space-y-2">
                <FieldLabel>Parent goal</FieldLabel>
                <div className="relative">
                  <select required value={form.goal_id} onChange={(event) => setForm({ ...form, goal_id: event.target.value })} className="h-11 w-full appearance-none rounded-lg border border-app-border bg-app-input px-3 pr-10 text-sm text-app-primary outline-none transition [color-scheme:light] focus:border-[#7C3AED] dark:[color-scheme:dark]">
                    {goals.map((goal) => <option key={goal.id} value={goal.id}>{goal.title}</option>)}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-app-subtle" />
                </div>
              </div>

              <div className="space-y-2">
                <FieldLabel>Description</FieldLabel>
                <textarea value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} rows={4} maxLength={1200} className="w-full resize-none rounded-lg border border-app-border bg-app-input px-3 py-3 text-sm outline-none focus:border-[#7C3AED]" placeholder="What does this project cover?" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <FieldLabel>Type</FieldLabel>
                  <div className="relative">
                    <select value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value as ProjectType })} className="h-11 w-full appearance-none rounded-lg border border-app-border bg-app-input px-3 pr-10 text-sm text-app-primary outline-none transition [color-scheme:light] focus:border-[#7C3AED] dark:[color-scheme:dark]">
                      {Object.entries(typeMeta).map(([value, meta]) => <option key={value} value={value}>{meta.label}</option>)}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-app-subtle" />
                  </div>
                </div>

                <div className="space-y-2">
                  <FieldLabel>Priority</FieldLabel>
                  <div className="relative">
                    <select value={form.priority} onChange={(event) => setForm({ ...form, priority: event.target.value as ProjectPriority })} className="h-11 w-full appearance-none rounded-lg border border-app-border bg-app-input px-3 pr-10 text-sm text-app-primary outline-none transition [color-scheme:light] focus:border-[#7C3AED] dark:[color-scheme:dark]">
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
                    <select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value as ProjectStatus })} className="h-11 w-full appearance-none rounded-lg border border-app-border bg-app-input px-3 pr-10 text-sm text-app-primary outline-none transition [color-scheme:light] focus:border-[#7C3AED] dark:[color-scheme:dark]">
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
                  {editingProject ? "Save Changes" : "Create Project"}
                </button>
              </div>
            </form>
          </Panel>
        </div>
      )}
    </div>
  );
}
