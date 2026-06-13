"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { BorderBeam } from "@/components/motion/border-beam";
import { cn } from "@/lib/utils";

const steps = [
  { id: 0, num: "01", label: "Р¦РµР»СЊ", caption: "РЎС†РµРЅР°СЂРёР№ РІСЉРµР·РґР°" },
  { id: 1, num: "02", label: "РЎСЂРѕРєРё", caption: "РљРѕРіРґР° РЅСѓР¶РЅР° РІРёР·Р°" },
  { id: 2, num: "03", label: "РћРїС‹С‚", caption: "Р‘С‹Р»Рё Р»Рё РїРѕРїС‹С‚РєРё" },
  { id: 3, num: "04", label: "РС‚РѕРі", caption: "Р’Р°С€Р° СѓСЃР»СѓРіР°" },
] as const;

interface QuizShellProps {
  step: number;
  progress: number;
  children: React.ReactNode;
}

export function QuizShell({ step, progress, children }: QuizShellProps) {
  const activeStep = steps[Math.min(step, steps.length - 1)];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.08 }}
      className="relative mt-10 lg:mt-12"
    >
      <div className="absolute -inset-3 rounded-[2.25rem] bg-gradient-to-br from-[var(--color-gold)]/25 via-transparent to-[var(--color-teal)]/15 blur-2xl lg:-inset-4 lg:rounded-[2.75rem]" />

      <div className="relative rounded-[2rem] bg-gradient-to-br from-[var(--color-gold)]/50 via-[var(--color-sapphire)]/15 to-[var(--color-teal)]/35 p-[1px] shadow-[0_32px_90px_rgba(20,42,69,0.14)] lg:rounded-[2.5rem] lg:shadow-[0_40px_110px_rgba(20,42,69,0.16)]">
        <div className="relative overflow-hidden rounded-[calc(2rem-1px)] lg:rounded-[calc(2.5rem-1px)]">
          <BorderBeam size={380} duration={14} className="hidden lg:block" />
          <BorderBeam size={280} duration={14} className="lg:hidden" />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,168,83,0.08),transparent_42%)]"
          />

          <div className="grid items-start md:grid-cols-[minmax(0,15rem)_1fr] lg:grid-cols-[minmax(0,20rem)_1fr] xl:grid-cols-[minmax(0,22rem)_1fr]">
            <aside className="relative border-b border-[var(--color-border)] bg-[var(--color-sapphire)] px-5 py-5 text-white md:border-b-0 md:border-r md:border-white/10 md:px-6 md:py-6 lg:px-7 lg:py-7">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-6 top-8 h-32 w-32 rounded-full bg-[var(--color-gold)]/10 blur-2xl"
              />

              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--color-gold)]">
                ThaiPass В· РїРѕРґР±РѕСЂ
              </p>

              <div className="relative mt-4 md:mt-5">
                <span
                  aria-hidden
                  className="font-display text-[5.5rem] font-extrabold leading-none text-white/[0.06] md:text-[6.5rem] lg:text-[7.5rem]"
                >
                  {activeStep.num}
                </span>
                <p className="relative -mt-10 font-display text-3xl font-extrabold tracking-tight md:-mt-12 md:text-4xl lg:-mt-14 lg:text-5xl">
                  {activeStep.num}
                </p>
                <p className="relative mt-1 font-serif text-lg font-semibold text-white/95 lg:text-xl">
                  {activeStep.label}
                </p>
                <p className="relative mt-1 text-xs font-medium text-white/55 lg:text-sm">
                  {activeStep.caption}
                </p>
              </div>

              <ol className="relative mt-5 hidden space-y-0 xl:block">
                {steps.map((item, index) => {
                  const isActive = step === item.id;
                  const isDone = step > item.id;
                  const isLast = index === steps.length - 1;
                  return (
                    <li key={item.id} className="relative flex gap-3 pb-3.5 last:pb-0 lg:pb-4">
                      {!isLast ? (
                        <span
                          aria-hidden
                          className={cn(
                            "absolute left-[11px] top-7 h-[calc(100%-4px)] w-px",
                            isDone
                              ? "bg-[var(--color-gold)]/70"
                              : "bg-white/15",
                          )}
                        />
                      ) : null}
                      <span
                        className={cn(
                          "relative z-[1] flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold transition-colors lg:h-7 lg:w-7 lg:text-[11px]",
                          isActive
                            ? "border-[var(--color-gold)] bg-[var(--color-gold)] text-[var(--color-sapphire)]"
                            : isDone
                              ? "border-[var(--color-gold)]/60 bg-[var(--color-gold)]/15 text-[var(--color-gold)]"
                              : "border-white/20 bg-white/5 text-white/40",
                        )}
                      >
                        {isDone ? <Check size={12} strokeWidth={3} /> : index + 1}
                      </span>
                      <div className="min-w-0 pt-0.5">
                        <p
                          className={cn(
                            "text-xs font-bold uppercase tracking-wide lg:text-[13px]",
                            isActive
                              ? "text-white"
                              : isDone
                                ? "text-white/75"
                                : "text-white/35",
                          )}
                        >
                          {item.label}
                        </p>
                        <p className="text-[11px] text-white/40 lg:text-xs">{item.caption}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>

              <div className="mt-5 md:mt-6">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.18em] text-white/45 lg:text-[11px]">
                  <span>РџСЂРѕРіСЂРµСЃСЃ</span>
                  <span className="tabular-nums text-[var(--color-gold)]">
                    {progress}%
                  </span>
                </div>
                <div className="relative mt-2 h-1 overflow-hidden rounded-full bg-white/10 lg:mt-2.5 lg:h-1.5">
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-sky)]"
                    initial={false}
                    animate={{ width: `${progress}%` }}
                    transition={{ type: "spring", stiffness: 120, damping: 22 }}
                  />
                </div>
              </div>
            </aside>

            <div className="relative min-w-0 rounded-b-[calc(2rem-1px)] bg-white md:rounded-br-[calc(2rem-1px)] lg:rounded-br-[calc(2.5rem-1px)]">
              <div
                aria-hidden
                className="quiz-panel-texture pointer-events-none absolute inset-0 opacity-70"
              />
              <div className="relative border-b border-[var(--color-border)]/80 px-5 py-4 md:hidden">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-display text-xs font-bold uppercase tracking-wide text-[var(--color-sapphire)]">
                    РЁР°Рі {Math.min(step + 1, steps.length)} В· {activeStep.label}
                  </p>
                  <span className="font-display text-xs font-bold tabular-nums text-[var(--color-gold)]">
                    {progress}%
                  </span>
                </div>
                <div className="relative mt-2 h-1 overflow-hidden rounded-full bg-[var(--color-border)]">
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[var(--color-teal)] to-[var(--color-gold)]"
                    initial={false}
                    animate={{ width: `${progress}%` }}
                    transition={{ type: "spring", stiffness: 120, damping: 22 }}
                  />
                </div>
              </div>

              <div className="relative p-6 pb-5 md:p-8 md:pb-6 lg:px-9 lg:pt-8 lg:pb-5">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

