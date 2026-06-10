"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";

const guarantees = [
  {
    title: "Стоимость фиксируем до старта",
    text: "После разбора кейса называем цену выбранного формата. Без скрытых доплат за проверку документов или статус в мессенджере.",
  },
  {
    title: "Сроки проговариваем заранее",
    text: "До подачи озвучиваем реалистичный дедлайн с учётом консульства и вашего маршрута. Если задержка на нашей стороне — переносим сроки.",
  },
  {
    title: "Разбор кейса бесплатно",
    text: "Первичная консультация и оценка документов без оплаты. Платите только за оформление, которое выбираете сами.",
  },
];

export function GuaranteesSection() {
  return (
    <section
      id="garantii"
      className="section-flow bg-white px-4 md:px-6"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-gold)]">
            Доверие
          </p>
          <h2 className="font-serif mt-2 text-3xl font-semibold text-[var(--color-sapphire)] md:text-5xl">
            Наши гарантии
          </h2>
          <p className="mt-4 text-base font-medium leading-relaxed text-[var(--color-muted)]">
            Работаем честно и берём ответственность на себя — только визы в
            Таиланд, без смежных услуг.
          </p>

          <ul className="mt-10 space-y-8">
            {guarantees.map((item, i) => (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-4"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-gold)]/15 ring-1 ring-[var(--color-gold)]/35">
                  <BadgeCheck
                    size={22}
                    className="text-[var(--color-gold)]"
                    strokeWidth={2.25}
                  />
                </div>
                <div>
                  <h3 className="font-display text-lg font-extrabold text-[var(--color-sapphire)]">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm font-medium leading-relaxed text-[var(--color-muted)]">
                    {item.text}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-[var(--color-bg)] shadow-2xl ring-1 ring-[var(--color-border)]">
            <Image
              src="/images/generated/trust-consultant.jpg"
              alt="Специалист ThaiPass с загранпаспортом и визой в Таиланд"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 90vw, 45vw"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--color-sapphire)]/90 via-[var(--color-sapphire)]/40 to-transparent p-6 md:p-8">
              <p className="font-display text-sm font-bold uppercase tracking-wider text-[var(--color-gold)]">
                ThaiPass
              </p>
              <p className="font-serif mt-1 text-xl font-semibold text-white">
                Визовый консьерж для россиян
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
