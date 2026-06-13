import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getBlogPosts } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "Р‘Р»РѕРі: РіР°Р№РґС‹ РїРѕ РІРёР·Р°Рј РІ РўР°РёР»Р°РЅРґ",
  description:
    "РЎС‚Р°С‚СЊРё ThaiPass: DTV, TDAC, Р±РµР·РІРёР·, С‚СѓСЂРёСЃС‚РёС‡РµСЃРєР°СЏ TR Рё РїРµРЅСЃРёРѕРЅРЅР°СЏ РІРёР·Р° РґР»СЏ СЂРѕСЃСЃРёСЏРЅ.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">
          Р‘Р»РѕРі
        </p>
        <h1 className="mt-3 font-serif text-4xl font-semibold md:text-5xl">
          Р“Р°Р№РґС‹ РїРѕ РІРёР·Р°Рј РІ РўР°РёР»Р°РЅРґ
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-[var(--color-muted)]">
          Р Р°Р·Р±РѕСЂ СЃС‚СЂР°С…РѕРІ Рё С‚РёРїРёС‡РЅС‹С… РѕС€РёР±РѕРє: DTV, TDAC, Р±РµР·РІРёР·, С‚СѓСЂРёСЃС‚РёС‡РµСЃРєР°СЏ TR
          Рё РїРµРЅСЃРёРѕРЅРЅР°СЏ РІРёР·Р° РґР»СЏ СЂРѕСЃСЃРёСЏРЅ.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-teal)]/30 hover:shadow-lg"
            >
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="relative aspect-[16/10] overflow-hidden bg-[var(--color-surface)]">
                  {post.coverImage ? (
                    <Image
                      src={post.coverImage}
                      alt={post.coverAlt ?? post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-[var(--color-teal)]/10 to-[var(--color-gold)]/10 text-sm text-[var(--color-muted)]">
                      {post.category}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-[var(--color-teal)] backdrop-blur-sm">
                    {post.category}
                  </span>
                </div>
              </Link>

              <div className="flex flex-1 flex-col p-5 md:p-6">
                <time
                  dateTime={post.date}
                  className="text-xs text-[var(--color-muted)]"
                >
                  {new Date(post.date).toLocaleDateString("ru-RU", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
                <h2 className="mt-2 font-serif text-xl font-semibold leading-snug text-foreground">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="transition-colors group-hover:text-[var(--color-teal)]"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-[var(--color-muted)]">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-5 inline-flex items-center text-sm font-medium text-[var(--color-teal)]"
                >
                  Р§РёС‚Р°С‚СЊ СЃС‚Р°С‚СЊСЋ
                  <span className="ml-1 transition-transform group-hover:translate-x-0.5">
                    в†’
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

