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
  it("shows the age gate for unknown visitors and hides House page root", () => {
    render(<TheHousePageByAgeState ageState="unknown" />);

    expect(
      screen.getByRole("heading", { name: "Age Verification Required" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "THE HOUSE" }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Founder\u2019s Boxy hoodie")).not.toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="the-house-page"]'),
    ).not.toBeInTheDocument();
  });

  it("blocks under-21 visitors from restricted House content and page root", () => {
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
    expect(
      document.querySelector('[data-slot="the-house-page"]'),
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

  it("preserves verified section DOM order and Figma node contracts", () => {
    const { container } = render(
      <TheHousePageByAgeState ageState="over21" />,
    );

    const orderedSlots = [
      "the-house-hero",
      "the-house-breadcrumbs",
      "the-house-categories",
      "the-house-product-grid",
      "the-house-pagination",
    ];

    const found = orderedSlots.map((slot) => {
      const el = container.querySelector(`[data-slot="${slot}"]`);
      expect(el, slot).not.toBeNull();
      return el!;
    });

    for (let i = 1; i < found.length; i += 1) {
      expect(
        found[i - 1]!.compareDocumentPosition(found[i]!) &
          Node.DOCUMENT_POSITION_FOLLOWING,
      ).toBeTruthy();
    }

    expect(
      container.querySelector('[data-figma-node="16576:96097"]'),
    ).toHaveAttribute("data-slot", "the-house-hero");
    expect(
      container.querySelector('[data-figma-node="16576:96116"]'),
    ).toHaveAttribute("data-slot", "the-house-breadcrumbs");
    expect(
      container.querySelector('[data-figma-node="16576:96106"]'),
    ).toHaveAttribute("data-slot", "the-house-collection-nav");
    expect(
      container.querySelector('[data-figma-node="16576:96105"]'),
    ).toHaveAttribute("data-slot", "the-house-categories");
    expect(
      container.querySelector('[data-figma-node="16576:96117"]'),
    ).toHaveAttribute("data-slot", "the-house-pagination");
    expect(container.innerHTML).not.toContain('data-figma-node="16576:97879"');
    expect(container.innerHTML).not.toContain("MAIN PRODUCT CARD");
  });

  it("applies hero height, crop, and overlay contracts", () => {
    const { container } = render(
      <TheHousePageByAgeState ageState="over21" />,
    );
    const hero = container.querySelector('[data-slot="the-house-hero"]');
    const image = screen.getByAltText("Velarro House hero product arrangement");
    const overlay = container.querySelector(
      '[data-slot="the-house-hero-overlay"]',
    );

    expect(hero).toHaveClass("desktop:h-[471px]");
    expect(image).toHaveClass("object-cover");
    expect(image).toHaveClass("object-center");
    expect(image).toHaveAttribute("data-priority", "true");
    expect(overlay).toHaveClass("bg-[rgba(21,20,20,0.4)]");
    expect(overlay).toHaveAttribute("aria-hidden", "true");
  });

  it("uses breadcrumb hierarchy with Estate as a real parent link", () => {
    render(<TheHousePageByAgeState ageState="over21" />);

    const nav = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(nav).toHaveAttribute("data-figma-node", "16576:96116");

    const home = within(nav).getByRole("link", { name: "Home" });
    expect(home).toHaveAttribute("href", "/");
    expect(home).toHaveClass("focus-visible:ring-2");

    const estate = within(nav).getByRole("link", { name: "The Estate" });
    expect(estate).toHaveAttribute("href", "/the-estate");
    expect(estate).toHaveClass("focus-visible:ring-2");

    const current = within(nav).getByText("The House");
    expect(current).toHaveAttribute("aria-current", "page");
    expect(within(nav).queryByRole("link", { name: "The House" })).toBeNull();
  });

  it("uses navigation semantics for Humidor/House without tab roles", () => {
    const { container } = render(
      <TheHousePageByAgeState ageState="over21" />,
    );

    const collectionNav = screen.getByRole("navigation", {
      name: "Estate collection",
    });
    expect(collectionNav).toHaveClass("gap-[80px]");
    expect(collectionNav).toHaveClass("max-w-[360px]");
    expect(
      within(collectionNav).getByRole("link", { name: "THE HUMIDOR" }),
    ).toHaveAttribute("href", "/the-estate");
    expect(
      within(collectionNav).getByText("THE HOUSE"),
    ).toHaveAttribute("aria-current", "page");
    expect(collectionNav.innerHTML).not.toContain("aria-selected");
    expect(container.querySelector('[role="tab"]')).toBeNull();
    expect(container.querySelector('[role="tablist"]')).toBeNull();
  });

  it("renders six deferred categories in exact order with rail containment", () => {
    const { container } = render(
      <TheHousePageByAgeState ageState="over21" />,
    );

    expect(THE_HOUSE_CATEGORIES.map((c) => c.label)).toEqual([
      "ALL HOUSE",
      "THE ROASTERY",
      "THE T-HUB",
      "THE CLOTHIER",
      "THE SADDLERY",
      "THE CABINET",
    ]);

    const tiles = container.querySelectorAll(
      '[data-slot="the-house-category-tile"]',
    );
    expect(tiles).toHaveLength(6);
    expect(
      Array.from(tiles).map(
        (tile) => tile.querySelector("h3")?.textContent ?? "",
      ),
    ).toEqual(THE_HOUSE_CATEGORIES.map((c) => c.label));

    const rail = container.querySelector(
      '[data-slot="the-house-category-rail"]',
    );
    expect(rail).toHaveAttribute("aria-label", "House categories");
    expect(rail).toHaveClass("overflow-x-auto");
    expect(rail).toHaveClass("max-w-[930px]");
    expect(rail).toHaveClass("gap-[42px]");

    expect(tiles[0]).toHaveAttribute("aria-current", "true");
    const selectedFrame = tiles[0]!.querySelector(".h-\\[136px\\]");
    expect(selectedFrame).not.toBeNull();
    expect(selectedFrame).toHaveClass("w-[135px]");
    expect(selectedFrame).toHaveClass("border-2");

    for (const tile of Array.from(tiles)) {
      expect(tile.querySelector("a")).toBeNull();
    }
  });

  it("renders six products in order with optional verified swatches", () => {
    const { container } = render(
      <TheHousePageByAgeState ageState="over21" />,
    );

    const cards = container.querySelectorAll(
      '[data-slot="the-house-product-card"]',
    );
    expect(cards).toHaveLength(6);
    expect(
      Array.from(cards).map(
        (card) => card.querySelector("h3")?.textContent ?? "",
      ),
    ).toEqual(THE_HOUSE_PRODUCTS.map((product) => product.name));

    const grid = container.querySelector(
      '[data-slot="the-house-product-grid"]',
    );
    expect(grid).toHaveClass("gap-x-[45px]");
    expect(grid).toHaveClass("gap-y-[34px]");
    expect(grid).toHaveClass("items-center");
    expect(grid).toHaveClass("desktop:grid-cols-3");
    expect(grid).toHaveClass("max-w-[966px]");

    expect(cards[0]).toHaveClass("max-w-[292px]");
    expect(cards[0]).toHaveClass("p-[14px]");
    expect(cards[0]).toHaveClass("rounded-[8px]");
    expect(cards[0]).toHaveClass("bg-background-section");
    expect(cards[0]).toHaveClass("motion-reduce:transition-none");
    expect(cards[0]).not.toHaveAttribute("tabindex");
    expect(cards[0]!.className).not.toMatch(/shadow-card/);

    const imageFrame = cards[0]!.querySelector(
      '[data-slot="the-house-product-image-frame"]',
    );
    expect(imageFrame).toHaveClass("h-[265px]");
    expect(imageFrame).toHaveClass("w-full");

    const withSwatches = THE_HOUSE_PRODUCTS.filter(
      (product) => product.swatches.length > 0,
    );
    const withoutSwatches = THE_HOUSE_PRODUCTS.filter(
      (product) => product.swatches.length === 0,
    );

    expect(withSwatches.map((p) => p.id)).toEqual([
      "founders-boxy-hoodie",
      "estate-oversized-tshirt",
    ]);
    expect(withoutSwatches.map((p) => p.id)).toEqual([
      "estate-espresso",
      "estate-torch-lighter",
      "founders-duffel",
      "cacao-chai-reserve",
    ]);

    expect(THE_HOUSE_PRODUCTS[0]!.swatches).toEqual([
      "#f1ece5",
      "#b0a197",
      "#0b0b0b",
    ]);
    expect(THE_HOUSE_PRODUCTS[2]!.swatches).toEqual([
      "#0b0b0b",
      "#7e8b53",
      "#8c7865",
    ]);

    for (const product of withSwatches) {
      const card = screen.getByText(product.name).closest("article");
      expect(card).not.toBeNull();
      expect(
        within(card as HTMLElement).getByLabelText(
          `${product.name} color options`,
        ),
      ).toBeInTheDocument();
    }

    for (const product of withoutSwatches) {
      const card = screen.getByText(product.name).closest("article");
      expect(card).not.toBeNull();
      expect(
        within(card as HTMLElement).queryByLabelText(
          `${product.name} color options`,
        ),
      ).toBeNull();
    }

    for (const product of THE_HOUSE_PRODUCTS) {
      const card = screen.getByText(product.name).closest("article");
      expect(card).not.toBeNull();
      expect(
        within(card as HTMLElement).getByRole("button", {
          name: new RegExp(`Explore ${product.name}`),
        }),
      ).toBeDisabled();
    }
  });

  it("uses approved hero, category, and product image URLs only", () => {
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

  it("keeps pagination deferred and disables all page controls", () => {
    render(<TheHousePageByAgeState ageState="over21" />);

    const pageOne = screen.getByRole("button", {
      name: "Page 1 (deferred: pagination is not approved for this scope)",
    });
    expect(pageOne).toBeDisabled();
    expect(pageOne).toHaveAttribute("aria-current", "page");

    for (const pageNumber of [2, 3, 4, 5, 6, 7]) {
      const control = screen.getByRole("button", {
        name: `Page ${pageNumber} (deferred: pagination is not approved for this scope)`,
      });
      expect(control).toBeDisabled();
      expect(control).not.toHaveAttribute("aria-current");
    }
    expect(
      screen.getByRole("button", {
        name: "Next page (deferred: pagination is not approved for this scope)",
      }),
    ).toBeDisabled();
  });

  it("does not mask document overflow at the House page root", () => {
    const { container } = render(
      <TheHousePageByAgeState ageState="over21" />,
    );
    const page = container.querySelector('[data-slot="the-house-page"]');
    const main = container.querySelector('[data-slot="the-house-main"]');
    const listing = container.querySelector(
      '[data-slot="the-house-product-listing"]',
    );

    expect(page?.className).not.toMatch(/overflow-x-(hidden|clip)/);
    expect(main?.className).not.toMatch(/overflow-x-(hidden|clip)/);
    expect(listing?.className).not.toMatch(/overflow-x-(hidden|clip)/);
  });

  it("does not introduce fake commerce or product-detail destinations", () => {
    const { container } = render(
      <TheHousePageByAgeState ageState="over21" />,
    );
    const page = container.querySelector('[data-slot="the-house-page"]');
    expect(page).not.toBeNull();

    const hrefs = Array.from(page!.querySelectorAll("a[href]")).map((a) =>
      a.getAttribute("href"),
    );
    expect(hrefs).not.toContain("/cart");
    expect(hrefs).not.toContain("/checkout");
    expect(
      hrefs.some((href) => href?.includes("/the-estate/the-humidor/")),
    ).toBe(false);
    expect(hrefs.some((href) => href?.includes("/the-house/"))).toBe(false);
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
  it("preserves nested-route metadata and noindex policy", () => {
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
