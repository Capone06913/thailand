"use client";

import { useEffect, useState } from "react";
import {
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

export const HERO_FRAME_COUNT = 282;
export const HERO_FRAME_PATTERN = "/video/hero-frames/frame_%04d.webp";

export function framePath(index: number): string {
  const n = Math.min(Math.max(Math.round(index), 1), HERO_FRAME_COUNT);
  return HERO_FRAME_PATTERN.replace("%04d", String(n).padStart(4, "0"));
}

export function useScrollFrames(
  scrollYProgress: MotionValue<number>,
  frameCount: number = HERO_FRAME_COUNT,
) {
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.4,
  });

  const frameIndex = useTransform(smoothProgress, (v) => {
    const clamped = Math.min(Math.max(v, 0), 1);
    return Math.round(clamped * (frameCount - 1)) + 1;
  });

  const [currentFrame, setCurrentFrame] = useState(1);
  const [preloaded, setPreloaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const urls = Array.from({ length: frameCount }, (_, i) =>
      framePath(i + 1),
    );
    Promise.all(
      urls.map(
        (src) =>
          new Promise<void>((resolve) => {
            const img = new Image();
            img.onload = () => resolve();
            img.onerror = () => resolve();
            img.src = src;
          }),
      ),
    ).then(() => {
      if (!cancelled) setPreloaded(true);
    });
    return () => {
      cancelled = true;
    };
  }, [frameCount]);

  useEffect(() => {
    const unsub = frameIndex.on("change", (idx) => {
      setCurrentFrame(idx);
    });
    return () => unsub();
  }, [frameIndex]);

  return { currentFrame, preloaded, framePath: () => framePath(currentFrame) };
}
