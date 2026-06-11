import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Политика cookie",
  description:
    "Политика использования cookie на сайте ThaiPass: типы, цели, согласие и отключение.",
};

export default function CookiesPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 md:px-6">
      <p className="mb-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm text-[var(--color-muted)]">
        Черновик до финальной регистрации в реестре РКН. Согласование с 152-ФЗ и{" "}
        <a
          href="https://rkn.gov.ru/docs/Polozhenie_ob_obrabotke_PD_24052023.pdf"
          className="text-[var(--color-teal)] underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Положением Роскомнадзора
        </a>
        .
      </p>

      <h1 className="font-serif text-3xl font-semibold md:text-4xl">
        Политика использования cookie
      </h1>
      <p className="mt-2 text-sm text-[var(--color-muted)]">
        Актуально на 11 июня 2026
      </p>

      <div className="prose-thaipass mt-6 space-y-8 text-[var(--color-muted)]">
        <section className="space-y-3">
          <h2 className="font-serif text-xl font-semibold text-[var(--color-sapphire)]">
            1. Что такое cookie
          </h2>
          <p>
            Cookie: небольшие файлы, которые сайт сохраняет в браузере. Они
            помогают Сайту работать корректно и (при вашем согласии) собирать
            обезличенную статистику.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-semibold text-[var(--color-sapphire)]">
            2. Какие cookie мы используем
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Технические (обязательные)</strong>: сессия, работа
              формы, запоминание факта согласия на обработку ПД.
            </li>
            <li>
              <strong>Аналитические (по согласию)</strong>: Яндекс.Метрика,
              Google Analytics (если подключены). Загружаются только после
              принятия условий в cookie-баннере.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-semibold text-[var(--color-sapphire)]">
            3. Согласие
          </h2>
          <p>
            При первом посещении Сайта отображается уведомление с обязательным
            чекбоксом. Аналитические cookie и связанная с ними обработка данных
            начинаются только после нажатия «Принять и продолжить».
          </p>
          <p>
            Отозвать согласие можно, очистив cookie браузера и localStorage, либо
            направив запрос через{" "}
            <Link href="/kontakty" className="text-[var(--color-teal)] underline">
              контакты
            </Link>
            .
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-semibold text-[var(--color-sapphire)]">
            4. Как отключить cookie
          </h2>
          <p>
            Вы можете ограничить cookie в настройках браузера. При полном
            отключении часть функций Сайта может работать некорректно.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-semibold text-[var(--color-sapphire)]">
            5. Связанные документы
          </h2>
          <p>
            Обработка персональных данных описана в{" "}
            <Link href="/privacy" className="text-[var(--color-teal)] underline">
              политике конфиденциальности
            </Link>
            . Условия услуг: в{" "}
            <Link href="/oferta" className="text-[var(--color-teal)] underline">
              разделе «Условия»
            </Link>
            .
          </p>
        </section>
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
