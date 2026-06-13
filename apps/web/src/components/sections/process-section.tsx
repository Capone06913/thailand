"use client";

import Image from "next/image";
import { motion, type TargetAndTransition } from "framer-motion";
import {
  MessageCircle,
  FileText,
  Landmark,
  Stamp,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";

const steps = [
  {
    icon: MessageCircle,
    title: "РљРѕРЅСЃСѓР»СЊС‚Р°С†РёСЏ",
    text: "РџРѕР»СѓС‡РёС‚Рµ РєРѕРЅСЃСѓР»СЊС‚Р°С†РёСЋ СЃРїРµС†РёР°Р»РёСЃС‚Р° РїРѕ РІР°С€РµР№ РІРёР·Рµ РІ РјРµСЃСЃРµРЅРґР¶РµСЂРµ",
    effect: "pulse",
  },
  {
    icon: FileText,
    title: "Р”РѕРєСѓРјРµРЅС‚С‹",
    text: "РћС‚ РІР°СЃ РјРёРЅРёРјР°Р»СЊРЅС‹Р№ РїР°РєРµС‚ РґРѕРєСѓРјРµРЅС‚РѕРІ: РѕСЃС‚Р°Р»СЊРЅРѕРµ РїРѕРґСЃРєР°Р¶РµРј",
    effect: "float",
  },
  {
    icon: Landmark,
    title: "РџРѕРґР°С‡Р°",
    text: "РџРѕРґРіРѕС‚Р°РІР»РёРІР°РµРј РґРѕРєСѓРјРµРЅС‚С‹ Рё СЃРґР°С‘Рј РІ РєРѕРЅСЃСѓР»СЊСЃС‚РІРѕ",
    effect: "glow",
  },
  {
    icon: Stamp,
    title: "Р’РёР·Р°",
    text: "Р’С‹ РїРѕР»СѓС‡Р°РµС‚Рµ РІРёР·Сѓ РІ РїР°СЃРїРѕСЂС‚Рµ: РњРѕСЃРєРІР° РёР»Рё РєСѓСЂСЊРµСЂ РїРѕ Р Р¤",
    effect: "stamp",
  },
] as const;

type StepEffect = (typeof steps)[number]["effect"];

const iconMotion: Record<
  StepEffect,
  {
    animate?: TargetAndTransition;
    whileHover?: TargetAndTransition;
    ring?: TargetAndTransition;
    className?: string;
  }
> = {
  pulse: {
    animate: {
      scale: [1, 1.08, 1],
      transition: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
    },
    ring: {
      scale: [1, 1.35],
      opacity: [0.45, 0],
      transition: { duration: 2.4, repeat: Infinity, ease: "easeOut" },
    },
  },
  float: {
    animate: {
      y: [0, -5, 0],
      transition: { duration: 2.8, repeat: Infinity, ease: "easeInOut" },
    },
    className: "group-hover:rotate-3",
  },
  glow: {
    whileHover: { scale: 1.1 },
    className:
      "shadow-[0_0_0_0_rgba(212,168,83,0)] transition-shadow duration-500 group-hover:shadow-[0_0_28px_rgba(212,168,83,0.45)]",
  },
  stamp: {
    whileHover: {
      rotate: -14,
      scale: 1.12,
      y: 2,
      transition: { type: "spring", stiffness: 400, damping: 14 },
    },
    className: "group-hover:border-[var(--color-gold)]",
  },
};

function ProcessIcon({
  icon: Icon,
  effect,
  size = "lg",
}: {
  icon: LucideIcon;
  effect: StepEffect;
  size?: "lg" | "sm";
}) {
  const cfg = iconMotion[effect];
  const isLarge = size === "lg";

  return (
    <div
      className={`group relative flex shrink-0 items-center justify-center rounded-full border-2 border-[var(--color-gold)]/40 bg-[var(--color-bg)] shadow-md transition-colors ${cfg.className ?? ""} ${isLarge ? "h-24 w-24" : "h-16 w-16"}`}
    >
      {cfg.ring && (
        <motion.span
          aria-hidden
          animate={cfg.ring}
          className="pointer-events-none absolute inset-0 rounded-full border-2 border-[var(--color-gold)]/50"
        />
      )}
      <motion.span animate={cfg.animate} whileHover={cfg.whileHover}>
        <Icon
          size={isLarge ? 36 : 28}
          strokeWidth={1.5}
          className="text-[var(--color-teal)]"
        />
      </motion.span>
    </div>
  );
}

export function ProcessSection() {
  return (
    <section id="process" className="section-flow bg-white px-4 md:px-6">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-gold)]">
            РџСЂРѕС†РµСЃСЃ
          </p>
          <h2 className="font-serif mt-2 text-3xl font-semibold text-[var(--color-sapphire)] md:text-5xl">
            РљР°Рє РјС‹ СЂР°Р±РѕС‚Р°РµРј
          </h2>
          <p className="mt-4 text-base font-medium leading-relaxed text-[var(--color-muted)] md:text-lg">
            Р§РµС‚С‹СЂРµ С€Р°РіР° РѕС‚ Р·Р°СЏРІРєРё РґРѕ РІРёР·С‹ РІ РїР°СЃРїРѕСЂС‚Рµ. РЎС‚Р°С‚СѓСЃ РІ РјРµСЃСЃРµРЅРґР¶РµСЂРµ РЅР°
            РєР°Р¶РґРѕРј СЌС‚Р°РїРµ.
          </p>
        </motion.div>

        <div className="mt-14 hidden items-start justify-between gap-4 lg:flex">
          {steps.map((step, i) => (
            <div key={step.title} className="flex flex-1 items-start gap-2">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex flex-1 flex-col items-center text-center"
              >
                <ProcessIcon icon={step.icon} effect={step.effect} />
                <h3 className="mt-5 font-display text-lg font-extrabold text-[var(--color-sapphire)]">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-[200px] text-sm font-medium leading-relaxed text-[var(--color-muted)]">
                  {step.text}
                </p>
              </motion.div>
              {i < steps.length - 1 && (
                <ChevronRight
                  size={28}
                  className="mt-8 shrink-0 text-[var(--color-sapphire)]/30"
                  aria-hidden
                />
              )}
            </div>
          ))}
        </div>

        <ol className="mt-10 space-y-4 lg:hidden">
          {steps.map((step, i) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex gap-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)]/50 p-5"
            >
              <ProcessIcon icon={step.icon} effect={step.effect} size="sm" />
              <div>
                <h3 className="font-display text-base font-extrabold text-[var(--color-sapphire)]">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm font-medium text-[var(--color-muted)]">
                  {step.text}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mt-14 overflow-hidden rounded-[2rem] border border-[var(--color-border)] shadow-2xl"
        >
          <div className="relative aspect-[21/9] min-h-[240px] md:min-h-[340px]">
            <Image
              src="/thailand/images/generated/process-timeline.jpg"
              alt="РџРѕРґРіРѕС‚РѕРІРєР° РґРѕРєСѓРјРµРЅС‚РѕРІ РґР»СЏ РїРѕР»СѓС‡РµРЅРёСЏ РІРёР·С‹ РІ РўР°РёР»Р°РЅРґ: РїР°СЃРїРѕСЂС‚ Рё С‡РµРє-Р»РёСЃС‚"
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-sapphire)]/85 via-[var(--color-sapphire)]/30 to-transparent" />
            <div className="absolute bottom-0 left-0 max-w-xl p-7 md:p-10">
              <p className="font-serif text-2xl font-semibold text-white md:text-3xl">
                Р”РѕРІРµСЂРёРµ С‡РµСЂРµР· РїСЂРѕР·СЂР°С‡РЅРѕСЃС‚СЊ
              </p>
              <p className="mt-3 text-base font-medium leading-relaxed text-white/90">
                РљР°Р¶РґС‹Р№ СЌС‚Р°Рї С„РёРєСЃРёСЂСѓРµРј РІ РјРµСЃСЃРµРЅРґР¶РµСЂРµ: РІС‹ РІРёРґРёС‚Рµ, С‡С‚Рѕ РїСЂРѕРёСЃС…РѕРґРёС‚
                СЃ Р·Р°СЏРІРєРѕР№.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

