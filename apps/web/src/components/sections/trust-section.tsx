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
  { label: "РІРёР·Р° РІ С‚Р°Р№Р»Р°РЅРґ РґР»СЏ СЂРѕСЃСЃРёСЏРЅ", href: "/#zayavka" },
  { label: "РѕС„РѕСЂРјР»РµРЅРёРµ РІРёР·С‹ С‚Р°РёР»Р°РЅРґ РїРѕРґ РєР»СЋС‡", href: "/#uslugi" },
  { label: "С‚СѓСЂРёСЃС‚РёС‡РµСЃРєР°СЏ РІРёР·Р° С‚Р°РёР»Р°РЅРґ", href: "/uslugi/turisticheskaya-60-30" },
  { label: "РїРµРЅСЃРёРѕРЅРЅР°СЏ РІРёР·Р° С‚Р°РёР»Р°РЅРґ 50+", href: "/uslugi/pensionnaya-50" },
  { label: "СЃСЂРѕС‡РЅР°СЏ С‚СѓСЂРёСЃС‚РёС‡РµСЃРєР°СЏ РІРёР·Р°", href: "/uslugi/turisticheskaya-srochnaya" },
  { label: "СЂР°Р·Р±РѕСЂ РєРµР№СЃР° Р±РµСЃРїР»Р°С‚РЅРѕ", href: "/#zayavka" },
  { label: "РєСѓСЂСЊРµСЂ РїРѕ СЂРѕСЃСЃРёРё", href: "/#dostavka" },
  { label: "РѕС„РёСЃ РјРѕСЃРєРІР°", href: "/#dostavka" },
];

export function TrustSection() {
  return (
    <section className="bg-white" aria-label="РЈСЃР»СѓРіРё Рё РЅР°РїСЂР°РІР»РµРЅРёСЏ ThaiPass">
      <InteractiveMarquee items={seoMarqueeItems} speed={0.5} />
    </section>
  );
}

