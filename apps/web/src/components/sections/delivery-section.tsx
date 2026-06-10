"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin,
  Truck,
  Shield,
  Zap,
  Building2,
  Bike,
  MessageCircle,
  Package,
} from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { RussiaDotMap } from "@/components/sections/russia-dot-map";

const perksLeft = [
  {
    icon: MapPin,
    title: `Офис — ${siteConfig.officeCity}`,
    text: "Личная передача документов и консультация на месте",
  },
  {
    icon: Truck,
    title: "Курьер по всей РФ",
    text: "Забираем и доставляем паспорт с визой в ваш город",
  },
];

const perksRight = [
  {
    icon: Shield,
    title: "Безопасная передача",
    text: "Отслеживаемая доставка и контроль на каждом этапе",
  },
  {
    icon: Zap,
    title: "Быстрый старт",
    text: "Начинаем разбор в день обращения",
  },
];

const handoffMethods = [
  {
    icon: Building2,
    label: "У нас в офисе",
    hint: "Личная передача в Москве",
  },
  {
    icon: Bike,
    label: "Курьером по городу",
    hint: "Забор и доставка по Москве",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp, Telegram",
    hint: "Согласуем дистанционно",
  },
  {
    icon: Package,
    label: "Курьерской компанией",
    hint: "По всей России",
  },
];

const cities = [
  "Москва",
  "СПб",
  "Казань",
  "Екатеринбург",
  "Новосибирск",
  "Краснодар",
  "Сочи",
  "Владивосток",
  "Калининград",
  "Самара",
];

export function DeliverySection() {
  return (
    <section
      id="dostavka"
      className="section-flow relative overflow-hidden bg-[var(--color-surface)] px-4 md:px-6"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-sapphire)]/[0.04] to-[var(--color-sapphire)]/[0.08]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid min-w-0 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="min-w-0 overflow-hidden"
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-gold)]">
              География ThaiPass
            </p>
            <h2 className="font-serif mt-2 text-3xl font-semibold text-[var(--color-sapphire)] md:text-5xl">
              Вся Россия — один стандарт сервиса
            </h2>
            <p className="mt-4 max-w-xl text-base font-medium leading-relaxed text-[var(--color-muted)]">
              Оформляем визы в Таиланд для россиян из Москвы и регионов. Офис в
              столице, курьер по всей стране.{" "}
              {siteConfig.telegramChannelUrl ? (
                <Link
                  href={siteConfig.telegramChannelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[var(--color-teal)] underline decoration-[var(--color-teal)]/30 underline-offset-4 transition-colors hover:text-[var(--color-sapphire)]"
                >
                  Напишите в Telegram
                </Link>
              ) : (
                <span className="font-semibold text-[var(--color-teal)]">
                  Напишите в Telegram
                </span>
              )}{" "}
              — подскажем по вашему городу.
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="space-y-4">
                {perksLeft.map((perk, i) => {
                  const Icon = perk.icon;
                  return (
                    <motion.div
                      key={perk.title}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                      className="flex gap-3 rounded-2xl border border-[var(--color-border)] bg-white p-4 shadow-sm"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-gold)]/15 text-[var(--color-gold)]">
                        <Icon size={16} />
                      </div>
                      <div>
                        <p className="font-display text-sm font-bold text-[var(--color-sapphire)]">
                          {perk.title}
                        </p>
                        <p className="mt-0.5 text-xs font-medium text-[var(--color-muted)]">
                          {perk.text}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              <div className="space-y-4">
                {perksRight.map((perk, i) => {
                  const Icon = perk.icon;
                  return (
                    <motion.div
                      key={perk.title}
                      initial={{ opacity: 0, x: 12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                      className="flex gap-3 rounded-2xl border border-[var(--color-border)] bg-white p-4 shadow-sm"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-gold)]/15 text-[var(--color-gold)]">
                        <Icon size={16} />
                      </div>
                      <div>
                        <p className="font-display text-sm font-bold text-[var(--color-sapphire)]">
                          {perk.title}
                        </p>
                        <p className="mt-0.5 text-xs font-medium text-[var(--color-muted)]">
                          {perk.text}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 max-w-full overflow-hidden rounded-xl border border-[var(--color-border)] bg-white py-2.5">
              <div className="flex w-max animate-marquee gap-8 whitespace-nowrap px-4 text-xs font-bold uppercase tracking-[0.15em] text-[var(--color-sapphire)]/70">
                {[...cities, ...cities].map((city, i) => (
                  <span
                    key={`${city}-${i}`}
                    className="inline-flex shrink-0 items-center gap-2"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]" />
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative min-w-0"
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-30">
              <div className="h-[280px] w-full max-w-md">
                <RussiaDotMap />
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] shadow-2xl">
              <div className="relative aspect-[5/4] min-h-[300px]">
                <Image
                  src="/images/generated/delivery-premium.jpg"
                  alt="Премиальная курьерская доставка паспорта с визой"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-sapphire)]/50 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h3 className="text-center font-serif text-2xl font-semibold text-[var(--color-sapphire)] md:text-3xl">
            Передача документов
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm font-medium text-[var(--color-muted)]">
            Передайте документы на визу любым удобным для вас способом
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {handoffMethods.map((method, i) => {
              const Icon = method.icon;
              return (
                <motion.div
                  key={method.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ y: -4 }}
                  className="flex flex-col items-center rounded-2xl border border-[var(--color-sapphire)]/10 bg-white p-6 text-center shadow-[0_8px_24px_rgba(20,42,69,0.06)]"
                >
                  <motion.div
                    className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-teal)]/15 to-[var(--color-gold)]/10 text-[var(--color-teal)] ring-1 ring-[var(--color-sapphire)]/10"
                    animate={{ y: [0, -3, 0] }}
                    transition={{
                      duration: 2.8 + i * 0.3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    whileHover={{ scale: 1.06, rotate: 2 }}
                  >
                    <Icon size={28} strokeWidth={1.5} />
                  </motion.div>
                  <p className="mt-4 font-display text-sm font-bold text-[var(--color-sapphire)]">
                    {method.label}
                  </p>
                  <p className="mt-1.5 text-xs font-medium text-[var(--color-muted)]">
                    {method.hint}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
