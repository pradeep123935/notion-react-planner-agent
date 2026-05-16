"use client";

import React from "react";
import {
  Bell,
  Check,
  ChevronDown,
  CreditCard,
  Download,
  KeyRound,
  Lock,
  Mail,
  Palette,
  Save,
  Shield,
  User,
  Users,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const nav = ["Profile", "Preferences", "Notifications", "Security", "Workspace", "Billing", "Integrations"];

const integrations: Array<{ name: string; icon: LucideIcon; status: string }> = [
  { name: "Google Calendar", icon: Mail, status: "Connected" },
  { name: "CSV Import", icon: Download, status: "Available" },
  { name: "Zapier", icon: Zap, status: "Available" },
];

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-xl border border-app-border bg-app-panel shadow-[0_16px_50px_rgba(0,0,0,0.14)] ${className}`}>
      {children}
    </section>
  );
}

function Toggle({ on = true }: { on?: boolean }) {
  return (
    <span className={`flex h-6 w-11 items-center rounded-full p-1 transition ${on ? "bg-[#6D38E8]" : "bg-slate-400 dark:bg-[#334155]"}`}>
      <span className={`h-4 w-4 rounded-full bg-white transition ${on ? "translate-x-5" : ""}`} />
    </span>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-app-muted">{label}</span>
      <input
        className="mt-2 h-11 w-full rounded-lg border border-app-border bg-app-input px-3 text-sm text-app-primary outline-none transition focus:border-[#7C3AED]"
        defaultValue={value}
      />
    </label>
  );
}

export default function SettingsPage() {
  return (
    <div className="min-h-screen min-w-0 space-y-5 text-app-primary">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
          <p className="mt-1 text-base text-app-muted">Manage your account, workspace, and productivity preferences.</p>
        </div>
        <div className="flex w-full flex-wrap gap-3 lg:w-auto">
          <button className="flex h-11 flex-1 items-center justify-center gap-2 rounded-lg border border-app-border bg-app-elevated px-4 text-sm text-app-secondary sm:flex-none">
            <Download className="h-4 w-4" />
            Export Data
          </button>
          <button className="flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-[#6D38E8] px-5 text-sm font-semibold text-white shadow-lg shadow-[#7C3AED]/25 sm:flex-none">
            <Save className="h-4 w-4" />
            Save Changes
          </button>
        </div>
      </header>

      <div className="grid min-w-0 gap-5 xl:grid-cols-[260px_minmax(0,1fr)]">
        <Panel className="self-start p-3">
          <div className="flex gap-2 overflow-x-auto xl:block xl:space-y-1">
            {nav.map((item, index) => (
              <button
                key={item}
                className={`flex shrink-0 items-center justify-between gap-4 rounded-lg px-4 py-3 text-left text-sm transition xl:w-full ${
                  index === 0 ? "bg-[#4F3ACD] text-white" : "text-app-muted hover:bg-app-soft hover:text-app-primary"
                }`}
              >
                {item}
                {index === 0 && <Check className="h-4 w-4" />}
              </button>
            ))}
          </div>
        </Panel>

        <main className="min-w-0 space-y-5">
          <Panel className="p-4 sm:p-6">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <User className="h-10 w-10 rounded-xl bg-[#7C3AED]/20 p-2.5 text-[#7C3AED] dark:text-[#A78BFA]" />
                <div>
                  <h2 className="text-xl font-semibold">Profile Settings</h2>
                  <p className="text-sm text-app-muted">Update your personal information and public profile.</p>
                </div>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#E0F2FE] to-[#7DD3FC] text-lg font-bold text-[#0F172A]">AS</div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Full name" value="Arjun Sharma" />
              <Field label="Email address" value="arjun@flowplan.app" />
              <Field label="Role" value="Product Builder" />
              <Field label="Timezone" value="Asia/Kolkata (GMT+5:30)" />
            </div>
          </Panel>

          <section className="grid gap-5 lg:grid-cols-2">
            <Panel className="p-4 sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <Palette className="h-10 w-10 rounded-xl bg-blue-500/15 p-2.5 text-blue-500 dark:text-blue-300" />
                <div>
                  <h2 className="text-xl font-semibold">Preferences</h2>
                  <p className="text-sm text-app-muted">Customize how FlowPlan feels.</p>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  ["Dark mode", "Use the premium dark interface", true],
                  ["Compact layout", "Reduce spacing in dense dashboards", true],
                  ["AI planning hints", "Show smart suggestions across pages", true],
                  ["Sound effects", "Play gentle sounds for focus sessions", false],
                ].map(([title, sub, on]) => (
                  <div key={title as string} className="flex items-start justify-between gap-4 rounded-lg border border-app-border bg-app-elevated/70 p-4">
                    <div>
                      <p className="font-medium">{title}</p>
                      <p className="mt-1 text-sm text-app-muted">{sub}</p>
                    </div>
                    <Toggle on={Boolean(on)} />
                  </div>
                ))}
              </div>
            </Panel>

            <Panel className="p-4 sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <Bell className="h-10 w-10 rounded-xl bg-[#7C3AED]/20 p-2.5 text-[#7C3AED] dark:text-[#A78BFA]" />
                <div>
                  <h2 className="text-xl font-semibold">Notifications</h2>
                  <p className="text-sm text-app-muted">Choose what needs your attention.</p>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  ["Task reminders", "Before task deadlines and focus blocks", true],
                  ["Daily planning digest", "Every morning at 7:30 AM", true],
                  ["Weekly report", "Productivity summary every Sunday", true],
                  ["Marketing updates", "Product tips and feature announcements", false],
                ].map(([title, sub, on]) => (
                  <div key={title as string} className="flex items-start justify-between gap-4 rounded-lg border border-app-border bg-app-elevated/70 p-4">
                    <div>
                      <p className="font-medium">{title}</p>
                      <p className="mt-1 text-sm text-app-muted">{sub}</p>
                    </div>
                    <Toggle on={Boolean(on)} />
                  </div>
                ))}
              </div>
            </Panel>
          </section>

          <section className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
            <Panel className="p-4 sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <Shield className="h-10 w-10 rounded-xl bg-emerald-500/15 p-2.5 text-emerald-500 dark:text-emerald-300" />
                <div>
                  <h2 className="text-xl font-semibold">Security</h2>
                  <p className="text-sm text-app-muted">Protect your workspace and account.</p>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <button className="rounded-lg border border-app-border bg-app-elevated/70 p-4 text-left">
                  <KeyRound className="mb-4 h-6 w-6 text-[#7C3AED] dark:text-[#A78BFA]" />
                  <p className="font-medium">Change password</p>
                  <p className="mt-1 text-sm text-app-muted">Last updated 24 days ago</p>
                </button>
                <button className="rounded-lg border border-app-border bg-app-elevated/70 p-4 text-left">
                  <Lock className="mb-4 h-6 w-6 text-emerald-500 dark:text-emerald-300" />
                  <p className="font-medium">Two-factor authentication</p>
                  <p className="mt-1 text-sm text-app-muted">Enabled via authenticator app</p>
                </button>
              </div>
            </Panel>

            <Panel className="p-4 sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <CreditCard className="h-10 w-10 rounded-xl bg-orange-500/15 p-2.5 text-orange-500 dark:text-orange-300" />
                <div>
                  <h2 className="text-xl font-semibold">Plan</h2>
                  <p className="text-sm text-app-muted">Premium Plan</p>
                </div>
              </div>
              <div className="rounded-lg border border-[#7C3AED]/30 bg-[#7C3AED]/10 p-4">
                <p className="text-3xl font-semibold">$12<span className="text-base text-app-muted">/month</span></p>
                <p className="mt-2 text-sm text-app-muted">AI planning, focus analytics, habit insights, and unlimited projects.</p>
              </div>
              <button className="mt-4 w-full rounded-lg bg-[#6D38E8] py-3 text-sm font-semibold text-white">Manage Billing</button>
            </Panel>
          </section>

          <Panel className="p-4 sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <Users className="h-10 w-10 rounded-xl bg-cyan-500/15 p-2.5 text-cyan-500 dark:text-cyan-300" />
              <div>
                <h2 className="text-xl font-semibold">Workspace</h2>
                <p className="text-sm text-app-muted">Manage team defaults and connected tools.</p>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                ["Workspace name", "FlowPlan Personal"],
                ["Default view", "Dashboard"],
                ["Week starts on", "Monday"],
              ].map(([label, value]) => (
                <button key={label} className="flex items-center justify-between rounded-lg border border-app-border bg-app-elevated/70 p-4 text-left">
                  <span>
                    <span className="block text-sm text-app-muted">{label}</span>
                    <span className="mt-1 block font-medium">{value}</span>
                  </span>
                  <ChevronDown className="h-4 w-4 text-app-subtle" />
                </button>
              ))}
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {integrations.map(({ name, icon: Icon, status }) => (
                <div key={name} className="flex items-center justify-between rounded-lg border border-app-border bg-app-elevated/70 p-4">
                  <span className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-[#7C3AED] dark:text-[#A78BFA]" />
                    {name}
                  </span>
                  <span className={`rounded-md px-2 py-1 text-xs ${status === "Connected" ? "bg-emerald-500/15 text-emerald-500 dark:text-emerald-300" : "bg-app-soft text-app-muted"}`}>{status}</span>
                </div>
              ))}
            </div>
          </Panel>
        </main>
      </div>
    </div>
  );
}
