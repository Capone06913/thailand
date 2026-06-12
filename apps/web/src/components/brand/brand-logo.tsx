import Link from "next/link";
import { cn } from "@/lib/utils";

const sizeClasses = {
  sm: "gap-1.5 [&_.tp-word]:text-base [&_.tp-tag]:text-[7px] [&_.tp-spire]:h-4 [&_.tp-spire]:w-3",
  md: "gap-2 [&_.tp-word]:text-lg [&_.tp-tag]:text-[8px] [&_.tp-spire]:h-5 [&_.tp-spire]:w-3.5",
  lg: "gap-2 [&_.tp-word]:text-xl [&_.tp-tag]:text-[9px] [&_.tp-spire]:h-6 [&_.tp-spire]:w-4",
  hero: "gap-2.5 [&_.tp-word]:text-2xl md:[&_.tp-word]:text-3xl [&_.tp-tag]:text-[10px] [&_.tp-spire]:h-7 [&_.tp-spire]:w-4 md:[&_.tp-spire]:h-8 md:[&_.tp-spire]:w-5",
  footer:
    "gap-2.5 [&_.tp-word]:text-xl sm:[&_.tp-word]:text-2xl [&_.tp-tag]:text-[9px] sm:[&_.tp-tag]:text-[10px] [&_.tp-spire]:h-6 [&_.tp-spire]:w-4 sm:[&_.tp-spire]:h-7 sm:[&_.tp-spire]:w-5",
} as const;

interface BrandLogoProps {
  variant?: "color" | "white";
  size?: keyof typeof sizeClasses;
  href?: string;
  className?: string;
  showTagline?: boolean;
  centered?: boolean;
}

function SpireIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 32"
      aria-hidden
      className={cn("tp-spire shrink-0", className)}
      fill="currentColor"
    >
      <path d="M12 2L4 28h16L12 2zm0 6l5 14H7l5-14z" />
      <path d="M12 8v18" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

export function BrandLogo({
  variant = "color",
  size = "md",
  href = "/",
  className,
  showTagline = size === "hero" || size === "footer",
  centered = false,
}: BrandLogoProps) {
  const isWhite = variant === "white";
  const wordColor = isWhite ? "text-white" : "text-[var(--color-sapphire)]";
  const spireColor = isWhite ? "text-[var(--color-gold)]" : "text-[var(--color-gold)]";
  const tagColor = isWhite ? "text-white/70" : "text-[var(--color-muted)]";

  const mark = (
    <span
      className={cn(
        "inline-flex flex-col",
        centered ? "items-center" : "items-start",
        sizeClasses[size],
        className,
      )}
    >
      <span className="inline-flex items-center gap-2">
        <span className={cn("tp-word font-display font-extrabold tracking-tight", wordColor)}>
          THAI
        </span>
        <SpireIcon className={spireColor} />
        <span className={cn("tp-word font-display font-extrabold tracking-tight", wordColor)}>
          PASS
        </span>
      </span>
      {showTagline && (
        <span
          className={cn(
            "tp-tag mt-0.5 font-semibold uppercase tracking-[0.28em]",
            centered && "text-center",
            tagColor,
          )}
        >
          Visa & Relocation Services
        </span>
      )}
    </span>
  );

  if (!href) return mark;

  return (
    <Link href={href} className="inline-flex shrink-0 items-center no-underline">
      {mark}
    </Link>
  );
}
