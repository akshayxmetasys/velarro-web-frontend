import { render, screen, within } from "@testing-library/react";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { usePathname } from "next/navigation";
import type { CSSProperties } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import PairingGuideRoute, { metadata } from "@/app/pairing-guide/page";
import {
  PAIRING_GUIDE_APPROVED_IMAGES,
  PAIRING_GUIDE_CARD_IMAGES,
} from "@/components/m08-pairing-guide/pairing-guide-assets";
import { PairingGuidePageByAgeState } from "@/components/m08-pairing-guide/pairing-guide-page-by-age-state";
import {
  PAIRING_GUIDE_CARDS,
  PAIRING_GUIDE_CARD_OVERLAY,
  PAIRING_GUIDE_CTA_COPY,
  PAIRING_GUIDE_FIGMA_NODE,
  PAIRING_GUIDE_HERO_COPY,
  PAIRING_GUIDE_SECTION_COPY,
} from "@/components/m08-pairing-guide/pairing-guide-data";
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

function publicImagePath(src: string): string {
  return join(process.cwd(), "public", ...src.replace(/^\//, "").split("/"));
}

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
      screen.getByRole("navigation", { name: "Under-21 navigation" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: "THE ROASTERY" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: PAIRING_GUIDE_HERO_COPY.title }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Rum & Cigars")).not.toBeInTheDocument();
  });

  it("renders Pairing Guide structure for over-21 visitors", () => {
    const { container } = render(
      <PairingGuidePageByAgeState ageState="over21" />,
    );

    expect(
      screen.getByRole("navigation", { name: "Main navigation" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: PAIRING_GUIDE_HERO_COPY.title,
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
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
    expect(container.querySelectorAll("article[data-pairing-guide-card]")).toHaveLength(
      6,
    );

    const titles = PAIRING_GUIDE_CARDS.map((card) => card.title);
    for (const title of titles) {
      expect(
        screen.getByRole("heading", { level: 3, name: title }),
      ).toBeInTheDocument();
    }

    const page = container.querySelector("[data-route='/pairing-guide']");
    expect(page).toHaveAttribute("data-figma-node", PAIRING_GUIDE_FIGMA_NODE);
    expect(page?.className).not.toMatch(
      /overflow-x-hidden|overflow-x-clip|overflow-hidden|overflow-clip/,
    );
    expect(container.querySelector("main")?.className ?? "").not.toMatch(
      /overflow-x-hidden|overflow-x-clip|overflow-hidden|overflow-clip/,
    );

    const hero = container.querySelector("[data-section='pairing-guide-hero']");
    const crumbs = container.querySelector(
      "[data-section='pairing-guide-breadcrumbs']",
    );
    const cards = container.querySelector("[data-section='pairing-guide-cards']");
    const cta = container.querySelector("[data-section='pairing-guide-cta']");
    expect(hero).toHaveAttribute("data-figma-node", "14585:40485");
    expect(hero?.querySelector("[data-pairing-guide-hero-figma-source-node]")).toHaveAttribute(
      "data-pairing-guide-hero-figma-source-node",
      "14406:85076",
    );
    expect(crumbs).not.toBeNull();
    expect(cards).not.toBeNull();
    expect(cta).not.toBeNull();
    expect(
      screen.getByRole("heading", { level: 2, name: "Stay in Know" }),
    ).toBeInTheDocument();
  });

  it("keeps the approved Pairing Guide hero crop", () => {
    const { container } = render(
      <PairingGuidePageByAgeState ageState="over21" />,
    );

    const crop = container.querySelector(
      "[data-pairing-guide-hero-crop='exact-figma-node-14406-85076']",
    );
    expect(crop).toHaveAttribute("data-pairing-guide-hero-crop-width", "100%");
    expect(crop).toHaveAttribute("data-pairing-guide-hero-crop-height", "960px");
    expect(crop).toHaveAttribute("data-pairing-guide-hero-crop-top", "-72px");
    expect(crop).toHaveAttribute("data-pairing-guide-hero-crop-left", "0");

    const heroImage = crop?.querySelector("img");
    expect(heroImage).toHaveAttribute("src", PAIRING_GUIDE_APPROVED_IMAGES.hero);
    expect(heroImage).toHaveAttribute("alt", "");
    expect(heroImage).toHaveAttribute("width", "1440");
    expect(heroImage).toHaveAttribute("height", "960");
    expect(heroImage?.getAttribute("src")).not.toContain("figma.com");
    expect(heroImage).toHaveStyle({
      height: "960px",
      objectFit: "fill",
      top: "-72px",
      width: "100%",
    });
    expect(heroImage).not.toHaveClass("object-cover");
  });

  it("renders six permanent local card images without placeholders", () => {
    const { container } = render(
      <PairingGuidePageByAgeState ageState="over21" />,
    );

    const paths = Object.values(PAIRING_GUIDE_CARD_IMAGES);
    expect(paths).toHaveLength(6);
    expect(new Set(paths).size).toBe(6);

    for (const cardData of PAIRING_GUIDE_CARDS) {
      const card = container.querySelector(
        `[data-pairing-guide-card-id='${cardData.id}']`,
      );
      expect(card).toHaveAttribute("data-figma-node", cardData.figmaNodeId);
      expect(within(card as HTMLElement).getByText(cardData.body)).toBeInTheDocument();

      const imageRegion = card?.querySelector("[data-pairing-guide-card-image]");
      expect(imageRegion).toHaveAttribute(
        "data-pairing-guide-card-image-id",
        cardData.id,
      );
      expect(imageRegion).toHaveAttribute(
        "data-pairing-guide-card-image-node",
        cardData.figmaNodeId,
      );
      expect(imageRegion).toHaveAttribute(
        "data-pairing-guide-card-image-object-position",
        cardData.objectPosition,
      );
      expect(imageRegion).toHaveAttribute(
        "data-pairing-guide-card-image-blur",
        String(cardData.blurPx),
      );
      expect(imageRegion?.getAttribute("data-deferred-image-key")).toBeNull();
      expect(
        imageRegion?.getAttribute("data-pairing-guide-card-background-status"),
      ).toBeNull();

      const img = imageRegion?.querySelector("img");
      expect(img).toHaveAttribute("src", cardData.imageSrc);
      expect(img).toHaveAttribute("alt", cardData.imageAlt);
      expect(img?.getAttribute("alt")?.trim().length).toBeGreaterThan(0);
      expect(img).toHaveAttribute("data-width", String(cardData.intrinsicWidth));
      expect(img).toHaveAttribute("data-height", String(cardData.intrinsicHeight));
      expect(img?.getAttribute("src")).toMatch(/^\/images\/m08-pairing-guide\//);
      expect(img?.getAttribute("src")).not.toMatch(/^https?:/);
      expect(img?.getAttribute("src")).not.toContain("figma.com");
      expect(img?.getAttribute("src")).not.toContain("mcp/asset");
      expect(img?.getAttribute("src")).not.toContain("unsplash");
      expect(img).toHaveClass("object-cover");
      expect(existsSync(publicImagePath(cardData.imageSrc))).toBe(true);

      const overlay = imageRegion?.querySelector(
        "[data-pairing-guide-card-overlay]",
      );
      expect(overlay).toHaveAttribute(
        "data-pairing-guide-card-overlay",
        PAIRING_GUIDE_CARD_OVERLAY,
      );
    }

    expect(container.innerHTML).not.toContain("data-deferred-image-key");
    expect(container.innerHTML).not.toContain(
      "data-pairing-guide-card-background-status",
    );
    expect(container.innerHTML).not.toContain("linear-gradient(115deg");
    expect(container.innerHTML).not.toContain("rotate-[32deg]");
  });

  it("exposes desktop geometry markers", () => {
    const { container } = render(
      <PairingGuidePageByAgeState ageState="over21" />,
    );

    const grid = container.querySelector("[data-pairing-guide-card-grid]");
    expect(grid).toHaveAttribute("data-pairing-guide-layout-grid-width", "1282");
    expect(grid).toHaveAttribute("data-pairing-guide-layout-column-gap", "28");
    expect(grid).toHaveAttribute("data-pairing-guide-layout-row-gap", "80");

    const firstCard = container.querySelector(
      "[data-pairing-guide-card-id='rum-and-cigars']",
    );
    expect(firstCard).toHaveAttribute("data-pairing-guide-layout-card-width", "626");
    expect(firstCard).toHaveAttribute("data-pairing-guide-layout-card-height", "398");
    expect(firstCard).toHaveAttribute("data-pairing-guide-layout-content-left", "55");
    expect(firstCard).toHaveAttribute("data-pairing-guide-layout-content-top", "88");
    expect(firstCard).toHaveAttribute("data-pairing-guide-layout-body-width", "489");

    const cta = container.querySelector("[data-section='pairing-guide-cta']");
    expect(cta).toHaveAttribute("data-pairing-guide-layout-cta-width", "1282");
    expect(cta).toHaveAttribute(
      "data-pairing-guide-layout-cta-content-width",
      "874",
    );
  });

  it("keeps pairing controls truthful and disabled", () => {
    const { container } = render(
      <PairingGuidePageByAgeState ageState="over21" />,
    );

    const explores = container.querySelectorAll(
      "button[data-pairing-guide-explore='deferred']",
    );
    expect(explores).toHaveLength(6);
    for (const button of Array.from(explores)) {
      expect(button).toBeDisabled();
      expect(button.getAttribute("href")).toBeNull();
      expect(button.getAttribute("onclick")).toBeNull();
      expect(button.getAttribute("aria-label")).toMatch(/deferred/i);
    }

    const findPairing = container.querySelector(
      "button[data-pairing-guide-find-pairing='deferred']",
    );
    expect(findPairing).toBeDisabled();
    expect(findPairing?.getAttribute("href")).toBeNull();
    expect(findPairing?.getAttribute("aria-label")).toMatch(/deferred/i);
    expect(screen.getAllByText("EXPLORE")).toHaveLength(6);
    expect(screen.getByText(PAIRING_GUIDE_CTA_COPY.button)).toBeInTheDocument();
  });

  it("preserves exact copy and card order", () => {
    const { container } = render(
      <PairingGuidePageByAgeState ageState="over21" />,
    );

    expect(screen.getByText(PAIRING_GUIDE_HERO_COPY.body)).toBeInTheDocument();
    expect(screen.getByText(PAIRING_GUIDE_SECTION_COPY.eyebrow)).toBeInTheDocument();
    expect(screen.getByText(PAIRING_GUIDE_CTA_COPY.body)).toBeInTheDocument();

    const cards = Array.from(
      container.querySelectorAll("[data-pairing-guide-card]"),
    );
    expect(
      cards.map((card) => card.getAttribute("data-pairing-guide-card-id")),
    ).toEqual(PAIRING_GUIDE_CARDS.map((card) => card.id));
  });

  it("keeps shared navbar links intact and does not import Chronicle", () => {
    const { container } = render(
      <PairingGuidePageByAgeState ageState="over21" />,
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
    expect(container.innerHTML).not.toContain("m08-chronicle");
    expect(container.innerHTML).not.toContain("CHRONICLE_");
  });
});

describe("/pairing-guide route", () => {
  it("has noindex page metadata", () => {
    expect(metadata.title).toBe("Pairing Guide");
    expect(metadata.alternates?.canonical).toBe(
      "https://velarroestate.com/pairing-guide",
    );
    expect(metadata.robots).toMatchObject({ index: false, follow: false });
  });

  it("keeps the route manifest age-gated and unchanged", () => {
    const entry = ROUTE_MANIFEST.find((route) => route.route === "/pairing-guide");
    expect(entry).toMatchObject({
      route: "/pairing-guide",
      figmaNodeId: "14406:85066",
      implemented: true,
      public: true,
      indexable: false,
      audience: "age-gated",
    });
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
