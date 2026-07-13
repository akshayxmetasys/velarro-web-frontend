import { render, screen, within } from "@testing-library/react";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it, vi } from "vitest";
import TheEstateRoute, { metadata } from "@/app/the-estate/page";
import { THE_ESTATE_APPROVED_IMAGES } from "@/components/m03-estate/the-estate-assets";
import { TheEstatePageByAgeState } from "@/components/m03-estate/the-estate-page-by-age-state";
import {
  THE_ESTATE_CATEGORY_LABELS,
  THE_ESTATE_PRODUCTS,
} from "@/components/m03-estate/the-estate-data";
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

describe("TheEstatePageByAgeState", () => {
  it("shows the age gate for unknown visitors and hides Estate content", () => {
    render(<TheEstatePageByAgeState ageState="unknown" />);

    expect(
      screen.getByRole("heading", { name: "Age Verification Required" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "COLLECTOR SERIES" }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("The Humidor")).not.toBeInTheDocument();
  });

  it("blocks under-21 visitors from restricted Estate content", () => {
    render(<TheEstatePageByAgeState ageState="under21" />);

    expect(
      screen.getByRole("heading", { name: "Access restricted" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "COLLECTOR SERIES" }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Limited Compendium")).not.toBeInTheDocument();
    expect(
      screen.queryByAltText("Collector Series cigars arranged with estate accessories"),
    ).not.toBeInTheDocument();
  });

  it("renders the Figma Estate/Humidor sections for over-21 visitors", () => {
    render(<TheEstatePageByAgeState ageState="over21" />);

    expect(
      screen.getByRole("navigation", { name: "Main navigation" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: "COLLECTOR SERIES" }),
    ).toBeInTheDocument();
    expect(screen.getByText("THE HUMIDOR")).toBeInTheDocument();
    expect(screen.getByText("THE HOUSE")).toBeInTheDocument();
    expect(screen.getByText("Limited Compendium")).toBeInTheDocument();
    expect(screen.getByText("Primera Cosecha")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Stay in Know" }),
    ).toBeInTheDocument();
  });

  it("uses the approved hero and product image URLs", () => {
    const { container } = render(
      <TheEstatePageByAgeState ageState="over21" />,
    );

    expect(
      screen.getByAltText("Collector Series cigars arranged with estate accessories"),
    ).toHaveAttribute(
      "src",
      THE_ESTATE_APPROVED_IMAGES.collectorSeriesHeroBackground,
    );

    for (const product of THE_ESTATE_PRODUCTS) {
      expect(screen.getByAltText(product.imageAlt)).toHaveAttribute(
        "src",
        product.imageUrl,
      );
    }

    expect(container.innerHTML).not.toContain("figma.com");
    expect(container.innerHTML).not.toContain("mcp/asset");
  });

  it("renders category placeholders as explicitly deferred image areas", () => {
    const { container } = render(
      <TheEstatePageByAgeState ageState="over21" />,
    );

    for (const category of THE_ESTATE_CATEGORY_LABELS) {
      expect(screen.getByText(category.label)).toBeInTheDocument();
      expect(
        screen.getByLabelText(`${category.label} category image deferred`),
      ).toHaveAttribute("data-image-status", "deferred");
    }

    expect(container.innerHTML).not.toContain("figma.com");
    expect(container.innerHTML).not.toContain("mcp/asset");
  });

  it("renders product card copy and deferred explore controls", () => {
    render(<TheEstatePageByAgeState ageState="over21" />);

    for (const product of THE_ESTATE_PRODUCTS) {
      const card = screen.getByText(product.name).closest("article");

      expect(card).not.toBeNull();
      expect(within(card as HTMLElement).getByText(product.vitola)).toBeInTheDocument();
      expect(
        within(card as HTMLElement).getByText(new RegExp(product.ringGauge)),
      ).toBeInTheDocument();
      expect(within(card as HTMLElement).getByText(product.notes)).toBeInTheDocument();
      expect(
        within(card as HTMLElement).getByRole("button", {
          name: new RegExp(`Explore ${product.name}`),
        }),
      ).toBeDisabled();
    }
  });
});

describe("/the-estate route", () => {
  it("has noindex page metadata for the over-21 restricted page", () => {
    expect(metadata.title).toBe("The Estate");
    expect(metadata.description).toBe("Collector Series cigars from The Humidor.");
    expect(metadata.alternates?.canonical).toBe(
      "https://velarroestate.com/the-estate",
    );
    expect(metadata.robots).toMatchObject({ index: false, follow: false });
  });

  it("uses the cookie age state for the route render", async () => {
    vi.mocked(getInitialAgeStateFromCookies).mockResolvedValue("over21");

    render(await TheEstateRoute());

    expect(getInitialAgeStateFromCookies).toHaveBeenCalledOnce();
    expect(
      screen.getByRole("heading", { level: 1, name: "COLLECTOR SERIES" }),
    ).toBeInTheDocument();
  });

  it("does not add local M03 image files", () => {
    expect(
      existsSync(join(process.cwd(), "public", "images", "m03")),
    ).toBe(false);
    expect(
      existsSync(join(process.cwd(), "public", "images", "m03-estate")),
    ).toBe(false);
  });
});
