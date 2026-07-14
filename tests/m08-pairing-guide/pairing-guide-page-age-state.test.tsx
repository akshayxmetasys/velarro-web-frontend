import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { usePathname } from "next/navigation";
import type { CSSProperties } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import PairingGuideRoute, { metadata } from "@/app/pairing-guide/page";
import {
  PAIRING_GUIDE_APPROVED_IMAGES,
  PAIRING_GUIDE_CARD_BACKGROUND_STATUS,
} from "@/components/m08-pairing-guide/pairing-guide-assets";
import { PairingGuidePageByAgeState } from "@/components/m08-pairing-guide/pairing-guide-page-by-age-state";
import {
  PAIRING_GUIDE_CARDS,
  PAIRING_GUIDE_CTA_COPY,
  PAIRING_GUIDE_FIGMA_NODE,
  PAIRING_GUIDE_HERO_COPY,
  PAIRING_GUIDE_SECTION_COPY,
} from "@/components/m08-pairing-guide/pairing-guide-data";
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

describe("PairingGuidePageByAgeState", () => {
  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValue("/pairing-guide");
  });

  it("shows the age gate for unknown visitors and hides Pairing Guide content", () => {
    render(<PairingGuidePageByAgeState ageState="unknown" />);

    expect(
      screen.getByRole("heading", { name: "Age Verification Required" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: PAIRING_GUIDE_HERO_COPY.title }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Rum & Cigars")).not.toBeInTheDocument();
  });

  it("blocks under-21 visitors from Pairing Guide content", () => {
    render(<PairingGuidePageByAgeState ageState="under21" />);

    expect(
      screen.getByRole("heading", { name: "Access restricted" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: PAIRING_GUIDE_HERO_COPY.title }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText(PAIRING_GUIDE_HERO_COPY.body)).not.toBeInTheDocument();
    expect(screen.queryByText("Rum & Cigars")).not.toBeInTheDocument();
  });

  it("renders the Pairing Guide page for over-21 visitors", () => {
    render(<PairingGuidePageByAgeState ageState="over21" />);

    expect(
      screen.getByRole("navigation", { name: "Main navigation" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: PAIRING_GUIDE_HERO_COPY.title,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(PAIRING_GUIDE_HERO_COPY.body)).toBeInTheDocument();
    expect(screen.getByText("Pairing guide")).toBeInTheDocument();
    expect(screen.getByText(PAIRING_GUIDE_SECTION_COPY.eyebrow)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: PAIRING_GUIDE_SECTION_COPY.title,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: PAIRING_GUIDE_CTA_COPY.title,
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByText("EXPLORE")).toHaveLength(6);
    expect(screen.getByText(PAIRING_GUIDE_CTA_COPY.button)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Stay in Know" }),
    ).toBeInTheDocument();
  });

  it("uses the approved Pairing Guide hero Supabase URL and Figma crop", () => {
    const { container } = render(
      <PairingGuidePageByAgeState ageState="over21" />,
    );

    const page = container.querySelector("[data-route='/pairing-guide']");
    expect(page).toHaveAttribute("data-figma-node", PAIRING_GUIDE_FIGMA_NODE);

    const hero = container.querySelector("[data-section='pairing-guide-hero']");
    expect(hero).toHaveAttribute("data-figma-node", "14585:40485");

    const crop = container.querySelector(
      "[data-pairing-guide-hero-crop='exact-figma-node-14406-85076']",
    );
    expect(crop).toHaveAttribute(
      "data-figma-crop",
      "pairing-guide-hero-exact-14406-85076",
    );
    expect(crop).toHaveAttribute("data-pairing-guide-hero-crop-width", "100%");
    expect(crop).toHaveAttribute(
      "data-pairing-guide-hero-crop-height",
      "960px",
    );
    expect(crop).toHaveAttribute(
      "data-pairing-guide-hero-crop-top",
      "-72px",
    );
    expect(crop).toHaveAttribute("data-pairing-guide-hero-crop-left", "0");
    expect(crop).toHaveAttribute(
      "data-pairing-guide-hero-figma-source-node",
      "14406:85076",
    );

    const heroImage = hero?.querySelector("img");
    expect(heroImage).toHaveAttribute("src", PAIRING_GUIDE_APPROVED_IMAGES.hero);
    expect(heroImage).toHaveAttribute("width", "1440");
    expect(heroImage).toHaveAttribute("height", "960");
    expect(heroImage).toHaveAttribute(
      "data-figma-crop",
      "pairing-guide-hero-exact-14406-85076",
    );
    expect(heroImage).toHaveAttribute("alt", "");
    expect(heroImage).toHaveClass("absolute");
    expect(heroImage).toHaveClass("left-0");
    expect(heroImage).toHaveClass("top-[-72px]");
    expect(heroImage).toHaveClass("h-[960px]");
    expect(heroImage).toHaveClass("w-full");
    expect(heroImage).toHaveClass("max-w-none");
    expect(heroImage).toHaveStyle({
      height: "960px",
      objectFit: "fill",
      position: "absolute",
      top: "-72px",
      width: "100%",
    });
  });

  it("renders six cards with explicitly deferred background markers and no images", () => {
    const { container } = render(
      <PairingGuidePageByAgeState ageState="over21" />,
    );

    const cards = Array.from(
      container.querySelectorAll("[data-pairing-guide-card]"),
    );
    expect(cards).toHaveLength(PAIRING_GUIDE_CARDS.length);

    for (const cardData of PAIRING_GUIDE_CARDS) {
      const card = container.querySelector(
        `[data-pairing-guide-card-id='${cardData.id}']`,
      );
      expect(card).not.toBeNull();
      expect(card).toHaveAttribute("data-figma-node", cardData.figmaNodeId);
      expect(card).toHaveAttribute("data-pairing-guide-layout-card-width", "626");
      expect(card).toHaveAttribute("data-pairing-guide-layout-card-height", "398");
      expect(
        within(card as HTMLElement).getByRole("heading", {
          level: 3,
          name: cardData.title,
        }),
      ).toBeInTheDocument();
      expect(within(card as HTMLElement).getByText(cardData.body)).toBeInTheDocument();

      const background = card?.querySelector(
        "[data-pairing-guide-card-background-status='deferred']",
      );
      expect(background).not.toBeNull();
      expect(background).toHaveAttribute(
        "data-pairing-guide-card-background-status",
        PAIRING_GUIDE_CARD_BACKGROUND_STATUS,
      );
      expect(background).toHaveAttribute(
        "data-deferred-image-key",
        cardData.deferredImageKey,
      );
      expect(background?.querySelector("img")).toBeNull();
    }
  });

  it("exposes the Figma card grid layout markers", () => {
    const { container } = render(
      <PairingGuidePageByAgeState ageState="over21" />,
    );

    const grid = container.querySelector("[data-pairing-guide-layout-grid-width]");
    expect(grid).toHaveAttribute("data-pairing-guide-layout-grid-width", "1282");
    expect(grid).toHaveAttribute("data-pairing-guide-layout-column-gap", "28");
    expect(grid).toHaveAttribute("data-pairing-guide-layout-row-gap", "80");
    expect(grid).toHaveClass("desktop:grid-cols-2");
    expect(grid).toHaveClass("desktop:gap-x-[28px]");
    expect(grid).toHaveClass("gap-y-[80px]");
  });

  it("uses Velarro typography tokens for Pairing Guide card titles, body, and buttons", () => {
    const { container } = render(
      <PairingGuidePageByAgeState ageState="over21" />,
    );

    const firstCard = container.querySelector("[data-pairing-guide-card]");
    expect(firstCard).not.toBeNull();

    const title = firstCard?.querySelector(
      "[data-pairing-guide-typography='card-title']",
    );
    expect(title).toHaveAttribute(
      "data-pairing-guide-typography-font",
      "velarro-display-light",
    );
    expect(title).toHaveAttribute("data-pairing-guide-typography-size", "24");
    expect(title).toHaveAttribute("data-pairing-guide-typography-weight", "300");
    expect(title).toHaveAttribute(
      "data-pairing-guide-typography-figma-letter-spacing",
      "-0.12px",
    );
    expect(title).toHaveClass(
      "font-[family-name:var(--velarro-display-light-font-family)]",
    );
    expect(title).toHaveClass("text-[24px]");
    expect(title).toHaveClass("font-light");
    expect(title).toHaveClass("leading-normal");
    expect(title).toHaveClass("tracking-[0]");

    const body = firstCard?.querySelector(
      "[data-pairing-guide-typography='card-body']",
    );
    expect(body).toHaveAttribute(
      "data-pairing-guide-typography-font",
      "velarro-heading-product-cards",
    );
    expect(body).toHaveAttribute("data-pairing-guide-typography-size", "16");
    expect(body).toHaveAttribute("data-pairing-guide-typography-weight", "400");
    expect(body).toHaveClass(
      "font-[family-name:var(--velarro-heading-product-cards-font-family)]",
    );
    expect(body).toHaveClass(
      "text-[length:var(--velarro-heading-product-cards-font-size)]",
    );
    expect(body).toHaveClass("font-normal");
    expect(body).toHaveClass("leading-[24px]");
    expect(body).toHaveClass("desktop:w-[489px]");

    const button = firstCard?.querySelector(
      "[data-pairing-guide-typography='button-text']",
    );
    expect(button).toHaveAttribute(
      "data-pairing-guide-typography-font",
      "velarro-ui-elements-primary",
    );
    expect(button).toHaveAttribute("data-pairing-guide-typography-size", "16");
    expect(button).toHaveAttribute("data-pairing-guide-typography-weight", "400");
    expect(button).toHaveClass(
      "font-[family-name:var(--velarro-ui-elements-primary-font-family)]",
    );
    expect(button).toHaveClass(
      "text-[length:var(--velarro-ui-elements-primary-font-size)]",
    );
    expect(button).toHaveClass("font-normal");
    expect(button).toHaveClass("uppercase");
  });

  it("does not use temporary Figma URLs, unapproved card images, or local M08 images", () => {
    const { container } = render(
      <PairingGuidePageByAgeState ageState="over21" />,
    );

    expect(container.innerHTML).not.toContain("figma.com");
    expect(container.innerHTML).not.toContain("mcp/asset");
    expect(container.innerHTML).not.toContain("/images/m08");
    expect(container.innerHTML).not.toContain("unsplash");
    expect(
      existsSync(join(process.cwd(), "public", "images", "m08")),
    ).toBe(false);
    expect(
      existsSync(join(process.cwd(), "public", "images", "m08-pairing-guide")),
    ).toBe(false);
  });

  it("keeps shared sidebar routes intact and marks Pairing Guide implemented", async () => {
    const user = userEvent.setup();
    render(<PairingGuidePageByAgeState ageState="over21" />);

    await user.click(screen.getByRole("button", { name: "Open main menu" }));

    const dialog = screen.getByRole("dialog", { name: "Estate Index" });
    const menu = within(dialog).getByRole("navigation", { name: "Main menu" });

    expect(
      within(menu).getByRole("link", { name: "Estate Index" }),
    ).toHaveAttribute("href", "/the-estate");
    expect(within(menu).getByRole("link", { name: "The House" })).toHaveAttribute(
      "href",
      "/the-estate/the-house",
    );
    expect(within(menu).getByRole("link", { name: "The Vault" })).toHaveAttribute(
      "href",
      "/the-vault",
    );
    expect(
      within(menu).getByRole("link", { name: "News & Events" }),
    ).toHaveAttribute("href", "/the-chronicle");

    const pairingGuideLink = within(menu).getByRole("link", {
      name: "Pairing Guide",
    });
    expect(pairingGuideLink).toHaveAttribute("href", "/pairing-guide");
    expect(pairingGuideLink).toHaveAttribute("aria-current", "page");
    expect(pairingGuideLink).toHaveAttribute("data-route-implemented", "true");
  });
});

describe("/pairing-guide route", () => {
  it("has noindex page metadata for the age-gated page", () => {
    expect(metadata.title).toBe("Pairing Guide");
    expect(metadata.description).toBe(
      "Explore cigar pairing stories and guides from Velarro Estate.",
    );
    expect(metadata.alternates?.canonical).toBe(
      "https://velarroestate.com/pairing-guide",
    );
    expect(metadata.robots).toMatchObject({ index: false, follow: false });
  });

  it("uses the cookie age state for the route render", async () => {
    vi.mocked(getInitialAgeStateFromCookies).mockResolvedValue("over21");

    render(await PairingGuideRoute());

    expect(getInitialAgeStateFromCookies).toHaveBeenCalledOnce();
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: PAIRING_GUIDE_HERO_COPY.title,
      }),
    ).toBeInTheDocument();
  });
});
