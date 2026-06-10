import type { Metadata } from "next";
import { Fraunces, Manrope, Unbounded } from "next/font/google";
import { HeaderShell } from "@/components/layout/header-shell";
import { Footer } from "@/components/layout/footer";
import { StickyCta } from "@/components/layout/sticky-cta";
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
    default:
      "Виза в Таиланд для россиян — DTV, туристическая, пенсионная 50+ | ThaiPass",
    template: "%s | ThaiPass",
  },
  description:
    "Оформление виз в Таиланд для россиян: DTV, туристическая виза за 6–7 дней, пенсионная 50+. Офис в Москве, курьер по России.",
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
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
          />
        )}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
              `,
            }}
          />
        )}
        {process.env.NEXT_PUBLIC_YM_COUNTER_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
                ym(${process.env.NEXT_PUBLIC_YM_COUNTER_ID}, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true });
              `,
            }}
          />
        )}
      </head>
      <body
        className={`${manrope.variable} ${unbounded.variable} ${fraunces.variable} font-sans antialiased`}
      >
        <HeaderShell />
        <main>{children}</main>
        <Footer />
        <StickyCta />
      </body>
    </html>
  );
}
