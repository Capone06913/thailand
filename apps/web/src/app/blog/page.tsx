import type { Metadata } from "next";
import Link from "next/link";
import { getBlogPosts } from "@/lib/wordpress";
import { siteConfig } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Блог — гайды по визам в Таиланд",
  description:
    "Статьи ThaiPass: DTV виза 2026, TDAC, безвиз, туристическая TR и пенсионная виза для россиян.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-serif text-4xl font-semibold">Блог ThaiPass</h1>
        <p className="mt-3 text-[var(--color-muted)]">
          Гайды по визам в Таиланд для россиян: DTV, туристическая TR, пенсионная 50+.
        </p>

        <div className="mt-12 space-y-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="rounded-2xl border border-[var(--color-border)] bg-white p-6 transition-shadow hover:shadow-lg"
            >
              <p className="text-xs uppercase tracking-wider text-[var(--color-gold)]">
                {post.category} · {post.date}
              </p>
              <h2 className="mt-2 text-xl font-semibold">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-[var(--color-teal)]"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                {post.excerpt}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-4 inline-block text-sm font-medium text-[var(--color-teal)]"
              >
                Читать →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
