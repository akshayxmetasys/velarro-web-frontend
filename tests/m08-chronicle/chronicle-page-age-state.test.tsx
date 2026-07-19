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
import { ROUTE_MANIFEST } from "@/lib/seo/route-manifest";

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

const PROHIBITED_CHRONICLE_CARD_FILES = [
  "founders-reserve-month.png",
  "international-cigar-day.png",
  "international-tea-day.png",
  "velarro-estate-day.png",
] as const;

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

  it("renders the Chronicle page for over-21 visitors with required structure", () => {
    const { container } = render(
      <ChroniclePageByAgeState ageState="over21" />,
    );

    expect(
      screen.getByRole("navigation", { name: "Main navigation" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: CHRONICLE_HERO_COPY.title,
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(container.querySelectorAll("article[data-chronicle-card]")).toHaveLength(
      4,
    );
    expect(
      screen.getByRole("heading", { level: 2, name: "International Cigar Day" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "International Tea Day" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Founder’s Reserve Month" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Velarro Estate Day" }),
    ).toBeInTheDocument();
    expect(screen.getAllByText("VIEW EVENT DETAILS")).toHaveLength(4);
    expect(
      screen.getByRole("heading", { level: 2, name: "Stay in Know" }),
    ).toBeInTheDocument();

    const page = container.querySelector("[data-route='/the-chronicle']");
    expect(page).toHaveAttribute("data-figma-node", CHRONICLE_FIGMA_NODE);
    expect(page?.className).not.toMatch(/overflow-x-hidden|overflow-x-clip|overflow-hidden|overflow-clip/);

    const main = container.querySelector("main");
    expect(main?.className ?? "").not.toMatch(
      /overflow-x-hidden|overflow-x-clip|overflow-hidden|overflow-clip/,
    );

    const hero = container.querySelector("[data-section='chronicle-hero']");
    const crumbs = container.querySelector("[data-section='chronicle-breadcrumbs']");
    const ticker = container.querySelector("[data-section='chronicle-news-ticker']");
    const cards = container.querySelector("[data-section='chronicle-cards']");
    expect(hero).toHaveAttribute("data-figma-node", "14284:63192");
    expect(crumbs).not.toBeNull();
    expect(ticker).not.toBeNull();
    expect(cards).not.toBeNull();

    const order = [hero, crumbs, ticker, cards]
      .map((node) =>
        Array.from(main?.children ?? []).findIndex((child) =>
          child.contains(node as Node),
        ),
      )
      .filter((index) => index >= 0);
    expect(order).toEqual([...order].sort((a, b) => a - b));
  });

  it("uses the approved Chronicle hero Supabase URL with Figma crop", () => {
    const { container } = render(
      <ChroniclePageByAgeState ageState="over21" />,
    );

    const hero = container.querySelector("[data-section='chronicle-hero']");
    const heroImage = hero?.querySelector("img");
    expect(heroImage).toHaveAttribute("src", CHRONICLE_APPROVED_IMAGES.hero);
    expect(heroImage).toHaveAttribute("data-preload", "true");
    expect(heroImage).not.toHaveAttribute("data-fill");
    expect(heroImage).toHaveAttribute("data-width", "1440");
    expect(heroImage).toHaveAttribute("data-height", "924");
    expect(heroImage).toHaveAttribute("alt", "");
    expect(heroImage?.getAttribute("src")).not.toContain("figma.com");
    expect(heroImage).not.toHaveClass("object-cover");

    const crop = container.querySelector(
      "[data-chronicle-hero-crop='figma-node-14284-63192']",
    );
    expect(crop).toHaveAttribute("data-chronicle-hero-crop-width", "99.99%");
    expect(crop).toHaveAttribute("data-chronicle-hero-crop-height", "141.04%");
    expect(crop).toHaveAttribute("data-chronicle-hero-crop-top", "-22.29%");
    expect(crop).toHaveAttribute("data-chronicle-hero-crop-left", "0");
    expect(heroImage).toHaveStyle({
      height: "141.04%",
      objectFit: "fill",
      top: "-22.29%",
      width: "99.99%",
    });
  });

  it("exposes desktop card geometry markers", () => {
    const { container } = render(
      <ChroniclePageByAgeState ageState="over21" />,
    );

    const stack = container.querySelector("[data-section='chronicle-cards']");
    expect(stack).toHaveAttribute("data-chronicle-layout-stack-gap", "80");

    const firstCard = container.querySelector(
      "[data-chronicle-card-id='international-cigar-day']",
    );
    expect(firstCard).toHaveAttribute("data-chronicle-layout-card-width", "1054");
    expect(firstCard).toHaveAttribute("data-chronicle-layout-card-padding", "40");
    expect(firstCard).toHaveAttribute("data-chronicle-layout-card-gap", "80");
    expect(firstCard).toHaveAttribute("data-chronicle-layout-card-height", "549");
    expect(firstCard).toHaveClass("desktop:max-w-[1054px]");
    expect(firstCard).toHaveClass("desktop:p-[40px]");
    expect(firstCard).toHaveClass("desktop:gap-[80px]");
    expect(firstCard).toHaveClass("desktop:min-h-[549px]");

    const laterCards = Array.from(
      container.querySelectorAll(
        "[data-chronicle-card]:not([data-chronicle-card-id='international-cigar-day'])",
      ),
    );
    expect(laterCards).toHaveLength(3);
    for (const card of laterCards) {
      expect(card).toHaveAttribute("data-chronicle-layout-card-height", "559");
      expect(card).toHaveClass("desktop:min-h-[559px]");
    }

    const content = firstCard?.querySelector("[data-chronicle-card-content]");
    expect(content).toHaveAttribute("data-chronicle-layout-content-width", "360");
    expect(content).toHaveClass("desktop:w-[360px]");

    const firstImage = firstCard?.querySelector("[data-chronicle-card-image]");
    expect(firstImage).toHaveAttribute("data-chronicle-card-image-width", "534");
    expect(firstImage).toHaveAttribute("data-chronicle-card-image-height", "469");
    expect(firstImage).toHaveClass("desktop:w-[534px]");
    expect(firstImage).toHaveClass("desktop:h-[469px]");
  });

  it("renders deferred card artwork surfaces without production images", () => {
    const { container } = render(
      <ChroniclePageByAgeState ageState="over21" />,
    );

    for (const cardData of CHRONICLE_CARDS) {
      const card = container.querySelector(
        `[data-chronicle-card-id='${cardData.id}']`,
      );
      expect(card).not.toBeNull();
      expect(card).toHaveAttribute("data-figma-node", cardData.figmaNodeId);
      expect(within(card as HTMLElement).getByText(cardData.date)).toBeInTheDocument();
      for (const paragraph of cardData.body) {
        expect(within(card as HTMLElement).getByText(paragraph)).toBeInTheDocument();
      }

      const imageRegion = card?.querySelector("[data-chronicle-card-image]");
      expect(imageRegion).not.toBeNull();
      expect(imageRegion).toHaveAttribute(
        "data-chronicle-card-image-id",
        cardData.id,
      );
      expect(imageRegion).toHaveAttribute(
        "data-chronicle-card-image-status",
        CHRONICLE_CARD_IMAGE_STATUS,
      );
      expect(imageRegion).toHaveAttribute(
        "data-deferred-image-key",
        cardData.deferredImageKey,
      );
      expect(imageRegion).toHaveAttribute("data-asset-status", "deferred");
      expect(imageRegion).toHaveAttribute("data-asset-url-status", "none");
      expect(imageRegion).toHaveAttribute("data-figma-node", cardData.imageNodeId);
      expect(imageRegion?.querySelector("img")).toBeNull();
      expect(
        within(card as HTMLElement).getByText(
          `Artwork for ${cardData.title} is deferred pending approved production imagery.`,
        ),
      ).toBeInTheDocument();
    }

    expect(container.querySelectorAll("[data-chronicle-card-image] img")).toHaveLength(
      0,
    );
    expect(container.innerHTML).not.toContain("/images/m08-chronicle/");
    expect(container.innerHTML).not.toContain("linear-gradient(135deg");
    expect(container.innerHTML).not.toContain("rotate-45");
    expect(container.innerHTML).not.toContain("data-chronicle-card-image-overlay");

    for (const name of PROHIBITED_CHRONICLE_CARD_FILES) {
      expect(
        existsSync(join(process.cwd(), "public", "images", "m08-chronicle", name)),
      ).toBe(false);
    }
    expect(existsSync(join(process.cwd(), "public", "images", "m08-chronicle"))).toBe(
      false,
    );
  });

  it("preserves exact ticker and typographic card punctuation", () => {
    render(<ChroniclePageByAgeState ageState="over21" />);

    for (const tickerItem of CHRONICLE_NEWS_TICKER) {
      expect(screen.getByText(tickerItem)).toBeInTheDocument();
    }

    expect(screen.getByText("August 1 – August 31")).toBeInTheDocument();
    expect(screen.getByText("Founder’s Reserve Month")).toBeInTheDocument();
    expect(CHRONICLE_CARDS[2].date).toContain("–");
    expect(CHRONICLE_CARDS[2].title).toContain("’");
  });

  it("keeps VIEW EVENT DETAILS controls truthful and disabled", () => {
    const { container } = render(
      <ChroniclePageByAgeState ageState="over21" />,
    );

    const buttons = container.querySelectorAll(
      "button[data-chronicle-event-details='deferred']",
    );
    expect(buttons).toHaveLength(4);

    for (const button of Array.from(buttons)) {
      expect(button).toBeDisabled();
      expect(button.getAttribute("href")).toBeNull();
      expect(button.getAttribute("onclick")).toBeNull();
      expect(button.getAttribute("aria-label")).toMatch(/deferred/i);
      expect(button.tagName).toBe("BUTTON");
    }

    expect(container.querySelectorAll('a[href*="chronicle"]').length).toBe(0);
  });

  it("uses Velarro typography tokens for Chronicle hero and card text", () => {
    const { container } = render(
      <ChroniclePageByAgeState ageState="over21" />,
    );

    expect(
      container.querySelector("[data-chronicle-typography='hero-title']"),
    ).toHaveClass("font-[family-name:var(--velarro-display-light-font-family)]");
    expect(
      container.querySelector("[data-chronicle-typography='hero-body']"),
    ).toHaveClass("font-[family-name:var(--velarro-body-default-font-family)]");
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
    ).toHaveClass(
      "font-[family-name:var(--velarro-ui-elements-primary-font-family)]",
    );
  });

  it("keeps shared navbar links intact and does not import Pairing Guide", () => {
    const { container } = render(
      <ChroniclePageByAgeState ageState="over21" />,
    );

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
    expect(container.innerHTML).not.toContain("pairing-guide");
    expect(container.innerHTML).not.toContain("PAIRING_GUIDE");
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

  it("keeps the route manifest age-gated and unchanged", () => {
    const entry = ROUTE_MANIFEST.find((route) => route.route === "/the-chronicle");
    expect(entry).toMatchObject({
      route: "/the-chronicle",
      figmaNodeId: "14284:63187",
      implemented: true,
      public: true,
      indexable: false,
      audience: "age-gated",
    });
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
