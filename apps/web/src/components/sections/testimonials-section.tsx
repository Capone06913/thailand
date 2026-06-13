"use client";

import { FadeIn } from "@/components/motion/fade-in";
import { ReviewMarqueeRow } from "@/components/motion/review-marquee-row";
import { landingReviews, type Review } from "@/lib/reviews";

const avatarColors = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEAA7",
  "#DDA0DD",
  "#F4A460",
  "#87CEEB",
];

function YandexStar({ filled }: { filled: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      aria-hidden
      className="shrink-0"
    >
      <path
        fill={filled ? "#FC3" : "#E0E0E0"}
        d="M8 1.2l1.76 3.57 3.94.57-2.85 2.78.67 3.92L8 10.9l-3.52 1.85.67-3.92-2.85-2.78 3.94-.57L8 1.2z"
      />
    </svg>
  );
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const initials = review.name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const avatarBg = avatarColors[index % avatarColors.length];

  return (
    <article className="w-[min(92vw,420px)] shrink-0 rounded-2xl border border-[#e8e8e8] bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)] md:w-[440px] md:p-5">
      <div className="flex gap-3">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
          style={{ backgroundColor: avatarBg }}
        >
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate text-[15px] font-bold leading-tight text-[#212121]">
                {review.name}
              </p>
              <p className="mt-0.5 text-xs text-[#999]">{review.date}</p>
            </div>
            <div className="flex items-center gap-0.5 pt-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <YandexStar key={i} filled={i < review.rating} />
              ))}
            </div>
          </div>
          <p className="mt-1 text-xs text-[#999]">
            {review.city} В· {review.visa}
          </p>
        </div>
      </div>
      <p className="mt-3 text-[15px] leading-[22px] text-[#333]">
        {review.text}
      </p>
      <div className="mt-3 flex items-center gap-1.5 border-t border-[#f0f0f0] pt-3">
        <span className="inline-flex h-4 w-4 items-center justify-center rounded-sm bg-[#FC3] text-[9px] font-black text-[#212121]">
          РЇ
        </span>
        <span className="text-xs text-[#999]">РћС‚Р·С‹РІ Рѕ ThaiPass</span>
      </div>
    </article>
  );
}

const row1 = landingReviews.slice(0, 6);
const row2 = landingReviews.slice(6, 12);
const row3 = landingReviews.slice(12, 18);

export function TestimonialsSection() {
  return (
    <section id="otzyvy" className="overflow-hidden bg-[#f3f3f3] py-14 md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <FadeIn className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-gold)]">
            РћС‚Р·С‹РІС‹ РєР»РёРµРЅС‚РѕРІ
          </p>
          <h2 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-[var(--color-sapphire)] md:text-5xl">
            РќР°Рј РґРѕРІРµСЂСЏСЋС‚ Р·Р°СЏРІРёС‚РµР»Рё РїРѕ РІСЃРµР№ Р РѕСЃСЃРёРё
          </h2>
        </FadeIn>
      </div>

      <div className="relative mt-8 space-y-3">
        <div className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2">
          <ReviewMarqueeRow direction="left" speed={0.38}>
            {row1.map((r, i) => (
              <ReviewCard key={r.id} review={r} index={i} />
            ))}
          </ReviewMarqueeRow>
        </div>
        <div className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2">
          <ReviewMarqueeRow direction="right" speed={0.3}>
            {row2.map((r, i) => (
              <ReviewCard key={r.id} review={r} index={i + 6} />
            ))}
          </ReviewMarqueeRow>
        </div>
        <div className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2">
          <ReviewMarqueeRow direction="left" speed={0.35}>
            {row3.map((r, i) => (
              <ReviewCard key={r.id} review={r} index={i + 12} />
            ))}
          </ReviewMarqueeRow>
        </div>
      </div>
    </section>
  );
}

