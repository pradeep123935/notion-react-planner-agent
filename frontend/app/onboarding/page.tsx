"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";
import { Sun, Moon, Zap, Clock, CheckCircle2, ChevronRight, ChevronLeft } from "lucide-react";
import { api } from "@/lib/services/auth";
import { cn } from "@/lib/utils";

const steps = [
  {
    id: "chronotype",
    title: "When are you most productive?",
    description: "This helps the AI schedule deep work at the right time.",
    options: [
      { id: "morning", label: "Morning Owl", icon: Sun, desc: "Best before noon" },
      { id: "evening", label: "Night Lark", icon: Moon, desc: "Best after sunset" },
      { id: "neutral", label: "Balanced", icon: Zap, desc: "Consistent throughout" },
    ]
  },
  {
    id: "work_hours",
    title: "Define your focus hours",
    description: "When do you want to get things done on weekdays?",
    fields: [
      { id: "start", label: "Start Time", type: "time", defaultValue: "09:00" },
      { id: "end", label: "End Time", type: "time", defaultValue: "18:00" },
    ]
  },
  {
    id: "pacing",
    title: "How do you like to work?",
    description: "Customize your focus blocks and breaks.",
    fields: [
      { id: "preferred_focus_block_mins", label: "Focus Block (mins)", type: "number", defaultValue: "60" },
      { id: "buffer_between_tasks_mins", label: "Buffer Time (mins)", type: "number", defaultValue: "15" },
    ]
  }
];

type OnboardingFormData = {
  chronotype: string;
  work_hours_weekday: {
    start: string;
    end: string;
  };
  preferred_focus_block_mins: number;
  buffer_between_tasks_mins: number;
};

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<OnboardingFormData>({
    chronotype: "neutral",
    work_hours_weekday: { start: "09:00", end: "18:00" },
    preferred_focus_block_mins: 60,
    buffer_between_tasks_mins: 15,
  });

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Final Submit
      try {
        await api.patch("/auth/me", {
          productivity_profile: formData,
          onboarding_completed: true
        });
        router.push("/");
      } catch (err) {
        console.error("Failed to save onboarding data", err);
      }
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  const step = steps[currentStep];

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--primary-glow))] from-primary/10 via-background to-background p-3 transition-colors duration-500 sm:p-4">
      <div className="w-full max-w-xl space-y-6 sm:space-y-8">
        {/* Progress Bar */}
        <div className="flex gap-3 h-1.5 px-2">
          {steps.map((_, i) => (
            <div 
              key={i} 
              className={cn(
                "flex-1 rounded-full transition-all duration-700 ease-in-out",
                i <= currentStep ? "bg-primary shadow-[0_0_10px_rgba(124,58,237,0.5)]" : "bg-muted"
              )} 
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass-card space-y-7 rounded-2xl border border-border/50 p-5 shadow-2xl backdrop-blur-xl sm:space-y-10 sm:rounded-[3rem] sm:p-12"
          >
            <div className="space-y-3">
              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-4xl">{step.title}</h1>
              <p className="text-base text-muted-foreground sm:text-lg">{step.description}</p>
            </div>

            {step.id === "chronotype" && (
              <div className="grid grid-cols-1 gap-4">
                {step.options?.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = formData.chronotype === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setFormData({ ...formData, chronotype: opt.id })}
                      className={cn(
                        "group relative flex items-center gap-4 overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 sm:gap-6 sm:rounded-[2rem] sm:p-6",
                        isSelected 
                          ? "bg-primary/5 border-primary shadow-lg shadow-primary/10" 
                          : "bg-secondary/30 border-border hover:border-primary/50 hover:bg-secondary/50"
                      )}
                    >
                      <div className={cn(
                        "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-all duration-300 sm:h-16 sm:w-16 sm:rounded-2xl",
                        isSelected ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30" : "bg-secondary text-muted-foreground group-hover:text-primary group-hover:bg-primary/10"
                      )}>
                        <Icon className="h-6 w-6 sm:h-8 sm:w-8" />
                      </div>
                      <div className="flex-1">
                        <p className={cn("text-base font-bold sm:text-xl", isSelected ? "text-foreground" : "text-muted-foreground group-hover:text-foreground")}>{opt.label}</p>
                        <p className="text-muted-foreground/70 text-sm font-medium">{opt.desc}</p>
                      </div>
                      {isSelected && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                          <CheckCircle2 className="h-6 w-6 text-primary sm:h-8 sm:w-8" />
                        </motion.div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {step.id === "work_hours" && (
              <div className="space-y-8">
                {step.fields?.map((field) => {
                  const fieldId = field.id as keyof OnboardingFormData["work_hours_weekday"];
                  return (
                  <div key={field.id} className="space-y-3">
                    <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest ml-1">{field.label}</label>
                    <Input
                      type={field.type}
                      value={formData.work_hours_weekday[fieldId]}
                      onChange={(e) => setFormData({
                        ...formData,
                        work_hours_weekday: { ...formData.work_hours_weekday, [fieldId]: e.target.value }
                      })}
                      className="h-16 text-2xl px-8 font-semibold rounded-[1.5rem]"
                    />
                  </div>
                  );
                })}
              </div>
            )}

            {step.id === "pacing" && (
              <div className="space-y-8">
                {step.fields?.map((field) => {
                  const fieldId = field.id as "preferred_focus_block_mins" | "buffer_between_tasks_mins";
                  return (
                  <div key={field.id} className="space-y-3">
                    <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest ml-1">{field.label}</label>
                    <div className="relative group">
                      <Clock className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <Input
                        type={field.type}
                        value={formData[fieldId]}
                        onChange={(e) => setFormData({ ...formData, [fieldId]: parseInt(e.target.value) })}
                        className="h-16 text-2xl pl-16 pr-8 font-semibold rounded-[1.5rem]"
                      />
                    </div>
                  </div>
                  );
                })}
              </div>
            )}

            <div className="flex gap-3 border-t border-border pt-5 sm:gap-4 sm:pt-6">
              {currentStep > 0 && (
                <Button variant="secondary" onClick={handleBack} className="h-12 w-16 rounded-2xl sm:h-14 sm:w-20">
                  <ChevronLeft className="w-6 h-6" />
                </Button>
              )}
              <Button onClick={handleNext} className="h-12 flex-1 rounded-2xl text-base font-bold shadow-primary/20 sm:h-14 sm:text-lg">
                {currentStep === steps.length - 1 ? "Complete Setup" : "Continue"}
                <ChevronRight className="ml-2 w-6 h-6" />
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
