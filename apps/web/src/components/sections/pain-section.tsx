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
    title: "Консульство вернуло заявку",
    text: "Доработка с нуля и ещё от 2 до 4 недели ожидания.",
  },
  {
    num: "02",
    icon: Wallet,
    title: "500 000 бат есть, выписка не подходит",
    text: "Формат, срок и движение средств: типичный отказ по DTV.",
  },
  {
    num: "03",
    icon: Clock,
    title: "Безвиз заканчивается",
    text: "Виза не готова, а дни в Таиланде на исходе.",
  },
  {
    num: "04",
    icon: Plane,
    title: "До вылета 3 дня",
    text: "Стандартные сроки консульства уже не спасают.",
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
    title: "Переделка после отказа",
    text: "Ещё от 2 до 4 недели и повторная госпошлина",
  },
  {
    icon: Ban,
    title: "Оверстей в Таиланде",
    text: "Штраф до 20 000 бат и риск запрета на въезд",
  },
  {
    icon: FileWarning,
    title: "Сорванные билеты и брони",
    text: "Потери на семью",
    tickerFrom: 50000,
    tickerTo: 200000,
  },
  {
    icon: HeartCrack,
    title: "Потерянные планы",
    text: "Работа, аренда и переезд зависят от одной визы",
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
            Боли клиентов
          </p>
          <h2 className="font-serif mt-2 text-3xl font-semibold text-[var(--color-sapphire)] md:text-5xl">
            Узнаёте себя?
          </h2>
          <p className="mt-4 text-base font-medium leading-relaxed text-[var(--color-muted)]">
            Приходят после самостоятельной подачи или когда до вылета остались
            считанные дни. Разбираем кейс до подачи, не после отказа.
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
                Бесплатно до подачи
              </p>
              <p className="font-serif mt-4 text-2xl font-semibold text-white md:text-4xl">
                Разбор кейса за 30 минут
              </p>
              <p className="mt-3 max-w-2xl text-sm font-medium leading-relaxed text-white/80 md:text-base">
                Напишите в мессенджер: проверим документы, выписку и фото до
                подачи в консульство. Москва и вся Россия. DTV, туристическая и
                пенсионная виза в Таиланд.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col md:items-stretch">
              {["30 минут", "Москва + РФ", "DTV · TR · 50+"].map((tag) => (
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
            Если тянуть с оформлением
          </p>
          <h3 className="font-serif mt-2 max-w-2xl text-2xl font-semibold text-[var(--color-sapphire)] md:text-3xl">
            Отказ обходится дороже, чем проверка кейса
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
                          <span className="whitespace-nowrap"> ₽</span>
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
