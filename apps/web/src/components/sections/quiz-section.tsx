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
      l: "Р–РёС‚СЊ Рё СЂР°Р±РѕС‚Р°С‚СЊ СѓРґР°Р»С‘РЅРЅРѕ РѕС‚ 6 РјРµСЃСЏС†РµРІ",
      hint: "DTV Рё РґРѕР»РіРѕСЃСЂРѕС‡РЅРѕРµ РїСЂРµР±С‹РІР°РЅРёРµ",
      icon: Laptop,
    },
    {
      v: "urgent",
      l: "РЎСЂРѕС‡РЅРѕ РІСЉРµС…Р°С‚СЊ, РІС‹Р»РµС‚ СѓР¶Рµ Р±Р»РёР·РєРѕ",
      hint: "РЈСЃРєРѕСЂРµРЅРЅР°СЏ С‚СѓСЂРёСЃС‚РёС‡РµСЃРєР°СЏ РІРёР·Р°",
      icon: Zap,
    },
    {
      v: "retire",
      l: "РџРµСЂРµРµС…Р°С‚СЊ РІ РўР°РёР»Р°РЅРґ РїРѕСЃР»Рµ 50 Р»РµС‚",
      hint: "РџРµРЅСЃРёРѕРЅРЅР°СЏ РІРёР·Р° 50+",
      icon: Heart,
    },
    {
      v: "tourist",
      l: "РўСѓСЂРёСЃС‚РёС‡РµСЃРєР°СЏ РїРѕРµР·РґРєР° РЅР° РѕС‚ 1 РґРѕ 3 РјРµСЃСЏС†Р°",
      hint: "РЎС‚Р°РЅРґР°СЂС‚РЅР°СЏ РёР»Рё РјСѓР»СЊС‚РёРІРёР·Р°",
      icon: Palmtree,
    },
  ];

  const timelineOptions: Option<NonNullable<Timeline>>[] = [
    { v: "days", l: "Р’ Р±Р»РёР¶Р°Р№С€РёРµ РѕС‚ 3 РґРѕ 5 РґРЅРµР№", icon: Zap },
    { v: "week", l: "Р’ С‚РµС‡РµРЅРёРµ РѕС‚ 1 РґРѕ 2 РЅРµРґРµР»СЊ", icon: CalendarDays },
    { v: "month", l: "Р’ С‚РµС‡РµРЅРёРµ РјРµСЃСЏС†Р°", icon: Calendar },
    {
      v: "flex",
      l: "РЎСЂРѕРє РіРёР±РєРёР№, С…РѕС‡Сѓ СЃРїРѕРєРѕР№РЅРѕ РїРѕРґРіРѕС‚РѕРІРёС‚СЊСЃСЏ",
      icon: Clock,
    },
  ];

  const triedOptions: Option<NonNullable<Tried>>[] = [
    {
      v: "yes",
      l: "Р”Р°, Р±С‹Р» РѕС‚РєР°Р· РёР»Рё РґРѕСЂР°Р±РѕС‚РєР°",
      hint: "РџСЂРѕРІРµСЂРёРј РєРµР№СЃ РґРѕ РїРѕРІС‚РѕСЂРЅРѕР№ РїРѕРґР°С‡Рё",
      icon: FileWarning,
    },
    {
      v: "no",
      l: "РќРµС‚, С‚РѕР»СЊРєРѕ РЅР°С‡РёРЅР°СЋ СЂР°Р·Р±РёСЂР°С‚СЊСЃСЏ",
      hint: "Р Р°Р·Р±РѕСЂ РґРѕРєСѓРјРµРЅС‚РѕРІ Р±РµСЃРїР»Р°С‚РЅРѕ",
      icon: Sparkles,
    },
  ];

  function next() {
    setStep((s) => Math.min(s + 1, STEPS));
  }

  function back() {
    setStep((s) => Math.max(s - 1, 0));
  }

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
            РџРѕРґР±РѕСЂ Р·Р° 1 РјРёРЅСѓС‚Сѓ
          </p>
          <h2 className="font-serif mt-2 text-3xl font-semibold text-[var(--color-sapphire)] md:text-4xl lg:text-5xl">
            РџРѕРґР±РµСЂС‘Рј РІРёР·Сѓ Р·Р° 1 РјРёРЅСѓС‚Сѓ
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm font-medium leading-relaxed text-[var(--color-muted)] lg:text-base">
            РўСЂРё РІРѕРїСЂРѕСЃР°: Рё РІС‹ СѓРІРёРґРёС‚Рµ РїРѕРґС…РѕРґСЏС‰СѓСЋ СѓСЃР»СѓРіСѓ СЃ С„РѕСЂРјРѕР№ Р·Р°СЏРІРєРё.
          </p>
        </motion.div>

        <QuizShell step={step} progress={progress}>
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
                    РљР°РєР°СЏ Сѓ РІР°СЃ РіР»Р°РІРЅР°СЏ С†РµР»СЊ?
                  </h3>
                  <p className="mt-2 text-sm text-[var(--color-muted)] lg:text-base">
                    Р’С‹Р±РµСЂРёС‚Рµ СЃС†РµРЅР°СЂРёР№: РѕСЃС‚Р°Р»СЊРЅРѕРµ РїРѕРґСЃС‚СЂРѕРёРј РїРѕРґ РІР°С€ РєРµР№СЃ.
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
                    Р”Р°Р»РµРµ
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
                    РљРѕРіРґР° РІР°Рј РЅСѓР¶РЅР° РІРёР·Р°?
                  </h3>
                  <p className="mt-2 text-sm text-[var(--color-muted)] lg:text-base">
                    РћС‚ СЃСЂРѕРєР° Р·Р°РІРёСЃРёС‚ С„РѕСЂРјР°С‚ РїРѕРґР°С‡Рё Рё РїСЂРёРѕСЂРёС‚РµС‚.
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
                      РќР°Р·Р°Рґ
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
                      Р”Р°Р»РµРµ
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
                    РЈР¶Рµ РїСЂРѕР±РѕРІР°Р»Рё РїРѕРґР°РІР°С‚СЊ СЃР°РјРё?
                  </h3>
                  <p className="mt-2 text-sm text-[var(--color-muted)] lg:text-base">
                    Р­С‚Рѕ РїРѕРјРѕР¶РµС‚ С‚РѕС‡РЅРµРµ РѕС†РµРЅРёС‚СЊ СЂРёСЃРєРё РґРѕ РїРѕРґР°С‡Рё.
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
                      РќР°Р·Р°Рґ
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
                      РџРѕРєР°Р·Р°С‚СЊ СЂРµР·СѓР»СЊС‚Р°С‚
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
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 16, delay: 0.1 }}
                    className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-gold)]/15 text-[var(--color-gold)]"
                  >
                    <Check size={28} strokeWidth={2.5} />
                  </motion.div>

                  <p className="mt-5 text-center text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-gold)]">
                    Р РµРєРѕРјРµРЅРґСѓРµРј
                  </p>
                  <h3 className="mt-2 text-center font-display text-2xl font-extrabold text-[var(--color-sapphire)] md:text-3xl lg:text-4xl">
                    {result.name}
                  </h3>
                  <p className="mx-auto mt-3 max-w-md text-center text-sm leading-relaxed text-[var(--color-muted)]">
                    {result.tagline}
                  </p>
                  <p className="mt-2 text-center text-xs font-medium text-[var(--color-muted)]">
                    РЎСЂРѕРє: {result.timeline}
                    {tried === "yes" &&
                      " В· Р РµРєРѕРјРµРЅРґСѓРµРј РїСЂРѕРІРµСЂРєСѓ РєРµР№СЃР° РґРѕ РїРѕРІС‚РѕСЂРЅРѕР№ РїРѕРґР°С‡Рё"}
                  </p>

                  <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <Link
                      href={`/uslugi/${result.slug}`}
                      className={cn(
                        buttonVariants({ variant: "outline" }),
                        "rounded-full border-[var(--color-sapphire)]/20 px-5 py-2.5 font-semibold",
                      )}
                    >
                      РџРѕРґСЂРѕР±РЅРµРµ РѕР± СѓСЃР»СѓРіРµ
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
                        РќР°РїРёСЃР°С‚СЊ РІ Telegram
                      </a>
                    )}
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-8 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)]/60 p-5 md:p-6 lg:p-8"
                  >
                    <p className="font-display text-sm font-bold text-[var(--color-sapphire)]">
                      РћСЃС‚Р°РІСЊС‚Рµ Р·Р°СЏРІРєСѓ РЅР° СЂР°Р·Р±РѕСЂ РєРµР№СЃР°
                    </p>
                    <p className="mt-1 text-xs text-[var(--color-muted)]">
                      РћС‚РІРµС‚РёРј Р·Р° 30 РјРёРЅСѓС‚ В· Р±РµСЃРїР»Р°С‚РЅРѕРµ С„РѕС‚Рѕ РЅР° РІРёР·Сѓ
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

