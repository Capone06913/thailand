import fs from "fs";
import path from "path";

function cleanDashes(text) {
  return (
    text
      // numeric ranges: 15–30 → от 15 до 30
      .replace(/(\d+)–(\d+)/g, "от $1 до $2")
      // em dash with spaces → colon
      .replace(/\s—\s/g, ": ")
      // en dash with spaces (non-numeric) → comma
      .replace(/\s–\s/g, ", ")
      // line-start em dash (e.g. JSX continuation)
      .replace(/^(\s*)—\s/gm, "$1")
      // cleanup
      .replace(/: ,/g, ": ")
      .replace(/, ,/g, ", ")
      .replace(/\.\s+\./g, ".")
  );
}

function walkDir(dir, ext, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === ".agents" || entry.name === "node_modules") continue;
      walkDir(full, ext, files);
    } else if (ext.some((e) => entry.name.endsWith(e))) {
      files.push(full);
    }
  }
  return files;
}

// Reviews
const reviewsPath = "apps/web/src/lib/reviews.ts";
if (fs.existsSync(reviewsPath)) {
  fs.writeFileSync(reviewsPath, cleanDashes(fs.readFileSync(reviewsPath, "utf8")));
}

// All site source (marketing, FAQ, services, legal)
const srcFiles = walkDir("apps/web/src", [".ts", ".tsx"]);
for (const file of srcFiles) {
  const content = fs.readFileSync(file, "utf8");
  const cleaned = cleanDashes(content);
  if (cleaned !== content) fs.writeFileSync(file, cleaned);
}

// Blog articles HTML
const articlesDir = "teya-memory/blog/articles";
if (fs.existsSync(articlesDir)) {
  for (const folder of fs.readdirSync(articlesDir)) {
    for (const name of ["article.html", "article.meta.json", "schema.jsonld"]) {
      const filePath = path.join(articlesDir, folder, name);
      if (!fs.existsSync(filePath)) continue;
      const content = fs.readFileSync(filePath, "utf8");
      const cleaned = cleanDashes(content);
      if (cleaned !== content) fs.writeFileSync(filePath, cleaned);
    }
  }
}

console.log("Dashes cleaned across site copy, FAQ, services, and blog meta");
