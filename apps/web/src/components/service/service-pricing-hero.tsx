import { Clock, ShieldCheck } from "lucide-react";
import type { Service } from "@/lib/services";
import { formatPrice } from "@/lib/services";

interface ServicePricingHeroProps {
  service: Service;
}

export function ServicePricingHero({ service }: ServicePricingHeroProps) {
  const { pricing } = service;

  return (
    <section className="overflow-hidden rounded-[1.75rem] border border-[var(--color-border)] bg-white shadow-[0_16px_48px_rgba(20,42,69,0.06)]">
      <div className="grid md:grid-cols-[1fr_auto] md:divide-x md:divide-[var(--color-border)]">
        <div className="border-b border-[var(--color-border)] px-7 py-7 md:border-b-0 md:px-9 md:py-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-gold)]">
            Стоимость и сроки
          </p>
          <p className="mt-4 font-display text-3xl font-extrabold text-[var(--color-sapphire)] md:text-4xl">
            {formatPrice(pricing.amountRub)}
          </p>
          <p className="mt-2 text-sm font-semibold text-[var(--color-muted)]">
            {pricing.consularFeeIncluded
              ? "Консульский сбор включён в расчёт услуги"
              : "Консульский сбор оплачивается отдельно"}
          </p>
          {pricing.guarantee ? (
            <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-[var(--color-gold)]/12 px-4 py-2 text-sm font-bold text-[var(--color-sapphire)]">
              <ShieldCheck size={16} className="text-[var(--color-gold)]" />
              {pricing.guarantee}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col justify-center px-7 py-7 md:min-w-[14rem] md:px-9 md:py-8">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-teal)]/10 text-[var(--color-teal)]">
              <Clock size={20} />
            </span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-muted)]">
                Срок оформления
              </p>
              <p className="font-display text-lg font-bold text-[var(--color-sapphire)]">
                {pricing.processingDays}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
