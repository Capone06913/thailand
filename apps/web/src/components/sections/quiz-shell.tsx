"use client";

import { motion } from "framer-motion";
import { CalendarDays, Check, Clock3, MapPin, ShieldCheck, Sparkles, Target } from "lucide-react";
import { BorderBeam } from "@/components/motion/border-beam";
import { cn } from "@/lib/utils";

const steps = [
  { id: 0, num: "01", label: "Цель", caption: "Сценарий въезда" },
  { id: 1, num: "02", label: "Сроки", caption: "Когда нужна виза" },
  { id: 2, num: "03", label: "Опыт", caption: "Были ли попытки" },
  { id: 3, num: "04", label: "Итог", caption: "Ваша услуга" },
] as const;

export type QuizSidebarSummary = {
  goal?: string;
  timeline?: string;
  tried?: string;
  serviceName?: string;
  serviceTimeline?: string;
};

interface QuizShellProps {
  step: number;
  progress: number;
  children: React.ReactNode;
  summary?: QuizSidebarSummary;
}

const trustPoints = [
  { icon: Clock3, text: "Ответ в мессенджере за 30 минут" },
  { icon: MapPin, text: "Москва и вся Россия" },
  { icon: ShieldCheck, text: "Разбор кейса бесплатно" },
];

function StepTimeline({ step }: { step: number }) {
  return (
    <ol className="relative space-y-0">
      {steps.map((item, index) => {
        const isActive = step === item.id;
        const isDone = step > item.id;
        const isLast = index === steps.length - 1;
        return (
          <li key={item.id} className="relative flex gap-2.5 pb-3 last:pb-0 lg:gap-3 lg:pb-3.5">
            {!isLast ? (
              <span
                aria-hidden
                className={cn(
                  "absolute left-[10px] top-6 h-[calc(100%-6px)] w-px lg:left-[11px] lg:top-7",
                  isDone ? "bg-[var(--color-gold)]/70" : "bg-white/15",
                )}
              />
            ) : null}
            <span
              className={cn(
                "relative z-[1] flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[9px] font-bold transition-colors lg:h-6 lg:w-6 lg:text-[10px]",
                isActive
                  ? "border-[var(--color-gold)] bg-[var(--color-gold)] text-[var(--color-sapphire)]"
                  : isDone
                    ? "border-[var(--color-gold)]/60 bg-[var(--color-gold)]/15 text-[var(--color-gold)]"
                    : "border-white/20 bg-white/5 text-white/40",
              )}
            >
              {isDone ? <Check size={10} strokeWidth={3} /> : index + 1}
            </span>
            <div className="min-w-0 pt-0.5">
              <p
                className={cn(
                  "text-[11px] font-bold uppercase tracking-wide lg:text-xs",
                  isActive
                    ? "text-white"
                    : isDone
                      ? "text-white/75"
                      : "text-white/35",
                )}
              >
                {item.label}
              </p>
              <p className="text-[10px] leading-snug text-white/40 lg:text-[11px]">
                {item.caption}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function SummaryRecap({ summary }: { summary: QuizSidebarSummary }) {
  const rows = [
    { label: "Цель", value: summary.goal, icon: Target },
    { label: "Сроки", value: summary.timeline, icon: CalendarDays },
    { label: "Опыт", value: summary.tried, icon: Sparkles },
  ].filter((row) => row.value);

  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--color-gold)]">
          Ваш сценарий
        </p>
        <ul className="mt-3 space-y-3">
          {rows.map((row, index) => {
            const Icon = row.icon;
            const isLast = index === rows.length - 1;
            return (
              <li
                key={row.label}
                className={cn(
                  "flex gap-3",
                  !isLast && "border-b border-white/8 pb-3",
                )}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--color-gold)]/15 text-[11px] font-bold tabular-nums text-[var(--color-gold)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1 pt-0.5">
                  <div className="flex items-center gap-1.5">
                    <Icon size={12} strokeWidth={1.75} className="text-white/45" />
                    <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/45">
                      {row.label}
                    </p>
                  </div>
                  <p className="mt-1 text-sm font-medium leading-snug text-white/92">
                    {row.value}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {summary.serviceName ? (
        <div className="rounded-2xl border border-[var(--color-gold)]/35 bg-[var(--color-gold)]/10 p-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-gold)]">
            Рекомендуем
          </p>
          <p className="mt-2 font-display text-base font-extrabold leading-snug text-white">
            {summary.serviceName}
          </p>
          {summary.serviceTimeline ? (
            <p className="mt-1 text-xs font-medium text-white/70">
              Срок: {summary.serviceTimeline}
            </p>
          ) : null}
        </div>
      ) : null}

      <ul className="space-y-2">
        {trustPoints.map(({ icon: Icon, text }) => (
          <li key={text} className="flex items-center gap-2.5 text-xs text-white/75">
            <Icon size={14} strokeWidth={1.75} className="shrink-0 text-[var(--color-gold)]" />
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function QuizShell({ step, progress, children, summary }: QuizShellProps) {
  const activeStep = steps[Math.min(step, steps.length - 1)];
  const isComplete = step >= 3;

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

          <div className="grid items-stretch md:grid-cols-[minmax(0,16rem)_1fr] lg:grid-cols-[minmax(0,18.5rem)_1fr] xl:grid-cols-[minmax(0,20rem)_1fr]">
            <aside className="relative flex flex-col border-b border-[var(--color-border)] bg-[var(--color-sapphire)] px-6 py-7 text-white md:border-b-0 md:border-r md:border-white/10 md:px-6 md:py-8 lg:px-7 lg:py-9">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 overflow-hidden"
              >
                {!isComplete ? (
                  <span className="absolute -right-1 top-4 font-display text-[5rem] font-extrabold leading-none text-white/[0.05] lg:text-[5.5rem]">
                    {activeStep.num}
                  </span>
                ) : null}
                <div className="absolute -right-8 bottom-8 h-36 w-36 rounded-full bg-[var(--color-gold)]/10 blur-3xl" />
                <div className="absolute -left-10 top-1/2 h-24 w-24 rounded-full bg-[var(--color-teal)]/20 blur-3xl" />
              </div>

              <div className="relative z-[1] flex min-h-full flex-col gap-5 md:gap-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--color-gold)]">
                  ThaiPass · подбор
                </p>

                {isComplete ? (
                  <>
                    <div className="flex items-start gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-gold)] text-[var(--color-sapphire)]">
                        <Check size={20} strokeWidth={2.5} />
                      </span>
                      <div className="pt-0.5">
                        <p className="font-display text-lg font-extrabold leading-tight lg:text-xl">
                          Подбор завершён
                        </p>
                        <p className="mt-1 text-xs font-medium text-white/60">
                          Осталось оставить заявку
                        </p>
                      </div>
                    </div>

                    {summary ? (
                      <div className="flex flex-1 flex-col justify-center">
                        <SummaryRecap summary={summary} />
                      </div>
                    ) : null}
                  </>
                ) : (
                  <>
                    <div className="space-y-1">
                      <p className="font-display text-2xl font-extrabold tracking-tight lg:text-3xl">
                        {activeStep.num}
                      </p>
                      <p className="font-serif text-base font-semibold text-white/95 lg:text-lg">
                        {activeStep.label}
                      </p>
                      <p className="text-xs font-medium leading-relaxed text-white/55 lg:text-sm">
                        {activeStep.caption}
                      </p>
                    </div>

                    <div className="hidden md:block">
                      <StepTimeline step={step} />
                    </div>
                  </>
                )}

                <div className="mt-auto border-t border-white/10 pt-4 md:pt-5">
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">
                    <span>Прогресс</span>
                    <span className="tabular-nums text-[var(--color-gold)]">
                      {progress}%
                    </span>
                  </div>
                  <div className="relative mt-2 h-1 overflow-hidden rounded-full bg-white/10 lg:h-1.5">
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-sky)]"
                      initial={false}
                      animate={{ width: `${progress}%` }}
                      transition={{
                        type: "spring",
                        stiffness: 120,
                        damping: 22,
                      }}
                    />
                  </div>
                </div>
              </div>
            </aside>

            <div className="relative flex min-w-0 flex-col rounded-b-[calc(2rem-1px)] bg-white md:rounded-br-[calc(2rem-1px)] lg:rounded-br-[calc(2.5rem-1px)]">
              <div
                aria-hidden
                className="quiz-panel-texture pointer-events-none absolute inset-0 opacity-70"
              />
              {!isComplete ? (
                <div className="relative border-b border-[var(--color-border)]/80 px-5 py-4 md:hidden">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-display text-xs font-bold uppercase tracking-wide text-[var(--color-sapphire)]">
                      Шаг {Math.min(step + 1, steps.length)} · {activeStep.label}
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
                      transition={{
                        type: "spring",
                        stiffness: 120,
                        damping: 22,
                      }}
                    />
                  </div>
                </div>
              ) : null}

              <div className="relative flex flex-1 flex-col p-6 pb-5 md:p-8 md:pb-6 lg:px-9 lg:pt-8 lg:pb-6">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
