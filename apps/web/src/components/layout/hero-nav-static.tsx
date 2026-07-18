import Link from "next/link";
import { ChevronDown, Menu } from "lucide-react";
import { BrandLogo } from "@/components/brand/brand-logo";
import { services } from "@/lib/services";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/#boli", label: "С чем помогаем" },
  { href: "/blog", label: "Блог" },
  { href: "/kontakty", label: "Контакты" },
];

export function HeroNavStatic() {
  const linkClass =
    "rounded-lg px-3 py-2 text-sm font-semibold text-[var(--color-sapphire)]/80 transition-colors hover:bg-[var(--color-sapphire)]/5 hover:text-[var(--color-sapphire)]";

  return (
    <header className="absolute inset-x-0 top-0 z-30 px-4 pt-4 md:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-2xl border border-white/60 bg-white/70 px-4 py-3 shadow-xl shadow-[var(--color-sapphire)]/10 backdrop-blur-xl md:px-6">
        <BrandLogo size="md" variant="color" showTagline={false} />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Основное меню">
          <details className="relative group">
            <summary
              className={cn(
                linkClass,
                "flex cursor-pointer list-none items-center gap-1 [&::-webkit-details-marker]:hidden",
              )}
            >
              Услуги
              <ChevronDown size={16} className="opacity-70" aria-hidden />
            </summary>
            <div className="absolute left-0 top-full z-40 mt-2 min-w-[16rem] rounded-xl border border-[var(--color-border)] bg-white p-2 shadow-xl">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/uslugi/${service.slug}`}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-[var(--color-sapphire)] hover:bg-[var(--color-bg)]"
                >
                  {service.shortName}
                </Link>
              ))}
            </div>
          </details>
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className={linkClass}>
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/#zayavka"
          className={cn(
            buttonVariants({ size: "sm" }),
            "hidden bg-[var(--color-teal)] text-white hover:bg-[var(--color-teal-light)] md:inline-flex",
          )}
        >
          Заявка
        </Link>

        <Link
          href="/#zayavka"
          className="inline-flex items-center justify-center rounded-lg p-2 text-[var(--color-sapphire)] md:hidden"
          aria-label="Заявка"
        >
          <Menu size={22} aria-hidden />
        </Link>
      </div>
    </header>
  );
}
