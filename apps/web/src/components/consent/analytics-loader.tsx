"use client";

import { useEffect } from "react";
import { hasAnalyticsConsent } from "@/lib/consent";

function loadGoogleAnalytics(measurementId: string) {
  if (document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${measurementId}"]`)) {
    return;
  }

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", measurementId);
}

function loadYandexMetrika(counterId: string) {
  if (document.querySelector('script[src*="mc.yandex.ru/metrika/tag.js"]')) {
    return;
  }

  type YmFn = (...args: unknown[]) => void;
  const ymQueue: unknown[][] = [];
  const ym: YmFn = (...args) => {
    ymQueue.push(args);
  };
  (ym as YmFn & { a?: unknown[][]; l?: number }).a = ymQueue;
  (ym as YmFn & { a?: unknown[][]; l?: number }).l = Date.now();
  window.ym = ym;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://mc.yandex.ru/metrika/tag.js";
  document.head.appendChild(script);

  window.ym(Number(counterId), "init", {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
  });
}

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
    ym?: (...args: unknown[]) => void;
  }
}

export function AnalyticsLoader() {
  useEffect(() => {
    const maybeLoad = () => {
      if (!hasAnalyticsConsent()) return;

      const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
      const ymId = process.env.NEXT_PUBLIC_YM_COUNTER_ID;

      if (gaId) loadGoogleAnalytics(gaId);
      if (ymId) loadYandexMetrika(ymId);
    };

    maybeLoad();
    window.addEventListener("thaipass:consent", maybeLoad);
    return () => window.removeEventListener("thaipass:consent", maybeLoad);
  }, []);

  return null;
}
