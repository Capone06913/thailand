"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/lib/site-config";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-10 md:px-6 md:pb-24 md:pt-14">
      <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-[var(--color-teal)]/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-[var(--color-gold)]/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge
            variant="secondary"
            className="mb-5 rounded-full border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/10 px-4 py-1 text-xs font-medium uppercase tracking-widest text-[var(--color-gold)]"
          >
            Визы в Таиланд
          </Badge>

          <h1 className="font-serif text-4xl font-semibold leading-[1.12] tracking-tight text-[var(--color-sapphire)] md:text-5xl lg:text-[3.25rem]">
            Оформим визу в Таиланд без отказа и лишних поездок
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--color-muted)] md:text-lg">
            {siteConfig.name} помогает россиянам с DTV, туристической TR и
            пенсионной визой 50+. Проверяем документы до подачи, ведём заявку
            под ключ или оформляем срочно, если вылет уже скоро.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="#zayavka"
              className={cn(buttonVariants({ size: "lg" }), "rounded-full px-8")}
            >
              Получить разбор кейса
            </Link>
            <Link
              href="#uslugi"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "rounded-full border-[var(--color-border)] bg-white/80"
              )}
            >
              Смотреть услуги
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative aspect-[5/4] overflow-hidden rounded-3xl shadow-2xl shadow-teal-950/15 ring-1 ring-black/5"
        >
          <Image
            src="https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?w=1200&q=80"
            alt="Таиланд, вид на побережье"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-teal)]/50 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <p className="text-sm font-medium opacity-90">Офис — {siteConfig.officeCity}</p>
            <p className="text-xs opacity-75">Курьер по всей России</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
