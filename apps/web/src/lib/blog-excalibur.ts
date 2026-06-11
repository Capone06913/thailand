import fs from "fs";
import path from "path";
import { blogCovers } from "@/data/blog-covers";
import type { BlogPost } from "./blog-mock";

interface ArticleMeta {
  topic_id: string;
  slug: string;
  title?: string;
  meta_description?: string;
}

const CATEGORY_BY_TOPIC: Record<string, string> = {
  B01: "DTV",
  B02: "TDAC",
  B03: "Безвиз",
  B04: "DTV",
  B05: "DTV",
  B06: "Подача",
  B07: "DTV",
  B08: "DTV",
  B09: "TR",
  B10: "TR",
  B11: "Retirement",
  B12: "TDAC",
  B13: "Безвиз",
  B14: "TR",
  B15: "Консульство",
  B16: "Безвиз",
  B17: "Страховка",
  B18: "Консульство",
};

function resolveArticlesDir(): string | null {
  const candidates = [
    path.join(process.cwd(), "../../teya-memory/blog/articles"),
    path.join(process.cwd(), "teya-memory/blog/articles"),
    path.join(process.cwd(), "../../../teya-memory/blog/articles"),
  ];
  for (const dir of candidates) {
    if (fs.existsSync(dir)) return dir;
  }
  return null;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function topicSortKey(topicId: string): number {
  const n = parseInt(topicId.replace(/\D/g, ""), 10);
  return Number.isFinite(n) ? n : 999;
}

function dateForTopic(topicId: string): string {
  const n = topicSortKey(topicId);
  const day = String(Math.min(n, 28)).padStart(2, "0");
  return `2026-06-${day}`;
}

function loadArticle(dir: string, folder: string): BlogPost | null {
  const metaPath = path.join(dir, folder, "article.meta.json");
  const htmlPath = path.join(dir, folder, "article.html");
  if (!fs.existsSync(metaPath) || !fs.existsSync(htmlPath)) return null;

  const meta = JSON.parse(fs.readFileSync(metaPath, "utf8")) as ArticleMeta;
  const content = fs.readFileSync(htmlPath, "utf8");
  const title =
    meta.title ??
    folder.replace(/^[A-Z0-9]+-/, "").replace(/-/g, " ");

  const cover = blogCovers[meta.slug];

  return {
    id: topicSortKey(meta.topic_id),
    slug: meta.slug,
    title,
    excerpt: meta.meta_description ?? stripHtml(content).slice(0, 200),
    content,
    date: dateForTopic(meta.topic_id),
    category: CATEGORY_BY_TOPIC[meta.topic_id] ?? "Блог",
    coverImage: cover?.src,
    coverAlt: cover?.alt,
  };
}

export function getExcaliburBlogPosts(): BlogPost[] {
  const articlesDir = resolveArticlesDir();
  if (!articlesDir) return [];

  const folders = fs
    .readdirSync(articlesDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .filter((name) => /^B\d+-/.test(name));

  return folders
    .map((folder) => loadArticle(articlesDir, folder))
    .filter((p): p is BlogPost => p !== null)
    .sort((a, b) => a.id - b.id);
}
