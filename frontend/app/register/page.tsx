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
import { authService } from "@/lib/services/auth";
import { Eye, Loader2, Mail, Lock, User, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { AxiosError } from "axios";
import { ThemeToggle } from "@/app/components/ThemeToggle";

const registerSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters").max(72, "Password must be 72 characters or fewer"),
  confirm_password: z.string().min(6, "Password must be at least 6 characters").max(72, "Password must be 72 characters or fewer"),
}).refine((data) => data.password === data.confirm_password, {
  message: "Passwords do not match",
  path: ["confirm_password"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      await authService.register({
        full_name: data.full_name,
        email: data.email,
        password: data.password,
      });
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl: "/dashboard",
      });

      if (result?.error) {
        setError("Account created, but automatic login failed. Please log in.");
        return;
      }

      router.push(result?.url ?? "/dashboard");
      router.refresh();
    } catch (err: unknown) {
      const detail = err instanceof AxiosError ? err.response?.data?.detail : null;
      setError(typeof detail === "string" ? detail : "Registration failed. Try again.");
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
              <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Create your account</h1>
              <p className="text-base text-app-muted">Start your productivity journey today.</p>
          </div>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-7 space-y-4 sm:mt-8 sm:space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-bold text-app-secondary">Full name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-app-subtle sm:left-5 sm:h-5 sm:w-5" />
                  <Input
                    {...register("full_name")}
                    placeholder="Enter your full name"
                    className="h-11 rounded-md border-app-border bg-app-panel pl-11 text-sm text-app-primary shadow-none placeholder:text-app-subtle focus-visible:ring-[#5838E8] sm:pl-12"
                  />
                </div>
                {errors.full_name && (
                  <p className="ml-1 text-sm text-rose-300">{errors.full_name.message}</p>
                )}
              </div>

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
                    placeholder="Create a password"
                    className="h-11 rounded-md border-app-border bg-app-panel pl-11 pr-11 text-sm text-app-primary shadow-none placeholder:text-app-subtle focus-visible:ring-[#5838E8] sm:pl-12 sm:pr-12"
                    type="password"
                  />
                  <Eye className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-app-subtle sm:right-5 sm:h-5 sm:w-5" />
                </div>
                {errors.password && (
                  <p className="ml-1 text-sm text-rose-300">{errors.password.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-app-secondary">Confirm password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-app-subtle sm:left-5 sm:h-5 sm:w-5" />
                  <Input
                    {...register("confirm_password")}
                    placeholder="Confirm your password"
                    className="h-11 rounded-md border-app-border bg-app-panel pl-11 pr-11 text-sm text-app-primary shadow-none placeholder:text-app-subtle focus-visible:ring-[#5838E8] sm:pl-12 sm:pr-12"
                    type="password"
                  />
                  <Eye className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-app-subtle sm:right-5 sm:h-5 sm:w-5" />
                </div>
                {errors.confirm_password && (
                  <p className="ml-1 text-sm text-rose-600">{errors.confirm_password.message}</p>
                )}
              </div>

              <label className="flex items-start gap-3 text-sm leading-6 text-app-muted">
                <span className="mt-0.5 h-5 w-5 shrink-0 rounded border border-[#A8AFC1] bg-app-panel" />
                I agree to the <Link href="/signup" className="font-bold text-[#5838E8]">Terms of Service</Link> and <Link href="/signup" className="font-bold text-[#5838E8]">Privacy Policy</Link>
              </label>

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
                  "Create account"
              )}
            </Button>
            </form>

            <div className="my-6 flex items-center gap-5 text-sm text-app-subtle">
              <span className="h-px flex-1 bg-[#DDE1EA]" />
              or sign up with
              <span className="h-px flex-1 bg-[#DDE1EA]" />
            </div>
            <button className="flex h-11 w-full items-center justify-center gap-3 rounded-md border border-app-border bg-app-panel text-sm font-bold">
              <span className="text-xl font-black text-[#4285F4]">G</span>
              Sign up with Google
            </button>

            <p className="mt-6 text-center text-sm text-app-muted">
              Already have an account?{" "}
              <Link href="/login" className="font-bold text-[#5838E8]">
                Log in
            </Link>
            </p>
        </div>
      </motion.div>
      </div>
    </div>
  );
}
