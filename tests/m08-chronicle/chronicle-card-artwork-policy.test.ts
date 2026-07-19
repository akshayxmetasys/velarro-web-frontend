import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  CHRONICLE_CARD_ASSETS,
  CHRONICLE_CARD_IMAGE_STATUS,
} from "@/components/m08-chronicle/chronicle-assets";
import { CHRONICLE_CARDS } from "@/components/m08-chronicle/chronicle-data";

const ROOT = process.cwd();

const PROHIBITED_FILENAMES = [
  "founders-reserve-month.png",
  "international-cigar-day.png",
  "international-tea-day.png",
  "velarro-estate-day.png",
] as const;

const PRODUCTION_SOURCE_ROOTS = ["app", "components", "lib", "public"] as const;

const MARKERS = [
  "figma.com/api/mcp/asset",
  "api/mcp/asset",
  "OpenAI Media Service API",
  "gpt-image",
  "trainedAlgorithmicMedia",
  "caBX",
] as const;

function collectFiles(dir: string): string[] {
  if (!existsSync(dir)) {
    return [];
  }

  const entries = readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectFiles(fullPath));
      continue;
    }
    files.push(fullPath);
  }
  return files;
}

describe("Chronicle card artwork policy (REM-001)", () => {
  it("keeps all four card assets explicitly deferred with null URLs", () => {
    expect(CHRONICLE_CARD_IMAGE_STATUS).toBe("deferred");
    expect(Object.keys(CHRONICLE_CARD_ASSETS)).toHaveLength(4);
    expect(CHRONICLE_CARDS).toHaveLength(4);

    for (const asset of Object.values(CHRONICLE_CARD_ASSETS)) {
      expect(asset.status).toBe("deferred");
      expect(asset.url).toBeNull();
    }

    for (const card of CHRONICLE_CARDS) {
      expect(card.deferredImageKey.length).toBeGreaterThan(0);
      expect(
        Object.values(CHRONICLE_CARD_ASSETS).some(
          (asset) => asset.deferredImageKey === card.deferredImageKey,
        ),
      ).toBe(true);
    }
  });

  it("does not keep prohibited card binaries in public/", () => {
    for (const name of PROHIBITED_FILENAMES) {
      expect(
        existsSync(join(ROOT, "public", "images", "m08-chronicle", name)),
      ).toBe(false);
    }
    expect(existsSync(join(ROOT, "public", "images", "m08-chronicle"))).toBe(
      false,
    );
  });

  it("does not reference deleted card paths or generated-media markers in production sources", () => {
    const productionFiles = PRODUCTION_SOURCE_ROOTS.flatMap((root) =>
      collectFiles(join(ROOT, root)),
    ).filter((filePath) => {
      const relative = filePath.slice(ROOT.length + 1).replaceAll("\\", "/");
      if (relative.startsWith("public/images/m08-chronicle/")) {
        return false;
      }
      return /\.(ts|tsx|js|jsx|mjs|cjs|css|md|json|txt|html|svg)$/i.test(
        relative,
      );
    });

    const hits: string[] = [];
    for (const filePath of productionFiles) {
      const relative = filePath.slice(ROOT.length + 1).replaceAll("\\", "/");
      // Documentation under docs/ is outside this scan; production only.
      if (relative.startsWith("docs/")) {
        continue;
      }
      const contents = readFileSync(filePath);
      const text = contents.toString("utf8");
      for (const name of PROHIBITED_FILENAMES) {
        if (text.includes(name) || text.includes(`/images/m08-chronicle/${name}`)) {
          hits.push(`${relative}: ${name}`);
        }
      }
      for (const marker of MARKERS) {
        if (text.includes(marker)) {
          hits.push(`${relative}: ${marker}`);
        }
      }
      if (
        relative.startsWith("components/m08-chronicle/") &&
        text.includes("/images/m08-chronicle/")
      ) {
        hits.push(`${relative}: /images/m08-chronicle/`);
      }
    }

    expect(hits).toEqual([]);
  });
});
