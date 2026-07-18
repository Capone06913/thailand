"use client";

import { useEffect, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import {
  getHeroPlaybackServerSnapshot,
  getHeroPlaybackSnapshot,
  subscribeHeroPlayback,
} from "@/lib/hero-playback";

const ScrollVideoHero = dynamic(
  () =>
    import("@/components/sections/scroll-video-hero").then(
      (m) => m.ScrollVideoHero,
    ),
  { ssr: false, loading: () => null },
);

/** Overlays ScrollVideoHero in the reserved desktop slot; hides SSR fallback without layout shift. */
export function DesktopHeroLoader() {
  const showDesktopHero = useSyncExternalStore(
    subscribeHeroPlayback,
    getHeroPlaybackSnapshot,
    getHeroPlaybackServerSnapshot,
  );

  useEffect(() => {
    if (!showDesktopHero) return;
    const fallback = document.getElementById("desktop-hero-fallback");
    if (!fallback) return;
    fallback.style.opacity = "0";
    fallback.style.pointerEvents = "none";
  }, [showDesktopHero]);

  if (!showDesktopHero) return null;

  return (
    <div className="absolute inset-0 z-[1] h-full">
      <ScrollVideoHero />
    </div>
  );
}
