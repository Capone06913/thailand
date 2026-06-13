"use client";

import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

interface ShimmerButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
}

export function ShimmerButton({
  className,
  children,
  shimmerColor = "rgba(201,162,39,0.4)",
  ...props
}: ShimmerButtonProps) {
  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden rounded-full px-8 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.98]",
        "bg-[var(--color-teal)] shadow-lg shadow-teal-900/20",
        className,
      )}
      {...props}
    >
      <span
        className="absolute inset-0 -translate-x-full animate-[shimmer_2.5s_infinite]"
        style={{
          background: `linear-gradient(90deg, transparent, ${shimmerColor}, transparent)`,
        }}
      />
      <span className="relative z-10">{children}</span>
    </button>
  );
}
