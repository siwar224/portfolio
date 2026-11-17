/**
 * Adds portfolio cards for new GitHub projects found by the portfolio agent.
 *
 * Source: the agent's knowledge base (data/projects.json in siwar224/portfolio-agent).
 * Only projects with source "github-sync" and in_portfolio false get a card, so client
 * projects are never published here. Cards use the exact "More Work" markup and are written
 * only between <!-- auto-cards:start --> and <!-- auto-cards:end --> in all-projects.html.
 *
 * A processed project is remembered in scripts/auto-cards.state.json: if you delete its card
 * in the Pull Request, it is not added again.
 *
 *   node scripts/sync-cards.js             # write cards, assets and state
 *   node scripts/sync-cards.js --dry-run   # only print the cards
 *
 * Env (optional): AGENT_DATA_URL or AGENT_DATA_FILE (local projects.json), PORTFOLIO_FILE
 *                 (target HTML, default all-projects.html), GITHUB_TOKEN (higher API limits)
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DRY_RUN = process.argv.includes("--dry-run");
const HTML_FILE = join(ROOT, process.env.PORTFOLIO_FILE || "all-projects.html");
const STATE_FILE = join(ROOT, "scripts", "auto-cards.state.json");
const DATA_URL = process.env.AGENT_DATA_URL || "https://raw.githubusercontent.com/siwar224/portfolio-agent/main/data/projects.json";
const START = "<!-- auto-cards:start";
const END = "<!-- auto-cards:end -->";
const MAX_IMAGE_BYTES = 3 * 1024 * 1024;
const IMAGE_TYPES = { ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".gif": "image/gif" };

const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const shortName = (name) => name.split(" - ")[0].trim();
const truncate = (s, n) => (s.length > n ? s.slice(0, n - 1).trimEnd() + "…" : s);

async function fetchOk(url, init = {}) {
  const res = await fetch(url, { ...init, signal: AbortSignal.timeout(20_000) });
  if (!res.ok) throw new Error(`${url} -> ${res.status}`);
  return res;
}

function githubHeaders(accept = "application/vnd.github+json") {
  const h = { accept, "user-agent": "portfolio-auto-cards" };
  if (process.env.GITHUB_TOKEN) h.authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  return h;
}

async function loadProjects() {
  if (process.env.AGENT_DATA_FILE) return JSON.parse(readFileSync(process.env.AGENT_DATA_FILE, "utf8")).projects;
  return (await (await fetchOk(DATA_URL)).json()).projects;
}

/** First image of the README, downloaded into assets/<id>/. Returns { src, alt } or null. */
async function readmeImage(project, owner, repo) {
  try {
    const info = await (await fetchOk(`https://api.github.com/repos/${owner}/${repo}`, { headers: githubHeaders() })).json();
    const readme = await (await fetchOk(`https://api.github.com/repos/${owner}/${repo}/readme`, { headers: githubHeaders("application/vnd.github.raw+json") })).text();
    const md = readme.match(/!\[([^\]]*)\]\(\s*<?([^)\s>]+)>?(?:\s+"[^"]*")?\s*\)/);
    const html = readme.match(/<img[^>]*\ssrc=["']([^"']+)["'][^>]*?(?:\salt=["']([^"']*)["'])?/i);
    const found = md ? { path: md[2], alt: md[1] } : html ? { path: html[1], alt: html[2] || "" } : null;
    if (!found) return null;
    // Skip badges and remote decorations: only images stored in the repo itself.
    if (/^https?:\/\//i.test(found.path) || /shields\.io|badge/i.test(found.path)) return null;
    const clean = found.path.replace(/^\.?\//, "").split(/[?#]/)[0];
    const ext = extname(clean).toLowerCase();
    if (!IMAGE_TYPES[ext]) return null;
    const url = `https://raw.githubusercontent.com/${owner}/${repo}/${info.default_branch}/${clean.split("/").map(encodeURIComponent).join("/")}`;
    const buf = Buffer.from(await (await fetchOk(url)).arrayBuffer());
    if (buf.length > MAX_IMAGE_BYTES) return null;
    const file = `assets/${project.id}/preview${ext}`;
    if (!DRY_RUN) {
      mkdirSync(join(ROOT, "assets", project.id), { recursive: true });
      writeFileSync(join(ROOT, file), buf);
    }
    return { src: file, alt: found.alt || `${shortName(project.name)} preview` };
  } catch (err) {
    console.warn(`  no README image for ${repo}: ${err.message}`);
    return null;
  }
}

/** Terminal-style preview (same look as the AI Detective card) from the workflow or highlights. */
function terminalPreview(project) {
  const steps = (project.workflow?.length ? project.workflow : project.highlights).slice(0, 4);
  const lines = steps.map((s, i) => {
    const mark = i === steps.length - 1 ? "<b>→</b>" : "<b>✓</b>";
    return `${mark} ${escapeHtml(truncate(s.replace(/\.$/, ""), 38))}`;
  });
  return `<div class="project-preview preview-term"><pre>${lines.join("\n")}</pre></div>`;
}

function renderCard(project, image) {
  const name = shortName(project.name);
  const repoUrl = project.links.repo;
  const preview = image
    ? `<div class="project-preview screenshot-preview"><img src="${escapeHtml(image.src)}" alt="${escapeHtml(image.alt)}" loading="lazy" /></div>`
    : terminalPreview(project);
  const tags = project.stack.slice(0, 4).map((t) => `<span>${escapeHtml(t)}</span>`).join("");
  return `
          <article class="project-card" data-auto-card="${escapeHtml(project.id)}">
            ${preview}
            <div class="project-body">
              <a class="project-link" href="${escapeHtml(repoUrl)}" target="_blank" rel="noreferrer" aria-label="Open ${escapeHtml(name)} on GitHub">
                <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M7 17 17 7M8 7h9v9" /></svg>
              </a>
              <h3>${escapeHtml(project.name)}</h3>
              <p>${escapeHtml(truncate(project.pitch, 260))}</p>
              <div class="tags">${tags}</div>
            </div>
          </article>`;
}

// ---------- main ----------
const html = readFileSync(HTML_FILE, "utf8");
const startIdx = html.indexOf(START);
const endIdx = html.indexOf(END);
if (startIdx < 0 || endIdx < startIdx) throw new Error(`Markers not found in ${HTML_FILE}`);
const startTagEnd = html.indexOf("-->", startIdx) + 3;

const state = existsSync(STATE_FILE) ? JSON.parse(readFileSync(STATE_FILE, "utf8")) : { processed: [] };
const projects = await loadProjects();

const candidates = projects.filter((p) =>
  p.source === "github-sync" &&
  !p.in_portfolio &&
  p.links?.repo &&
  !state.processed.includes(p.id) &&
  !html.toLowerCase().includes(p.links.repo.toLowerCase()), // already shown by a hand-written card
);

console.log(`Candidates: ${candidates.map((p) => p.id).join(", ") || "none"}`);
const cards = [];
const report = [];
for (const p of candidates) {
  const [, owner, repo] = new URL(p.links.repo).pathname.split("/");
  const image = await readmeImage(p, owner, repo);
  cards.push(renderCard(p, image));
  report.push(`- **${p.name}** (${image ? `screenshot from the README: \`${image.src}\`` : "terminal-style preview"})`);
  state.processed.push(p.id);
}

const summary = [
  `## New portfolio cards — ${new Date().toISOString().slice(0, 10)}`,
  "",
  "Generated from the agent's GitHub sync with the existing **More Work** card design (all-projects.html).",
  "Check the wording and the preview image. To drop a card, delete its `<article>` in this PR: it will not be added again.",
  "",
  report.join("\n") || "_No new cards._",
].join("\n");

console.log(cards.join("\n") || "(no new cards)");
if (DRY_RUN || !cards.length) {
  console.log(DRY_RUN ? "\nDry run: nothing written." : "\nNothing to add.");
} else {
  const next = html.slice(0, endIdx).replace(/\s*$/, "") + cards.join("") + "\n          " + html.slice(endIdx);
  // Keep everything outside the markers byte-for-byte identical.
  if (next.slice(0, startTagEnd) !== html.slice(0, startTagEnd)) throw new Error("Refusing to modify content before the markers");
  writeFileSync(HTML_FILE, next);
  writeFileSync(STATE_FILE, JSON.stringify(state, null, 2) + "\n");
  writeFileSync(join(ROOT, "scripts", "auto-cards-last-run.md"), summary + "\n");
  console.log(`\nAdded ${cards.length} card(s) to ${HTML_FILE}`);
}
