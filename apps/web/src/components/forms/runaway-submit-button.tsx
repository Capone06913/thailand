"use client";

import { useCallback, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface RunawaySubmitButtonProps {
  ready: boolean;
  loading: boolean;
  label: string;
  hint?: string;
}

export function RunawaySubmitButton({
  ready,
  loading,
  label,
  hint = "Заполните имя, контакт и тип визы",
}: RunawaySubmitButtonProps) {
  const arenaRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const flee = useCallback(
    (clientX: number, clientY: number) => {
      if (ready) return;
      const arena = arenaRef.current;
      if (!arena) return;
      const rect = arena.getBoundingClientRect();
      const cx = clientX - rect.left;
      const cy = clientY - rect.top;
      const dx = rect.width / 2 - cx;
      const dy = 24 - cy;
      const len = Math.hypot(dx, dy) || 1;
      const push = 72;
      const maxX = rect.width - 200;
      const nextX = Math.min(maxX, Math.max(0, offset.x + (dx / len) * push));
      const nextY = Math.min(40, Math.max(-8, offset.y + (dy / len) * push * 0.4));
      setOffset({ x: nextX, y: nextY });
    },
    [ready, offset.x, offset.y],
  );

  return (
    <div ref={arenaRef} className="relative mt-2 min-h-[52px]">
      {!ready && (
        <p className="mb-2 text-center text-xs font-medium text-[var(--color-muted)]">
          {hint}
        </p>
      )}
      <button
        type="submit"
        disabled={!ready || loading}
        onMouseEnter={(e) => flee(e.clientX, e.clientY)}
        onMouseMove={(e) => {
          if (!ready) flee(e.clientX, e.clientY);
        }}
        onFocus={(e) => {
          if (!ready) {
            const rect = e.currentTarget.getBoundingClientRect();
            flee(rect.left + rect.width / 2, rect.top);
          }
        }}
        style={{
          transform: ready ? "none" : `translate(${offset.x}px, ${offset.y}px)`,
        }}
        className={cn(
          "relative z-10 flex h-12 w-full items-center justify-center gap-2 rounded-full text-base font-bold transition-all duration-200",
          ready
            ? "bg-[var(--color-gold)] text-[var(--color-sapphire)] shadow-lg shadow-[var(--color-gold)]/25 hover:bg-[var(--color-gold)]/90"
            : "cursor-not-allowed bg-[var(--color-surface)] text-[var(--color-muted)] shadow-sm",
        )}
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" size={16} />
            Отправляем...
          </>
        ) : (
          label
        )}
      </button>
    </div>
  );
}
