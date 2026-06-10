"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PremiumCtaProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  external?: boolean;
}

export function PremiumCta({
  href,
  children,
  variant = "primary",
  className,
  external,
}: PremiumCtaProps) {
  const base =
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-display text-sm font-bold transition-all duration-300";

  const variants = {
    primary:
      "bg-[var(--color-sapphire)] px-6 py-3 text-white shadow-lg shadow-[var(--color-sapphire)]/25 hover:shadow-xl hover:shadow-[var(--color-sapphire)]/35",
    secondary:
      "border border-[var(--color-sapphire)]/20 bg-white/90 px-6 py-3 text-[var(--color-sapphire)] backdrop-blur-sm hover:border-[var(--color-gold)]/50 hover:bg-white",
    ghost:
      "px-2 py-1 text-[var(--color-teal)] hover:text-[var(--color-sapphire)]",
  };

  const inner = (
    <>
      <span className="relative z-10 flex items-center gap-2">
        {children}
        <ArrowRight
          size={16}
          className="transition-transform duration-300 group-hover:translate-x-0.5"
        />
      </span>
      {variant === "primary" && (
        <span
          aria-hidden
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"
        />
      )}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(base, variants[variant], className)}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={cn(base, variants[variant], className)}>
      {inner}
    </Link>
  );
}
