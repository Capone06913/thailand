import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PremiumIconProps {
  children: ReactNode;
  className?: string;
  variant?: "gold" | "teal" | "light";
}

export function PremiumIcon({
  children,
  className,
  variant = "gold",
}: PremiumIconProps) {
  const variants = {
    gold:
      "bg-gradient-to-br from-[var(--color-gold)]/30 via-[var(--color-gold)]/10 to-transparent ring-[var(--color-gold)]/40 text-[var(--color-sapphire)]",
    teal:
      "bg-gradient-to-br from-[var(--color-teal)]/25 via-[var(--color-sky)]/10 to-transparent ring-[var(--color-teal)]/30 text-[var(--color-teal)]",
    light:
      "bg-white/15 ring-white/25 text-[var(--color-gold)] backdrop-blur-md",
  };

  return (
    <div
      className={cn(
        "inline-flex h-11 w-11 items-center justify-center rounded-2xl ring-1 shadow-sm transition-transform duration-300 group-hover:scale-110",
        variants[variant],
        className,
      )}
    >
      {children}
    </div>
  );
}
