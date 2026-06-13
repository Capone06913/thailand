"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  AlertTriangle,
  Ban,
  FileWarning,
  HeartCrack,
  Plane,
  Wallet,
  Clock,
  FileX,
} from "lucide-react";
import { NumberTicker } from "@/components/motion/number-ticker";

const pains = [
  {
    num: "01",
    icon: FileX,
    title: "РљРѕРЅСЃСѓР»СЊСЃС‚РІРѕ РІРµСЂРЅСѓР»Рѕ Р·Р°СЏРІРєСѓ",
    text: "Р”РѕСЂР°Р±РѕС‚РєР° СЃ РЅСѓР»СЏ Рё РµС‰С‘ РѕС‚ 2 РґРѕ 4 РЅРµРґРµР»Рё РѕР¶РёРґР°РЅРёСЏ.",
  },
  {
    num: "02",
    icon: Wallet,
    title: "500 000 Р±Р°С‚ РµСЃС‚СЊ, РІС‹РїРёСЃРєР° РЅРµ РїРѕРґС…РѕРґРёС‚",
    text: "Р¤РѕСЂРјР°С‚, СЃСЂРѕРє Рё РґРІРёР¶РµРЅРёРµ СЃСЂРµРґСЃС‚РІ: С‚РёРїРёС‡РЅС‹Р№ РѕС‚РєР°Р· РїРѕ DTV.",
  },
  {
    num: "03",
    icon: Clock,
    title: "Р‘РµР·РІРёР· Р·Р°РєР°РЅС‡РёРІР°РµС‚СЃСЏ",
    text: "Р’РёР·Р° РЅРµ РіРѕС‚РѕРІР°, Р° РґРЅРё РІ РўР°РёР»Р°РЅРґРµ РЅР° РёСЃС…РѕРґРµ.",
  },
  {
    num: "04",
    icon: Plane,
    title: "Р”Рѕ РІС‹Р»РµС‚Р° 3 РґРЅСЏ",
    text: "РЎС‚Р°РЅРґР°СЂС‚РЅС‹Рµ СЃСЂРѕРєРё РєРѕРЅСЃСѓР»СЊСЃС‚РІР° СѓР¶Рµ РЅРµ СЃРїР°СЃР°СЋС‚.",
  },
];

type RiskItem = {
  icon: typeof AlertTriangle;
  title: string;
  text: string;
  tickerFrom?: number;
  tickerTo?: number;
};

const risks: RiskItem[] = [
  {
    icon: AlertTriangle,
    title: "РџРµСЂРµРґРµР»РєР° РїРѕСЃР»Рµ РѕС‚РєР°Р·Р°",
    text: "Р•С‰С‘ РѕС‚ 2 РґРѕ 4 РЅРµРґРµР»Рё Рё РїРѕРІС‚РѕСЂРЅР°СЏ РіРѕСЃРїРѕС€Р»РёРЅР°",
  },
  {
    icon: Ban,
    title: "РћРІРµСЂСЃС‚РµР№ РІ РўР°РёР»Р°РЅРґРµ",
    text: "РЁС‚СЂР°С„ РґРѕ 20 000 Р±Р°С‚ Рё СЂРёСЃРє Р·Р°РїСЂРµС‚Р° РЅР° РІСЉРµР·Рґ",
  },
  {
    icon: FileWarning,
    title: "РЎРѕСЂРІР°РЅРЅС‹Рµ Р±РёР»РµС‚С‹ Рё Р±СЂРѕРЅРё",
    text: "РџРѕС‚РµСЂРё РЅР° СЃРµРјСЊСЋ",
    tickerFrom: 50000,
    tickerTo: 200000,
  },
  {
    icon: HeartCrack,
    title: "РџРѕС‚РµСЂСЏРЅРЅС‹Рµ РїР»Р°РЅС‹",
    text: "Р Р°Р±РѕС‚Р°, Р°СЂРµРЅРґР° Рё РїРµСЂРµРµР·Рґ Р·Р°РІРёСЃСЏС‚ РѕС‚ РѕРґРЅРѕР№ РІРёР·С‹",
  },
];

export function PainSection() {
  const riskRef = useRef<HTMLDivElement>(null);
  const riskInView = useInView(riskRef, { once: true, margin: "-80px" });

  return (
    <section id="boli" className="section-flow bg-[var(--color-bg)] px-4 md:px-6">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-gold)]">
            Р‘РѕР»Рё РєР»РёРµРЅС‚РѕРІ
          </p>
          <h2 className="font-serif mt-2 text-3xl font-semibold text-[var(--color-sapphire)] md:text-5xl">
            РЈР·РЅР°С‘С‚Рµ СЃРµР±СЏ?
          </h2>
          <p className="mt-4 text-base font-medium leading-relaxed text-[var(--color-muted)]">
            РџСЂРёС…РѕРґСЏС‚ РїРѕСЃР»Рµ СЃР°РјРѕСЃС‚РѕСЏС‚РµР»СЊРЅРѕР№ РїРѕРґР°С‡Рё РёР»Рё РєРѕРіРґР° РґРѕ РІС‹Р»РµС‚Р° РѕСЃС‚Р°Р»РёСЃСЊ
            СЃС‡РёС‚Р°РЅРЅС‹Рµ РґРЅРё. Р Р°Р·Р±РёСЂР°РµРј РєРµР№СЃ РґРѕ РїРѕРґР°С‡Рё, РЅРµ РїРѕСЃР»Рµ РѕС‚РєР°Р·Р°.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {pains.map((pain, i) => {
            const Icon = pain.icon;
            return (
              <motion.article
                key={pain.num}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="group relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-[1.75rem] border border-[var(--color-border)] bg-white p-7 shadow-lg shadow-[var(--color-sapphire)]/5 transition-[border-color,box-shadow] duration-500 hover:border-[var(--color-gold)]/40 hover:shadow-xl md:min-h-[240px] md:p-8"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-2 -top-4 font-display text-[5.5rem] font-extrabold leading-none text-[var(--color-sapphire)]/[0.04]"
                >
                  {pain.num}
                </span>

                <div className="flex items-center justify-between gap-4">
                  <span className="font-display text-xs font-extrabold tracking-[0.25em] text-[var(--color-gold)]">
                    {pain.num}
                  </span>
                  <Icon
                    size={22}
                    strokeWidth={1.75}
                    className="text-[var(--color-teal)] opacity-80"
                  />
                </div>

                <div className="relative mt-auto pt-8">
                  <h3 className="font-serif text-xl font-semibold leading-snug text-[var(--color-sapphire)] md:text-2xl">
                    {pain.title}
                  </h3>
                  <p className="mt-3 text-sm font-medium leading-relaxed text-[var(--color-muted)]">
                    {pain.text}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.aside
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mt-10 overflow-hidden rounded-[2rem] border border-[var(--color-gold)]/30 bg-[var(--color-sapphire)] p-8 shadow-2xl shadow-[var(--color-sapphire)]/20 md:p-10"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[var(--color-gold)]/15 blur-3xl"
          />
          <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-gold)]">
                Р‘РµСЃРїР»Р°С‚РЅРѕ РґРѕ РїРѕРґР°С‡Рё
              </p>
              <p className="font-serif mt-4 text-2xl font-semibold text-white md:text-4xl">
                Р Р°Р·Р±РѕСЂ РєРµР№СЃР° Р·Р° 30 РјРёРЅСѓС‚
              </p>
              <p className="mt-3 max-w-2xl text-sm font-medium leading-relaxed text-white/80 md:text-base">
                РќР°РїРёС€РёС‚Рµ РІ РјРµСЃСЃРµРЅРґР¶РµСЂ: РїСЂРѕРІРµСЂРёРј РґРѕРєСѓРјРµРЅС‚С‹, РІС‹РїРёСЃРєСѓ Рё С„РѕС‚Рѕ РґРѕ
                РїРѕРґР°С‡Рё РІ РєРѕРЅСЃСѓР»СЊСЃС‚РІРѕ. РњРѕСЃРєРІР° Рё РІСЃСЏ Р РѕСЃСЃРёСЏ. DTV, С‚СѓСЂРёСЃС‚РёС‡РµСЃРєР°СЏ Рё
                РїРµРЅСЃРёРѕРЅРЅР°СЏ РІРёР·Р° РІ РўР°РёР»Р°РЅРґ.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col md:items-stretch">
              {["30 РјРёРЅСѓС‚", "РњРѕСЃРєРІР° + Р Р¤", "DTV В· TR В· 50+"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-center text-xs font-bold uppercase tracking-wide text-white backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.aside>

        <motion.div
          ref={riskRef}
          initial={{ opacity: 0, y: 24 }}
          animate={riskInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="relative mt-14 overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-white p-6 shadow-lg shadow-[var(--color-sapphire)]/5 md:p-8"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-gold)]">
            Р•СЃР»Рё С‚СЏРЅСѓС‚СЊ СЃ РѕС„РѕСЂРјР»РµРЅРёРµРј
          </p>
          <h3 className="font-serif mt-2 max-w-2xl text-2xl font-semibold text-[var(--color-sapphire)] md:text-3xl">
            РћС‚РєР°Р· РѕР±С…РѕРґРёС‚СЃСЏ РґРѕСЂРѕР¶Рµ, С‡РµРј РїСЂРѕРІРµСЂРєР° РєРµР№СЃР°
          </h3>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {risks.map((risk, i) => {
              const Icon = risk.icon;
              return (
                <motion.div
                  key={risk.title}
                  initial={{ opacity: 0, y: 14 }}
                  animate={riskInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.07 }}
                  className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)]/50 p-4 md:p-5"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--color-gold)]/12 text-[var(--color-gold)]">
                      <Icon size={18} strokeWidth={1.75} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-sm font-bold text-[var(--color-sapphire)] md:text-base">
                        {risk.title}
                      </p>
                      {risk.tickerFrom !== undefined &&
                      risk.tickerTo !== undefined ? (
                        <p className="mt-1.5 font-display text-lg font-bold tabular-nums text-[var(--color-teal)] md:text-xl">
                          <NumberTicker value={risk.tickerFrom} />
                          <span>, </span>
                          <NumberTicker value={risk.tickerTo} />
                          <span className="whitespace-nowrap"> в‚Ѕ</span>
                        </p>
                      ) : null}
                      <p className="mt-1 text-xs font-medium leading-relaxed text-[var(--color-muted)] md:text-sm">
                        {risk.text}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

