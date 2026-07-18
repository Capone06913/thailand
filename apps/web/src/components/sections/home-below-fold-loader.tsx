"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const HomeBelowFold = dynamic(
  () =>
    import("@/components/sections/home-below-fold").then((m) => m.HomeBelowFold),
  { ssr: false, loading: () => null },
);

const IDLE_DELAY_MS = 3200;

export function HomeBelowFoldLoader() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const load = () => {
      if (!cancelled) setReady(true);
    };

    const onScroll = () => {
      load();
      window.removeEventListener("scroll", onScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    const idleId =
      typeof requestIdleCallback !== "undefined"
        ? requestIdleCallback(() => {
            window.setTimeout(load, IDLE_DELAY_MS);
          })
        : window.setTimeout(load, IDLE_DELAY_MS);

    return () => {
      cancelled = true;
      window.removeEventListener("scroll", onScroll);
      if (typeof requestIdleCallback !== "undefined") {
        cancelIdleCallback(idleId as number);
      } else {
        clearTimeout(idleId as number);
      }
    };
  }, []);

  return ready ? <HomeBelowFold /> : null;
}
