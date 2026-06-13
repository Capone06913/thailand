"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface MarqueeItem {
  label: string;
  href?: string;
  external?: boolean;
}

interface InteractiveMarqueeProps {
  items: MarqueeItem[];
  speed?: number;
  className?: string;
}

export function InteractiveMarquee({
  items,
  speed = 0.45,
  className,
}: InteractiveMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const draggingRef = useRef(false);
  const dragStartX = useRef(0);
  const dragStartOffset = useRef(0);
  const movedRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const applyOffset = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const half = track.scrollWidth / 2;
    if (half <= 0) return;
    let o = offsetRef.current % half;
    if (o > 0) o -= half;
    offsetRef.current = o;
    track.style.transform = `translate3d(${o}px, 0, 0)`;
  }, []);

  useEffect(() => {
    const tick = () => {
      if (!draggingRef.current && !isHovered) {
        offsetRef.current -= speed;
        applyOffset();
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [speed, isHovered, applyOffset]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragStartOffset.current = offsetRef.current;
    movedRef.current = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const dx = e.clientX - dragStartX.current;
    movedRef.current = Math.max(movedRef.current, Math.abs(dx));
    offsetRef.current = dragStartOffset.current + dx;
    applyOffset();
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* noop */
    }
  };

  const doubled = [...items, ...items];

  return (
    <div
      className={cn(
        "relative overflow-hidden border-y border-white/10 bg-gradient-to-r from-[var(--color-sapphire)] via-[#123552] to-[var(--color-teal)] py-3.5",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          "cursor-grab select-none touch-pan-y active:cursor-grabbing",
          isDragging && "cursor-grabbing",
        )}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div ref={trackRef} className="flex w-max will-change-transform">
          {doubled.map((item, i) => {
            const chip = (
              <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white/90 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]" />
                {item.label}
              </span>
            );

            const canNavigate = item.href && movedRef.current < 6;

            if (!item.href) {
              return (
                <span key={`${item.label}-${i}`} className="mx-3 shrink-0">
                  {chip}
                </span>
              );
            }

            if (item.external) {
              return (
                <a
                  key={`${item.label}-${i}`}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mx-3 shrink-0"
                  onClick={(e) => {
                    if (movedRef.current >= 6) e.preventDefault();
                  }}
                  draggable={false}
                >
                  {chip}
                </a>
              );
            }

            return (
              <Link
                key={`${item.label}-${i}`}
                href={item.href}
                className="mx-3 shrink-0"
                onClick={(e) => {
                  if (!canNavigate) e.preventDefault();
                }}
                draggable={false}
              >
                {chip}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
