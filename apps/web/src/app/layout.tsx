import type { Metadata } from "next";
import { Fraunces, Manrope, Unbounded } from "next/font/google";
import { HeaderShell } from "@/components/layout/header-shell";
import { Footer } from "@/components/layout/footer";
import { StickyCta } from "@/components/layout/sticky-cta";
import { AnalyticsLoader } from "@/components/consent/analytics-loader";
import { CookieConsentLoader } from "@/components/consent/cookie-consent-loader";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";
import { HERO_POSTER_MOBILE_SRC } from "@/lib/hero-media";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
  preload: false,
});

const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  weight: ["700"],
  variable: "--font-display",
  display: "swap",
  preload: true,
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Визы в Таиланд из Москвы: DTV, TR, 50+ | ThaiPass",
    template: "%s | ThaiPass",
  },
  description:
    "ThaiPass оформляет визы в Таиланд для россиян из Москвы и по России: DTV, туристическая TR, пенсионная 50+. Проверка документов до подачи, курьер по РФ.",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: siteConfig.name,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  description:
    "Сервис оформления виз в Таиланд: DTV, туристическая виза, пенсионная 50+",
  areaServed: { "@type": "Country", name: "Russia" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <JsonLd data={organizationSchema} />
        <link
          rel="preload"
          as="image"
          href={HERO_POSTER_MOBILE_SRC}
          media="(max-width: 767px)"
          fetchPriority="high"
        />
      </head>
      <body
        className={`${manrope.variable} ${unbounded.variable} ${fraunces.variable} font-sans antialiased`}
      >
        <HeaderShell />
        <main>{children}</main>
        <Footer />
        <StickyCta />
        <CookieConsentLoader />
        <AnalyticsLoader />
      </body>
    </html>
  );
}
