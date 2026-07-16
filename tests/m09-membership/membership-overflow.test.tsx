import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MembershipPage } from "@/components/m09-membership/membership-page";

describe("MembershipPage responsive overflow (M00.5)", () => {
  it("provides accessible horizontal scroll regions for wide comparison content", () => {
    const { container } = render(<MembershipPage ageState="unknown" />);

    const tierScroll = container.querySelector(
      '[data-membership-scroll-region="tiers"]',
    );
    const benefitsScroll = container.querySelector(
      '[data-membership-scroll-region="benefits"]',
    );

    expect(tierScroll).not.toBeNull();
    expect(benefitsScroll).not.toBeNull();
    expect(tierScroll).toHaveAttribute("tabIndex", "0");
    expect(benefitsScroll).toHaveAttribute("tabIndex", "0");
    expect(tierScroll).toHaveAttribute("role", "region");
    expect(benefitsScroll).toHaveAttribute("role", "region");

    expect(
      screen.getByText("Scroll horizontally to compare membership tiers."),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Scroll horizontally to view the full benefits comparison.",
      ),
    ).toBeInTheDocument();

    expect(container.firstElementChild?.className).toMatch(/overflow-x-clip/);
  });
});
