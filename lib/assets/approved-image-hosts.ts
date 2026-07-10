/**
 * Approved remote image host and M01 homepage asset URLs.
 * Figma MCP URLs and arbitrary user-provided URLs must not be added here.
 */
export const APPROVED_IMAGE_HOST = "lpnrhpvmrnoqkzoxukov.supabase.co" as const;

export const APPROVED_IMAGE_ORIGIN = `https://${APPROVED_IMAGE_HOST}` as const;

export const M01_HOME_APPROVED_IMAGES = {
  navbarLogoScript:
    "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/1781557831962-frame-1000005296-(1).webp",
  collectorHero:
    "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/collection-series-hero-home-20260709-034217-desktop-hero.webp",
} as const;

export type M01HomeApprovedImageKey = keyof typeof M01_HOME_APPROVED_IMAGES;

export function isApprovedImageHost(hostname: string): boolean {
  return hostname === APPROVED_IMAGE_HOST;
}

export function isApprovedImageUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return (
      parsed.protocol === "https:" &&
      isApprovedImageHost(parsed.hostname) &&
      parsed.pathname.startsWith("/storage/v1/object/public/")
    );
  } catch {
    return false;
  }
}

export function assertApprovedImageUrl(url: string): string {
  if (!isApprovedImageUrl(url)) {
    throw new Error("Image URL is not on the approved Supabase host.");
  }

  return url;
}
