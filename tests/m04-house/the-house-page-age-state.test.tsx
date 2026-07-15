import { render, screen, within } from "@testing-library/react";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it, vi } from "vitest";
import TheHouseRoute, { metadata } from "@/app/the-estate/the-house/page";
import { THE_HOUSE_APPROVED_IMAGES } from "@/components/m04-house/the-house-assets";
import { TheHousePageByAgeState } from "@/components/m04-house/the-house-page-by-age-state";
import {
  THE_HOUSE_CATEGORIES,
  THE_HOUSE_PRODUCTS,
} from "@/components/m04-house/the-house-data";
import { getInitialAgeStateFromCookies } from "@/lib/age/get-initial-age-state";
import { M01_HOME_APPROVED_IMAGES } from "@/lib/assets/approved-image-hosts";

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

describe("TheHousePageByAgeState", () => {
  it("shows the age gate for unknown visitors and hides House content", () => {
    render(<TheHousePageByAgeState ageState="unknown" />);

    expect(
      screen.getByRole("heading", { name: "Age Verification Required" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "THE HOUSE" }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Founder\u2019s Boxy hoodie")).not.toBeInTheDocument();
  });

  it("blocks under-21 visitors from restricted House content", () => {
    render(<TheHousePageByAgeState ageState="under21" />);

    expect(
      screen.queryByRole("heading", { name: "Access restricted" }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: "Under-21 navigation" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: "THE ROASTERY" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "THE HOUSE" }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Cacao Chai Reserve")).not.toBeInTheDocument();
    expect(
      screen.queryByAltText("Velarro House hero product arrangement"),
    ).not.toBeInTheDocument();
  });

  it("renders the Figma House sections for over-21 visitors", () => {
    render(<TheHousePageByAgeState ageState="over21" />);

    expect(
      screen.getByRole("navigation", { name: "Main navigation" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: "THE HOUSE" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "THE HUMIDOR" })).toHaveAttribute(
      "href",
      "/the-estate",
    );
    expect(
      screen.getByText("THE HOUSE", { selector: "span[aria-current='page']" }),
    ).toBeInTheDocument();

    for (const category of THE_HOUSE_CATEGORIES) {
      expect(screen.getByText(category.label)).toBeInTheDocument();
    }

    for (const product of THE_HOUSE_PRODUCTS) {
      expect(screen.getByText(product.name)).toBeInTheDocument();
      expect(screen.getByText(product.description)).toBeInTheDocument();
    }

    expect(
      screen.getByRole("heading", { level: 2, name: "Stay in Know" }),
    ).toBeInTheDocument();
  });

  it("uses the approved hero, category, and product image URLs", () => {
    const { container } = render(
      <TheHousePageByAgeState ageState="over21" />,
    );

    expect(
      screen.getByAltText("Velarro House hero product arrangement"),
    ).toHaveAttribute("src", THE_HOUSE_APPROVED_IMAGES.houseHeroAllHouse);
    expect(THE_HOUSE_APPROVED_IMAGES.categoryRoastery).toBe(
      M01_HOME_APPROVED_IMAGES.roasteryHero,
    );

    for (const category of THE_HOUSE_CATEGORIES) {
      expect(screen.getByAltText(category.imageAlt)).toHaveAttribute(
        "src",
        category.imageUrl,
      );
    }

    for (const product of THE_HOUSE_PRODUCTS) {
      expect(screen.getByAltText(product.imageAlt)).toHaveAttribute(
        "src",
        product.imageUrl,
      );
    }

    expect(container.innerHTML).not.toContain("figma.com");
    expect(container.innerHTML).not.toContain("mcp/asset");
  });

  it("renders product cards with deferred Explore controls", () => {
    render(<TheHousePageByAgeState ageState="over21" />);

    for (const product of THE_HOUSE_PRODUCTS) {
      const card = screen.getByText(product.name).closest("article");

      expect(card).not.toBeNull();
      expect(
        within(card as HTMLElement).getByText(product.badge),
      ).toBeInTheDocument();
      expect(
        within(card as HTMLElement).getByLabelText(
          `${product.name} color options`,
        ),
      ).toBeInTheDocument();
      expect(
        within(card as HTMLElement).getByRole("button", {
          name: new RegExp(`Explore ${product.name}`),
        }),
      ).toBeDisabled();
    }
  });

  it("keeps the shared navbar links intact", () => {
    render(<TheHousePageByAgeState ageState="over21" />);

    expect(
      screen.getByRole("link", { name: "Go to Velarro homepage" }),
    ).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Our Story" })).toHaveAttribute(
      "href",
      "/our-story",
    );
    expect(
      screen.getAllByRole("link", { name: "The Estate" })[0],
    ).toHaveAttribute("href", "/the-estate");
  });
});

describe("/the-estate/the-house route", () => {
  it("has noindex page metadata for the over-21 restricted page", () => {
    expect(metadata.title).toBe("The House");
    expect(metadata.description).toBe(
      "Velarro House lifestyle goods from The Estate.",
    );
    expect(metadata.alternates?.canonical).toBe(
      "https://velarroestate.com/the-estate/the-house",
    );
    expect(metadata.robots).toMatchObject({ index: false, follow: false });
  });

  it("uses the cookie age state for the route render", async () => {
    vi.mocked(getInitialAgeStateFromCookies).mockResolvedValue("over21");

    render(await TheHouseRoute());

    expect(getInitialAgeStateFromCookies).toHaveBeenCalledOnce();
    expect(
      screen.getByRole("heading", { level: 1, name: "THE HOUSE" }),
    ).toBeInTheDocument();
  });

  it("does not add local M04 image files", () => {
    expect(
      existsSync(join(process.cwd(), "public", "images", "m04")),
    ).toBe(false);
    expect(
      existsSync(join(process.cwd(), "public", "images", "m04-house")),
    ).toBe(false);
  });
});
