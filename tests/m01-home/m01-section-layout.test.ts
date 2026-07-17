import { describe, expect, it } from "vitest";
import {
  M01_BEFORE_FOOTER_GAP_CLASS,
  M01_CAROUSEL_SECTION_WIDTH,
  M01_CAROUSEL_SECTION_WIDTH_CLASS,
  M01_CONTAINED_SECTION_IMAGE_SIZES,
  M01_CONTAINED_SECTION_WIDTH,
  M01_CONTAINED_SECTION_WIDTH_CLASS,
  M01_GIFTING_SECTION_IMAGE_SIZES,
  M01_GIFTING_SECTION_WIDTH,
  M01_GIFTING_SECTION_WIDTH_CLASS,
  M01_NAVBAR_HEIGHT_PX,
  M01_NAVBAR_OVERLAP_PULL_CLASS,
  M01_SECTION_STACK_GAP_CLASS,
  M01_SECTION_STACK_GAP_PX,
  M01_WIDE_CONTAINED_SECTION_WIDTH,
  M01_WIDE_CONTAINED_SECTION_WIDTH_CLASS,
} from "@/components/m01-home/m01-section-layout";

describe("M01 contained section layout", () => {
  it("defines shared desktop widths for contained homepage sections", () => {
    expect(M01_CONTAINED_SECTION_WIDTH).toBe(1236);
    expect(M01_CONTAINED_SECTION_WIDTH_CLASS).toBe("max-w-[1236px]");
    expect(M01_CONTAINED_SECTION_IMAGE_SIZES).toBe(
      "(min-width: 1268px) 1236px, calc(100vw - 32px)",
    );
    expect(M01_CAROUSEL_SECTION_WIDTH).toBe(1314);
    expect(M01_CAROUSEL_SECTION_WIDTH_CLASS).toBe("max-w-[1314px]");
    expect(M01_WIDE_CONTAINED_SECTION_WIDTH).toBe(1340);
    expect(M01_WIDE_CONTAINED_SECTION_WIDTH_CLASS).toBe("max-w-[1340px]");
    expect(M01_GIFTING_SECTION_WIDTH).toBe(1338);
    expect(M01_GIFTING_SECTION_WIDTH_CLASS).toBe("max-w-[1338px]");
    expect(M01_GIFTING_SECTION_IMAGE_SIZES).toBe(
      "(min-width: 1370px) 1338px, calc(100vw - 32px)",
    );
  });

  it("defines Figma-derived stack gap and navbar overlap contracts for V-01", () => {
    expect(M01_SECTION_STACK_GAP_PX).toBe(80);
    expect(M01_SECTION_STACK_GAP_CLASS).toBe("gap-[80px]");
    expect(M01_NAVBAR_HEIGHT_PX).toBe(73);
    expect(M01_NAVBAR_OVERLAP_PULL_CLASS).toBe("-mt-[73px]");
    expect(M01_BEFORE_FOOTER_GAP_CLASS).toBe("pb-[80px]");
  });
});
