"use client";

import { motion } from "framer-motion";
import {
  Clock,
  ShieldCheck,
  MessageCircle,
  FileText,
  Truck,
  Stamp,
  Camera,
  ArrowRight,
} from "lucide-react";
import { LeadForm } from "@/components/forms/lead-form";

const bullets = [
  {
    icon: Clock,
    title: "РћС‚ 15 РґРѕ 30 РјРёРЅСѓС‚",
    text: "РћС‚РІРµС‚ РІ Telegram РёР»Рё WhatsApp РІ СЂР°Р±РѕС‡РёРµ С‡Р°СЃС‹",
  },
  {
    icon: ShieldCheck,
    title: "Р‘РµР· РѕР±СЏР·Р°С‚РµР»СЊСЃС‚РІ",
    text: "РџРµСЂРІРёС‡РЅС‹Р№ СЂР°Р·Р±РѕСЂ РєРµР№СЃР° Р±РµСЃРїР»Р°С‚РЅРѕ: СЂРµС€РµРЅРёРµ Р·Р° РІР°РјРё",
  },
  {
    icon: MessageCircle,
    title: "Р’РёР·С‹ РІ РўР°РёР»Р°РЅРґ",
    text: "DTV, С‚СѓСЂРёСЃС‚РёС‡РµСЃРєР°СЏ Рё РїРµРЅСЃРёРѕРЅРЅР°СЏ: С‚РѕР»СЊРєРѕ С‚Рѕ, С‡С‚Рѕ РЅСѓР¶РЅРѕ РґР»СЏ РІСЉРµР·РґР°",
  },
  {
    icon: Stamp,
    title: "Р—Р°РіСЂР°РЅРїР°СЃРїРѕСЂС‚",
    text: "РџРѕРјРѕР¶РµРј СЃ РѕС„РѕСЂРјР»РµРЅРёРµРј Рё РїСЂРѕРґР»РµРЅРёРµРј: РЅРµ С‚РѕР»СЊРєРѕ СЃ РІРёР·РѕР№",
  },
  {
    icon: FileText,
    title: "Р”РѕРєСѓРјРµРЅС‚С‹ РїРѕРґ РєР»СЋС‡",
    text: "Р§РµРє-Р»РёСЃС‚, РїСЂРѕРІРµСЂРєР° РІС‹РїРёСЃРєРё, С„РѕС‚Рѕ Рё РїРµСЂРµРІРѕРґС‹ РґРѕ РїРѕРґР°С‡Рё",
  },
  {
    icon: Truck,
    title: "Р’СЃСЏ Р РѕСЃСЃРёСЏ",
    text: "РњРѕСЃРєРІР° Рё РєСѓСЂСЊРµСЂ РїРѕ Р Р¤: РЅР°С‡РЅС‘Рј РґРёСЃС‚Р°РЅС†РёРѕРЅРЅРѕ РёР· Р»СЋР±РѕРіРѕ РіРѕСЂРѕРґР°",
  },
];

export function LeadSection() {
  return (
    <section
      id="zayavka"
      className="relative overflow-hidden bg-[var(--color-bg)] px-4 py-16 md:px-6 md:py-20"
    >
      <div className="pointer-events-none absolute -left-20 top-1/3 h-72 w-72 rounded-full bg-[var(--color-gold)]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-gold)]">
          РЎР»РµРґСѓСЋС‰РёР№ С€Р°Рі
        </p>

        <div className="mt-2 grid items-start gap-8 lg:grid-cols-[1fr_minmax(340px,420px)] lg:gap-10 xl:gap-12">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex min-h-0 flex-col"
        >
          <h2 className="font-display text-3xl font-extrabold leading-tight text-[var(--color-sapphire)] md:text-[2.65rem]">
            РћСЃС‚Р°РІСЊС‚Рµ Р·Р°СЏРІРєСѓ Рё РїРѕР»СѓС‡РёС‚Рµ{" "}
            <span className="text-[var(--color-gold)]">Р±РµСЃРїР»Р°С‚РЅРѕРµ С„РѕС‚Рѕ РґР»СЏ РІРёР·С‹</span>
          </h2>
          <p className="mt-4 max-w-xl text-base font-medium leading-relaxed text-[var(--color-muted)]">
            Р Р°СЃСЃРєР°Р¶РёС‚Рµ, РєР°РєР°СЏ РІРёР·Р° РІ РўР°РёР»Р°РЅРґ РЅСѓР¶РЅР° Рё РІ РєР°РєРёРµ СЃСЂРѕРєРё: РёР»Рё РµСЃР»Рё
            РЅСѓР¶РЅР° РїРѕРјРѕС‰СЊ СЃ Р·Р°РіСЂР°РЅРїР°СЃРїРѕСЂС‚РѕРј. РџРѕРґСЃРєР°Р¶РµРј С„РѕСЂРјР°С‚ ThaiPass, РїРµСЂРµС‡РµРЅСЊ
            РґРѕРєСѓРјРµРЅС‚РѕРІ Рё СЂРёСЃРєРё РґРѕ РїРѕРґР°С‡Рё РІ РєРѕРЅСЃСѓР»СЊСЃС‚РІРѕ.
          </p>

          <div className="mt-5 flex items-center gap-4 rounded-2xl border border-[var(--color-gold)]/35 bg-[var(--color-sapphire)] p-4 text-white shadow-lg shadow-[var(--color-sapphire)]/15">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-gold)] text-[var(--color-sapphire)]">
              <Camera size={20} strokeWidth={2} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-gold)]">
                РџРѕРґР°СЂРѕРє РїСЂРё Р·Р°СЏРІРєРµ
              </p>
              <p className="mt-0.5 font-display text-[15px] font-bold leading-snug">
                Р‘РµСЃРїР»Р°С‚РЅРѕРµ С„РѕС‚Рѕ РЅР° РІРёР·Сѓ
              </p>
              <p className="mt-1 text-xs font-medium text-white/75">
                Р‘РѕРёС‚РµСЃСЊ РѕС‚РєР°Р·Р°? Р Р°Р·Р±РµСЂС‘Рј РґРѕРєСѓРјРµРЅС‚С‹ РґРѕ РїРѕРґР°С‡Рё. РћС‚РІРµС‚ Р·Р° 30 РјРёРЅСѓС‚.
              </p>
            </div>
            <ArrowRight
              size={18}
              className="hidden shrink-0 text-[var(--color-gold)] sm:block"
              aria-hidden
            />
          </div>

          <div className="mt-6 grid flex-1 auto-rows-fr gap-3 sm:grid-cols-2">
            {bullets.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className="flex h-full min-h-[5.25rem] items-start gap-3 rounded-2xl border border-[var(--color-border)] bg-white p-4 shadow-sm"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--color-teal)]/10 text-[var(--color-teal)]">
                    <Icon size={17} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-sm font-bold leading-tight text-[var(--color-sapphire)]">
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs font-medium leading-snug text-[var(--color-muted)]">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className="w-full lg:sticky lg:top-28 lg:self-start"
        >
          <LeadForm />
        </motion.div>
        </div>
      </div>
    </section>
  );
}

