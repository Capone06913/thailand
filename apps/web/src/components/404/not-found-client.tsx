"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PhysicsBlocks404 = dynamic(
  () =>
    import("@/components/404/physics-blocks-404").then((m) => m.PhysicsBlocks404),
  { ssr: false },
);

export function NotFoundClient() {
  return (
    <main className="relative flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center overflow-hidden bg-[var(--color-bg)] px-4 py-20">
      <PhysicsBlocks404 />

      <div className="relative z-10 max-w-lg text-center">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-gold)]">
          Ошибка 404
        </p>
        <h1 className="mt-4 font-display text-3xl font-extrabold text-[var(--color-sapphire)] md:text-5xl">
          Страница не найдена
        </h1>
        <p className="mt-4 text-base font-medium leading-relaxed text-[var(--color-muted)]">
          Похоже, вы свернули не туда. Подвигайте блоки мышью или вернитесь на
          главную: там все услуги и форма заявки.
        </p>
        <Link
          href="/"
          className={cn(
            buttonVariants({ size: "lg" }),
            "mt-8 rounded-full bg-[var(--color-sapphire)] px-8 font-bold hover:bg-[var(--color-sapphire)]/90",
          )}
        >
          На главную
        </Link>
      </div>
    </main>
  );
}
