import { siteConfig } from "@/lib/site-config";
import {
  HERO_POSTER_MOBILE_SRC,
  HERO_POSTER_SRC,
  HERO_POSTER_WEBP_SRC,
} from "@/lib/hero-media";
import { HeroNavStatic } from "@/components/layout/hero-nav-static";

const headlineLines = ["Оформим", "визу в", "Таиланд"];

/** SSR desktop hero poster — same 240vh slot as ScrollVideoHero to prevent CLS. */
export function DesktopHeroStatic() {
  return (
    <section
      id="desktop-hero-fallback"
      className="absolute inset-0 z-0"
      aria-label="Главный экран"
    >
      <div className="sticky top-0 z-0 h-svh min-h-[600px] overflow-hidden">
        <HeroNavStatic />

        <picture className="absolute inset-0 block h-full w-full">
          <source
            type="image/webp"
            media="(min-width: 768px)"
            srcSet={HERO_POSTER_WEBP_SRC}
          />
          <source media="(min-width: 768px)" srcSet={HERO_POSTER_SRC} />
          <img
            src={HERO_POSTER_MOBILE_SRC}
            alt="Вид на побережье Таиланда"
            width={1920}
            height={1080}
            decoding="async"
            sizes="(min-width: 768px) 100vw, 0px"
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

        <div className="relative z-10 flex h-full flex-col justify-end px-8 pb-16 pt-32">
          <div className="w-full max-w-5xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-gold)] drop-shadow-[0_2px_12px_rgba(20,42,69,0.9)]">
              Визы в Таиланд для россиян · {siteConfig.officeCity}
            </p>

            <h1 className="font-display text-5xl font-bold uppercase leading-[0.92] tracking-[-0.02em] text-white drop-shadow-[0_4px_24px_rgba(20,42,69,0.85)] lg:text-6xl">
              {headlineLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-[1.65] text-white/95 drop-shadow-[0_2px_16px_rgba(20,42,69,0.9)] lg:text-lg">
              {siteConfig.name}: сервис оформления виз в Таиланд для граждан
              России. Офис в {siteConfig.officeCity}, приём документов по всей
              РФ. Ведём DTV на 5 лет, туристическую TR и пенсионную 50+:
              проверяем пакет до подачи на thaievisa.go.th и сопровождаем
              заявку. Оставьте заявку, и мы разберём кейс и предложим пакет.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
