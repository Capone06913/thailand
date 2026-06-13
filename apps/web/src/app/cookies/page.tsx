import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/utils";

export const metadata: Metadata = {
  title: "РџРѕР»РёС‚РёРєР° cookie",
  description:
    "РџРѕР»РёС‚РёРєР° РёСЃРїРѕР»СЊР·РѕРІР°РЅРёСЏ cookie РЅР° СЃР°Р№С‚Рµ ThaiPass: С‚РёРїС‹, С†РµР»Рё, СЃРѕРіР»Р°СЃРёРµ Рё РѕС‚РєР»СЋС‡РµРЅРёРµ.",
};

export default function CookiesPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 md:px-6">
      <p className="mb-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm text-[var(--color-muted)]">
        Р§РµСЂРЅРѕРІРёРє РґРѕ С„РёРЅР°Р»СЊРЅРѕР№ СЂРµРіРёСЃС‚СЂР°С†РёРё РІ СЂРµРµСЃС‚СЂРµ Р РљРќ. РЎРѕРіР»Р°СЃРѕРІР°РЅРёРµ СЃ 152-Р¤Р— Рё{" "}
        <a
          href="https://rkn.gov.ru/docs/Polozhenie_ob_obrabotke_PD_24052023.pdf"
          className="text-[var(--color-teal)] underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          РџРѕР»РѕР¶РµРЅРёРµРј Р РѕСЃРєРѕРјРЅР°РґР·РѕСЂР°
        </a>
        .
      </p>

      <h1 className="font-serif text-3xl font-semibold md:text-4xl">
        РџРѕР»РёС‚РёРєР° РёСЃРїРѕР»СЊР·РѕРІР°РЅРёСЏ cookie
      </h1>
      <p className="mt-2 text-sm text-[var(--color-muted)]">
        РђРєС‚СѓР°Р»СЊРЅРѕ РЅР° 11 РёСЋРЅСЏ 2026
      </p>

      <div className="prose-thaipass mt-6 space-y-8 text-[var(--color-muted)]">
        <section className="space-y-3">
          <h2 className="font-serif text-xl font-semibold text-[var(--color-sapphire)]">
            1. Р§С‚Рѕ С‚Р°РєРѕРµ cookie
          </h2>
          <p>
            Cookie: РЅРµР±РѕР»СЊС€РёРµ С„Р°Р№Р»С‹, РєРѕС‚РѕСЂС‹Рµ СЃР°Р№С‚ СЃРѕС…СЂР°РЅСЏРµС‚ РІ Р±СЂР°СѓР·РµСЂРµ. РћРЅРё
            РїРѕРјРѕРіР°СЋС‚ РЎР°Р№С‚Сѓ СЂР°Р±РѕС‚Р°С‚СЊ РєРѕСЂСЂРµРєС‚РЅРѕ Рё (РїСЂРё РІР°С€РµРј СЃРѕРіР»Р°СЃРёРё) СЃРѕР±РёСЂР°С‚СЊ
            РѕР±РµР·Р»РёС‡РµРЅРЅСѓСЋ СЃС‚Р°С‚РёСЃС‚РёРєСѓ.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-semibold text-[var(--color-sapphire)]">
            2. РљР°РєРёРµ cookie РјС‹ РёСЃРїРѕР»СЊР·СѓРµРј
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>РўРµС…РЅРёС‡РµСЃРєРёРµ (РѕР±СЏР·Р°С‚РµР»СЊРЅС‹Рµ)</strong>: СЃРµСЃСЃРёСЏ, СЂР°Р±РѕС‚Р°
              С„РѕСЂРјС‹, Р·Р°РїРѕРјРёРЅР°РЅРёРµ С„Р°РєС‚Р° СЃРѕРіР»Р°СЃРёСЏ РЅР° РѕР±СЂР°Р±РѕС‚РєСѓ РџР”.
            </li>
            <li>
              <strong>РђРЅР°Р»РёС‚РёС‡РµСЃРєРёРµ (РїРѕ СЃРѕРіР»Р°СЃРёСЋ)</strong>: РЇРЅРґРµРєСЃ.РњРµС‚СЂРёРєР°,
              Google Analytics (РµСЃР»Рё РїРѕРґРєР»СЋС‡РµРЅС‹). Р—Р°РіСЂСѓР¶Р°СЋС‚СЃСЏ С‚РѕР»СЊРєРѕ РїРѕСЃР»Рµ
              РїСЂРёРЅСЏС‚РёСЏ СѓСЃР»РѕРІРёР№ РІ cookie-Р±Р°РЅРЅРµСЂРµ.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-semibold text-[var(--color-sapphire)]">
            3. РЎРѕРіР»Р°СЃРёРµ
          </h2>
          <p>
            РџСЂРё РїРµСЂРІРѕРј РїРѕСЃРµС‰РµРЅРёРё РЎР°Р№С‚Р° РѕС‚РѕР±СЂР°Р¶Р°РµС‚СЃСЏ СѓРІРµРґРѕРјР»РµРЅРёРµ СЃ РѕР±СЏР·Р°С‚РµР»СЊРЅС‹Рј
            С‡РµРєР±РѕРєСЃРѕРј. РђРЅР°Р»РёС‚РёС‡РµСЃРєРёРµ cookie Рё СЃРІСЏР·Р°РЅРЅР°СЏ СЃ РЅРёРјРё РѕР±СЂР°Р±РѕС‚РєР° РґР°РЅРЅС‹С…
            РЅР°С‡РёРЅР°СЋС‚СЃСЏ С‚РѕР»СЊРєРѕ РїРѕСЃР»Рµ РЅР°Р¶Р°С‚РёСЏ В«РџСЂРёРЅСЏС‚СЊ Рё РїСЂРѕРґРѕР»Р¶РёС‚СЊВ».
          </p>
          <p>
            РћС‚РѕР·РІР°С‚СЊ СЃРѕРіР»Р°СЃРёРµ РјРѕР¶РЅРѕ, РѕС‡РёСЃС‚РёРІ cookie Р±СЂР°СѓР·РµСЂР° Рё localStorage, Р»РёР±Рѕ
            РЅР°РїСЂР°РІРёРІ Р·Р°РїСЂРѕСЃ С‡РµСЂРµР·{" "}
            <Link href="/kontakty" className="text-[var(--color-teal)] underline">
              РєРѕРЅС‚Р°РєС‚С‹
            </Link>
            .
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-semibold text-[var(--color-sapphire)]">
            4. РљР°Рє РѕС‚РєР»СЋС‡РёС‚СЊ cookie
          </h2>
          <p>
            Р’С‹ РјРѕР¶РµС‚Рµ РѕРіСЂР°РЅРёС‡РёС‚СЊ cookie РІ РЅР°СЃС‚СЂРѕР№РєР°С… Р±СЂР°СѓР·РµСЂР°. РџСЂРё РїРѕР»РЅРѕРј
            РѕС‚РєР»СЋС‡РµРЅРёРё С‡Р°СЃС‚СЊ С„СѓРЅРєС†РёР№ РЎР°Р№С‚Р° РјРѕР¶РµС‚ СЂР°Р±РѕС‚Р°С‚СЊ РЅРµРєРѕСЂСЂРµРєС‚РЅРѕ.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-semibold text-[var(--color-sapphire)]">
            5. РЎРІСЏР·Р°РЅРЅС‹Рµ РґРѕРєСѓРјРµРЅС‚С‹
          </h2>
          <p>
            РћР±СЂР°Р±РѕС‚РєР° РїРµСЂСЃРѕРЅР°Р»СЊРЅС‹С… РґР°РЅРЅС‹С… РѕРїРёСЃР°РЅР° РІ{" "}
            <Link href="/privacy" className="text-[var(--color-teal)] underline">
              РїРѕР»РёС‚РёРєРµ РєРѕРЅС„РёРґРµРЅС†РёР°Р»СЊРЅРѕСЃС‚Рё
            </Link>
            . РЈСЃР»РѕРІРёСЏ СѓСЃР»СѓРі: РІ{" "}
            <Link href="/oferta" className="text-[var(--color-teal)] underline">
              СЂР°Р·РґРµР»Рµ В«РЈСЃР»РѕРІРёСЏВ»
            </Link>
            .
          </p>
        </section>
      </div>

      <Link
        href="/"
        className="mt-10 inline-block text-sm text-[var(--color-teal)] underline"
      >
        в†ђ РќР° РіР»Р°РІРЅСѓСЋ
      </Link>
    </article>
  );
}

