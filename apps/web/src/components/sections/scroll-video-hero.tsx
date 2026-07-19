// Stable baselines: v1 hero → scroll-video-hero.stable-2026-06-10.tsx | v2 → git tag final-v2 | v3 → git tag final-v3
"use client";

import { useRef, useEffect, useSyncExternalStore } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HeroNav } from "@/components/layout/hero-nav";
import { siteConfig } from "@/lib/site-config";
import { HERO_POSTER_SRC, HERO_POSTER_WEBP_SRC, HERO_VIDEO_SRC } from "@/lib/hero-media";
import {
  heroContentShellClass,
  heroEyebrowClass,
  heroHeadlineLineClass,
  heroHeadlineLines,
  heroSubcopyClass,
  heroTitleClass,
} from "@/lib/hero-typography";
import {
  getHeroPlaybackServerSnapshot,
  getHeroPlaybackSnapshot,
  subscribeHeroPlayback,
} from "@/lib/hero-playback";

const headlineLines = heroHeadlineLines;

export function ScrollVideoHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const showVideo = useSyncExternalStore(
    subscribeHeroPlayback,
    getHeroPlaybackSnapshot,
    getHeroPlaybackServerSnapshot,
  );

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    [0.18, 0.34, 0.52],
  );

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.14]);

  const contentOpacity = useTransform(scrollYProgress, (v) => {
    if (v <= 0.1) return 1;
    if (v >= 0.68) return 0;
    return 1 - (v - 0.1) / 0.58;
  });

  const contentVisibility = useTransform(scrollYProgress, (v) =>
    v >= 0.68 ? "hidden" : "visible",
  );

  const contentBlur = useTransform(scrollYProgress, [0.08, 0.62], [
    "blur(0px)",
    "blur(12px)",
  ]);

  const contentScale = useTransform(scrollYProgress, [0, 0.65], [1, 1.15]);

  const eyebrowY = useTransform(scrollYProgress, [0, 0.55], ["0vh", "-32vh"]);
  const line1Y = useTransform(scrollYProgress, [0, 0.55], ["0vh", "-26vh"]);
  const line2Y = useTransform(scrollYProgress, [0, 0.55], ["0vh", "-40vh"]);
  const line3Y = useTransform(scrollYProgress, [0, 0.55], ["0vh", "-54vh"]);
  const subcopyY = useTransform(scrollYProgress, [0, 0.55], ["0vh", "-22vh"]);

  const titleTracking = useTransform(
    scrollYProgress,
    [0, 0.55],
    ["-0.02em", "0.06em"],
  );

  const lineMotion = [line1Y, line2Y, line3Y];

  useEffect(() => {
    if (!showVideo) return;
    const video = videoRef.current;
    if (!video) return;

    let cancelled = false;

    const onCanPlay = () => {
      if (cancelled) return;
      video.playbackRate = 1;
      void video.play().catch(() => {});
    };

    const startLoad = () => {
      if (cancelled || video.getAttribute("src")) return;
      video.src = HERO_VIDEO_SRC;
      video.addEventListener("canplay", onCanPlay, { once: true });
      video.load();
    };

    const onScroll = () => {
      startLoad();
      window.removeEventListener("scroll", onScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelled = true;
      video.removeEventListener("canplay", onCanPlay);
      window.removeEventListener("scroll", onScroll);
    };
  }, [showVideo]);

  return (
    <section
      ref={containerRef}
      className="relative h-full w-full"
      aria-label="Главный экран"
    >
      <div className="sticky top-0 z-0 h-svh min-h-[600px] overflow-hidden">
        <HeroNav />

        <motion.div
          className="absolute inset-0 origin-center"
          style={{ scale: videoScale }}
        >
          <picture className="absolute inset-0 block h-full w-full">
            <source type="image/webp" srcSet={HERO_POSTER_WEBP_SRC} />
            <img
              src={HERO_POSTER_SRC}
              alt="Вид на побережье Таиланда"
              width={1920}
              height={1080}
              loading="lazy"
              decoding="async"
              sizes="100vw"
              className="h-full w-full object-cover brightness-110 saturate-125"
            />
          </picture>
          {showVideo ? (
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover brightness-110 saturate-125"
              muted
              loop
              playsInline
              preload="none"
              aria-hidden
              tabIndex={-1}
            />
          ) : null}
        </motion.div>

        <motion.div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[var(--color-sapphire)]/30 via-[var(--color-sapphire)]/10 to-[var(--color-sapphire)]/55"
          style={{ opacity: overlayOpacity }}
        />

        <div
          aria-hidden
          className="hero-grain pointer-events-none absolute inset-0 opacity-[0.1]"
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[62%] bg-gradient-to-t from-[var(--color-sapphire)]/85 via-[var(--color-sapphire)]/45 to-transparent"
        />

        <motion.div
          className={`pointer-events-none ${heroContentShellClass}`}
          style={{
            opacity: contentOpacity,
            visibility: contentVisibility,
            scale: contentScale,
            filter: contentBlur,
            transformOrigin: "left bottom",
          }}
        >
          <div className="w-full max-w-5xl">
            <motion.p style={{ y: eyebrowY }} className={heroEyebrowClass}>
              Визы в Таиланд для россиян · {siteConfig.officeCity}
            </motion.p>

            <motion.h1
              style={{ letterSpacing: titleTracking }}
              className={heroTitleClass}
            >
              {headlineLines.map((line, i) => (
                <motion.span
                  key={line}
                  style={{ y: lineMotion[i], display: "block" }}
                  className={heroHeadlineLineClass}
                >
                  {line}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p style={{ y: subcopyY }} className={heroSubcopyClass}>
              {siteConfig.name}: сервис оформления виз в Таиланд для граждан
              России. Офис в {siteConfig.officeCity}, приём документов по всей
              РФ. Ведём DTV на 5 лет, туристическую TR и пенсионную 50+:
              проверяем пакет до подачи на thaievisa.go.th и сопровождаем
              заявку. Оставьте заявку, и мы разберём кейс и предложим пакет.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
