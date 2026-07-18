import { MessageCircle, ShieldCheck } from "lucide-react";
import type { Service } from "@/lib/services";
import { PremiumCta } from "@/components/ui/premium-cta";
import { buildTelegramServiceLink } from "@/lib/telegram-link";

interface ServiceConversionHeroProps {
  service: Service;
}

export function ServiceConversionHero({ service }: ServiceConversionHeroProps) {
  const { pricing } = service;
  const telegramHref = buildTelegramServiceLink(service);

  return (
    <section className="overflow-hidden rounded-[1.75rem] border border-[var(--color-border)] bg-white px-5 py-5 shadow-[0_16px_48px_rgba(20,42,69,0.06)] md:px-6 md:py-6">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-gold)]">
        Индивидуальный расчёт
      </p>
      <p className="mt-3 text-base font-semibold leading-relaxed text-[var(--color-sapphire)] md:text-lg">
        {service.conversionHook}
      </p>
      <p className="mt-2 text-sm font-medium leading-relaxed text-[var(--color-muted)]">
        Стоимость зависит от кейса: семья, срочность, доработка документов. В
        Telegram ответим за 15–30 минут в рабочие часы.
      </p>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <PremiumCta
          href={telegramHref}
          external
          className="bg-[var(--color-gold)] px-7 py-3.5 text-[var(--color-sapphire)] shadow-lg shadow-[var(--color-gold)]/25 hover:shadow-xl hover:shadow-[var(--color-gold)]/35"
        >
          <MessageCircle size={18} strokeWidth={2.25} aria-hidden />
          {service.telegramCtaLabel}
        </PremiumCta>
        <p className="text-xs font-medium text-[var(--color-muted)]">
          Ответ 15–30 мин · без обязательств
        </p>
      </div>

      {pricing.guarantee ? (
        <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-[var(--color-gold)]/12 px-4 py-2 text-sm font-bold text-[var(--color-sapphire)]">
          <ShieldCheck size={16} className="text-[var(--color-gold)]" />
          {pricing.guarantee}
        </p>
      ) : null}
    </section>
  );
}
