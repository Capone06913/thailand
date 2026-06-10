"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, MapPin, Sparkles } from "lucide-react";
import { HeroNav } from "@/components/layout/hero-nav";
import { HeroVideoSpotlight } from "@/components/motion/hero-video-spotlight";
import { BorderBeam } from "@/components/motion/border-beam";
import { PremiumCta } from "@/components/ui/premium-cta";
import { StaggerWords } from "@/components/motion/stagger-words";

const utpStats = [
  { value: "0 ₽", label: "разбор кейса" },
  { value: "до 30 мин", label: "ответ в мессенджере" },
  { value: "DTV·TR", label: "только визы Таиланд" },
];

export function CinematicHero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[var(--color-sapphire)]">
      <HeroVideoSpotlight className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/generated/hero-poster.jpg"
          className="h-full w-full object-cover brightness-110 saturate-125 contrast-105"
        >
          <source src="/video/hero-loop.mp4" type="video/mp4" />
        </video>
      </HeroVideoSpotlight>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/40 to-transparent" />

      <HeroNav />

      <div className="relative mx-auto flex min-h-[calc(100svh-5rem)] max-w-7xl flex-col justify-center px-4 pb-16 pt-24 md:px-6 md:pb-20 md:pt-28">
        <div className="grid items-stretch gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="group relative overflow-hidden rounded-[2rem] border border-white/50 bg-white/72 p-7 shadow-2xl shadow-[var(--color-sapphire)]/10 backdrop-blur-xl md:p-9"
          >
            <BorderBeam size={280} duration={14} />
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[var(--color-gold)]/20 blur-3xl"
              animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--color-sapphire)]">
                <Sparkles size={12} className="text-[var(--color-gold)]" />
                Визы в Таиланд для россиян
              </span>

              <h1 className="mt-5 font-display text-[clamp(2rem,5.5vw,3.75rem)] font-extrabold leading-[1.02] tracking-tight text-[var(--color-sapphire)]">
                <StaggerWords text="Оформим визу в Таиланд без отказа" />
              </h1>

              <p className="mt-5 max-w-xl text-base font-medium leading-relaxed text-[var(--color-muted)] md:text-lg">
                DTV, TR и пенсионная 50+ — проверим документы до подачи в
                консульство и ведём заявку до одобрения. Москва и курьер по всей
                России.
              </p>

              <div className="mt-6 flex flex-wrap gap-4 text-sm font-semibold text-[var(--color-sapphire)]">
                <span className="inline-flex items-center gap-2">
                  <MapPin size={15} className="text-[var(--color-teal)]" />
                  Только визы Таиланд
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock size={15} className="text-[var(--color-teal)]" />
                  Москва + курьер по РФ
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-white/55 bg-white/78 p-6 shadow-2xl shadow-[var(--color-teal)]/10 backdrop-blur-xl md:p-7"
          >
            <BorderBeam size={200} duration={10} colorFrom="var(--color-teal)" colorTo="var(--color-gold)" />
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-[var(--color-sky)]/25 blur-3xl"
              animate={{ x: [0, 12, 0], y: [0, -8, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative flex flex-1 flex-col">
              <div className="flex items-start justify-between gap-3">
                <p className="font-display text-2xl font-extrabold text-[var(--color-sapphire)]">
                  Разбор кейса бесплатно
                </p>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-gold)]/15 text-[var(--color-gold)]">
                  <Clock size={20} />
                </div>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {utpStats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + i * 0.08 }}
                    whileHover={{ y: -2, scale: 1.02 }}
                    className="rounded-2xl border border-[var(--color-border)]/80 bg-white/90 px-3 py-3 text-center shadow-sm"
                  >
                    <p className="font-display text-sm font-extrabold text-[var(--color-sapphire)]">
                      {stat.value}
                    </p>
                    <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wide text-[var(--color-muted)]">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-auto flex flex-col gap-3 pt-6">
                <PremiumCta href="#zayavka" variant="primary" className="w-full py-3.5">
                  Получить разбор
                </PremiumCta>
                <Link
                  href="#uslugi"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-border)] bg-white/80 px-5 py-3 text-sm font-bold text-[var(--color-sapphire)] transition-colors hover:border-[var(--color-teal)]/40 hover:bg-white"
                >
                  Услуги
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
