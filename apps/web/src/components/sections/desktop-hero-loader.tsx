"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";
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

/** Loads scroll hero + framer-motion only on desktop — mobile uses MobileHeroStatic. */
export function DesktopHeroLoader() {
  const showDesktopHero = useSyncExternalStore(
    subscribeHeroPlayback,
    getHeroPlaybackSnapshot,
    getHeroPlaybackServerSnapshot,
  );

  if (!showDesktopHero) return null;

  return <ScrollVideoHero />;
}
