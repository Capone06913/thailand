import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPost, getBlogPosts } from "@/lib/wordpress";
import { LeadForm } from "@/components/forms/lead-form";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [{ url: post.coverImage, alt: post.coverAlt }] : undefined,
    },
  };
}

function renderContent(content: string) {
  const isHtml = content.trim().startsWith("<");
  if (isHtml) {
    return (
      <div
        className="prose-blog"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  return (
    <div className="prose-blog">
      {content.split("\n").map((line, i) => {
        if (line.startsWith("## ")) {
          return <h2 key={i}>{line.replace("## ", "")}</h2>;
        }
        if (line.startsWith("[") && line.includes("](")) {
          const match = line.match(/\[([^\]]+)\]\(([^)]+)\)/);
          if (match) {
            return (
              <p key={i}>
                <Link href={match[2]} className="text-[var(--color-teal)] underline">
                  {match[1]}
                </Link>
              </p>
            );
          }
        }
        if (line.trim() === "") return null;
        if (line.startsWith("**") && line.endsWith("**")) {
          return (
            <p key={i}>
              <strong>{line.replace(/\*\*/g, "")}</strong>
            </p>
          );
        }
        return <p key={i}>{line}</p>;
      })}
    </div>
  );
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([
    getBlogPost(slug),
    getBlogPosts(),
  ]);
  if (!post) notFound();

  return (
    <div className="px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <nav className="mb-6 text-sm text-[var(--color-muted)]">
          <Link href="/blog" className="hover:text-[var(--color-teal)]">
            Блог
          </Link>
          <span className="mx-2">/</span>
          <span className="line-clamp-1">{post.title}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-3">
          <article className="lg:col-span-2">
            <p className="text-xs uppercase tracking-wider text-[var(--color-gold)]">
              {post.category}
            </p>
            <h1 className="mt-2 font-serif text-3xl font-semibold leading-tight md:text-4xl">
              {post.title}
            </h1>

            {post.coverImage && (
              <figure className="blog-inline-figure mt-8">
                <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-[var(--color-border)]">
                  <Image
                    src={post.coverImage}
                    alt={post.coverAlt ?? post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    priority
                  />
                </div>
              </figure>
            )}

            <div className="mt-8">{renderContent(post.content)}</div>
          </article>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <LeadForm />
            <div className="mt-6 rounded-2xl border border-[var(--color-border)] bg-white p-5 text-sm shadow-sm">
              <p className="font-medium text-foreground">Ещё статьи</p>
              <ul className="mt-4 space-y-3">
                {allPosts
                  .filter((p) => p.slug !== slug)
                  .slice(0, 4)
                  .map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/blog/${p.slug}`}
                        className="block leading-snug text-[var(--color-muted)] transition-colors hover:text-[var(--color-teal)]"
                      >
                        {p.title}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </aside>
        </div>

        <p className="mt-10 text-xs text-[var(--color-muted)]">
          Правила виз меняются. Проверяйте актуальные требования на{" "}
          <a
            href="https://moscow.thaiembassy.org"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            сайте посольства
          </a>
          .
        </p>
      </div>
    </div>
  );
}
