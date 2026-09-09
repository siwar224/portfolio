import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const dist = join(root, "dist");

if (existsSync(dist)) {
  rmSync(dist, { recursive: true, force: true });
}

mkdirSync(dist, { recursive: true });

for (const entry of ["index.html", "all-projects.html", "youdube.html", "elearning.html", "pulsehr.html", "styles.css", "script.js", "assets"]) {
  cpSync(join(root, entry), join(dist, entry), { recursive: true });
}

const originalYoudubeVideo = join(dist, "assets", "youdube", "demo-v5.mp4");
if (existsSync(originalYoudubeVideo)) {
  rmSync(originalYoudubeVideo, { force: true });
}

console.log("Portfolio built in dist/");
