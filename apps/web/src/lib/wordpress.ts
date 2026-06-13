import { getExcaliburBlogPosts } from "./blog-excalibur";
import { mockBlogPosts, type BlogPost } from "./blog-mock";

function getLocalBlogPosts(): BlogPost[] {
  const excalibur = getExcaliburBlogPosts();
  return excalibur.length > 0 ? excalibur : mockBlogPosts;
}

interface WPPost {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  date: string;
  categories: number[];
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, "").trim();
}

function mapWPPost(post: WPPost): BlogPost {
  return {
    id: post.id,
    slug: post.slug,
    title: stripHtml(post.title.rendered),
    excerpt: stripHtml(post.excerpt.rendered),
    content: post.content.rendered,
    date: post.date.split("T")[0],
    category: "Блог",
  };
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const apiUrl = process.env.WORDPRESS_API_URL;
  if (!apiUrl) return getLocalBlogPosts();

  try {
    const headers: HeadersInit = { Accept: "application/json" };
    const user = process.env.WORDPRESS_APP_USER;
    const pass = process.env.WORDPRESS_APP_PASSWORD;
    if (user && pass) {
      headers.Authorization = `Basic ${Buffer.from(`${user}:${pass}`).toString("base64")}`;
    }

    const res = await fetch(`${apiUrl}/posts?per_page=20&_embed`, {
      headers,
      next: { revalidate: 300 },
    });

    if (!res.ok) return getLocalBlogPosts();
    const data: WPPost[] = await res.json();
    return data.map(mapWPPost);
  } catch {
    return getLocalBlogPosts();
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const apiUrl = process.env.WORDPRESS_API_URL;
  if (!apiUrl) {
    return getLocalBlogPosts().find((p) => p.slug === slug) ?? null;
  }

  try {
    const headers: HeadersInit = { Accept: "application/json" };
    const user = process.env.WORDPRESS_APP_USER;
    const pass = process.env.WORDPRESS_APP_PASSWORD;
    if (user && pass) {
      headers.Authorization = `Basic ${Buffer.from(`${user}:${pass}`).toString("base64")}`;
    }

    const res = await fetch(`${apiUrl}/posts?slug=${slug}`, {
      headers,
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      return getLocalBlogPosts().find((p) => p.slug === slug) ?? null;
    }
    const data: WPPost[] = await res.json();
    if (!data.length) {
      return getLocalBlogPosts().find((p) => p.slug === slug) ?? null;
    }
    return mapWPPost(data[0]);
  } catch {
    return getLocalBlogPosts().find((p) => p.slug === slug) ?? null;
  }
}
