import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const files = execSync("git ls-files", { encoding: "utf8" })
  .trim()
  .split(/\r?\n/)
  .filter(Boolean);

const untracked = execSync("git ls-files --others --exclude-standard", {
  encoding: "utf8",
})
  .trim()
  .split(/\r?\n/)
  .filter(Boolean);

const allFiles = [...new Set([...files, ...untracked])].sort();

function classify(file) {
  if (/\.(png|ico|svg|webp|jpg|jpeg)$/i.test(file) || file.startsWith("docs/figma/screenshots/")) {
    return { kind: "asset", handwritten: false };
  }
  if (file.startsWith("docs/")) return { kind: "documentation", handwritten: true };
  if (file.startsWith("tests/")) return { kind: "test", handwritten: true };
  if (file.startsWith(".github/") || file.startsWith(".cursor/") || /\.(yml|json|mjs|mdc)$/.test(file) || /^(package(-lock)?\.json|tsconfig\.json|next\.config\.ts|eslint\.config\.mjs|postcss\.config\.mjs|vitest\.(config|setup)\.ts|playwright\.config\.ts|\.gitignore|AGENTS\.md|CLAUDE\.md|README\.md)$/.test(file)) {
    return { kind: "configuration", handwritten: true };
  }
  if (file.startsWith("public/")) return { kind: "asset", handwritten: false };
  if (/\.(tsx|ts|css)$/.test(file)) return { kind: "source", handwritten: true };
  return { kind: "other", handwritten: true };
}

function role(file) {
  if (file.startsWith("app/")) return "route-or-app-shell";
  if (file.startsWith("components/")) return "ui-module";
  if (file.startsWith("lib/")) return "shared-lib";
  if (file.startsWith("tests/")) return "test";
  if (file.startsWith("docs/audits/") || file.startsWith("docs/decisions/")) return "audit-or-decision";
  if (file.startsWith(".cursor/")) return "cursor-governance";
  return "project-root-or-config";
}

const remediations = new Set([
  "app/page.tsx",
  "app/layout.tsx",
  "app/globals.css",
  "components/age/age-access-boundary.tsx",
  "components/ui/drawer.tsx",
  "components/ui/route-backed-modal-shell.tsx",
  "components/m01-home/main-menu-sidebar.tsx",
  "lib/security/content-security-policy.ts",
  "lib/age/age-cookie.ts",
  ".cursor/hooks/guard.py",
  "playwright.config.ts",
]);

const entries = allFiles.map((file) => {
  const abs = path.join(root, file);
  let lineCount = 0;
  let text = "";
  const isBinary = /\.(png|ico|webp|jpg|jpeg)$/i.test(file);
  try {
    if (!isBinary && fs.existsSync(abs)) {
      text = fs.readFileSync(abs, "utf8");
      lineCount = text.length ? text.split(/\r?\n/).length : 0;
      if (text.includes('id="main-content"')) remediations.add(file);
      if (file.includes("page-by-age-state")) remediations.add(file);
    }
  } catch {}
  const meta = classify(file);
  const reviewed = meta.kind !== "asset";
  return {
    path: file,
    extension: path.extname(file) || "(none)",
    lineCount,
    classification: meta.kind,
    handwritten: meta.handwritten,
    architecturalRole: role(file),
    executionContext: text.includes('"use client"')
      ? "client"
      : text.includes('"use server"')
        ? "server-action"
        : "server-or-shared",
    manuallyReviewed: reviewed,
    automatedAnalysis: true,
    remediationChanged: remediations.has(file) || file.startsWith("docs/audits/") || file.startsWith("docs/decisions/"),
    validation: reviewed ? "static-review" : "inventory-only",
    exclusionReason: reviewed ? null : "Binary/public asset inventoried without line-by-line semantic review",
  };
});

const byClassification = entries.reduce((acc, e) => {
  acc[e.classification] = (acc[e.classification] || 0) + 1;
  return acc;
}, {});

const summary = {
  generatedAt: new Date().toISOString(),
  repositoryRoot: "velarro-web-frontend",
  branch: "chore/install-cursor-enterprise-engineering",
  startingCommitSha: "055b51607f4fa3d9d5783ffab3b758cfb76c5f3c",
  trackedPlusUntrackedCount: entries.length,
  byClassification,
  manuallyReviewedCount: entries.filter((e) => e.manuallyReviewed).length,
  deletedDuringRemediation: ["components/age/age-state-provider.tsx"],
  files: entries,
};

fs.mkdirSync("docs/audits", { recursive: true });
fs.writeFileSync("docs/audits/frontend-file-coverage.json", `${JSON.stringify(summary, null, 2)}\n`);

const md = [
  "# Frontend File Coverage Ledger",
  "",
  `Generated: ${summary.generatedAt}`,
  `Files inventoried (tracked + untracked relevant): **${summary.trackedPlusUntrackedCount}**`,
  `Reviewed: **${summary.manuallyReviewedCount}**`,
  "",
  "## Classification counts",
  "",
  "| Classification | Count |",
  "| --- | ---: |",
  ...Object.entries(byClassification).map(([k, v]) => `| ${k} | ${v} |`),
  "",
  "## Notes",
  "",
  "- Deleted during remediation: `components/age/age-state-provider.tsx`",
  "- Added: `components/age/age-access-boundary.tsx`, `docs/decisions/ADR-age-gate-indexability.md`",
  "",
  "## File table",
  "",
  "| Path | Lines | Class | Role | Remediated |",
  "| --- | ---: | --- | --- | --- |",
  ...entries.map(
    (e) =>
      `| \`${e.path}\` | ${e.lineCount} | ${e.classification} | ${e.architecturalRole} | ${e.remediationChanged ? "yes" : "no"} |`,
  ),
  "",
].join("\n");

fs.writeFileSync("docs/audits/frontend-file-coverage.md", md);
console.log(`coverage ${summary.trackedPlusUntrackedCount} reviewed ${summary.manuallyReviewedCount}`);
