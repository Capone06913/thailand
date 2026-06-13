import { cn } from "@/lib/utils";

interface ServiceLeadShellProps {
  children: React.ReactNode;
  className?: string;
}

export function ServiceLeadShell({ children, className }: ServiceLeadShellProps) {
  return (
    <div className={cn("relative lg:sticky lg:top-24", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-2 rounded-[1.85rem] bg-gradient-to-br from-[var(--color-gold)]/35 via-[var(--color-sapphire)]/10 to-[var(--color-teal)]/25 blur-md"
      />
      <div className="relative">{children}</div>
    </div>
  );
}

