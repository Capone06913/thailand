import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description:
    "Политика обработки персональных данных ThaiPass: цели, права субъекта, cookie, 152-ФЗ и требования Роскомнадзора.",
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 md:px-6">
      <p className="mb-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm text-[var(--color-muted)]">
        Черновик до финальной регистрации в реестре РКН. Структура соответствует
        152-ФЗ и{" "}
        <a
          href="https://rkn.gov.ru/docs/Polozhenie_ob_obrabotke_PD_24052023.pdf"
          className="text-[var(--color-teal)] underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Положению Роскомнадзора об обработке ПД
        </a>{" "}
        (24.05.2023).
      </p>

      <h1 className="font-serif text-3xl font-semibold md:text-4xl">
        Политика конфиденциальности
      </h1>
      <p className="mt-2 text-sm text-[var(--color-muted)]">
        Актуально на 11 июня 2026 · {siteConfig.name}
      </p>

      <div className="prose-thaipass mt-6 space-y-8 text-[var(--color-muted)]">
        <section className="space-y-3">
          <h2 className="font-serif text-xl font-semibold text-[var(--color-sapphire)]">
            1. Оператор и общие положения
          </h2>
          <p>
            Настоящая политика определяет порядок обработки и защиты персональных
            данных пользователей сайта {siteConfig.url} (далее: Сайт),
            оператором которого выступает {siteConfig.name}.
          </p>
          <p>
            Обработка персональных данных осуществляется в соответствии с
            Федеральным законом № 152-ФЗ «О персональных данных» и
            рекомендациями Роскомнадзора.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-semibold text-[var(--color-sapphire)]">
            2. Какие данные мы обрабатываем
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Имя и контакт (Telegram, WhatsApp, e-mail при указании)</li>
            <li>Информация о типе визы, сроках и комментарии к заявке</li>
            <li>Технические данные: IP, cookie, данные браузера и устройства</li>
            <li>
              Обезличенная статистика посещений (при согласии на аналитические
              cookie)
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-semibold text-[var(--color-sapphire)]">
            3. Цели обработки
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Обработка заявок и обратная связь по услугам</li>
            <li>Заключение и исполнение договоров на сопровождение виз</li>
            <li>Улучшение Сайта и анализ посещаемости (после согласия)</li>
            <li>Соблюдение требований законодательства РФ</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-semibold text-[var(--color-sapphire)]">
            4. Правовые основания
          </h2>
          <p>
            Обработка осуществляется на основании согласия субъекта персональных
            данных (ст. 6 и 9 152-ФЗ), необходимости исполнения договора, а также
            законных интересов оператора при соблюдении прав субъекта.
          </p>
          <p>
            Согласие запрашивается через cookie-баннер с обязательным чекбоксом
            перед использованием аналитических cookie.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-semibold text-[var(--color-sapphire)]">
            5. Cookie и аналитика
          </h2>
          <p>
            Подробное описание cookie: в{" "}
            <Link href="/cookies" className="text-[var(--color-teal)] underline">
              политике cookie
            </Link>
            . Аналитические скрипты (Яндекс.Метрика, Google Analytics при
            подключении) загружаются только после вашего согласия.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-semibold text-[var(--color-sapphire)]">
            6. Передача третьим лицам
          </h2>
          <p>
            Данные не передаются третьим лицам, за исключением случаев,
            предусмотренных законом, или когда это необходимо для оказания
            услуги (хостинг, мессенджеры для связи) при соблюдении
            конфиденциальности.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-semibold text-[var(--color-sapphire)]">
            7. Срок хранения и защита
          </h2>
          <p>
            Данные хранятся не дольше, чем это необходимо для целей обработки или
            в сроки, установленные законом. Оператор применяет организационные и
            технические меры защиты от неправомерного доступа.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-semibold text-[var(--color-sapphire)]">
            8. Ваши права
          </h2>
          <p>Вы вправе:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>получить информацию об обработке ваших данных;</li>
            <li>требовать уточнения, блокирования или удаления данных;</li>
            <li>отозвать согласие (без обратной силы для уже законной обработки);</li>
            <li>обжаловать действия оператора в Роскомнадзор или суд.</li>
          </ul>
          <p>
            Запросы направляйте через{" "}
            <Link href="/kontakty" className="text-[var(--color-teal)] underline">
              контакты
            </Link>{" "}
            или Telegram-канал {siteConfig.name}.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-semibold text-[var(--color-sapphire)]">
            9. YMYL-дисклеймер
          </h2>
          <p>
            {siteConfig.name} не является консульством или государственным органом.
            Официальные источники:{" "}
            <a
              href="https://www.thaievisa.go.th"
              className="text-[var(--color-teal)] underline"
            >
              thaievisa.go.th
            </a>
            ,{" "}
            <a
              href="https://moscow.thaiembassy.org"
              className="text-[var(--color-teal)] underline"
            >
              посольство в Москве
            </a>
            .
          </p>
          <p>
            Суммы на Сайте носят справочный характер и не являются публичной
            офертой до согласования с клиентом. См.{" "}
            <Link href="/oferta" className="text-[var(--color-teal)] underline">
              условия оказания услуг
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
