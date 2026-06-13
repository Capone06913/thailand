import { Check, Users } from "lucide-react";
import type { Service } from "@/lib/services";

interface ServiceAboutPanelProps {
  service: Service;
}

export function ServiceAboutPanel({ service }: ServiceAboutPanelProps) {
  return (
    <section className="overflow-hidden rounded-[1.75rem] border border-[var(--color-border)] bg-white shadow-[0_16px_48px_rgba(20,42,69,0.06)]">
      <div className="border-b border-[var(--color-border)] bg-[var(--color-surface)] px-7 py-6 md:px-9 md:py-7">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-gold)]">
          РћР± СѓСЃР»СѓРіРµ
        </p>
        <p className="mt-3 text-base font-medium leading-relaxed text-[var(--color-muted)] md:text-[17px]">
          {service.description}
        </p>
      </div>

      <div className="grid gap-0 md:grid-cols-2 md:divide-x md:divide-[var(--color-border)]">
        <div className="border-b border-[var(--color-border)] p-7 md:border-b-0 md:p-9">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-teal)]/10 text-[var(--color-teal)]">
              <Check size={16} strokeWidth={2.5} />
            </span>
            <h2 className="font-serif text-lg font-semibold text-[var(--color-sapphire)]">
              Р§С‚Рѕ РІС…РѕРґРёС‚
            </h2>
          </div>
          <ul className="mt-5 space-y-3">
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
        </div>

        <div className="p-7 md:p-9">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-gold)]/15 text-[var(--color-gold)]">
              <Users size={16} strokeWidth={2.5} />
            </span>
            <h2 className="font-serif text-lg font-semibold text-[var(--color-sapphire)]">
              РљРѕРјСѓ РїРѕРґС…РѕРґРёС‚
            </h2>
          </div>
          <ul className="mt-5 space-y-3">
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
        </div>
      </div>
    </section>
  );
}

