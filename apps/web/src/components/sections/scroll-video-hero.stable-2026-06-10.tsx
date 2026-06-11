/**
 * Stable hero checkpoint: 2026-06-10
 * Approved: cinematic scroll, 3-line parallax, white readable text, no CTAs.
 * Restore from this file if further edits break the hero.
 */
"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HeroNav } from "@/components/layout/hero-nav";
import { siteConfig } from "@/lib/site-config";

const headlineLines = ["Оформим", "визу в", "Таиланд"];

export function ScrollVideoHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

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
    const video = videoRef.current;
    if (!video) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyPlayback = () => {
      if (mq.matches) {
        video.pause();
        return;
      }
      video.playbackRate = 1;
      void video.play().catch(() => {});
    };

    applyPlayback();
    mq.addEventListener("change", applyPlayback);
    return () => mq.removeEventListener("change", applyPlayback);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-[240vh]"
      aria-label="Главный экран"
    >
      <div className="sticky top-0 z-0 h-svh min-h-[600px] overflow-hidden">
        <HeroNav />

        <motion.div
          className="absolute inset-0 origin-center"
          style={{ scale: videoScale }}
        >
          <video
            ref={videoRef}
            className="h-full w-full object-cover brightness-110 saturate-125"
            autoPlay
            muted
            loop
            playsInline
            poster="/images/generated/hero-poster.jpg"
            aria-label="Вид на побережье Таиланда"
          >
            <source src="/video/hero-loop.mp4" type="video/mp4" />
          </video>
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
          className="pointer-events-none relative z-10 flex h-full flex-col justify-end px-4 pb-10 pt-28 md:px-8 md:pb-14"
          style={{
            opacity: contentOpacity,
            visibility: contentVisibility,
            scale: contentScale,
            filter: contentBlur,
            transformOrigin: "left bottom",
          }}
        >
          <div className="mx-auto w-full max-w-7xl">
            <motion.p
              style={{ y: eyebrowY }}
              className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-gold)] drop-shadow-[0_2px_12px_rgba(20,42,69,0.9)] md:text-sm"
            >
              Визы в Таиланд для россиян
            </motion.p>

            <motion.h1
              style={{ letterSpacing: titleTracking }}
              className="font-display font-bold uppercase leading-[0.92] text-white"
            >
              {headlineLines.map((line, i) => (
                <motion.span
                  key={line}
                  style={{ y: lineMotion[i], display: "block" }}
                  className="block text-4xl drop-shadow-[0_4px_24px_rgba(20,42,69,0.85)] md:text-6xl lg:text-7xl"
                >
                  {line}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              style={{ y: subcopyY }}
              className="mt-4 max-w-xl text-base leading-relaxed text-white drop-shadow-[0_2px_16px_rgba(20,42,69,0.9)] md:mt-5 md:text-lg"
            >
              {siteConfig.name} ведёт DTV, туристическую и пенсионную визу.
              Проверяем документы до подачи и сопровождаем заявку под ключ.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
