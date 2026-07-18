"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  CalendarDays,
  Check,
  ChevronLeft,
  Clock,
  FileWarning,
  Heart,
  Laptop,
  Palmtree,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LeadForm } from "@/components/forms/lead-form";
import { QuizShell } from "@/components/sections/quiz-shell";
import type { ServiceSlug } from "@/lib/services";
import { getService } from "@/lib/services";
import { siteConfig } from "@/lib/site-config";

type Goal = "remote" | "urgent" | "retire" | "tourist" | null;
type Timeline = "days" | "week" | "month" | "flex" | null;
type Tried = "yes" | "no" | null;

const STEPS = 3;

function recommend(goal: Goal, timeline: Timeline): ServiceSlug {
  if (goal === "retire") return "pensionnaya-50";
  if (goal === "urgent" || timeline === "days") return "turisticheskaya-srochnaya";
  if (goal === "remote") {
    return timeline === "week" ? "dtv-proverka" : "dtv-5-let-garantiya";
  }
  if (timeline === "month") return "turisticheskaya-6-mes";
  if (timeline === "week") return "turisticheskaya-60-30";
  return "turisticheskaya-60-30";
}

type Option<T extends string> = {
  v: T;
  l: string;
  hint?: string;
  icon: LucideIcon;
};

function QuizOption<T extends string>({
  opt,
  selected,
  onSelect,
  index,
}: {
  opt: Option<T>;
  selected: boolean;
  onSelect: () => void;
  index: number;
}) {
  const Icon = opt.icon;
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.99 }}
      onClick={onSelect}
      className={cn(
        "group relative w-full overflow-hidden rounded-2xl border px-4 py-4 text-left transition-[border-color,box-shadow,background-color] duration-300 md:px-5 md:py-5 lg:rounded-[1.35rem] lg:px-6 lg:py-5",
        selected
          ? "border-[var(--color-gold)]/70 bg-[var(--color-sapphire)]/[0.04] shadow-[0_8px_32px_rgba(20,42,69,0.08)] ring-1 ring-[var(--color-gold)]/25"
          : "border-[var(--color-border)] bg-white hover:border-[var(--color-sapphire)]/20 hover:shadow-md",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "absolute inset-y-0 left-0 w-1 rounded-r-full transition-all duration-300",
          selected
            ? "bg-[var(--color-gold)]"
            : "bg-transparent group-hover:bg-[var(--color-gold)]/30",
        )}
      />
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-300 lg:h-12 lg:w-12",
            selected
              ? "bg-[var(--color-sapphire)] text-[var(--color-gold)]"
              : "bg-[var(--color-bg)] text-[var(--color-teal)] group-hover:bg-[var(--color-sapphire)]/8",
          )}
        >
          <Icon size={20} strokeWidth={1.75} />
        </div>
        <div className="min-w-0 flex-1 pt-0.5">
          <p
            className={cn(
              "font-display text-sm font-bold leading-snug md:text-base lg:text-[17px]",
              selected
                ? "text-[var(--color-sapphire)]"
                : "text-[var(--color-sapphire)]/90",
            )}
          >
            {opt.l}
          </p>
          {opt.hint ? (
            <p className="mt-1 text-xs font-medium text-[var(--color-muted)] md:text-sm">
              {opt.hint}
            </p>
          ) : null}
        </div>
        <motion.span
          initial={false}
          animate={{
            scale: selected ? 1 : 0,
            opacity: selected ? 1 : 0,
          }}
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-gold)] text-[var(--color-sapphire)]"
        >
          <Check size={14} strokeWidth={3} />
        </motion.span>
      </div>
    </motion.button>
  );
}

const slideVariants = {
  enter: { opacity: 0, x: 28, filter: "blur(6px)" },
  center: { opacity: 1, x: 0, filter: "blur(0px)" },
  exit: { opacity: 0, x: -28, filter: "blur(6px)" },
};

export function QuizSection() {
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState<Goal>(null);
  const [timeline, setTimeline] = useState<Timeline>(null);
  const [tried, setTried] = useState<Tried>(null);

  const slug = goal ? recommend(goal, timeline) : null;
  const result = slug ? getService(slug) : null;
  const progress = step === 0 ? 25 : step === 1 ? 50 : step === 2 ? 75 : 100;

  const goalOptions: Option<NonNullable<Goal>>[] = [
    {
      v: "remote",
      l: "Жить и работать удалённо от 6 месяцев",
      hint: "DTV и долгосрочное пребывание",
      icon: Laptop,
    },
    {
      v: "urgent",
      l: "Срочно въехать, вылет уже близко",
      hint: "Ускоренная туристическая виза",
      icon: Zap,
    },
    {
      v: "retire",
      l: "Переехать в Таиланд после 50 лет",
      hint: "Пенсионная виза 50+",
      icon: Heart,
    },
    {
      v: "tourist",
      l: "Туристическая поездка на от 1 до 3 месяца",
      hint: "Стандартная или мультивиза",
      icon: Palmtree,
    },
  ];

  const timelineOptions: Option<NonNullable<Timeline>>[] = [
    { v: "days", l: "В ближайшие от 3 до 5 дней", icon: Zap },
    { v: "week", l: "В течение от 1 до 2 недель", icon: CalendarDays },
    { v: "month", l: "В течение месяца", icon: Calendar },
    {
      v: "flex",
      l: "Срок гибкий, хочу спокойно подготовиться",
      icon: Clock,
    },
  ];

  const triedOptions: Option<NonNullable<Tried>>[] = [
    {
      v: "yes",
      l: "Да, был отказ или доработка",
      hint: "Проверим кейс до повторной подачи",
      icon: FileWarning,
    },
    {
      v: "no",
      l: "Нет, только начинаю разбираться",
      hint: "Разбор документов бесплатно",
      icon: Sparkles,
    },
  ];

  function next() {
    setStep((s) => Math.min(s + 1, STEPS));
  }

  function back() {
    setStep((s) => Math.max(s - 1, 0));
  }

  const quizSummary =
    result && goal && timeline && tried
      ? {
          goal: goalOptions.find((item) => item.v === goal)?.l,
          timeline: timelineOptions.find((item) => item.v === timeline)?.l,
          tried: triedOptions.find((item) => item.v === tried)?.l,
          serviceName: result.shortName,
          serviceTimeline: result.timeline,
        }
      : undefined;

  return (
    <section
      id="quiz"
      className="section-flow relative overflow-hidden bg-[var(--color-surface)] px-4 pt-28 md:px-6 md:pt-36"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-[var(--color-gold)]/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-[var(--color-teal)]/8 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-gold)]">
            Подбор за 1 минуту
          </p>
          <h2 className="font-serif mt-2 text-3xl font-semibold text-[var(--color-sapphire)] md:text-4xl lg:text-5xl">
            Подберём визу за 1 минуту
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm font-medium leading-relaxed text-[var(--color-muted)] lg:text-base">
            Три вопроса: и вы увидите подходящую услугу с формой заявки.
          </p>
        </motion.div>

        <QuizShell step={step} progress={progress} summary={quizSummary}>
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="s0"
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h3 className="font-serif text-xl font-semibold text-[var(--color-sapphire)] md:text-2xl lg:text-3xl">
                    Какая у вас главная цель?
                  </h3>
                  <p className="mt-2 text-sm text-[var(--color-muted)] lg:text-base">
                    Выберите сценарий: остальное подстроим под ваш кейс.
                  </p>
                  <div className="mt-6 grid gap-3 lg:grid-cols-2 lg:gap-4">
                    {goalOptions.map((opt, i) => (
                      <QuizOption
                        key={opt.v}
                        opt={opt}
                        index={i}
                        selected={goal === opt.v}
                        onSelect={() => setGoal(opt.v)}
                      />
                    ))}
                  </div>
                  <motion.button
                    type="button"
                    disabled={!goal}
                    onClick={next}
                    whileHover={goal ? { scale: 1.01 } : undefined}
                    whileTap={goal ? { scale: 0.99 } : undefined}
                    className={cn(
                      "group mt-6 flex w-full items-center justify-center gap-2 rounded-full py-3.5 font-display text-sm font-bold transition-all md:mt-7 md:text-base lg:py-4 lg:text-lg",
                      goal
                        ? "bg-[var(--color-gold)] text-[var(--color-sapphire)] shadow-[0_8px_28px_rgba(212,168,83,0.35)] hover:shadow-[0_12px_36px_rgba(212,168,83,0.45)]"
                        : "cursor-not-allowed bg-[var(--color-border)] text-[var(--color-muted)]",
                    )}
                  >
                    Далее
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </motion.button>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div
                  key="s1"
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h3 className="font-serif text-xl font-semibold text-[var(--color-sapphire)] md:text-2xl lg:text-3xl">
                    Когда вам нужна виза?
                  </h3>
                  <p className="mt-2 text-sm text-[var(--color-muted)] lg:text-base">
                    От срока зависит формат подачи и приоритет.
                  </p>
                  <div className="mt-6 grid gap-3 lg:grid-cols-2 lg:gap-4">
                    {timelineOptions.map((opt, i) => (
                      <QuizOption
                        key={opt.v}
                        opt={opt}
                        index={i}
                        selected={timeline === opt.v}
                        onSelect={() => setTimeline(opt.v)}
                      />
                    ))}
                  </div>
                  <div className="mt-6 flex gap-3 md:mt-7">
                    <button
                      type="button"
                      onClick={back}
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-[var(--color-border)] bg-white py-3.5 text-sm font-semibold text-[var(--color-sapphire)] transition-colors hover:border-[var(--color-sapphire)]/25 hover:bg-[var(--color-bg)] lg:py-4 lg:text-base"
                    >
                      <ChevronLeft size={16} />
                      Назад
                    </button>
                    <motion.button
                      type="button"
                      disabled={!timeline}
                      onClick={next}
                      whileHover={timeline ? { scale: 1.01 } : undefined}
                      className={cn(
                        "flex flex-1 items-center justify-center gap-2 rounded-full py-3.5 font-display text-sm font-bold transition-all lg:py-4 lg:text-lg",
                        timeline
                          ? "bg-[var(--color-gold)] text-[var(--color-sapphire)] shadow-[0_8px_28px_rgba(212,168,83,0.35)]"
                          : "cursor-not-allowed bg-[var(--color-border)] text-[var(--color-muted)]",
                      )}
                    >
                      Далее
                      <ArrowRight size={16} />
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="s2"
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h3 className="font-serif text-xl font-semibold text-[var(--color-sapphire)] md:text-2xl lg:text-3xl">
                    Уже пробовали подавать сами?
                  </h3>
                  <p className="mt-2 text-sm text-[var(--color-muted)] lg:text-base">
                    Это поможет точнее оценить риски до подачи.
                  </p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:gap-5">
                    {triedOptions.map((opt, i) => (
                      <QuizOption
                        key={opt.v}
                        opt={opt}
                        index={i}
                        selected={tried === opt.v}
                        onSelect={() => setTried(opt.v)}
                      />
                    ))}
                  </div>
                  <div className="mt-6 flex gap-3 md:mt-7">
                    <button
                      type="button"
                      onClick={back}
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-[var(--color-border)] bg-white py-3.5 text-sm font-semibold text-[var(--color-sapphire)] transition-colors hover:border-[var(--color-sapphire)]/25 hover:bg-[var(--color-bg)] lg:py-4 lg:text-base"
                    >
                      <ChevronLeft size={16} />
                      Назад
                    </button>
                    <motion.button
                      type="button"
                      disabled={!tried}
                      onClick={next}
                      whileHover={tried ? { scale: 1.01 } : undefined}
                      className={cn(
                        "flex flex-1 items-center justify-center gap-2 rounded-full py-3.5 font-display text-sm font-bold transition-all lg:py-4 lg:text-lg",
                        tried
                          ? "bg-[var(--color-sapphire)] text-white shadow-[0_8px_28px_rgba(20,42,69,0.25)]"
                          : "cursor-not-allowed bg-[var(--color-border)] text-[var(--color-muted)]",
                      )}
                    >
                      Показать результат
                      <Sparkles size={16} className="text-[var(--color-gold)]" />
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {step === 3 && result && (
                <motion.div
                  key="s3"
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="md:hidden">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 16,
                        delay: 0.1,
                      }}
                      className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-gold)]/15 text-[var(--color-gold)]"
                    >
                      <Check size={28} strokeWidth={2.5} />
                    </motion.div>

                    <p className="mt-5 text-center text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-gold)]">
                      Рекомендуем
                    </p>
                    <h3 className="mt-2 text-center font-display text-2xl font-extrabold text-[var(--color-sapphire)]">
                      {result.name}
                    </h3>
                    <p className="mx-auto mt-3 max-w-md text-center text-sm leading-relaxed text-[var(--color-muted)]">
                      {result.tagline}
                    </p>
                    <p className="mt-2 text-center text-xs font-medium text-[var(--color-muted)]">
                      Срок: {result.timeline}
                      {tried === "yes" &&
                        " · Рекомендуем проверку кейса до повторной подачи"}
                    </p>
                  </div>

                  <div className="hidden md:block">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-gold)]">
                      Следующий шаг
                    </p>
                    <h3 className="mt-2 font-serif text-2xl font-semibold text-[var(--color-sapphire)] lg:text-3xl">
                      Оставьте заявку на разбор кейса
                    </h3>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-[var(--color-muted)]">
                      {result.tagline}
                      {tried === "yes"
                        ? " Рекомендуем проверку документов до повторной подачи."
                        : ""}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap justify-center gap-3 md:mt-8 md:justify-start">
                    <Link
                      href={`/uslugi/${result.slug}`}
                      className={cn(
                        buttonVariants({ variant: "outline" }),
                        "rounded-full border-[var(--color-sapphire)]/20 px-5 py-2.5 font-semibold",
                      )}
                    >
                      Подробнее об услуге
                    </Link>
                    {siteConfig.telegramChannelUrl && (
                      <a
                        href={siteConfig.telegramChannelUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          buttonVariants({ variant: "secondary" }),
                          "rounded-full px-5 py-2.5 font-semibold",
                        )}
                      >
                        Написать в Telegram
                      </a>
                    )}
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-6 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)]/60 p-5 md:mt-8 md:p-6 lg:p-8"
                  >
                    <p className="font-display text-sm font-bold text-[var(--color-sapphire)] md:hidden">
                      Оставьте заявку на разбор кейса
                    </p>
                    <p className="mt-1 text-xs text-[var(--color-muted)]">
                      Ответим за 30 минут · бесплатное фото на визу
                    </p>
                    <div className="mt-4">
                      <LeadForm defaultService={result.slug} compact />
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
        </QuizShell>
      </div>
    </section>
  );
}
