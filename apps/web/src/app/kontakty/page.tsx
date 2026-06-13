import type { Metadata } from "next";
import Link from "next/link";
import { LeadForm } from "@/components/forms/lead-form";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/utils";
import { MapPin, MessageCircle, Send } from "lucide-react";

export const metadata: Metadata = {
  title: "РљРѕРЅС‚Р°РєС‚С‹: РѕС„РёСЃ РњРѕСЃРєРІР°, РєСѓСЂСЊРµСЂ РїРѕ Р РѕСЃСЃРёРё",
  description:
    "РЎРІСЏР·Р°С‚СЊСЃСЏ СЃ ThaiPass: РѕС„РёСЃ РІ РњРѕСЃРєРІРµ, РєСѓСЂСЊРµСЂСЃРєР°СЏ РґРѕСЃС‚Р°РІРєР° РїРѕ Р РѕСЃСЃРёРё, WhatsApp, Telegram-РєР°РЅР°Р». Р—Р°СЏРІРєР° РЅР° СЂР°Р·Р±РѕСЂ РІРёР·РѕРІРѕРіРѕ РєРµР№СЃР°.",
};

const localSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: siteConfig.name,
  url: `${siteConfig.url}/kontakty`,
  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.officeCity,
    addressCountry: "RU",
  },
  areaServed: { "@type": "Country", name: "Russia" },
};

export default function KontaktyPage() {
  return (
    <div className="px-4 py-16 md:px-6 md:py-24">
      <JsonLd data={localSchema} />
      <div className="mx-auto max-w-6xl">
        <h1 className="font-serif text-4xl font-semibold md:text-5xl">
          РћС„РёСЃ РІ {siteConfig.officeCity} Рё РґРѕСЃС‚Р°РІРєР° РєСѓСЂСЊРµСЂРѕРј
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-[var(--color-muted)]">
          РџСЂРёРЅРёРјР°РµРј РґРѕРєСѓРјРµРЅС‚С‹ РІ РњРѕСЃРєРІРµ РёР»Рё РѕСЂРіР°РЅРёР·СѓРµРј РєСѓСЂСЊРµСЂР° РїРѕ РІСЃРµР№ Р РѕСЃСЃРёРё.
          РўРµР»РµС„РѕРЅРЅР°СЏ Р»РёРЅРёСЏ РїРѕСЏРІРёС‚СЃСЏ РїРѕР·Р¶Рµ: РїРѕРєР° СЃРІСЏР·СЊ С‡РµСЂРµР· С„РѕСЂРјСѓ, WhatsApp Рё
          Telegram.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-[var(--color-border)] bg-white p-6">
            <MapPin className="text-[var(--color-teal)]" size={24} />
            <h2 className="mt-4 font-semibold">РћС„РёСЃ</h2>
            <p className="mt-2 text-sm text-[var(--color-muted)]">
              {siteConfig.officeAddress ||
                "РђРґСЂРµСЃ Р±СѓРґРµС‚ РѕРїСѓР±Р»РёРєРѕРІР°РЅ РїСЂРё РѕС‚РєСЂС‹С‚РёРё. Р—Р°РїРёСЃСЊ РЅР° РїСЂРёС‘Рј: С‡РµСЂРµР· Р·Р°СЏРІРєСѓ."}
            </p>
          </div>

          {siteConfig.whatsappUrl && (
            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-[var(--color-border)] bg-white p-6 transition-shadow hover:shadow-lg"
            >
              <MessageCircle className="text-[var(--color-teal)]" size={24} />
              <h2 className="mt-4 font-semibold">WhatsApp</h2>
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                РќР°РїРёС€РёС‚Рµ РЅР°РїСЂСЏРјСѓСЋ РїРѕ РІРѕРїСЂРѕСЃР°Рј РІРёР·
              </p>
            </a>
          )}

          {siteConfig.telegramChannelUrl && (
            <a
              href={siteConfig.telegramChannelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-[var(--color-border)] bg-white p-6 transition-shadow hover:shadow-lg"
            >
              <Send className="text-[var(--color-teal)]" size={24} />
              <h2 className="mt-4 font-semibold">Telegram-РєР°РЅР°Р»</h2>
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                РќРѕРІРѕСЃС‚Рё, РїСЂР°Р№СЃ Рё РёР·РјРµРЅРµРЅРёСЏ РїСЂР°РІРёР»: {siteConfig.telegramChannelName}
              </p>
            </a>
          )}
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold">РћСЃС‚Р°РІРёС‚СЊ Р·Р°СЏРІРєСѓ</h2>
            <p className="mt-2 text-[var(--color-muted)]">
              РћСЃРЅРѕРІРЅРѕР№ СЃРїРѕСЃРѕР± СЃРІСЏР·Рё. РџРµСЂРµР·РІРѕРЅРёРј РІ РјРµСЃСЃРµРЅРґР¶РµСЂ Рё СЂР°Р·Р±РµСЂС‘Рј РєРµР№СЃ.
            </p>
          </div>
          <LeadForm />
        </div>

        <p className="mt-12 text-sm text-[var(--color-muted)]">
          <Link href="/" className="text-[var(--color-teal)] underline">
            в†ђ РќР° РіР»Р°РІРЅСѓСЋ
          </Link>
        </p>
      </div>
    </div>
  );
}

