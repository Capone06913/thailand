import { Check, Clock, FileText, Info, Users } from "lucide-react";
import type { Service, ServiceVisaInfo } from "@/lib/services";

interface ServiceDetailsPanelProps {
  service: Service;
  visaInfo?: ServiceVisaInfo;
}

function PanelFooter({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-auto border-t border-[var(--color-border)]/70 pt-4">
      {children}
    </div>
  );
}

export function ServiceDetailsPanel({
  service,
  visaInfo,
}: ServiceDetailsPanelProps) {
  const { pricing } = service;

  return (
    <section className="overflow-hidden rounded-[1.75rem] border border-[var(--color-border)] bg-white shadow-[0_16px_48px_rgba(20,42,69,0.06)]">
      <div className="border-b border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-5 md:px-6 md:py-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-gold)]">
          Об услуге
        </p>
        <p className="mt-3 text-base font-medium leading-relaxed text-[var(--color-muted)] md:text-[17px]">
          {service.description}
        </p>
      </div>

      <div className="grid md:grid-cols-2 md:items-stretch">
        <div className="flex flex-col border-b border-[var(--color-border)] p-5 md:border-b-0 md:border-r md:p-6">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-teal)]/10 text-[var(--color-teal)]">
              <Check size={16} strokeWidth={2.5} />
            </span>
            <h2 className="font-serif text-lg font-semibold text-[var(--color-sapphire)]">
              Что входит
            </h2>
          </div>
          <ul className="mt-4 space-y-2.5">
            {service.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-3 text-sm font-medium leading-relaxed text-[var(--color-muted)]"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-teal)]" />
                {feature}
              </li>
            ))}
          </ul>
          <PanelFooter>
            <p className="flex items-center gap-2 text-xs font-semibold text-[var(--color-sapphire)]">
              <Clock size={14} className="text-[var(--color-teal)]" />
              {service.timeline}
            </p>
          </PanelFooter>
        </div>

        <div className="flex flex-col border-b border-[var(--color-border)] p-5 md:p-6">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-gold)]/15 text-[var(--color-gold)]">
              <Users size={16} strokeWidth={2.5} />
            </span>
            <h2 className="font-serif text-lg font-semibold text-[var(--color-sapphire)]">
              Кому подходит
            </h2>
          </div>
          <ul className="mt-4 space-y-2.5">
            {service.idealFor.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm font-medium leading-relaxed text-[var(--color-muted)]"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-gold)]" />
                {item}
              </li>
            ))}
          </ul>
          <PanelFooter>
            <p className="text-xs font-medium leading-relaxed text-[var(--color-muted)]">
              {service.tagline}
            </p>
          </PanelFooter>
        </div>
      </div>

      {visaInfo ? (
        <div className="border-t border-[var(--color-border)] p-5 md:p-6">
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 md:p-5">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-sapphire)]/8 text-[var(--color-sapphire)]">
                <Info size={16} />
              </span>
              <h2 className="font-serif text-lg font-semibold text-[var(--color-sapphire)]">
                Важная информация
              </h2>
            </div>
            <p className="mt-3 text-sm font-medium leading-relaxed text-[var(--color-muted)] md:text-[15px]">
              {visaInfo.important}
            </p>
          </div>

          <div className="mt-5">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-teal)]/10 text-[var(--color-teal)]">
                <FileText size={16} />
              </span>
              <h2 className="font-serif text-lg font-semibold text-[var(--color-sapphire)]">
                Документы для оформления
              </h2>
            </div>
            <ul className="mt-4 space-y-2.5">
              {visaInfo.documents.map((doc) => (
                <li
                  key={doc}
                  className="flex gap-3 text-sm font-medium leading-relaxed text-[var(--color-muted)]"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-teal)]" />
                  {doc}
                </li>
              ))}
            </ul>
            {visaInfo.childrenExtra ? (
              <div className="mt-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]/60 p-4">
                <p className="font-display text-xs font-bold uppercase tracking-wide text-[var(--color-sapphire)]">
                  Дети
                </p>
                <p className="mt-2 text-sm font-medium leading-relaxed text-[var(--color-muted)]">
                  {visaInfo.childrenExtra}
                </p>
              </div>
            ) : null}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-[var(--color-border)] pt-4 text-xs font-medium text-[var(--color-muted)]">
            <span className="inline-flex items-center gap-2 font-semibold text-[var(--color-sapphire)]">
              <Clock size={14} className="text-[var(--color-teal)]" />
              Срок: {pricing.processingDays}
            </span>
            <span>
              {pricing.consularFeeIncluded
                ? "Консульский сбор включён"
                : "Консульский сбор оплачивается отдельно"}
            </span>
          </div>
        </div>
      ) : null}
    </section>
  );
}
