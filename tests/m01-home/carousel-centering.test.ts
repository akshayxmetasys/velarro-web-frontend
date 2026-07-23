import { describe, expect, it } from "vitest";
import { calculateCenteredScrollLeft } from "@/lib/m01-home/carousel-centering";

describe("calculateCenteredScrollLeft", () => {
  it("centers from viewport-relative geometry when offset-parent coordinates disagree", () => {
    const viewportLeft = 100;
    const viewportClientLeft = 6;
    const viewportScrollLeft = 120;
    const activeCardScrollLeft = 366;
    const activeCardLeft =
      viewportLeft + viewportClientLeft + activeCardScrollLeft - viewportScrollLeft;

    const expectedScrollLeft = 403.5;
    const oldOffsetLeftResult = 827.5;

    expect(
      calculateCenteredScrollLeft({
        viewportLeft,
        viewportClientLeft,
        viewportClientWidth: 320,
        viewportScrollLeft,
        viewportScrollWidth: 2401,
        activeCardLeft,
        activeCardWidth: 395,
      }),
    ).toBe(expectedScrollLeft);
    expect(oldOffsetLeftResult).not.toBe(expectedScrollLeft);
  });

  it("clamps left and max scroll boundaries", () => {
    expect(
      calculateCenteredScrollLeft({
        viewportLeft: 100,
        viewportClientLeft: 0,
        viewportClientWidth: 500,
        viewportScrollLeft: 12,
        viewportScrollWidth: 2200,
        activeCardLeft: 88,
        activeCardWidth: 395,
      }),
    ).toBe(0);

    expect(
      calculateCenteredScrollLeft({
        viewportLeft: 100,
        viewportClientLeft: 0,
        viewportClientWidth: 500,
        viewportScrollLeft: 100,
        viewportScrollWidth: 2200,
        activeCardLeft: 2006,
        activeCardWidth: 395,
      }),
    ).toBe(1700);
  });
});
