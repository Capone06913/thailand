import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const apiDir = path.join(root, "src", "app", "api");
const apiBackup = path.join(root, "src", "app", "_api_ghpages_backup");
const BASE_PATH = "/thailand";
const TEXT_EXTENSIONS = new Set([
  ".html",
  ".js",
  ".css",
  ".json",
  ".txt",
  ".xml",
]);

function moveApiAside() {
  if (!fs.existsSync(apiDir)) return;
  if (fs.existsSync(apiBackup)) {
    fs.rmSync(apiBackup, { recursive: true, force: true });
  }
  fs.renameSync(apiDir, apiBackup);
}

function restoreApi() {
  if (fs.existsSync(apiBackup)) {
    if (fs.existsSync(apiDir)) {
      fs.rmSync(apiDir, { recursive: true, force: true });
    }
    fs.renameSync(apiBackup, apiDir);
  }
}

function walkFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkFiles(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

/** Prefix public media paths for GitHub Pages project site (/thailand). */
function fixMediaPaths(outDir) {
  const plainRules = [
    [/(?<!\/thailand)\/images\//g, `${BASE_PATH}/images/`],
    [/(?<!\/thailand)\/video\//g, `${BASE_PATH}/video/`],
    [/(?<!\/thailand)\/blog\/covers\//g, `${BASE_PATH}/blog/covers/`],
    [/(?<!\/thailand)\/brand\//g, `${BASE_PATH}/brand/`],
  ];

  const escapedRules = [
    [/(?<!\\\/thailand)\\\/images\\\//g, "\\/thailand\\/images\\/"],
    [/(?<!\\\/thailand)\\\/video\\\//g, "\\/thailand\\/video\\/"],
    [
      /(?<!\\\/thailand)\\\/blog\\\/covers\\\//g,
      "\\/thailand\\/blog\\/covers\\/",
    ],
    [/(?<!\\\/thailand)\\\/brand\\\//g, "\\/thailand\\/brand\\/"],
  ];

  const encodedRules = [
    [/(?<!%2Fthailand)%2Fimages%2F/g, "%2Fthailand%2Fimages%2F"],
    [/(?<!%2Fthailand)%2Fvideo%2F/g, "%2Fthailand%2Fvideo%2F"],
    [
      /(?<!%2Fthailand)%2Fblog%2Fcovers%2F/g,
      "%2Fthailand%2Fblog%2Fcovers%2F",
    ],
    [/(?<!%2Fthailand)%2Fbrand%2F/g, "%2Fthailand%2Fbrand%2F"],
  ];

  let changedFiles = 0;

  for (const filePath of walkFiles(outDir)) {
    if (!TEXT_EXTENSIONS.has(path.extname(filePath))) continue;

    let content = fs.readFileSync(filePath, "utf8");
    const original = content;

    content = content.replaceAll("/thailand/thailand/", "/thailand/");
    content = content.replaceAll("\\/thailand\\/thailand\\/", "\\/thailand\\/");
    content = content.replaceAll(
      "%2Fthailand%2Fthailand%2F",
      "%2Fthailand%2F",
    );

    for (const [pattern, replacement] of plainRules) {
      content = content.replace(pattern, replacement);
    }
    for (const [pattern, replacement] of escapedRules) {
      content = content.replace(pattern, replacement);
    }
    for (const [pattern, replacement] of encodedRules) {
      content = content.replace(pattern, replacement);
    }

    content = content.replaceAll("/thailand/thailand/", "/thailand/");
    content = content.replaceAll("\\/thailand\\/thailand\\/", "\\/thailand\\/");
    content = content.replaceAll(
      "%2Fthailand%2Fthailand%2F",
      "%2Fthailand%2F",
    );

    if (content !== original) {
      fs.writeFileSync(filePath, content, "utf8");
      changedFiles += 1;
    }
  }

  console.log(`✓ Fixed media paths in ${changedFiles} files`);
}

moveApiAside();

const nextDir = path.join(root, ".next");
if (fs.existsSync(nextDir)) {
  fs.rmSync(nextDir, { recursive: true, force: true });
}

try {
  execSync("next build", {
    cwd: root,
    stdio: "inherit",
    env: {
      ...process.env,
      GITHUB_PAGES: "true",
    },
  });

  const outDir = path.join(root, "out");
  fixMediaPaths(outDir);
  fs.writeFileSync(path.join(outDir, ".nojekyll"), "");
} finally {
  restoreApi();
}
