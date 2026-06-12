"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { readConsent } from "@/lib/consent";

export function StickyCta() {
  const [consentGiven, setConsentGiven] = useState(false);

  useEffect(() => {
    setConsentGiven(readConsent() !== null);
    const onConsent = () => setConsentGiven(true);
    window.addEventListener("thaipass:consent", onConsent);
    return () => window.removeEventListener("thaipass:consent", onConsent);
  }, []);

  if (!consentGiven) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[var(--color-border)] bg-[var(--color-bg)]/95 p-3 backdrop-blur-md md:hidden">
      <Link
        href="#zayavka"
        className="block w-full rounded-full bg-[var(--color-teal)] py-3 text-center text-sm font-semibold text-white"
      >
        Получить разбор кейса
      </Link>
    </div>
  );
}
