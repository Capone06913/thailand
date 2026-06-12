"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ShimmerCardProps {
  children: ReactNode;
  className?: string;
}

export function ShimmerCard({ children, className }: ShimmerCardProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-3xl p-[1px]", className)}>
      <div className="shimmer-border absolute inset-0 rounded-3xl opacity-80" />
      <div className="relative rounded-[calc(1.5rem-1px)] bg-white/90 backdrop-blur-2xl">
        {children}
      </div>
    </div>
  );
}
