"use client";

import Link from "next/link";

export function StickyCta() {
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
