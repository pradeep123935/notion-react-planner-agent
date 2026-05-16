import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const variants = {
      primary: "bg-primary text-primary-foreground hover:brightness-110 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border",
      ghost: "text-muted-foreground hover:text-foreground hover:bg-secondary",
      danger: "bg-destructive text-destructive-foreground hover:brightness-110",
    };

    const sizes = {
      sm: "h-9 px-4 text-xs rounded-xl",
      md: "h-11 px-6 rounded-2xl",
      lg: "h-14 px-8 text-lg rounded-3xl",
    };

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.97]",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
