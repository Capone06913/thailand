"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Star,
  FileSearch,
  FileStack,
  Shield,
  Palmtree,
  Zap,
  CalendarRange,
  Heart,
  Briefcase,
  Languages,
  type LucideIcon,
} from "lucide-react";
import { services, type ServiceSlug } from "@/lib/services";
import { PremiumCta } from "@/components/ui/premium-cta";

const featuredSlug = "dtv-5-let-garantiya";
const featured = services.find((s) => s.slug === featuredSlug)!;

const bentoLayout: { slug: ServiceSlug; span: string }[] = [
  { slug: "turisticheskaya-60-30", span: "lg:col-span-3" },
  { slug: "turisticheskaya-srochnaya", span: "lg:col-span-3" },
  { slug: "pensionnaya-50", span: "lg:col-span-3" },
  { slug: "turisticheskaya-6-mes", span: "lg:col-span-3" },
  { slug: "dtv-proverka", span: "lg:col-span-4" },
  { slug: "dtv-5-let-dokumenty", span: "lg:col-span-4" },
  { slug: "biznes-non-b", span: "lg:col-span-2" },
  { slug: "perevod-dokumentov", span: "lg:col-span-2" },
];

const serviceIcons: Record<ServiceSlug, LucideIcon> = {
  "dtv-proverka": FileSearch,
  "dtv-5-let-dokumenty": FileStack,
  "dtv-5-let-garantiya": Shield,
  "turisticheskaya-60-30": Palmtree,
  "turisticheskaya-srochnaya": Zap,
  "turisticheskaya-6-mes": CalendarRange,
  "pensionnaya-50": Heart,
  "biznes-non-b": Briefcase,
  "perevod-dokumentov": Languages,
};

const secondary = bentoLayout
  .map(({ slug, span }) => {
    const service = services.find((s) => s.slug === slug);
    return service ? { service, span } : null;
  })
  .filter(Boolean) as { service: (typeof services)[number]; span: string }[];

export function PackagesSection() {
  const sellPoints = featured.sellPoints ?? featured.features.slice(0, 3);

  return (
    <section
      id="uslugi"
      className="bg-[var(--color-bg)] px-4 py-16 md:px-6 md:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-gold)]">
            РЈСЃР»СѓРіРё
          </p>
          <h2 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-[var(--color-sapphire)] md:text-6xl">
            Р’РёР·С‹ РІ РўР°РёР»Р°РЅРґ РїРѕРґ РІР°С€ РєРµР№СЃ
          </h2>
          <p className="mt-3 text-base font-medium leading-relaxed text-[var(--color-muted)]">
            Р”РµРІСЏС‚СЊ С„РѕСЂРјР°С‚РѕРІ: РѕС‚ РїСЂРѕРІРµСЂРєРё DTV РґРѕ СЃСЂРѕС‡РЅРѕР№ С‚СѓСЂРёСЃС‚РёС‡РµСЃРєРѕР№ Рё
            РїРµРЅСЃРёРѕРЅРЅРѕР№. РЎСЂРѕРє РЅР° РєР°СЂС‚РѕС‡РєРµ, РёРЅРґРёРІРёРґСѓР°Р»СЊРЅС‹Р№ СЂР°СЃС‡С‘С‚ РІ Telegram РЅР°
            СЃС‚СЂР°РЅРёС†Рµ СѓСЃР»СѓРіРё.
          </p>
        </motion.div>

        <div className="mt-8 grid grid-cols-1 gap-3 lg:grid-cols-12 lg:auto-rows-[minmax(140px,auto)]">
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative overflow-hidden rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-sapphire)] shadow-xl lg:col-span-6 lg:row-span-2"
          >
            <Link
              href={`/uslugi/${featured.slug}`}
              className="grid h-full lg:grid-cols-[1.05fr_0.95fr]"
            >
              <div className="relative min-h-[200px] lg:min-h-full">
                <Image
                  src={featured.image}
                  alt={`${featured.name}: РѕС„РѕСЂРјР»РµРЅРёРµ РІРёР·С‹ РІ РўР°РёР»Р°РЅРґ РґР»СЏ СЂРѕСЃСЃРёСЏРЅ`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-sapphire)]/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[var(--color-sapphire)]" />
              </div>
              <div className="flex flex-col justify-center p-5 md:p-6">
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[var(--color-gold)]">
                  <Star size={12} />
                  Р§Р°С‰Рµ РІС‹Р±РёСЂР°СЋС‚
                </span>
                <h3 className="mt-3 font-display text-xl font-extrabold text-white md:text-2xl">
                  {featured.shortName}
                </h3>
                <ul className="mt-3 space-y-2">
                  {sellPoints.map((point) => (
                    <li
                      key={point}
                      className="text-sm font-medium leading-snug text-white/85"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm font-semibold text-white/70">
                  {featured.pricing.processingDays}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[var(--color-gold)]">
                  РџРѕРґСЂРѕР±РЅРµРµ
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </div>
            </Link>
          </motion.article>

          {secondary.map(({ service, span }, i) => {
            const Icon = serviceIcons[service.slug];
            return (
              <motion.article
                key={service.slug}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className={span}
              >
                <Link
                  href={`/uslugi/${service.slug}`}
                  className="group relative flex h-full min-h-[140px] flex-col overflow-hidden rounded-2xl border border-[var(--color-sapphire)]/10 bg-white p-4 shadow-[0_8px_28px_rgba(20,42,69,0.07)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-[var(--color-gold)]/40 hover:shadow-[0_14px_36px_rgba(20,42,69,0.1)] md:p-5"
                >
                  <div
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-teal)] opacity-0 transition-opacity group-hover:opacity-100"
                  />
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-sapphire)]/8 text-[var(--color-teal)]">
                    <Icon size={18} strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-3 font-display text-base font-extrabold leading-snug text-[var(--color-sapphire)]">
                    {service.shortName}
                  </h3>
                  <p className="mt-1 line-clamp-2 flex-1 text-sm font-medium leading-snug text-[var(--color-muted)]">
                    {service.tagline}
                  </p>
                  <p className="mt-3 text-sm font-semibold text-[var(--color-teal)]">
                    {service.pricing.processingDays}
                  </p>
                </Link>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 flex justify-center"
        >
          <PremiumCta href="#zayavka" variant="secondary">
            РќРµ СѓРІРµСЂРµРЅС‹ РІ С„РѕСЂРјР°С‚Рµ: РЅР°РїРёС€РёС‚Рµ РЅР°Рј
          </PremiumCta>
        </motion.div>
      </div>
    </section>
  );
}

