"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { readConsent } from "@/lib/consent";

function subscribeConsent(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("thaipass:consent", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("thaipass:consent", callback);
  };
}

function getConsentGiven() {
  return readConsent() !== null;
}

function getServerConsentGiven() {
  return false;
}

export function StickyCta() {
  const consentGiven = useSyncExternalStore(
    subscribeConsent,
    getConsentGiven,
    getServerConsentGiven,
  );

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
