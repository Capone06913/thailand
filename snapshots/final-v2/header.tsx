"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { BrandLogo } from "@/components/brand/brand-logo";
import { SocialLinks } from "@/components/icons/social-icons";
import { services } from "@/lib/services";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/#boli", label: "С чем помогаем" },
  { href: "/blog", label: "Блог" },
  { href: "/kontakty", label: "Контакты" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)]/70 bg-[var(--color-bg)]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <BrandLogo size="md" variant="color" showTagline={false} />

        <nav className="hidden items-center gap-1 md:flex">
          <div className="relative">
            <button
              type="button"
              onClick={() => setServicesOpen(!servicesOpen)}
              className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-[var(--color-muted)] transition-colors hover:bg-white hover:text-[var(--color-teal)]"
            >
              Услуги
              <ChevronDown
                size={14}
                className={cn("transition-transform", servicesOpen && "rotate-180")}
              />
            </button>
            {servicesOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setServicesOpen(false)}
                />
                <div className="absolute left-0 top-full z-50 mt-1 w-72 rounded-2xl border border-[var(--color-border)] bg-white p-2 shadow-xl">
                  {services.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/uslugi/${s.slug}`}
                      onClick={() => setServicesOpen(false)}
                      className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-[var(--color-surface)]"
                    >
                      <span className="block text-sm font-medium">{s.shortName}</span>
                      <span className="mt-0.5 block text-xs text-[var(--color-muted)]">
                        {s.timeline}
                      </span>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm text-[var(--color-muted)] transition-colors hover:bg-white hover:text-[var(--color-teal)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <SocialLinks size="sm" />
          <Link
            href="/#zayavka"
            className={cn(buttonVariants({ size: "sm" }), "rounded-full px-5")}
          >
            Заявка
          </Link>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Меню"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-4 md:hidden">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[var(--color-muted)]">
            Услуги
          </p>
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/uslugi/${s.slug}`}
              className="block py-2 text-sm"
              onClick={() => setOpen(false)}
            >
              {s.name}
            </Link>
          ))}
          <div className="mt-4 border-t border-[var(--color-border)] pt-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-2 text-sm"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
