import { siteConfig } from "@/lib/site-config";
import {
  HERO_POSTER_MOBILE_HEIGHT,
  HERO_POSTER_MOBILE_SRC,
  HERO_POSTER_MOBILE_WEBP_SRC,
  HERO_POSTER_MOBILE_WIDTH,
} from "@/lib/hero-media";
import { HeroNavStatic } from "@/components/layout/hero-nav-static";

const headlineLines = ["Оформим", "визу в", "Таиланд"];

/** SSR-first hero for mobile LCP — no framer-motion, paints in initial HTML. */
export function MobileHeroStatic() {
  return (
    <section
      className="relative min-h-[88svh] overflow-hidden md:hidden"
      aria-label="Главный экран"
    >
      <HeroNavStatic />

      <picture className="absolute inset-0 block h-full w-full">
        <source
          type="image/webp"
          media="(max-width: 767px)"
          srcSet={HERO_POSTER_MOBILE_WEBP_SRC}
        />
        <source media="(max-width: 767px)" srcSet={HERO_POSTER_MOBILE_SRC} />
        <img
          src={HERO_POSTER_MOBILE_SRC}
          alt="Вид на побережье Таиланда"
          width={HERO_POSTER_MOBILE_WIDTH}
          height={HERO_POSTER_MOBILE_HEIGHT}
          fetchPriority="high"
          decoding="sync"
          sizes="100vw"
          className="h-full w-full object-cover brightness-110 saturate-125"
        />
      </picture>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[var(--color-sapphire)]/30 via-[var(--color-sapphire)]/10 to-[var(--color-sapphire)]/55"
      />

      <div
        aria-hidden
        className="hero-grain pointer-events-none absolute inset-0 opacity-[0.1]"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[62%] bg-gradient-to-t from-[var(--color-sapphire)]/85 via-[var(--color-sapphire)]/45 to-transparent"
      />

      <div className="relative z-10 flex min-h-[88svh] flex-col justify-end px-5 pb-10 pt-28">
        <div className="w-full max-w-5xl">
          <p className="mb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-gold)] drop-shadow-[0_2px_12px_rgba(20,42,69,0.9)] sm:text-xs">
            Визы в Таиланд для россиян · {siteConfig.officeCity}
          </p>

          <h1 className="font-display text-[2.625rem] font-bold uppercase leading-[0.92] tracking-[-0.02em] text-white drop-shadow-[0_4px_24px_rgba(20,42,69,0.85)] sm:text-4xl">
            {headlineLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>

          <p className="mt-4 max-w-xl text-[0.9375rem] leading-[1.65] text-white/95 drop-shadow-[0_2px_16px_rgba(20,42,69,0.9)] sm:max-w-2xl sm:text-base">
            {siteConfig.name}: сервис оформления виз в Таиланд для граждан
            России. Офис в {siteConfig.officeCity}, приём документов по всей
            РФ. Ведём DTV на 5 лет, туристическую TR и пенсионную 50+:
            проверяем пакет до подачи на thaievisa.go.th и сопровождаем
            заявку. Оставьте заявку, и мы разберём кейс и предложим пакет.
          </p>
        </div>
      </div>
    </section>
  );
}
