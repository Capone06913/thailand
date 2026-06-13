"use client";

import { useCallback, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface HeroVideoSpotlightProps {
  className?: string;
  children: React.ReactNode;
}

export function HeroVideoSpotlight({
  className,
  children,
}: HeroVideoSpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [spot, setSpot] = useState({ x: -400, y: -400, active: false });

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setSpot({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    });
  }, []);

  const onLeave = useCallback(() => {
    setSpot((s) => ({ ...s, active: false }));
  }, []);

  const mask = spot.active
    ? `radial-gradient(circle 220px at ${spot.x}px ${spot.y}px, transparent 0%, transparent 42%, rgba(0,0,0,0.55) 100%)`
    : "radial-gradient(circle 0px at 50% 50%, transparent 0%, rgba(0,0,0,0.45) 100%)";

  const glow = spot.active
    ? `radial-gradient(circle 200px at ${spot.x}px ${spot.y}px, rgba(255,210,120,0.55) 0%, rgba(74,159,212,0.35) 35%, transparent 72%)`
    : "none";

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: spot.active ? 1 : 0.85,
          background: glow,
          mixBlendMode: "screen",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[var(--color-bg)]/20 backdrop-saturate-[0.65] backdrop-brightness-95 transition-[mask-image,-webkit-mask-image] duration-150"
        style={{
          WebkitMaskImage: mask,
          maskImage: mask,
        }}
      />
    </div>
  );
}

