"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/app/components/ui/Input";
import { Button } from "@/app/components/ui/Button";
import { Eye, Loader2, Mail, Lock, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/app/components/ThemeToggle";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      const callbackUrl = new URLSearchParams(window.location.search).get("callbackUrl") ?? "/dashboard";
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl,
      });

      if (result?.error) {
        setError("Invalid email or password");
        return;
      }

      router.push(result?.url ?? callbackUrl);
      router.refresh();
    } catch {
      setError("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-app-shell p-2 text-app-primary sm:p-5">
      <div className="relative min-h-[calc(100vh-16px)] overflow-hidden rounded-xl bg-app-panel shadow-[0_24px_90px_rgba(72,56,160,0.12)] sm:min-h-[calc(100vh-40px)] sm:rounded-2xl">
        <div className="absolute right-8 top-16 hidden grid-cols-4 gap-3 opacity-30 sm:grid lg:right-24 lg:top-20">
          {Array.from({ length: 24 }).map((_, index) => <span key={index} className="h-2 w-2 rounded-full bg-[#7C64F2]" />)}
        </div>
        <div className="absolute bottom-0 left-0 h-44 w-full bg-[#F1EDFF] opacity-80 [clip-path:polygon(0_48%,12%_34%,25%_62%,39%_68%,54%_58%,70%_74%,88%_68%,100%_54%,100%_100%,0_100%)]" />

        <Link href="/" className="absolute left-5 top-5 flex items-center gap-2 sm:left-10 sm:top-8 sm:gap-3">
          <Rocket className="h-6 w-6 fill-[#5838E8] text-[#5838E8] sm:h-8 sm:w-8" />
          <span className="text-xl font-extrabold tracking-tight sm:text-2xl">FlowPlan</span>
        </Link>
        <div className="absolute right-5 top-5 sm:right-10 sm:top-8">
          <ThemeToggle />
        </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
          className="relative z-10 mx-auto flex min-h-[calc(100vh-16px)] w-full max-w-md items-center px-4 py-24 sm:min-h-[calc(100vh-40px)] sm:px-6"
      >
          <div className="w-full">
            <div className="space-y-2 sm:space-y-3">
              <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Welcome back!</h1>
              <p className="text-base text-app-muted">Log in to continue to your productivity hub.</p>
          </div>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-7 space-y-5 sm:mt-8">
              <div className="space-y-2">
                <label className="text-sm font-bold text-app-secondary">Email address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-app-subtle sm:left-5 sm:h-5 sm:w-5" />
                  <Input
                    {...register("email")}
                    placeholder="Enter your email"
                    className="h-11 rounded-md border-app-border bg-app-panel pl-11 text-sm text-app-primary shadow-none placeholder:text-app-subtle focus-visible:ring-[#5838E8] sm:pl-12"
                    type="email"
                  />
                </div>
                {errors.email && (
                  <p className="ml-1 text-sm text-rose-300">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-app-secondary">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-app-subtle sm:left-5 sm:h-5 sm:w-5" />
                  <Input
                    {...register("password")}
                    placeholder="Enter your password"
                    className="h-11 rounded-md border-app-border bg-app-panel pl-11 pr-11 text-sm text-app-primary shadow-none placeholder:text-app-subtle focus-visible:ring-[#5838E8] sm:pl-12 sm:pr-12"
                    type="password"
                  />
                  <Eye className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-app-subtle sm:right-5 sm:h-5 sm:w-5" />
                </div>
                {errors.password && (
                  <p className="ml-1 text-sm text-rose-300">{errors.password.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
                <label className="flex items-center gap-3 text-app-muted">
                  <span className="flex h-5 w-5 items-center justify-center rounded bg-[#5838E8] text-white"><CheckMini /></span>
                  Remember me
                </label>
                <Link href="/login" className="font-bold text-[#5838E8]">Forgot password?</Link>
              </div>

            {error && (
                <div className="rounded-md border border-rose-200 bg-rose-50 p-4 text-center text-sm font-medium text-rose-600">
                {error}
              </div>
            )}

            <Button
              type="submit"
                className="h-11 w-full rounded-md bg-[#5838E8] text-sm shadow-[0_14px_30px_rgba(88,56,232,0.25)] hover:bg-[#4E2EDB]"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                  "Log in"
              )}
            </Button>
            </form>

            <div className="my-7 flex items-center gap-5 text-sm text-app-subtle">
              <span className="h-px flex-1 bg-[#DDE1EA]" />
              or continue with
              <span className="h-px flex-1 bg-[#DDE1EA]" />
            </div>
            <button className="flex h-11 w-full items-center justify-center gap-3 rounded-md border border-app-border bg-app-panel text-sm font-bold">
              <span className="text-xl font-black text-[#4285F4]">G</span>
              Continue with Google
            </button>

            <p className="mt-7 text-center text-sm text-app-muted">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="font-bold text-[#5838E8]">
                Sign up
            </Link>
            </p>
        </div>
      </motion.div>
      </div>
    </div>
  );
}

function CheckMini() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3.5 8.2L6.6 11.1L12.7 4.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
