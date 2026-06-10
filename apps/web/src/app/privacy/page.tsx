import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description:
    "Политика обработки персональных данных ThaiPass при оформлении заявок на визы в Таиланд.",
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 md:px-6">
      <h1 className="font-serif text-3xl font-semibold md:text-4xl">
        Политика конфиденциальности
      </h1>
      <div className="prose-thaipass mt-4 space-y-6 text-[var(--color-muted)]">
        <p>
          {siteConfig.name} обрабатывает персональные данные, которые вы
          указываете в форме заявки на сайте: имя, контакт в Telegram или
          WhatsApp, тип визы, сроки и комментарий.
        </p>
        <p>
          Цель обработки — связаться с вами по заявке, уточнить детали кейса и
          предложить подходящий пакет услуг. Данные не передаются третьим лицам,
          кроме случаев, предусмотренных законодательством РФ.
        </p>
        <p>
          Вы можете запросить удаление данных, написав в{" "}
          {siteConfig.telegramChannelUrl ? (
            <a
              href={siteConfig.telegramChannelUrl}
              className="text-[var(--color-teal)] underline"
            >
              Telegram-канал
            </a>
          ) : (
            "Telegram-канал ThaiPass"
          )}{" "}
          или через форму на{" "}
          <Link href="/kontakty" className="text-[var(--color-teal)] underline">
            странице контактов
          </Link>
          .
        </p>
        <p>
          Суммы, указанные на сайте, носят справочный характер и не являются
          публичной офертой в смысле ст. 437 ГК РФ. Итоговая стоимость услуг
          фиксируется после разбора документов и согласовывается с вами до
          начала работы.
        </p>
        <p>
          {siteConfig.name} не является консульством Таиланда или государственным
          органом. Официальные источники:{" "}
          <a
            href="https://www.thaievisa.go.th"
            className="text-[var(--color-teal)] underline"
          >
            thaievisa.go.th
          </a>
          .
        </p>
      </div>

      <Link
        href="/"
        className="mt-10 inline-block text-sm text-[var(--color-teal)] underline"
      >
        ← На главную
      </Link>
    </article>
  );
}
