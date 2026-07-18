"use client";

import { useId, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { Label } from "@/components/ui/label";
import { siteConfig } from "@/lib/site-config";
import {
  CONSENT_VERSION,
  readConsent,
  writeConsent,
} from "@/lib/consent";

function CookieIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="32" cy="34" r="22" fill="currentColor" opacity="0.15" />
      <path
        d="M32 14c-11 0-20 9-20 20 0 9.5 6.6 17.5 15.5 19.6.8.2 1.5-.5 1.5-1.3V49c0-1.1.9-2 2-2h2.8c.9 0 1.6-.7 1.6-1.6 0-5.2 4.2-9.4 9.4-9.4h.2c5.2 0 9.4-4.2 9.4-9.4C54 23 44.3 14 32 14Z"
        fill="currentColor"
      />
      <circle cx="24" cy="30" r="2.5" fill="var(--color-sapphire)" />
      <circle cx="34" cy="24" r="2" fill="var(--color-sapphire)" />
      <circle cx="42" cy="34" r="2.5" fill="var(--color-sapphire)" />
      <circle cx="30" cy="40" r="2" fill="var(--color-sapphire)" />
    </svg>
  );
}

function subscribeConsent(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("thaipass:consent", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("thaipass:consent", callback);
  };
}

function getConsentVisible() {
  return readConsent() === null;
}

function getServerConsentVisible() {
  return false;
}

export function CookieConsentBanner() {
  const visible = useSyncExternalStore(
    subscribeConsent,
    getConsentVisible,
    getServerConsentVisible,
  );
  const checkboxId = useId();
  const [checked, setChecked] = useState(false);

  const accept = () => {
    if (!checked) return;
    writeConsent({
      version: CONSENT_VERSION,
      acceptedAt: new Date().toISOString(),
      analytics: true,
    });
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-consent-title"
          aria-describedby="cookie-consent-desc"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-50 px-3 pb-3 pt-2 sm:px-4 sm:pb-4 md:bottom-4 md:left-auto md:right-4 md:max-w-xl md:px-0"
        >
          <div className="relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)]/92 shadow-[0_20px_60px_rgba(20,42,69,0.18)] backdrop-blur-xl">
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[var(--color-teal)] via-[var(--color-gold)] to-[var(--color-sky)]"
            />

            <div className="flex gap-4 p-4 sm:p-5">
              <div className="hidden shrink-0 sm:block">
                <CookieIcon className="size-14 text-[var(--color-gold)]" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-teal)]/10 text-[var(--color-teal)] sm:hidden">
                    <ShieldCheck className="size-5" aria-hidden />
                  </div>
                  <div>
                    <h2
                      id="cookie-consent-title"
                      className="font-display text-base font-bold text-[var(--color-sapphire)] sm:text-lg"
                    >
                      Согласие на cookie и персональные данные
                    </h2>
                    <p
                      id="cookie-consent-desc"
                      className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]"
                    >
                      {siteConfig.name} использует технические и аналитические
                      cookie, а также обрабатывает персональные данные по правилам
                      152-ФЗ и{" "}
                      <a
                        href="https://rkn.gov.ru/docs/Polozhenie_ob_obrabotke_PD_24052023.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-[var(--color-teal)] underline underline-offset-2"
                      >
                        Положения Роскомнадзора
                      </a>
                      . Подробности: в{" "}
                      <Link
                        href="/privacy"
                        className="font-medium text-[var(--color-teal)] underline underline-offset-2"
                      >
                        политике конфиденциальности
                      </Link>{" "}
                      и{" "}
                      <Link
                        href="/cookies"
                        className="font-medium text-[var(--color-teal)] underline underline-offset-2"
                      >
                        политике cookie
                      </Link>
                      .
                    </p>
                  </div>
                </div>

                <div className="mt-4 rounded-xl border border-[var(--color-border)]/80 bg-white/50 px-3 py-3">
                  <Label
                    htmlFor={checkboxId}
                    className="cursor-pointer items-start gap-3 text-left leading-snug font-normal text-[var(--color-sapphire)]"
                  >
                    <input
                      id={checkboxId}
                      type="checkbox"
                      checked={checked}
                      onChange={(e) => setChecked(e.target.checked)}
                      className="mt-0.5 size-4 shrink-0 rounded border-[var(--color-border)] text-[var(--color-teal)] focus:ring-[var(--color-teal)]"
                    />
                    <span className="text-sm">
                      Я ознакомлен(а) с политикой конфиденциальности и политикой
                      cookie и даю согласие на обработку персональных данных,
                      включая аналитические cookie.
                    </span>
                  </Label>
                </div>

                <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-[var(--color-muted)]">
                    Продолжая работу с сайтом, вы подтверждаете согласие.
                    Закрыть без принятия нельзя.
                  </p>
                  <button
                    type="button"
                    onClick={accept}
                    disabled={!checked}
                    className="inline-flex shrink-0 items-center justify-center rounded-full bg-[var(--color-teal)] px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[var(--color-teal-light)] disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    Принять и продолжить
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
