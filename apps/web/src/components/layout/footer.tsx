"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BrandLogo } from "@/components/brand/brand-logo";
import { SocialLinks } from "@/components/icons/social-icons";
import { siteConfig } from "@/lib/utils";

const footerLinks = [
  { href: "/#zayavka", label: "Р—Р°СЏРІРєР°" },
  { href: "/kontakty", label: "РљРѕРЅС‚Р°РєС‚С‹" },
  { href: "/blog", label: "Р‘Р»РѕРі" },
  { href: "/oferta", label: "РЈСЃР»РѕРІРёСЏ" },
  { href: "/privacy", label: "РџРѕР»РёС‚РёРєР°" },
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
                    В·
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
          ThaiPass РЅРµ СЏРІР»СЏРµС‚СЃСЏ РєРѕРЅСЃСѓР»СЊСЃС‚РІРѕРј. РЎСѓРјРјР° РЅР° СЃР°Р№С‚Рµ РЅРµ СЏРІР»СЏРµС‚СЃСЏ РїСѓР±Р»РёС‡РЅРѕР№
          РѕС„РµСЂС‚РѕР№: С‚РѕС‡РЅСѓСЋ СЃС‚РѕРёРјРѕСЃС‚СЊ РїРѕРґС‚РІРµСЂР¶РґР°РµРј РїРѕСЃР»Рµ СЂР°Р·Р±РѕСЂР° РєРµР№СЃР°. В© {year}{" "}
          {siteConfig.name}.{" "}
          <a
            href="https://www.thaievisa.go.th"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-[var(--color-sapphire)]"
          >
            thaievisa.go.th
          </a>
          {" В· "}
          <a
            href="https://moscow.thaiembassy.org"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-[var(--color-sapphire)]"
          >
            РїРѕСЃРѕР»СЊСЃС‚РІРѕ РІ РњРѕСЃРєРІРµ
          </a>
        </p>
      </div>
    </footer>
  );
}

