import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CareersPageByAgeState } from "@/components/m09-careers/careers-page-by-age-state";
import { CareersPositionDetailPageByAgeState } from "@/components/m09-careers/careers-position-detail-page-by-age-state";
import {
  getCareerPositionBySlug,
  getCareerPositionDetailBySlug,
} from "@/components/m09-careers/careers-position-details-data";

const areaSalesManagerPosition = getCareerPositionBySlug("area-sales-manager");
const areaSalesManagerDetail = getCareerPositionDetailBySlug("area-sales-manager");

if (!areaSalesManagerPosition || !areaSalesManagerDetail) {
  throw new Error("Expected Area Sales Manager fixtures to exist.");
}

describe("Careers visual fidelity corrections", () => {
  describe("value cards", () => {
    it("wraps the Careers at Velarro section in background-section fill", () => {
      render(<CareersPageByAgeState ageState="unknown" />);

      const introSection = document.querySelector('[data-section="careers-intro"]');
      expect(introSection).toHaveClass("bg-background-section");
      expect(introSection).toHaveClass("w-full");
      expect(introSection).toHaveAttribute("data-figma-node", "13148:15783");

      const workingSection = document.querySelector(
        '[data-section="careers-working-at-velarro"]',
      );
      expect(workingSection?.className).not.toContain("bg-background-section");
    });

    it("uses background-card, border-default, radius, and Our Story hover motion", () => {
      render(<CareersPageByAgeState ageState="unknown" />);

      const cards = document.querySelectorAll("[data-careers-value-card]");
      expect(cards).toHaveLength(3);

      for (const card of cards) {
        expect(card).toHaveClass("bg-background-card");
        expect(card).toHaveClass("border-border-default");
        expect(card).toHaveClass("rounded-[12px]");
        expect(card).toHaveClass("[@media(hover:hover)]:hover:-translate-y-1");
        expect(card).toHaveClass(
          "[@media(hover:hover)]:hover:shadow-[0_14px_28px_rgba(47,41,36,0.12)]",
        );
        expect(card).toHaveClass("motion-reduce:transition-none");
        expect(card.querySelector("a, button")).toBeNull();
        expect(
          card.querySelector('[data-careers-image-status="deferred"]'),
        ).toBeInTheDocument();
      }

      const title = document.querySelector('[data-careers-typography="value-card-title"]');
      expect(title).toHaveClass("text-text-heading");
      expect(title?.className).toContain("velarro-heading-product-cards-font-family");

      const body = document.querySelector('[data-careers-typography="value-card-body"]');
      expect(body?.className).toContain("velarro-heading-product-cards-font-family");
      expect(body?.className).not.toContain("velarro-body-label-font-family");
    });
  });

  describe("testimonial section", () => {
    it("left-aligns the heading, quote, and vertical line", () => {
      render(<CareersPageByAgeState ageState="unknown" />);

      const section = document.querySelector('[data-section="careers-testimonial"]');
      expect(section).toBeInTheDocument();

      const inner = section?.querySelector(".items-start");
      expect(inner).toBeInTheDocument();
      expect(inner?.className).not.toContain("text-center");
      expect(inner?.className).not.toContain("items-center");

      const heading = screen.getByRole("heading", {
        name: "Spoken by those who know",
      });
      expect(heading).toHaveClass("text-left");
      expect(heading.className).toContain("velarro-heading-section-font-family");
      expect(heading.className).toContain("font-light");

      const quote = document.querySelector('[data-careers-typography="testimonial-quote"]');
      expect(quote).toHaveClass("text-left");
      expect(quote).toHaveClass("tracking-[-0.25px]");
      expect(quote).toHaveClass("font-[275]");

      expect(section?.querySelector('[data-figma-node="13148:15845"]')).toBeInTheDocument();
    });
  });

  describe("final CTA", () => {
    it("renders the Figma title underline wrapper and typography", () => {
      render(<CareersPageByAgeState ageState="unknown" />);

      const titleWrapper = document.querySelector("[data-careers-cta-title-wrapper]");
      expect(titleWrapper).toHaveClass("border-b");
      expect(titleWrapper).toHaveClass("border-[#d5b57b]");
      expect(titleWrapper).toHaveClass("max-w-[808px]");

      const title = screen.getByRole("heading", {
        name: "Ready to become part of the story?",
      });
      expect(title).toHaveClass("text-center");
      expect(title.className).toContain("velarro-heading-section-font-family");
      expect(title.className).toContain("font-light");

      const description = document.querySelector('[data-careers-typography="cta-body"]');
      expect(description).toHaveClass("text-center");
      expect(description?.className).toContain("velarro-body-default-font-family");
      expect(description?.className).toContain("font-light");
    });
  });

  describe("HR Contact panel", () => {
    it("removes solid background fill and keeps contact details non-interactive", () => {
      render(
        <CareersPositionDetailPageByAgeState
          ageState="unknown"
          position={areaSalesManagerPosition}
          detail={areaSalesManagerDetail}
        />,
      );

      const panel = document.querySelector(
        '[data-contact-verification-status="figma-review-unverified"]',
      );
      expect(panel).toBeInTheDocument();
      expect(panel?.className).not.toContain("bg-background-section");
      expect(panel?.className).not.toContain("bg-background-card");
      expect(panel?.className).not.toContain("border-border-default");

      const title = document.querySelector('[data-careers-typography="hr-contact-title"]');
      expect(title?.className).toContain("velarro-heading-page-font-family");
      expect(title).toHaveClass("text-text-display");

      expect(screen.getByText("hr@velarroestate.gmail.com")).toBeInTheDocument();
      expect(screen.getByText("+01 345 (7617) 839")).toBeInTheDocument();
      expect(screen.queryByRole("link", { name: /hr@/i })).not.toBeInTheDocument();
      expect(screen.queryByRole("link", { name: /\+01 345/i })).not.toBeInTheDocument();

      const contactBlock = panel?.querySelector('[data-figma-node="13148:15982"]');
      expect(contactBlock?.className).toContain("text-color-info-links");
      expect(within(contactBlock as HTMLElement).getByText("hr@velarroestate.gmail.com")).toBeInTheDocument();
    });
  });
});
