"use client";

import dynamic from "next/dynamic";

const CookieConsentBanner = dynamic(
  () =>
    import("@/components/consent/cookie-consent-banner").then(
      (m) => m.CookieConsentBanner,
    ),
  { ssr: false },
);

export function CookieConsentLoader() {
  return <CookieConsentBanner />;
}
