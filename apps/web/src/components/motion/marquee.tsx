"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

export function Marquee({ children, className, speed = 30 }: MarqueeProps) {
  return (
    <div className={cn("overflow-hidden", className)}>
      <div
        className="flex w-max gap-8"
        style={{ animation: `marquee ${speed}s linear infinite` }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}

