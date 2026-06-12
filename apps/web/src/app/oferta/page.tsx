import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Условия оказания услуг",
  description:
    "Условия оказания услуг ThaiPass по сопровождению оформления виз в Таиланд для граждан России.",
};

export default function OfertaPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 md:px-6">
      <p className="mb-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm text-[var(--color-muted)]">
        Черновик. После регистрации в реестре РКН и уточнения реквизитов текст
        будет заменён на финальную юридическую версию.
      </p>

      <h1 className="font-serif text-3xl font-semibold md:text-4xl">
        Условия оказания услуг
      </h1>

      <div className="prose-thaipass mt-4 space-y-6 text-[var(--color-muted)]">
        <p>
          Настоящий документ описывает общие условия, на которых {siteConfig.name}{" "}
          оказывает консультационные и сопровождающие услуги по подготовке и
          подаче документов для виз в Королевство Таиланд гражданам Российской
          Федерации.
        </p>

        <h2 className="font-serif text-xl font-semibold text-[var(--color-sapphire)]">
          1. Статус ThaiPass
        </h2>
        <p>
          {siteConfig.name} не является консульством, посольством или
          государственным органом Таиланда или России. Решение о выдаче или
          отказе в визе принимает только уполномоченный орган. Официальная
          подача заявок: через{" "}
          <a
            href="https://www.thaievisa.go.th"
            className="text-[var(--color-teal)] underline"
          >
            thaievisa.go.th
          </a>
          .
        </p>

        <h2 className="font-serif text-xl font-semibold text-[var(--color-sapphire)]">
          2. Услуги и стоимость
        </h2>
        <p>
          Перечень услуг и ориентировочные цены указаны на страницах раздела
          «Услуги». Суммы на сайте носят справочный характер и не являются
          публичной офертой в смысле ст. 437 ГК РФ до момента согласования
          итоговой сметы с клиентом.
        </p>

        <h2 className="font-serif text-xl font-semibold text-[var(--color-sapphire)]">
          3. Порядок работы
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Клиент оставляет заявку на сайте или связывается через мессенджер.</li>
          <li>Мы уточняем тип визы, сроки и состав документов.</li>
          <li>После согласования условий и оплаты начинается сопровождение кейса.</li>
          <li>Консульский сбор и госпошлины оплачиваются отдельно, если не указано иное.</li>
        </ul>

        <h2 className="font-serif text-xl font-semibold text-[var(--color-sapphire)]">
          4. География
        </h2>
        <p>
          Офис приёма документов: {siteConfig.officeCity}
          {siteConfig.officeAddress
            ? `, ${siteConfig.officeAddress}`
            : ""}
          . Доступна курьерская доставка документов по России, если это указано в
          выбранном пакете услуг.
        </p>

        <h2 className="font-serif text-xl font-semibold text-[var(--color-sapphire)]">
          5. Реквизиты
        </h2>
        <p>
          Реквизиты исполнителя будут опубликованы после завершения регистрации
          в реестре РКН. До публикации итоговые условия и реквизиты
          согласовываются в переписке с клиентом.
        </p>

        <h2 className="font-serif text-xl font-semibold text-[var(--color-sapphire)]">
          6. Персональные данные
        </h2>
        <p>
          Обработка персональных данных описана в{" "}
          <Link href="/privacy" className="text-[var(--color-teal)] underline">
            политике конфиденциальности
          </Link>
          . Использование cookie: в{" "}
          <Link href="/cookies" className="text-[var(--color-teal)] underline">
            политике cookie
          </Link>
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
