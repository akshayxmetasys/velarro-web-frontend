import { describe, expect, it } from "vitest";
import {
  M01_CONTAINED_SECTION_IMAGE_SIZES,
  M01_CONTAINED_SECTION_WIDTH,
  M01_CONTAINED_SECTION_WIDTH_CLASS,
} from "@/components/m01-home/m01-section-layout";

describe("M01 contained section layout", () => {
  it("defines the shared desktop width for contained homepage sections", () => {
    expect(M01_CONTAINED_SECTION_WIDTH).toBe(1236);
    expect(M01_CONTAINED_SECTION_WIDTH_CLASS).toBe("max-w-[1236px]");
    expect(M01_CONTAINED_SECTION_IMAGE_SIZES).toBe(
      "(min-width: 1268px) 1236px, calc(100vw - 32px)",
    );
  });
});
