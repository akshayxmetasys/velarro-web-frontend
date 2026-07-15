import { render, screen, within } from "@testing-library/react";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { usePathname } from "next/navigation";
import type { CSSProperties } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ChronicleRoute, { metadata } from "@/app/the-chronicle/page";
import {
  CHRONICLE_APPROVED_IMAGES,
  CHRONICLE_CARD_IMAGE_STATUS,
} from "@/components/m08-chronicle/chronicle-assets";
import { ChroniclePageByAgeState } from "@/components/m08-chronicle/chronicle-page-by-age-state";
import {
  CHRONICLE_CARDS,
  CHRONICLE_FIGMA_NODE,
  CHRONICLE_HERO_COPY,
  CHRONICLE_NEWS_TICKER,
} from "@/components/m08-chronicle/chronicle-data";
import { getInitialAgeStateFromCookies } from "@/lib/age/get-initial-age-state";

vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    preload,
    fill,
    width,
    height,
    className,
    style,
  }: {
    src: string;
    alt: string;
    preload?: boolean;
    fill?: boolean;
    width?: number;
    height?: number;
    className?: string;
    style?: CSSProperties;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      data-preload={preload ? "true" : undefined}
      data-fill={fill ? "true" : undefined}
      data-width={width}
      data-height={height}
      className={className}
      style={style}
    />
  ),
}));

vi.mock("@/lib/age/age-actions", () => ({
  confirmAgeStateAction: vi.fn(),
}));

vi.mock("@/lib/age/get-initial-age-state", () => ({
  getInitialAgeStateFromCookies: vi.fn(),
}));

describe("ChroniclePageByAgeState", () => {
  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValue("/the-chronicle");
  });

  it("shows the age gate for unknown visitors and hides Chronicle content", () => {
    render(<ChroniclePageByAgeState ageState="unknown" />);

    expect(
      screen.getByRole("heading", { name: "Age Verification Required" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: CHRONICLE_HERO_COPY.title }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("International Cigar Day")).not.toBeInTheDocument();
  });

  it("blocks under-21 visitors from Chronicle content", () => {
    render(<ChroniclePageByAgeState ageState="under21" />);

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
      screen.queryByRole("heading", { name: CHRONICLE_HERO_COPY.title }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText(CHRONICLE_HERO_COPY.body)).not.toBeInTheDocument();
    expect(screen.queryByText("International Cigar Day")).not.toBeInTheDocument();
  });

  it("renders the Chronicle page for over-21 visitors", () => {
    render(<ChroniclePageByAgeState ageState="over21" />);

    expect(
      screen.getByRole("navigation", { name: "Main navigation" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: CHRONICLE_HERO_COPY.title,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(CHRONICLE_HERO_COPY.body)).toBeInTheDocument();
    expect(screen.getByText("The Chronicle")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "International Cigar Day",
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByText("VIEW EVENT DETAILS")).toHaveLength(4);
    expect(
      screen.getByRole("heading", { level: 2, name: "Stay in Know" }),
    ).toBeInTheDocument();
  });

  it("uses the approved Chronicle hero Supabase URL", () => {
    const { container } = render(
      <ChroniclePageByAgeState ageState="over21" />,
    );

    const page = container.querySelector("[data-route='/the-chronicle']");
    expect(page).toHaveAttribute("data-figma-node", CHRONICLE_FIGMA_NODE);

    const hero = container.querySelector("[data-section='chronicle-hero']");
    expect(hero).toHaveAttribute("data-figma-node", "14284:63192");

    const heroImage = hero?.querySelector("img");
    expect(heroImage).toHaveAttribute("src", CHRONICLE_APPROVED_IMAGES.hero);
    expect(heroImage).toHaveAttribute("data-preload", "true");
    expect(heroImage).not.toHaveAttribute("data-fill");
    expect(heroImage).toHaveAttribute("data-width", "1440");
    expect(heroImage).toHaveAttribute("data-height", "924");
    expect(heroImage).toHaveAttribute("alt", "");
  });

  it("locks the Chronicle hero to the Figma crop instead of an over-zoomed cover crop", () => {
    const { container } = render(
      <ChroniclePageByAgeState ageState="over21" />,
    );

    const crop = container.querySelector(
      "[data-chronicle-hero-crop='figma-node-14284-63192']",
    );
    expect(crop).toHaveAttribute("data-chronicle-hero-crop-width", "99.99%");
    expect(crop).toHaveAttribute("data-chronicle-hero-crop-height", "141.04%");
    expect(crop).toHaveAttribute("data-chronicle-hero-crop-top", "-22.29%");
    expect(crop).toHaveAttribute("data-chronicle-hero-crop-left", "0");

    const heroImage = crop?.querySelector("img");
    expect(heroImage).toHaveClass("absolute");
    expect(heroImage).toHaveClass("max-w-none");
    expect(heroImage).not.toHaveClass("object-cover");
    expect(heroImage).not.toHaveClass("desktop:scale-[1.41]");
    expect(heroImage).toHaveStyle({
      height: "141.04%",
      objectFit: "fill",
      top: "-22.29%",
      width: "99.99%",
    });
  });

  it("exposes the Figma Chronicle card width and column layout markers", () => {
    const { container } = render(
      <ChroniclePageByAgeState ageState="over21" />,
    );

    const firstCard = container.querySelector(
      "[data-chronicle-card-id='international-cigar-day']",
    );
    expect(firstCard).toHaveAttribute("data-chronicle-layout-card-width", "1054");
    expect(firstCard).toHaveAttribute("data-chronicle-layout-card-padding", "40");
    expect(firstCard).toHaveAttribute("data-chronicle-layout-card-gap", "80");
    expect(firstCard).toHaveClass("desktop:max-w-[1054px]");
    expect(firstCard).toHaveClass("desktop:p-[40px]");
    expect(firstCard).toHaveClass("desktop:gap-[80px]");
    expect(firstCard).toHaveClass("desktop:min-h-[549px]");

    const content = firstCard?.querySelector("[data-chronicle-card-content]");
    expect(content).toHaveAttribute("data-chronicle-layout-content-width", "360");
    expect(content).toHaveClass("desktop:w-[360px]");

    const firstImage = firstCard?.querySelector(
      "[data-chronicle-card-image-status='deferred']",
    );
    expect(firstImage).toHaveAttribute("data-chronicle-layout-image-width", "534");
    expect(firstImage).toHaveAttribute("data-chronicle-layout-image-height", "469");
    expect(firstImage).toHaveClass("desktop:w-[534px]");
    expect(firstImage).toHaveClass("desktop:h-[469px]");

    const laterImages = Array.from(
      container.querySelectorAll(
        "[data-chronicle-card]:not([data-chronicle-card-id='international-cigar-day']) [data-chronicle-card-image-status='deferred']",
      ),
    );
    expect(laterImages).toHaveLength(3);
    for (const image of laterImages) {
      expect(image).toHaveAttribute("data-chronicle-layout-image-width", "534");
      expect(image).toHaveAttribute("data-chronicle-layout-image-height", "479");
      expect(image).toHaveClass("desktop:w-[534px]");
      expect(image).toHaveClass("desktop:h-[479px]");
    }
  });

  it("uses Velarro typography tokens for Chronicle hero and card text", () => {
    const { container } = render(
      <ChroniclePageByAgeState ageState="over21" />,
    );

    expect(
      container.querySelector("[data-chronicle-typography='hero-title']"),
    ).toHaveClass("font-[family-name:var(--velarro-display-light-font-family)]");
    expect(
      container.querySelector("[data-chronicle-typography='hero-title']"),
    ).toHaveClass("desktop:text-[length:var(--velarro-display-light-font-size)]");
    expect(
      container.querySelector("[data-chronicle-typography='hero-body']"),
    ).toHaveClass("font-[family-name:var(--velarro-body-default-font-family)]");
    expect(
      container.querySelector("[data-chronicle-typography='hero-body']"),
    ).toHaveClass("leading-[var(--velarro-body-default-line-height)]");

    expect(
      container.querySelector("[data-chronicle-typography='card-date']"),
    ).toHaveClass(
      "font-[family-name:var(--velarro-heading-product-cards-font-family)]",
    );
    expect(
      container.querySelector("[data-chronicle-typography='card-title']"),
    ).toHaveClass("font-[family-name:var(--velarro-heading-page-font-family)]");
    expect(
      container.querySelector("[data-chronicle-typography='card-body']"),
    ).toHaveClass("font-[family-name:var(--velarro-body-label-font-family)]");
    expect(
      container.querySelector("[data-chronicle-typography='button-text']"),
    ).toHaveClass("font-[family-name:var(--velarro-ui-elements-primary-font-family)]");
  });

  it("renders the Figma news ticker copy", () => {
    render(<ChroniclePageByAgeState ageState="over21" />);

    for (const tickerItem of CHRONICLE_NEWS_TICKER) {
      expect(screen.getByText(tickerItem)).toBeInTheDocument();
    }
  });

  it("renders four Chronicle cards with deferred image markers", () => {
    const { container } = render(
      <ChroniclePageByAgeState ageState="over21" />,
    );

    const cards = Array.from(container.querySelectorAll("[data-chronicle-card]"));
    expect(cards).toHaveLength(CHRONICLE_CARDS.length);

    for (const cardData of CHRONICLE_CARDS) {
      const card = container.querySelector(
        `[data-chronicle-card-id='${cardData.id}']`,
      );
      expect(card).not.toBeNull();
      expect(card).toHaveAttribute("data-figma-node", cardData.figmaNodeId);
      expect(
        within(card as HTMLElement).getByRole("heading", {
          level: 2,
          name: cardData.title,
        }),
      ).toBeInTheDocument();
      expect(within(card as HTMLElement).getByText(cardData.date)).toBeInTheDocument();

      const placeholder = card?.querySelector(
        "[data-chronicle-card-image-status='deferred']",
      );
      expect(placeholder).not.toBeNull();
      expect(placeholder).toHaveAttribute(
        "data-chronicle-card-image-status",
        CHRONICLE_CARD_IMAGE_STATUS,
      );
      expect(placeholder).toHaveAttribute(
        "data-deferred-image-key",
        cardData.deferredImageKey,
      );
      expect(placeholder).toHaveAttribute("data-figma-node", cardData.imageNodeId);
      expect(placeholder?.querySelector("img")).toBeNull();
    }
  });

  it("does not use temporary Figma URLs or local M08 images", () => {
    const { container } = render(
      <ChroniclePageByAgeState ageState="over21" />,
    );

    expect(container.innerHTML).not.toContain("figma.com");
    expect(container.innerHTML).not.toContain("mcp/asset");
    expect(container.innerHTML).not.toContain("/images/m08");
    expect(
      existsSync(join(process.cwd(), "public", "images", "m08")),
    ).toBe(false);
    expect(
      existsSync(join(process.cwd(), "public", "images", "m08-chronicle")),
    ).toBe(false);
  });

  it("keeps shared navbar and sidebar links intact", () => {
    render(<ChroniclePageByAgeState ageState="over21" />);

    expect(
      screen.getByRole("link", { name: "Go to Velarro homepage" }),
    ).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Our Story" })).toHaveAttribute(
      "href",
      "/our-story",
    );
    expect(screen.getByRole("link", { name: "The Estate" })).toHaveAttribute(
      "href",
      "/the-estate",
    );
  });
});

describe("/the-chronicle route", () => {
  it("has noindex page metadata for the age-gated page", () => {
    expect(metadata.title).toBe("The Chronicle");
    expect(metadata.description).toBe(
      "Latest Velarro stories, product unveilings, special events, and lifestyle experiences.",
    );
    expect(metadata.alternates?.canonical).toBe(
      "https://velarroestate.com/the-chronicle",
    );
    expect(metadata.robots).toMatchObject({ index: false, follow: false });
  });

  it("uses the cookie age state for the route render", async () => {
    vi.mocked(getInitialAgeStateFromCookies).mockResolvedValue("over21");

    render(await ChronicleRoute());

    expect(getInitialAgeStateFromCookies).toHaveBeenCalledOnce();
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: CHRONICLE_HERO_COPY.title,
      }),
    ).toBeInTheDocument();
  });
});
