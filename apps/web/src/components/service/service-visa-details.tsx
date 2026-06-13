import { FileText, Info } from "lucide-react";
import type { ServiceVisaInfo } from "@/lib/services";

interface ServiceVisaDetailsProps {
  visaInfo: ServiceVisaInfo;
}

export function ServiceVisaDetails({ visaInfo }: ServiceVisaDetailsProps) {
  return (
    <section className="grid gap-6 md:grid-cols-2 md:items-stretch">
      <div className="flex h-full flex-col rounded-[1.5rem] border border-[var(--color-border)] bg-white p-6 shadow-sm md:p-8">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-sapphire)]/8 text-[var(--color-sapphire)]">
            <Info size={16} />
          </span>
          <h2 className="font-serif text-xl font-semibold text-[var(--color-sapphire)]">
            Р’Р°Р¶РЅР°СЏ РёРЅС„РѕСЂРјР°С†РёСЏ
          </h2>
        </div>
        <p className="mt-4 flex-1 text-sm font-medium leading-relaxed text-[var(--color-muted)] md:text-[15px]">
          {visaInfo.important}
        </p>
      </div>

      <div className="flex h-full flex-col rounded-[1.5rem] border border-[var(--color-border)] bg-white p-6 shadow-sm md:p-8">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-teal)]/10 text-[var(--color-teal)]">
            <FileText size={16} />
          </span>
          <h2 className="font-serif text-xl font-semibold text-[var(--color-sapphire)]">
            Р”РѕРєСѓРјРµРЅС‚С‹ РґР»СЏ РѕС„РѕСЂРјР»РµРЅРёСЏ
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
          <p className="mt-auto pt-6 text-sm font-medium leading-relaxed text-[var(--color-muted)]">
            <span className="mb-2 block font-display text-xs font-bold uppercase tracking-wide text-[var(--color-sapphire)]">
              Р”РµС‚Рё
            </span>
            {visaInfo.childrenExtra}
          </p>
        ) : null}
      </div>
    </section>
  );
}

