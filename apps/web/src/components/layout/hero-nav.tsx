"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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

export function HeroNav() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const linkClass =
    "rounded-lg px-3 py-2 text-sm font-semibold text-[var(--color-sapphire)]/80 transition-colors hover:bg-[var(--color-sapphire)]/5 hover:text-[var(--color-sapphire)]";

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="absolute inset-x-0 top-0 z-30 px-4 pt-4 md:px-8"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-2xl border border-white/60 bg-white/70 px-4 py-3 shadow-xl shadow-[var(--color-sapphire)]/10 backdrop-blur-xl md:px-6">
        <BrandLogo size="md" variant="color" showTagline={false} />

        <nav className="hidden items-center gap-1 md:flex">
          <div className="relative">
            <button
              type="button"
              onClick={() => setServicesOpen(!servicesOpen)}
              className={cn(linkClass, "inline-flex items-center gap-1")}
            >
              Услуги
              <ChevronDown
                size={14}
                className={cn(
                  "transition-transform",
                  servicesOpen && "rotate-180",
                )}
              />
            </button>
            <AnimatePresence>
              {servicesOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setServicesOpen(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute left-0 top-full z-50 mt-2 w-72 rounded-2xl border border-white/10 bg-[var(--color-sapphire)]/95 p-2 shadow-2xl backdrop-blur-xl"
                  >
                    {services.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/uslugi/${s.slug}`}
                        onClick={() => setServicesOpen(false)}
                        className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-white/10"
                      >
                        <span className="block text-sm font-semibold text-white">
                          {s.shortName}
                        </span>
                        <span className="mt-0.5 block text-xs text-white/60">
                          {s.timeline}
                        </span>
                      </Link>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className={linkClass}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <SocialLinks size="sm" />
          <Link
            href="/#zayavka"
            className={cn(
              buttonVariants({ size: "sm" }),
              "rounded-full border border-[var(--color-gold)]/40 bg-[var(--color-gold)] px-5 font-bold text-[var(--color-sapphire)] shadow-lg shadow-[var(--color-gold)]/20 hover:bg-[var(--color-gold)]/90",
            )}
          >
            Заявка
          </Link>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-[var(--color-sapphire)] md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Меню"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl md:hidden"
          >
            <div className="px-4 py-4">
              {services.map((s) => (
                <Link
                  key={s.slug}
                  href={`/uslugi/${s.slug}`}
                  className="block py-2 text-sm text-white"
                  onClick={() => setOpen(false)}
                >
                  {s.name}
                </Link>
              ))}
              <div className="mt-4 border-t border-white/10 pt-4">
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block py-2 text-sm text-white/90"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
