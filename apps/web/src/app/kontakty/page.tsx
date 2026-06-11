import type { Metadata } from "next";
import Link from "next/link";
import { LeadForm } from "@/components/forms/lead-form";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/utils";
import { MapPin, MessageCircle, Send } from "lucide-react";

export const metadata: Metadata = {
  title: "Контакты: офис Москва, курьер по России",
  description:
    "Связаться с ThaiPass: офис в Москве, курьерская доставка по России, WhatsApp, Telegram-канал. Заявка на разбор визового кейса.",
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
          Офис в {siteConfig.officeCity} и доставка курьером
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-[var(--color-muted)]">
          Принимаем документы в Москве или организуем курьера по всей России.
          Телефонная линия появится позже: пока связь через форму, WhatsApp и
          Telegram.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-[var(--color-border)] bg-white p-6">
            <MapPin className="text-[var(--color-teal)]" size={24} />
            <h2 className="mt-4 font-semibold">Офис</h2>
            <p className="mt-2 text-sm text-[var(--color-muted)]">
              {siteConfig.officeAddress ||
                "Адрес будет опубликован при открытии. Запись на приём: через заявку."}
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
                Напишите напрямую по вопросам виз
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
              <h2 className="mt-4 font-semibold">Telegram-канал</h2>
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                Новости, прайс и изменения правил: {siteConfig.telegramChannelName}
              </p>
            </a>
          )}
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold">Оставить заявку</h2>
            <p className="mt-2 text-[var(--color-muted)]">
              Основной способ связи. Перезвоним в мессенджер и разберём кейс.
            </p>
          </div>
          <LeadForm />
        </div>

        <p className="mt-12 text-sm text-[var(--color-muted)]">
          <Link href="/" className="text-[var(--color-teal)] underline">
            ← На главную
          </Link>
        </p>
      </div>
    </div>
  );
}
