import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getService, services } from "@/lib/services";
import { LeadForm } from "@/components/forms/lead-form";
import { JsonLd } from "@/components/seo/json-ld";
import { ServiceAboutPanel } from "@/components/service/service-about-panel";
import { ServiceConversionHero } from "@/components/service/service-conversion-hero";
import { ServiceVisaDetails } from "@/components/service/service-visa-details";
import { ServiceLeadShell } from "@/components/service/service-lead-shell";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    offers: {
      "@type": "Offer",
      description: "Индивидуальный расчёт стоимости после разбора кейса",
      availability: "https://schema.org/InStock",
    },
    provider: { "@type": "Organization", name: siteConfig.name },
    areaServed: "Russia",
    url: `${siteConfig.url}/uslugi/${service.slug}`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Главная",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: service.name,
        item: `${siteConfig.url}/uslugi/${service.slug}`,
      },
    ],
  };

  return (
    <article className="bg-[var(--color-bg)] px-4 py-16 md:px-6 md:py-24">
      <JsonLd data={[serviceSchema, breadcrumbSchema]} />
      <div className="mx-auto max-w-6xl">
        <nav className="mb-6 text-sm text-[var(--color-muted)]">
          <Link href="/" className="hover:text-[var(--color-teal)]">
            Главная
          </Link>
          <span className="mx-2">/</span>
          <span>{service.shortName}</span>
        </nav>

        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-[var(--color-gold)]">
              {service.primaryKeyword}
            </p>
            <h1 className="mt-2 font-serif text-4xl font-semibold text-[var(--color-sapphire)] md:text-5xl">
              {service.h1}
            </h1>
            <p className="mt-4 text-lg font-medium text-[var(--color-muted)]">
              {service.tagline}
            </p>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)]">
              {service.description} Для граждан России, офис в{" "}
              {siteConfig.officeCity}, документы принимаем по всей РФ.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
            <Image
              src={service.image}
              alt={`${service.name}: получить визу в Таиланд, сопровождение ThaiPass`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_22rem] lg:items-start xl:grid-cols-[1fr_24rem] xl:gap-14">
          <div className="min-w-0 space-y-10">
            <ServiceAboutPanel service={service} />
            {service.visaInfo ? (
              <ServiceVisaDetails visaInfo={service.visaInfo} />
            ) : null}
            <ServiceConversionHero service={service} />
          </div>

          <div id="zayavka">
            <ServiceLeadShell>
              <LeadForm
                defaultService={service.slug}
                variant="service"
                serviceName={service.name}
              />
            </ServiceLeadShell>
          </div>
        </div>
      </div>
    </article>
  );
}
