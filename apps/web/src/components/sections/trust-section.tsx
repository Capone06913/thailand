"use client";

import {
  InteractiveMarquee,
  type MarqueeItem,
} from "@/components/motion/interactive-marquee";
import { services } from "@/lib/services";

const seoMarqueeItems: MarqueeItem[] = [
  ...services.map((service) => ({
    label: service.primaryKeyword,
    href: `/uslugi/${service.slug}`,
  })),
  { label: "виза в тайланд для россиян", href: "/#zayavka" },
  { label: "оформление визы таиланд под ключ", href: "/#uslugi" },
  { label: "туристическая виза таиланд", href: "/uslugi/turisticheskaya-60-30" },
  { label: "пенсионная виза таиланд 50+", href: "/uslugi/pensionnaya-50" },
  { label: "срочная туристическая виза", href: "/uslugi/turisticheskaya-srochnaya" },
  { label: "разбор кейса бесплатно", href: "/#zayavka" },
  { label: "курьер по россии", href: "/#dostavka" },
  { label: "офис москва", href: "/#dostavka" },
];

export function TrustSection() {
  return (
    <section className="bg-white" aria-label="Услуги и направления ThaiPass">
      <InteractiveMarquee items={seoMarqueeItems} speed={0.5} />
    </section>
  );
}
