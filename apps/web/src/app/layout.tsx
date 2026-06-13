import type { Metadata } from "next";
import { Fraunces, Manrope, Unbounded } from "next/font/google";
import { HeaderShell } from "@/components/layout/header-shell";
import { Footer } from "@/components/layout/footer";
import { StickyCta } from "@/components/layout/sticky-cta";
import { AnalyticsLoader } from "@/components/consent/analytics-loader";
import { CookieConsentBanner } from "@/components/consent/cookie-consent-banner";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});

const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Р’РёР·С‹ РІ РўР°РёР»Р°РЅРґ РёР· РњРѕСЃРєРІС‹: DTV, TR, 50+ | ThaiPass",
    template: "%s | ThaiPass",
  },
  description:
    "ThaiPass РѕС„РѕСЂРјР»СЏРµС‚ РІРёР·С‹ РІ РўР°РёР»Р°РЅРґ РґР»СЏ СЂРѕСЃСЃРёСЏРЅ РёР· РњРѕСЃРєРІС‹ Рё РїРѕ Р РѕСЃСЃРёРё: DTV, С‚СѓСЂРёСЃС‚РёС‡РµСЃРєР°СЏ TR, РїРµРЅСЃРёРѕРЅРЅР°СЏ 50+. РџСЂРѕРІРµСЂРєР° РґРѕРєСѓРјРµРЅС‚РѕРІ РґРѕ РїРѕРґР°С‡Рё, РєСѓСЂСЊРµСЂ РїРѕ Р Р¤.",
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
    "РЎРµСЂРІРёСЃ РѕС„РѕСЂРјР»РµРЅРёСЏ РІРёР· РІ РўР°РёР»Р°РЅРґ: DTV, С‚СѓСЂРёСЃС‚РёС‡РµСЃРєР°СЏ РІРёР·Р°, РїРµРЅСЃРёРѕРЅРЅР°СЏ 50+",
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
      </head>
      <body
        className={`${manrope.variable} ${unbounded.variable} ${fraunces.variable} font-sans antialiased`}
      >
        <HeaderShell />
        <main>{children}</main>
        <Footer />
        <StickyCta />
        <CookieConsentBanner />
        <AnalyticsLoader />
      </body>
    </html>
  );
}

