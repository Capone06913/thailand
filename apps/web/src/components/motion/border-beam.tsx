"use client";

import { cn } from "@/lib/utils";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  colorFrom?: string;
  colorTo?: string;
}

export function BorderBeam({
  className,
  size = 220,
  duration = 12,
  colorFrom = "var(--color-gold)",
  colorTo = "var(--color-sky)",
}: BorderBeamProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]",
        className,
      )}
    >
      <div
        className="absolute aspect-square opacity-80"
        style={{
          width: size,
          background: `conic-gradient(from 0deg, transparent, ${colorFrom}, ${colorTo}, transparent)`,
          animation: `border-beam-spin ${duration}s linear infinite`,
          top: "50%",
          left: "50%",
          marginTop: -(size / 2),
          marginLeft: -(size / 2),
        }}
      />
    </div>
  );
}
