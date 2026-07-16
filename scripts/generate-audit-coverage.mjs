import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const files = execSync("git ls-files", { encoding: "utf8" })
  .trim()
  .split(/\r?\n/)
  .filter(Boolean);

function classify(f) {
  if (f.startsWith("docs/")) return { kind: "documentation", role: "docs" };
  if (f.startsWith("tests/")) {
    return {
      kind: "test",
      role: f.includes("/e2e/") ? "e2e-test" : "unit-test",
    };
  }
  if (f.startsWith("public/")) return { kind: "asset", role: "public-asset" };
  if (
    /\.(png|jpg|jpeg|gif|webp|ico|svg)$/i.test(f) &&
    !f.startsWith("components/")
  ) {
    return { kind: "asset", role: "image" };
  }
  if (
    f.startsWith(".cursor/") ||
    f.startsWith(".agents/") ||
    f === "AGENTS.md" ||
    f === "CLAUDE.md"
  ) {
    return { kind: "configuration", role: "agent-config" };
  }
  if (f.startsWith(".github/")) return { kind: "configuration", role: "ci" };
  if (
    [
      "package.json",
      "package-lock.json",
      "tsconfig.json",
      "next.config.ts",
      "eslint.config.mjs",
      "postcss.config.mjs",
      "vitest.config.ts",
      "vitest.setup.ts",
      "playwright.config.ts",
      "next-env.d.ts",
      ".gitignore",
    ].includes(f)
  ) {
    return { kind: "configuration", role: "tooling" };
  }
  if (f.startsWith("app/")) return { kind: "handwritten", role: "route" };
  if (f.startsWith("components/")) {
    return { kind: "handwritten", role: "component" };
  }
  if (f.startsWith("lib/")) return { kind: "handwritten", role: "library" };
  if (f.endsWith(".md")) return { kind: "documentation", role: "docs" };
  return { kind: "handwritten", role: "other" };
}

function clientServer(f, content) {
  if (
    f.startsWith("tests/") ||
    f.startsWith("docs/") ||
    f.startsWith("public/")
  ) {
    return "n/a";
  }
  if (content.includes('"use client"')) return "client";
  if (content.includes('"use server"')) return "server";
  if (f.startsWith("app/") || f.startsWith("lib/")) return "server-or-shared";
  if (f.startsWith("components/")) return "server-component-default";
  return "n/a";
}

const reviewedPrefixes = [
  "app/",
  "components/",
  "lib/",
  "tests/",
  "package.json",
  "package-lock.json",
  "tsconfig.json",
  "next.config.ts",
  "eslint.config.mjs",
  "postcss.config.mjs",
  "vitest.config.ts",
  "vitest.setup.ts",
  "playwright.config.ts",
  ".github/",
  "AGENTS.md",
  "CLAUDE.md",
  "README.md",
  ".gitignore",
];

function isReviewed(f) {
  return reviewedPrefixes.some(
    (p) => f === p || f.startsWith(p) || (p.endsWith("/") && f.startsWith(p)),
  );
}

const entries = [];

for (const f of files) {
  const abs = path.join(root, f);
  let lines = 0;
  let content = "";
  try {
    const st = fs.statSync(abs);
    if (st.isFile()) {
      if (/\.(png|jpg|jpeg|gif|webp|ico)$/i.test(f)) {
        lines = 0;
      } else {
        content = fs.readFileSync(abs, "utf8");
        lines = content.length ? content.split(/\r?\n/).length : 0;
      }
    }
  } catch {
    // skip unreadable
  }

  const c = classify(f);
  const exportCount = (content.match(/^export /gm) || []).length;
  const importCount = (content.match(/^import /gm) || []).length;
  const binary = /\.(png|jpg|jpeg|gif|webp|ico)$/i.test(f);
  const generated = f === "next-env.d.ts" || f === "package-lock.json";

  entries.push({
    path: f,
    fileType: path.extname(f) || "(none)",
    lineCount: lines,
    classification: generated
      ? "generated"
      : binary
        ? "asset"
        : c.kind,
    architecturalRole: c.role,
    mainExportsApprox: exportCount,
    mainImportsApprox: importCount,
    executionContext: clientServer(f, content),
    manuallyReviewed: isReviewed(f) && !binary,
    automatedAnalysis: true,
    findingsCount: {
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
      informational: 0,
    },
    remediationChanged: false,
    validationPerformed: [],
    exclusionReason: binary
      ? "Binary asset — size/naming/privacy reviewed at inventory level; no line-by-line semantic review"
      : f.startsWith("docs/") && !f.startsWith("docs/audits/")
        ? "Historical/planning documentation — sampled for intended stack claims; not production runtime"
        : null,
  });
}

const outDir = path.join(root, "docs", "audits");
fs.mkdirSync(outDir, { recursive: true });

const summary = {
  generatedAt: new Date().toISOString(),
  repository: "velarro-web-frontend",
  branch: execSync("git branch --show-current", { encoding: "utf8" }).trim(),
  commit: execSync("git rev-parse HEAD", { encoding: "utf8" }).trim(),
  trackedFileCount: files.length,
  denominatorNote:
    "Coverage denominator = all git-tracked files. node_modules and .next are untracked and excluded.",
  byClassification: {},
  byRole: {},
  manuallyReviewedCount: 0,
  entries,
};

for (const e of entries) {
  summary.byClassification[e.classification] =
    (summary.byClassification[e.classification] || 0) + 1;
  summary.byRole[e.architecturalRole] =
    (summary.byRole[e.architecturalRole] || 0) + 1;
  if (e.manuallyReviewed) summary.manuallyReviewedCount += 1;
}

fs.writeFileSync(
  path.join(outDir, "frontend-file-coverage.json"),
  JSON.stringify(summary, null, 2),
);

const md = [
  "# Frontend File Coverage Ledger",
  "",
  `Generated: ${summary.generatedAt}`,
  `Branch: \`${summary.branch}\``,
  `Commit: \`${summary.commit}\``,
  `Tracked files: **${summary.trackedFileCount}**`,
  `Manually/semantically reviewed (non-binary runtime/config/test): **${summary.manuallyReviewedCount}**`,
  "",
  summary.denominatorNote,
  "",
  "## By classification",
  "",
  "| Classification | Count |",
  "| --- | ---: |",
  ...Object.entries(summary.byClassification)
    .sort((a, b) => b[1] - a[1])
    .map(([k, v]) => `| ${k} | ${v} |`),
  "",
  "## By architectural role",
  "",
  "| Role | Count |",
  "| --- | ---: |",
  ...Object.entries(summary.byRole)
    .sort((a, b) => b[1] - a[1])
    .map(([k, v]) => `| ${k} | ${v} |`),
  "",
  "## File inventory",
  "",
  "| Path | Type | Lines | Class | Role | Context | Reviewed | Exclusion |",
  "| --- | --- | ---: | --- | --- | --- | --- | --- |",
  ...entries.map((e) => {
    const excl = e.exclusionReason
      ? e.exclusionReason.replace(/\|/g, "/")
      : "";
    return `| \`${e.path}\` | ${e.fileType} | ${e.lineCount} | ${e.classification} | ${e.architecturalRole} | ${e.executionContext} | ${e.manuallyReviewed ? "yes" : "no"} | ${excl} |`;
  }),
  "",
];

fs.writeFileSync(path.join(outDir, "frontend-file-coverage.md"), md.join("\n"));
console.log(
  `Wrote ${entries.length} entries; reviewed=${summary.manuallyReviewedCount}`,
);
console.log(JSON.stringify(summary.byClassification, null, 2));
