import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const apiDir = path.join(root, "src", "app", "api");
const apiBackup = path.join(root, "src", "app", "_api_ghpages_backup");

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
  fs.writeFileSync(path.join(outDir, ".nojekyll"), "");
} finally {
  restoreApi();
}
