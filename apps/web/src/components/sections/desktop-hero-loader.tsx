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

/** Loads scroll hero on desktop; removes SSR poster fallback once mounted. */
export function DesktopHeroLoader() {
  const showDesktopHero = useSyncExternalStore(
    subscribeHeroPlayback,
    getHeroPlaybackSnapshot,
    getHeroPlaybackServerSnapshot,
  );

  useEffect(() => {
    if (!showDesktopHero) return;
    document.getElementById("desktop-hero-fallback")?.remove();
  }, [showDesktopHero]);

  if (!showDesktopHero) return null;

  return <ScrollVideoHero />;
}
