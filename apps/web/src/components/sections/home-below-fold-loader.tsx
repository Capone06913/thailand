"use client";

import dynamic from "next/dynamic";

const HomeBelowFold = dynamic(
  () =>
    import("@/components/sections/home-below-fold").then((m) => m.HomeBelowFold),
  { ssr: false, loading: () => null },
);

export function HomeBelowFoldLoader() {
  return <HomeBelowFold />;
}
