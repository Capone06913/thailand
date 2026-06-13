"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

function IconInstagram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </svg>
  );
}

function IconTelegram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M21 4.5L3.5 11.2c-.9.35-.88 1.58.03 1.9l4.2 1.4 1.6 5.1c.28.9 1.45 1.05 1.95.25l2.4-3.7 4.9 3.6c.78.57 1.88.12 2.05-.82L22 6.2c.2-1.15-.88-2.05-2-1.7Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 14.2 15.8 9.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconWhatsApp({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 3C7.03 3 3 7.03 3 12c0 1.77.47 3.43 1.3 4.87L3 21l4.3-1.13A8.94 8.94 0 0 0 12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M9.2 9.4c.2-.45.46-.47.66-.48.17 0 .36 0 .52.01.17.01.4-.07.62.47.23.55.78 1.9.85 2.04.07.14.12.3-.01.48-.13.18-.58.7-.71.84-.13.14-.27.29-.12.57.15.28.67 1.1 1.44 1.78 1 .9 1.84 1.18 2.1 1.31.26.13.41.11.56-.07.15-.18.64-.75.81-1.01.17-.26.34-.22.58-.13.24.09 1.52.72 1.78.85.26.13.43.2.5.31.07.11.07.64-.16 1.25-.23.61-1.35 1.17-1.87 1.25-.52.08-1.04.04-1.78-.2-.95-.31-2.05-.97-3.18-2.1-1.18-1.18-1.86-2.45-2.1-3.2-.24-.75-.02-1.16.18-1.54.2-.38.44-.62.66-.96.22-.34.11-.64-.01-.89Z"
        fill="currentColor"
      />
    </svg>
  );
}

const iconMap = {
  instagram: IconInstagram,
  telegram: IconTelegram,
  whatsapp: IconWhatsApp,
} as const;

interface SocialLinkItem {
  id: keyof typeof iconMap;
  href: string;
  label: string;
}

interface SocialLinksProps {
  className?: string;
  size?: "sm" | "md";
}

export function SocialLinks({ className, size = "md" }: SocialLinksProps) {
  const items: SocialLinkItem[] = [
    ...(siteConfig.instagramUrl
      ? [{ id: "instagram" as const, href: siteConfig.instagramUrl, label: "Instagram" }]
      : []),
    ...(siteConfig.telegramChannelUrl
      ? [{ id: "telegram" as const, href: siteConfig.telegramChannelUrl, label: "Telegram" }]
      : []),
    ...(siteConfig.whatsappUrl
      ? [{ id: "whatsapp" as const, href: siteConfig.whatsappUrl, label: "WhatsApp" }]
      : []),
  ];

  const btnSize = size === "sm" ? "h-9 w-9" : "h-11 w-11";
  const iconSize = size === "sm" ? "h-4 w-4" : "h-5 w-5";

  return (
    <div className={cn("flex items-center justify-center gap-3", className)}>
      {items.map((item) => {
        const Icon = iconMap[item.id];
        return (
          <motion.a
            key={item.id}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className={cn(
              "group inline-flex items-center justify-center rounded-full border border-[var(--color-sapphire)]/20 bg-white text-[var(--color-sapphire)] shadow-sm transition-colors hover:border-[var(--color-sapphire)] hover:bg-[var(--color-sapphire)] hover:text-white",
              btnSize,
            )}
          >
            <Icon className={cn(iconSize, "transition-colors")} />
          </motion.a>
        );
      })}
    </div>
  );
}

export { IconInstagram, IconTelegram, IconWhatsApp };
