import { HERO_VIDEO_ENABLED } from "@/lib/hero-media";

function canAutoplayVideo(): boolean {
  if (typeof window === "undefined") return false;
  if (!HERO_VIDEO_ENABLED) return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;

  const connection = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;

  if (connection?.saveData) return false;
  if (connection?.effectiveType?.includes("2g")) return false;
  return true;
}

export function subscribeHeroPlayback(onStoreChange: () => void) {
  const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
  const mobileMq = window.matchMedia("(max-width: 767px)");
  motionMq.addEventListener("change", onStoreChange);
  mobileMq.addEventListener("change", onStoreChange);
  return () => {
    motionMq.removeEventListener("change", onStoreChange);
    mobileMq.removeEventListener("change", onStoreChange);
  };
}

export function getHeroPlaybackSnapshot() {
  return canAutoplayVideo();
}

export function getHeroPlaybackServerSnapshot() {
  return false;
}
