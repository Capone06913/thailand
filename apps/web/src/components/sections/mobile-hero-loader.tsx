"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { HERO_VIDEO_SRC } from "@/lib/hero-media";
import {
  getHeroPlaybackServerSnapshot,
  getHeroPlaybackSnapshot,
  subscribeHeroPlayback,
} from "@/lib/hero-playback";

/** Mobile hero background video — poster stays in MobileHeroStatic for LCP. */
export function MobileHeroLoader() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const showVideo = useSyncExternalStore(
    subscribeHeroPlayback,
    getHeroPlaybackSnapshot,
    getHeroPlaybackServerSnapshot,
  );

  useEffect(() => {
    if (!showVideo) return;
    const video = videoRef.current;
    if (!video) return;

    let cancelled = false;

    const onCanPlay = () => {
      if (cancelled) return;
      video.playbackRate = 1;
      void video.play().catch(() => {});
    };

    video.src = HERO_VIDEO_SRC;
    video.addEventListener("canplay", onCanPlay, { once: true });
    video.load();

    return () => {
      cancelled = true;
      video.removeEventListener("canplay", onCanPlay);
    };
  }, [showVideo]);

  if (!showVideo) return null;

  return (
    <video
      ref={videoRef}
      className="pointer-events-none absolute inset-0 z-[1] h-full w-full object-cover brightness-110 saturate-125"
      muted
      loop
      playsInline
      preload="none"
      aria-hidden
      tabIndex={-1}
    />
  );
}
