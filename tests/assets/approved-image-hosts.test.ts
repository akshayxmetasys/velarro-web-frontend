import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { OUR_STORY_APPROVED_IMAGES } from "@/components/m02-our-story/our-story-assets";
import { THE_ESTATE_APPROVED_IMAGES } from "@/components/m03-estate/the-estate-assets";
import { THE_HOUSE_APPROVED_IMAGES } from "@/components/m04-house/the-house-assets";
import { THE_VAULT_APPROVED_IMAGES } from "@/components/m05-vault/the-vault-assets";
import { CHRONICLE_APPROVED_IMAGES } from "@/components/m08-chronicle/chronicle-assets";
import { PAIRING_GUIDE_APPROVED_IMAGES } from "@/components/m08-pairing-guide/pairing-guide-assets";
import { CAREERS_APPROVED_IMAGES } from "@/components/m09-careers/careers-assets";
import {
  APPROVED_IMAGE_HOST,
  APPROVED_IMAGE_ORIGIN,
  M01_HOME_APPROVED_IMAGES,
  isApprovedImageHost,
  isApprovedImageUrl,
} from "@/lib/assets/approved-image-hosts";

describe("approved image hosts", () => {
  it("allows only the approved Supabase host", () => {
    expect(APPROVED_IMAGE_HOST).toBe("lpnrhpvmrnoqkzoxukov.supabase.co");
    expect(APPROVED_IMAGE_ORIGIN).toBe(
      "https://lpnrhpvmrnoqkzoxukov.supabase.co",
    );
    expect(isApprovedImageHost(APPROVED_IMAGE_HOST)).toBe(true);
    expect(isApprovedImageHost("figma.com")).toBe(false);
    expect(isApprovedImageHost("*.supabase.co")).toBe(false);
  });

  it("accepts approved M01 homepage image URLs", () => {
    for (const url of Object.values(M01_HOME_APPROVED_IMAGES)) {
      expect(isApprovedImageUrl(url)).toBe(true);
    }

    expect(M01_HOME_APPROVED_IMAGES.giftingBackground).toBe(
      "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/gift-hero-home-20260709-041311-desktop-hero.webp",
    );
    expect(M01_HOME_APPROVED_IMAGES.clothierEstateOversizedTshirt).toBe(
      "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/estate-oversized-t-shirt-20260709-045207-product-main.webp",
    );
    expect(M01_HOME_APPROVED_IMAGES.clothierHeritageDadCap).toBe(
      "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/heritage-dad-cap-20260709-160620-product-main.webp",
    );
    expect(M01_HOME_APPROVED_IMAGES.clothierEstateWeekenderJacket).toBe(
      "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/estate-weekender-jacket-closeup-20260709-154553-product-main.webp",
    );
    expect(M01_HOME_APPROVED_IMAGES.estateCollectionEstateEspresso).toBe(
      "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/home-espresso-20260711-013345-product-main.webp",
    );
    expect(M01_HOME_APPROVED_IMAGES.estateCollectionArrowLeft).toBe(
      "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/property-1arrow-left-circle-20260711-004505-svg-logo-icon.svg",
    );
  });

  it("rejects temporary Figma URLs and arbitrary remote hosts", () => {
    expect(
      isApprovedImageUrl(
        "https://www.figma.com/api/mcp/asset/f048cea8-d96b-4f82-b56e-5f30a46fca0d",
      ),
    ).toBe(false);
    expect(isApprovedImageUrl("https://example.com/image.webp")).toBe(false);
    expect(isApprovedImageUrl("http://lpnrhpvmrnoqkzoxukov.supabase.co/x")).toBe(
      false,
    );
  });

  it("accepts approved M02 Our Story image URLs without adding local files", () => {
    expect(OUR_STORY_APPROVED_IMAGES.heroBackground).toBe(
      "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/ourstory-hero-20260709-024102-desktop-hero.webp",
    );
    expect(OUR_STORY_APPROVED_IMAGES.brandStorySide).toBe(
      "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/ourstory-product-20260713-232448-product-main.webp",
    );

    for (const url of Object.values(OUR_STORY_APPROVED_IMAGES)) {
      expect(isApprovedImageUrl(url)).toBe(true);
    }

    const serialized = JSON.stringify(OUR_STORY_APPROVED_IMAGES);
    expect(serialized).not.toContain("figma.com");
    expect(serialized).not.toContain("mcp/asset");
    expect(existsSync(join(process.cwd(), "public", "images", "m02"))).toBe(
      false,
    );
    expect(
      existsSync(join(process.cwd(), "public", "images", "m02-our-story")),
    ).toBe(false);
  });

  it("does not include Figma MCP markers in approved constants", () => {
    const serialized = JSON.stringify({
      M01_HOME_APPROVED_IMAGES,
      THE_ESTATE_APPROVED_IMAGES,
      THE_HOUSE_APPROVED_IMAGES,
      THE_VAULT_APPROVED_IMAGES,
      CHRONICLE_APPROVED_IMAGES,
      PAIRING_GUIDE_APPROVED_IMAGES,
      CAREERS_APPROVED_IMAGES,
    });

    expect(serialized).not.toContain("figma.com");
    expect(serialized).not.toContain("mcp/asset");
  });

  it("accepts approved M03 The Estate image URLs without adding local files", () => {
    expect(THE_ESTATE_APPROVED_IMAGES.collectorSeriesHeroBackground).toBe(
      "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/collection-series-the-estate-hero-20260709-032805-desktop-hero.webp",
    );
    expect(THE_ESTATE_APPROVED_IMAGES.grandCruToro).toBe(
      "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/grand-cru-cigar-product-main-20260709-003453-product-main.webp",
    );

    for (const url of Object.values(THE_ESTATE_APPROVED_IMAGES)) {
      expect(isApprovedImageUrl(url)).toBe(true);
    }

    const serialized = JSON.stringify(THE_ESTATE_APPROVED_IMAGES);
    expect(serialized).not.toContain("figma.com");
    expect(serialized).not.toContain("mcp/asset");
    expect(existsSync(join(process.cwd(), "public", "images", "m03"))).toBe(
      false,
    );
    expect(
      existsSync(join(process.cwd(), "public", "images", "m03-estate")),
    ).toBe(false);
  });

  it("accepts approved M04 The House image URLs without adding local files", () => {
    expect(THE_HOUSE_APPROVED_IMAGES.houseHeroAllHouse).toBe(
      "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/the-house-hero-20260709-023807-desktop-hero.webp",
    );
    expect(THE_HOUSE_APPROVED_IMAGES.categoryRoastery).toBe(
      M01_HOME_APPROVED_IMAGES.roasteryHero,
    );
    expect(THE_HOUSE_APPROVED_IMAGES.productFoundersDuffel).toBe(
      "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/founders-duffel-20260709-190202-product-main.webp",
    );

    for (const url of Object.values(THE_HOUSE_APPROVED_IMAGES)) {
      expect(isApprovedImageUrl(url)).toBe(true);
    }

    const serialized = JSON.stringify(THE_HOUSE_APPROVED_IMAGES);
    expect(serialized).not.toContain("figma.com");
    expect(serialized).not.toContain("mcp/asset");
    expect(existsSync(join(process.cwd(), "public", "images", "m04"))).toBe(
      false,
    );
    expect(
      existsSync(join(process.cwd(), "public", "images", "m04-house")),
    ).toBe(false);
  });

  it("accepts approved M05 The Vault image URLs without adding local files", () => {
    expect(THE_VAULT_APPROVED_IMAGES.offerVerdeClassico).toBe(
      "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/verde-classico-cigar-product-main-20260709-014847-product-main.webp",
    );

    for (const url of Object.values(THE_VAULT_APPROVED_IMAGES)) {
      expect(isApprovedImageUrl(url)).toBe(true);
    }

    const serialized = JSON.stringify(THE_VAULT_APPROVED_IMAGES);
    expect(serialized).not.toContain("figma.com");
    expect(serialized).not.toContain("mcp/asset");
    expect(existsSync(join(process.cwd(), "public", "images", "m05"))).toBe(
      false,
    );
    expect(
      existsSync(join(process.cwd(), "public", "images", "m05-vault")),
    ).toBe(false);
  });

  it("accepts approved M08 The Chronicle image URLs without adding local files", () => {
    expect(CHRONICLE_APPROVED_IMAGES.hero).toBe(
      "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/thechronicle-hero-20260709-023616-desktop-hero.webp",
    );

    for (const url of Object.values(CHRONICLE_APPROVED_IMAGES)) {
      expect(isApprovedImageUrl(url)).toBe(true);
    }

    const serialized = JSON.stringify(CHRONICLE_APPROVED_IMAGES);
    expect(serialized).not.toContain("figma.com");
    expect(serialized).not.toContain("mcp/asset");
    expect(existsSync(join(process.cwd(), "public", "images", "m08"))).toBe(
      false,
    );
    expect(
      existsSync(join(process.cwd(), "public", "images", "m08-chronicle")),
    ).toBe(false);
  });

  it("accepts approved M08 Pairing Guide image URLs without adding local files", () => {
    expect(PAIRING_GUIDE_APPROVED_IMAGES.hero).toBe(
      "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/perfect-pairing-hero-20260709-034623-desktop-hero.webp",
    );

    for (const url of Object.values(PAIRING_GUIDE_APPROVED_IMAGES)) {
      expect(isApprovedImageUrl(url)).toBe(true);
    }

    const serialized = JSON.stringify(PAIRING_GUIDE_APPROVED_IMAGES);
    expect(serialized).not.toContain("figma.com");
    expect(serialized).not.toContain("mcp/asset");
    expect(existsSync(join(process.cwd(), "public", "images", "m08"))).toBe(
      false,
    );
    expect(
      existsSync(join(process.cwd(), "public", "images", "m08-pairing-guide")),
    ).toBe(false);
  });

  it("accepts approved M09 Careers image URLs without adding local files", () => {
    expect(CAREERS_APPROVED_IMAGES.hero).toBe(
      "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/carrer-horo-20260709-034631-desktop-hero.webp",
    );

    for (const url of Object.values(CAREERS_APPROVED_IMAGES)) {
      expect(isApprovedImageUrl(url)).toBe(true);
    }

    const serialized = JSON.stringify(CAREERS_APPROVED_IMAGES);
    expect(serialized).not.toContain("figma.com");
    expect(serialized).not.toContain("mcp/asset");
    expect(existsSync(join(process.cwd(), "public", "images", "m09"))).toBe(
      false,
    );
    expect(
      existsSync(join(process.cwd(), "public", "images", "m09-careers")),
    ).toBe(false);
  });
});
