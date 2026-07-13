import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import OurStoryRoute, { metadata } from "@/app/our-story/page";
import { OurStoryPageByAgeState } from "@/components/m02-our-story/our-story-page-by-age-state";
import { OUR_STORY_APPROVED_IMAGES } from "@/components/m02-our-story/our-story-assets";
import { getInitialAgeStateFromCookies } from "@/lib/age/get-initial-age-state";

vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    priority,
    fill,
    width,
    height,
    className,
  }: {
    src: string;
    alt: string;
    priority?: boolean;
    fill?: boolean;
    width?: number;
    height?: number;
    className?: string;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      data-priority={priority ? "true" : undefined}
      data-fill={fill ? "true" : undefined}
      data-width={width}
      data-height={height}
      className={className}
    />
  ),
}));

vi.mock("@/lib/age/age-actions", () => ({
  confirmAgeStateAction: vi.fn(),
}));

vi.mock("@/lib/age/get-initial-age-state", () => ({
  getInitialAgeStateFromCookies: vi.fn(),
}));

describe("OurStoryPageByAgeState", () => {
  it("shows the age gate for unknown visitors and hides Our Story content", () => {
    render(<OurStoryPageByAgeState ageState="unknown" />);

    expect(
      screen.getByRole("heading", { name: "Age Verification Required" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "OUR STORY" }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Brand Story")).not.toBeInTheDocument();
  });

  it("blocks under-21 visitors from restricted Our Story content", () => {
    render(<OurStoryPageByAgeState ageState="under21" />);

    expect(
      screen.getByRole("heading", { name: "Access restricted" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "OUR STORY" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("A great cigar is not simply made."),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByAltText("Velarro cigar box overlooking estate fields"),
    ).not.toBeInTheDocument();
  });

  it("renders the Figma Our Story sections for over-21 visitors", () => {
    render(<OurStoryPageByAgeState ageState="over21" />);

    expect(
      screen.getByRole("navigation", { name: "Main navigation" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: "OUR STORY" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Brand Story" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Our Mission" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Why Connoisseurs" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Brand Values" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Stay in Know" }),
    ).toBeInTheDocument();
  });

  it("uses the approved production image URLs and no Figma URLs", () => {
    const { container } = render(<OurStoryPageByAgeState ageState="over21" />);

    expect(
      screen.getByAltText("Velarro cigar box overlooking estate fields"),
    ).toHaveAttribute("src", OUR_STORY_APPROVED_IMAGES.heroBackground);
    expect(
      screen.getByAltText("Velarro lounge display with cigars and accessories"),
    ).toHaveAttribute("src", OUR_STORY_APPROVED_IMAGES.brandStorySide);

    expect(container.innerHTML).not.toContain("figma.com");
    expect(container.innerHTML).not.toContain("mcp/asset");
  });

  it("renders the expected Figma copy for over-21 visitors", () => {
    render(<OurStoryPageByAgeState ageState="over21" />);

    expect(
      screen.getAllByText("Crafted with purpose, aged with time"),
    ).toHaveLength(2);
    expect(
      screen.getByText(
        "A legacy rooted in the earth. A future defined by craftsmanship.",
        { exact: false },
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText("A great cigar is not simply made."),
    ).toBeInTheDocument();
    expect(screen.getByText("5%")).toBeInTheDocument();
    expect(screen.getByText("TOP LEAF SELECTED")).toBeInTheDocument();
    expect(screen.getByText("Origin-Led Blending")).toBeInTheDocument();
    expect(screen.getByText("Innovation")).toBeInTheDocument();
  });

  it("adds subtle hover lift and shadow treatment to Why Connoisseurs cards", () => {
    render(<OurStoryPageByAgeState ageState="over21" />);

    for (const heading of [
      "Generational Expertise",
      "Quality begins at the source.",
      "Rested & Aged",
      "Origin-Led Blending",
    ]) {
      const card = screen.getByRole("heading", { level: 3, name: heading })
        .parentElement;

      expect(card).toHaveClass("transition-[transform,box-shadow]");
      expect(card).toHaveClass("[@media(hover:hover)]:hover:-translate-y-1");
      expect(card).toHaveClass(
        "[@media(hover:hover)]:hover:shadow-[0_14px_28px_rgba(47,41,36,0.12)]",
      );
    }
  });

  it("adds subtle hover lift and shadow treatment to Brand Values cards", () => {
    render(<OurStoryPageByAgeState ageState="over21" />);

    for (const heading of [
      "Heritage",
      "Craftsmanship",
      "Authenticity",
      "Quality",
      "Sustainability",
      "Innovation",
    ]) {
      const card = screen.getByRole("heading", { level: 3, name: heading })
        .parentElement;

      expect(card).toHaveClass("transition-[transform,box-shadow]");
      expect(card).toHaveClass("[@media(hover:hover)]:hover:-translate-y-1");
      expect(card).toHaveClass(
        "[@media(hover:hover)]:hover:shadow-[0_14px_28px_rgba(47,41,36,0.12)]",
      );
    }
  });
});

describe("/our-story route", () => {
  it("has noindex page metadata for the over-21 restricted page", () => {
    expect(metadata.title).toBe("Our Story");
    expect(metadata.description).toBe("Crafted with purpose, aged with time.");
    expect(metadata.alternates?.canonical).toBe(
      "https://velarroestate.com/our-story",
    );
    expect(metadata.robots).toMatchObject({ index: false, follow: false });
  });

  it("uses the cookie age state for the route render", async () => {
    vi.mocked(getInitialAgeStateFromCookies).mockResolvedValue("over21");

    render(await OurStoryRoute());

    expect(getInitialAgeStateFromCookies).toHaveBeenCalledOnce();
    expect(
      screen.getByRole("heading", { level: 1, name: "OUR STORY" }),
    ).toBeInTheDocument();
  });
});
