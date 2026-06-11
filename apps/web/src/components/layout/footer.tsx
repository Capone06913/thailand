"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BrandLogo } from "@/components/brand/brand-logo";
import { SocialLinks } from "@/components/icons/social-icons";
import { siteConfig } from "@/lib/utils";

const footerLinks = [
  { href: "/#zayavka", label: "Заявка" },
  { href: "/kontakty", label: "Контакты" },
  { href: "/blog", label: "Блог" },
  { href: "/oferta", label: "Условия" },
  { href: "/privacy", label: "Политика" },
  { href: "/cookies", label: "Cookie" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-bg)]">
      <div
        aria-hidden
        className="footer-gradient-border absolute inset-x-0 top-0 h-[3px]"
      />

      <div className="relative mx-auto max-w-3xl px-4 py-8 text-center md:px-6 md:py-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45 }}
          className="flex flex-col items-center gap-5"
        >
          <BrandLogo size="footer" variant="color" href="/" centered />

          <nav className="flex flex-wrap items-center justify-center gap-x-1 gap-y-2">
            {footerLinks.map((link, i) => (
              <span key={link.href} className="inline-flex items-center">
                {i > 0 && (
                  <span
                    aria-hidden
                    className="mx-2 text-[var(--color-sapphire)]/25"
                  >
                    ·
                  </span>
                )}
                <Link
                  href={link.href}
                  className="text-sm font-semibold text-[var(--color-sapphire)]/80 transition-colors hover:text-[var(--color-teal)]"
                >
                  {link.label}
                </Link>
              </span>
            ))}
          </nav>

          <SocialLinks size="md" className="justify-center" />
        </motion.div>
      </div>

      <div className="border-t border-[var(--color-border)]/70 px-4 py-3 text-center text-[11px] leading-relaxed text-[var(--color-muted)]">
        <p className="mx-auto max-w-2xl">
          ThaiPass не является консульством. Сумма на сайте не является публичной
          офертой: точную стоимость подтверждаем после разбора кейса. © {year}{" "}
          {siteConfig.name}.{" "}
          <a
            href="https://www.thaievisa.go.th"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-[var(--color-sapphire)]"
          >
            thaievisa.go.th
          </a>
          {" · "}
          <a
            href="https://moscow.thaiembassy.org"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-[var(--color-sapphire)]"
          >
            посольство в Москве
          </a>
        </p>
      </div>
    </footer>
  );
}
