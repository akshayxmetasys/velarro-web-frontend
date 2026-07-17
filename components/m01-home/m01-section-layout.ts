/**
 * M01 Over-21 homepage section layout contracts (V-01 shell rhythm).
 *
 * Contained widths and the 80px inter-section gap are derived from Figma
 * frame `13148:15012` (Wireframes page `85:10`, file `92rhH51aErpYQWRrlJqMhn`).
 * Do not use these constants to force total page height.
 */

/** Shared store/lounge and other 1236-wide feature bands (Figma x≈102). */
export const M01_CONTAINED_SECTION_WIDTH = 1236;

export const M01_CONTAINED_SECTION_WIDTH_CLASS =
  "max-w-[1236px]" as const;

export const M01_CONTAINED_SECTION_IMAGE_SIZES =
  "(min-width: 1268px) 1236px, calc(100vw - 32px)" as const;

/** Cigar carousel outer band (Figma `13148:15033`, 1314 × 645). */
export const M01_CAROUSEL_SECTION_WIDTH = 1314;
export const M01_CAROUSEL_SECTION_WIDTH_CLASS = "max-w-[1314px]" as const;

/**
 * Knowledge / Clothier / Estate Collection outer bands
 * (Figma widths 1340 at x≈50).
 */
export const M01_WIDE_CONTAINED_SECTION_WIDTH = 1340;
export const M01_WIDE_CONTAINED_SECTION_WIDTH_CLASS =
  "max-w-[1340px]" as const;

/** Gifting outer band (Figma `13148:15113`, 1338 × 696). */
export const M01_GIFTING_SECTION_WIDTH = 1338;
export const M01_GIFTING_SECTION_WIDTH_CLASS = "max-w-[1338px]" as const;

export const M01_GIFTING_SECTION_IMAGE_SIZES =
  "(min-width: 1370px) 1338px, calc(100vw - 32px)" as const;

/**
 * Vertical gap between top-level Over-21 homepage section bounding boxes
 * in Figma `13148:15012` (e.g. hero ends 851, carousel starts 931 → 80px).
 */
export const M01_SECTION_STACK_GAP_PX = 80;
export const M01_SECTION_STACK_GAP_CLASS = "gap-[80px]" as const;

/** Shared MainNavbar height (Figma source `14279:30062` / instance `14406:85640`). */
export const M01_NAVBAR_HEIGHT_PX = 73;
export const M01_NAVBAR_OVERLAP_PULL_CLASS = "-mt-[73px]" as const;

/** Spacing from last homepage section box to footer boundary (Figma 80px). */
export const M01_BEFORE_FOOTER_GAP_CLASS = "pb-[80px]" as const;
