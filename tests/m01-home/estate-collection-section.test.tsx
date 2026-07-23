import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it, vi } from "vitest";
import { EstateCollectionSection } from "@/components/m01-home/estate-collection-section";
import {
  ESTATE_COLLECTION_CARDS,
  ESTATE_COLLECTION_INITIAL_ACTIVE_INDEX,
} from "@/lib/m01-home/estate-collection-data";
import { M01_HOME_APPROVED_IMAGES } from "@/lib/assets/approved-image-hosts";

vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    fill,
    width,
    height,
    className,
    unoptimized: _unoptimized,
  }: {
    src: string;
    alt: string;
    fill?: boolean;
    width?: number;
    height?: number;
    className?: string;
    unoptimized?: boolean;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      data-fill={fill ? "true" : undefined}
      data-width={width}
      data-height={height}
      data-unoptimized={_unoptimized ? "true" : undefined}
      className={className}
    />
  ),
}));

interface CarouselLayoutStubOptions {
  viewportLeft?: number;
  viewportClientLeft?: number;
  viewportClientWidth?: number;
  scrollWidth?: number;
  initialScrollLeft?: number;
  activeCardWidth?: number;
  inactiveCardWidth?: number;
}

const estateCardScrollLeftByLabel = new Map<string, number>([
  [ESTATE_COLLECTION_CARDS[0].label, 0],
  [ESTATE_COLLECTION_CARDS[1].label, 366],
  [ESTATE_COLLECTION_CARDS[2].label, 776],
  [ESTATE_COLLECTION_CARDS[3].label, 1186],
  [ESTATE_COLLECTION_CARDS[4].label, 1596],
  [ESTATE_COLLECTION_CARDS[5].label, 2006],
]);

const estateCardOffsetLeftByLabel = new Map<string, number>([
  [ESTATE_COLLECTION_CARDS[0].label, 280],
  [ESTATE_COLLECTION_CARDS[1].label, 790],
  [ESTATE_COLLECTION_CARDS[2].label, 1190],
  [ESTATE_COLLECTION_CARDS[3].label, 1580],
  [ESTATE_COLLECTION_CARDS[4].label, 1970],
  [ESTATE_COLLECTION_CARDS[5].label, 2360],
]);

function makeDomRect({
  left,
  width,
  height = 100,
}: {
  left: number;
  width: number;
  height?: number;
}): DOMRect {
  return {
    bottom: height,
    height,
    left,
    right: left + width,
    top: 0,
    width,
    x: left,
    y: 0,
    toJSON: () => ({}),
  } as DOMRect;
}

function installEstateCarouselLayoutStub({
  viewportLeft = 100,
  viewportClientLeft = 6,
  viewportClientWidth = 320,
  scrollWidth = 2401,
  initialScrollLeft = 120,
  activeCardWidth = 395,
  inactiveCardWidth = 351,
}: CarouselLayoutStubOptions = {}) {
  const descriptors = {
    clientLeft: Object.getOwnPropertyDescriptor(
      HTMLElement.prototype,
      "clientLeft",
    ),
    clientWidth: Object.getOwnPropertyDescriptor(
      HTMLElement.prototype,
      "clientWidth",
    ),
    getBoundingClientRect: Object.getOwnPropertyDescriptor(
      HTMLElement.prototype,
      "getBoundingClientRect",
    ),
    offsetLeft: Object.getOwnPropertyDescriptor(
      HTMLElement.prototype,
      "offsetLeft",
    ),
    offsetWidth: Object.getOwnPropertyDescriptor(
      HTMLElement.prototype,
      "offsetWidth",
    ),
    scrollLeft: Object.getOwnPropertyDescriptor(
      HTMLElement.prototype,
      "scrollLeft",
    ),
    scrollTo: Object.getOwnPropertyDescriptor(HTMLElement.prototype, "scrollTo"),
    scrollWidth: Object.getOwnPropertyDescriptor(
      HTMLElement.prototype,
      "scrollWidth",
    ),
  };
  let currentScrollLeft = initialScrollLeft;
  const scrollTo = vi.fn((options?: ScrollToOptions) => {
    if (typeof options?.left === "number") {
      currentScrollLeft = options.left;
    }
  });

  Object.defineProperty(HTMLElement.prototype, "clientLeft", {
    configurable: true,
    get() {
      return this.getAttribute("data-slot") === "estate-carousel-viewport"
        ? viewportClientLeft
        : 0;
    },
  });
  Object.defineProperty(HTMLElement.prototype, "clientWidth", {
    configurable: true,
    get() {
      return this.getAttribute("data-slot") === "estate-carousel-viewport"
        ? viewportClientWidth
        : 0;
    },
  });
  Object.defineProperty(HTMLElement.prototype, "scrollWidth", {
    configurable: true,
    get() {
      return this.getAttribute("data-slot") === "estate-carousel-viewport"
        ? scrollWidth
        : 0;
    },
  });
  Object.defineProperty(HTMLElement.prototype, "scrollLeft", {
    configurable: true,
    get() {
      return this.getAttribute("data-slot") === "estate-carousel-viewport"
        ? currentScrollLeft
        : 0;
    },
    set(value: number) {
      if (this.getAttribute("data-slot") === "estate-carousel-viewport") {
        currentScrollLeft = value;
      }
    },
  });
  Object.defineProperty(HTMLElement.prototype, "offsetWidth", {
    configurable: true,
    get() {
      if (this.getAttribute("aria-current") === "true") {
        return activeCardWidth;
      }
      if (this.tagName.toLowerCase() === "article") {
        return inactiveCardWidth;
      }
      return 0;
    },
  });
  Object.defineProperty(HTMLElement.prototype, "offsetLeft", {
    configurable: true,
    get() {
      const label = this.querySelector("h3")?.textContent?.trim();
      return label ? (estateCardOffsetLeftByLabel.get(label) ?? 0) : 0;
    },
  });
  Object.defineProperty(HTMLElement.prototype, "getBoundingClientRect", {
    configurable: true,
    value() {
      if (this.getAttribute("data-slot") === "estate-carousel-viewport") {
        return makeDomRect({ left: viewportLeft, width: viewportClientWidth });
      }

      if (this.tagName.toLowerCase() === "article") {
        const label = this.querySelector("h3")?.textContent?.trim();
        const cardScrollLeft = label
          ? (estateCardScrollLeftByLabel.get(label) ?? 0)
          : 0;
        const width =
          this.getAttribute("aria-current") === "true"
            ? activeCardWidth
            : inactiveCardWidth;

        return makeDomRect({
          left:
            viewportLeft +
            viewportClientLeft +
            cardScrollLeft -
            currentScrollLeft,
          width,
        });
      }

      return makeDomRect({ left: 0, width: 0 });
    },
  });
  Object.defineProperty(HTMLElement.prototype, "scrollTo", {
    configurable: true,
    value: scrollTo,
  });

  return {
    scrollTo,
    expectedScrollLeftFor(label: string) {
      const cardScrollLeft = estateCardScrollLeftByLabel.get(label);
      if (typeof cardScrollLeft !== "number") {
        throw new Error(`Missing estate card geometry for ${label}`);
      }
      const target =
        cardScrollLeft - (viewportClientWidth - activeCardWidth) / 2;
      const maxScroll = Math.max(0, scrollWidth - viewportClientWidth);
      return Math.min(Math.max(0, target), maxScroll);
    },
    oldOffsetLeftScrollLeftFor(label: string) {
      const offsetLeft = estateCardOffsetLeftByLabel.get(label);
      if (typeof offsetLeft !== "number") {
        throw new Error(`Missing estate offset geometry for ${label}`);
      }
      return offsetLeft - (viewportClientWidth - activeCardWidth) / 2;
    },
    restore() {
      for (const [property, descriptor] of Object.entries(descriptors)) {
        if (descriptor) {
          Object.defineProperty(HTMLElement.prototype, property, descriptor);
        } else {
          delete (HTMLElement.prototype as unknown as Record<string, unknown>)[
            property
          ];
        }
      }
    },
  };
}

describe("EstateCollectionSection", () => {
  it("renders the exact Figma heading stack", () => {
    render(<EstateCollectionSection />);

    expect(screen.getByText("Discover Timeless Luxury")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Velarro Estate collection",
      }),
    ).toBeInTheDocument();
  });

  it("renders cards in the exact Figma order with Figma copy", () => {
    expect(ESTATE_COLLECTION_CARDS.map((card) => card.label)).toEqual([
      "Estate Espresso",
      "Founder’s Boxy hoodie",
      "Roastery",
      "The cabinet",
      "Estate oversized T-shirt",
      "Humidors",
    ]);
  });

  it("renders the initial visible cards with the center card active", () => {
    render(<EstateCollectionSection />);

    const expectedInitialLabels = [
      ESTATE_COLLECTION_CARDS[ESTATE_COLLECTION_INITIAL_ACTIVE_INDEX - 1].label,
      ESTATE_COLLECTION_CARDS[ESTATE_COLLECTION_INITIAL_ACTIVE_INDEX].label,
      ESTATE_COLLECTION_CARDS[ESTATE_COLLECTION_INITIAL_ACTIVE_INDEX + 1].label,
    ];

    for (const label of expectedInitialLabels) {
      expect(screen.getByRole("heading", { level: 3, name: label })).toBeInTheDocument();
    }

    expect(
      screen.getByRole("article", {
        name: "Founder’s Boxy hoodie",
        current: true,
      }),
    ).toBeInTheDocument();
  });

  it("uses only the approved Estate Collection production image URLs", () => {
    const serialized = JSON.stringify(ESTATE_COLLECTION_CARDS);

    expect(M01_HOME_APPROVED_IMAGES.estateCollectionEstateEspresso).toBe(
      "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/home-espresso-20260711-013345-product-main.webp",
    );
    expect(M01_HOME_APPROVED_IMAGES.estateCollectionFoundersBoxyHoodie).toBe(
      "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/home-hoodies-20260711-013309-product-main.webp",
    );
    expect(M01_HOME_APPROVED_IMAGES.estateCollectionRoasteryCard).toBe(
      "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/the-roastery-hero-20260709-023755-desktop-hero.webp",
    );
    expect(M01_HOME_APPROVED_IMAGES.estateCollectionTheCabinet).toBe(
      "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/the-cabinet-hero-home-20260709-025631-desktop-hero.webp",
    );
    expect(M01_HOME_APPROVED_IMAGES.estateCollectionEstateOversizedTshirt).toBe(
      "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/estate-oversized-t-shirt-20260709-045207-product-main.webp",
    );
    expect(M01_HOME_APPROVED_IMAGES.estateCollectionHumidors).toBe(
      "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/estate-humidor-20260709-212816-product-main.webp",
    );
    expect(serialized).not.toContain("figma.com");
    expect(serialized).not.toContain("mcp/asset");
  });

  it("renders direct unoptimized product images from approved URLs", () => {
    render(<EstateCollectionSection />);

    expect(screen.getByAltText("Estate Espresso product imagery")).toHaveAttribute(
      "src",
      M01_HOME_APPROVED_IMAGES.estateCollectionEstateEspresso,
    );
    expect(
      screen.getByAltText("Founder’s Boxy hoodie product imagery"),
    ).toHaveAttribute("src", M01_HOME_APPROVED_IMAGES.estateCollectionFoundersBoxyHoodie);
    expect(screen.getByAltText("Roastery collection imagery")).toHaveAttribute(
      "src",
      M01_HOME_APPROVED_IMAGES.estateCollectionRoasteryCard,
    );
    expect(screen.getByAltText("Estate Espresso product imagery")).toHaveAttribute(
      "data-unoptimized",
      "true",
    );
  });

  it("exposes accessible previous and next controls", () => {
    render(<EstateCollectionSection />);

    expect(
      screen.getByRole("button", { name: "Previous estate collection item" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Next estate collection item" }),
    ).toBeInTheDocument();
  });

  it("uses the approved left arrow asset and rotates it for the next control", () => {
    render(<EstateCollectionSection />);

    const previousArrow = screen.getByRole("button", {
      name: "Previous estate collection item",
    });
    const nextArrow = screen.getByRole("button", {
      name: "Next estate collection item",
    });

    expect(within(previousArrow).getByRole("presentation")).toHaveAttribute(
      "src",
      M01_HOME_APPROVED_IMAGES.estateCollectionArrowLeft,
    );
    expect(within(nextArrow).getByRole("presentation")).toHaveClass("rotate-180");
  });

  it("scopes hydration suppression only to Estate Collection arrow buttons", () => {
    const estateSource = readFileSync(
      join(process.cwd(), "components/m01-home/estate-collection-section.tsx"),
      "utf8",
    );
    const footerSource = readFileSync(
      join(process.cwd(), "components/layout/main-footer.tsx"),
      "utf8",
    );
    const over21Source = readFileSync(
      join(process.cwd(), "components/m01-home/over21-home-page.tsx"),
      "utf8",
    );
    const appLayoutSource = readFileSync(
      join(process.cwd(), "app/layout.tsx"),
      "utf8",
    );

    expect(estateSource.match(/suppressHydrationWarning/g)).toHaveLength(1);
    expect(estateSource).toMatch(
      /function CarouselArrowButton[\s\S]*<button[\s\S]*suppressHydrationWarning/,
    );
    expect(footerSource).not.toContain("suppressHydrationWarning");
    expect(over21Source).not.toContain("suppressHydrationWarning");
    expect(appLayoutSource).not.toContain("suppressHydrationWarning");
  });

  it("provides accessible deferred CTA controls for visible cards", () => {
    render(<EstateCollectionSection />);

    for (const card of ESTATE_COLLECTION_CARDS.slice(0, 3)) {
      expect(
        screen.getByRole("button", {
          name: `Explore ${card.label} (deferred: destination not approved for this scope)`,
        }),
      ).toBeDisabled();
    }
  });

  it("advances the active card when next is activated", async () => {
    const user = userEvent.setup();

    render(<EstateCollectionSection />);

    await user.click(
      screen.getByRole("button", { name: "Next estate collection item" }),
    );

    expect(
      screen.getByRole("article", { name: "Roastery", current: true }),
    ).toBeInTheDocument();
  });

  it("requests exact viewport-relative centering on initial render", async () => {
    const layout = installEstateCarouselLayoutStub();
    const activeLabel = ESTATE_COLLECTION_CARDS[ESTATE_COLLECTION_INITIAL_ACTIVE_INDEX].label;
    try {
      render(<EstateCollectionSection />);

      expect(
        screen.getByRole("article", {
          name: activeLabel,
          current: true,
        }),
      ).toBeInTheDocument();
      expect(layout.expectedScrollLeftFor(activeLabel)).toBe(403.5);
      expect(layout.oldOffsetLeftScrollLeftFor(activeLabel)).toBe(827.5);
      await waitFor(() => {
        expect(layout.scrollTo).toHaveBeenCalledWith({
          behavior: "instant",
          left: 403.5,
        });
      });
    } finally {
      layout.restore();
    }
  });

  it("requests exact viewport-relative centering after navigation", async () => {
    const user = userEvent.setup();
    const layout = installEstateCarouselLayoutStub();
    const activeLabel = ESTATE_COLLECTION_CARDS[2].label;
    try {
      render(<EstateCollectionSection />);
      await waitFor(() => expect(layout.scrollTo).toHaveBeenCalled());
      layout.scrollTo.mockClear();

      await user.click(
        screen.getByRole("button", { name: "Next estate collection item" }),
      );

      expect(
        screen.getByRole("article", { name: activeLabel, current: true }),
      ).toBeInTheDocument();
      expect(layout.expectedScrollLeftFor(activeLabel)).toBe(813.5);
      expect(layout.oldOffsetLeftScrollLeftFor(activeLabel)).toBe(1227.5);
      await waitFor(() => {
        expect(layout.scrollTo).toHaveBeenCalledWith({
          behavior: "instant",
          left: 813.5,
        });
      });
    } finally {
      layout.restore();
    }
  });

  it("clamps viewport-relative centering at the scroll boundaries", async () => {
    const user = userEvent.setup();
    const layout = installEstateCarouselLayoutStub({
      initialScrollLeft: 12,
      scrollWidth: 2200,
      viewportClientWidth: 500,
    });
    try {
      render(<EstateCollectionSection />);
      await waitFor(() => expect(layout.scrollTo).toHaveBeenCalled());
      layout.scrollTo.mockClear();

      await user.click(
        screen.getByRole("button", { name: "Previous estate collection item" }),
      );

      expect(
        screen.getByRole("article", {
          name: ESTATE_COLLECTION_CARDS[0].label,
          current: true,
        }),
      ).toBeInTheDocument();
      await waitFor(() => {
        expect(layout.scrollTo).toHaveBeenCalledWith({
          behavior: "instant",
          left: 0,
        });
      });

      layout.scrollTo.mockClear();

      for (let step = 0; step < 5; step += 1) {
        await user.click(
          screen.getByRole("button", { name: "Next estate collection item" }),
        );
      }

      expect(
        screen.getByRole("article", {
          name: ESTATE_COLLECTION_CARDS[5].label,
          current: true,
        }),
      ).toBeInTheDocument();
      expect(layout.expectedScrollLeftFor(ESTATE_COLLECTION_CARDS[5].label)).toBe(
        1700,
      );
      await waitFor(() => {
        expect(layout.scrollTo).toHaveBeenLastCalledWith({
          behavior: "instant",
          left: 1700,
        });
      });
    } finally {
      layout.restore();
    }
  });

  it("uses the carousel width pattern instead of the 1236px contained card-row width", () => {
    const { container } = render(<EstateCollectionSection />);

    const section = container.querySelector('[data-figma-node="13148:15145"]');
    const carousel = container.querySelector(
      '[data-slot="estate-collection-carousel"]',
    );
    const viewport = container.querySelector(
      '[data-slot="estate-carousel-viewport"]',
    );

    expect(section).toHaveClass("min-h-[688px]", "py-[32px]");
    expect(section?.className).not.toMatch(
      /max-w-\[1340px\]bg-background|py-\[32px\]min-\[1372px\]/,
    );
    expect(carousel).toHaveClass("w-[1303px]", "gap-10");
    expect(carousel).not.toHaveClass("max-w-[1236px]");
    expect(viewport).toHaveClass(
      "h-[455px]",
      "w-[1135px]",
      "overflow-x-auto",
    );
  });
});
