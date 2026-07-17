import { render, screen, within } from "@testing-library/react";
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
    expect(
      document.querySelector('[data-slot="our-story-page"]'),
    ).not.toBeInTheDocument();
  });

  it("blocks under-21 visitors from restricted Our Story content", () => {
    render(<OurStoryPageByAgeState ageState="under21" />);

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
      screen.queryByRole("heading", { name: "OUR STORY" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("A great cigar is not simply made."),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByAltText("Velarro cigar box overlooking estate fields"),
    ).not.toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="our-story-page"]'),
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

  it("preserves verified section DOM order and Figma node contracts", () => {
    const { container } = render(<OurStoryPageByAgeState ageState="over21" />);
    const page = container.querySelector('[data-slot="our-story-page"]');
    expect(page).not.toBeNull();

    const orderedSlots = [
      "our-story-hero",
      "our-story-breadcrumbs",
      "our-story-brand-story",
      "our-story-mission",
      "our-story-why-connoisseurs",
      "our-story-brand-values",
    ];

    const main = container.querySelector('[data-slot="our-story-main"]');
    expect(main).not.toBeNull();

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
      container.querySelector('[data-figma-node="15934:43010"]'),
    ).toHaveAttribute("data-slot", "our-story-hero");
    expect(
      container.querySelector('[data-figma-node="15934:43017"]'),
    ).toHaveAttribute("data-slot", "our-story-breadcrumbs");
    expect(
      container.querySelector('[data-figma-node="15934:43019"]'),
    ).toHaveAttribute("data-slot", "our-story-brand-story");
    expect(
      container.querySelector('[data-figma-node="15934:43030"]'),
    ).toHaveAttribute("data-slot", "our-story-brand-story-image");
    expect(
      container.querySelector('[data-figma-node="15934:43031"]'),
    ).toHaveAttribute("data-slot", "our-story-mission");
    expect(
      container.querySelector('[data-figma-node="15934:43048"]'),
    ).toHaveAttribute("data-slot", "our-story-why-connoisseurs");
    expect(
      container.querySelector('[data-figma-node="15934:43069"]'),
    ).toHaveAttribute("data-slot", "our-story-brand-values");
  });

  it("applies hero height, crop, and overlay contracts", () => {
    const { container } = render(<OurStoryPageByAgeState ageState="over21" />);
    const hero = container.querySelector('[data-slot="our-story-hero"]');
    const image = screen.getByAltText(
      "Velarro cigar box overlooking estate fields",
    );
    const overlay = container.querySelector(
      '[data-slot="our-story-hero-overlay"]',
    );

    expect(hero).toHaveClass("desktop:h-[808px]");
    expect(image).toHaveClass("object-cover");
    expect(image).toHaveClass("object-center");
    expect(image).toHaveAttribute("data-priority", "true");
    expect(overlay).toHaveClass("bg-[rgba(21,20,20,0.4)]");
    expect(overlay).toHaveAttribute("aria-hidden", "true");
  });

  it("uses breadcrumb semantics and focus-visible treatment on Home", () => {
    render(<OurStoryPageByAgeState ageState="over21" />);

    const nav = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(nav).toHaveAttribute("data-figma-node", "15934:43017");
    expect(nav).toHaveClass("desktop:pl-[55px]");
    expect(nav).toHaveClass("gap-[6px]");

    const home = within(nav).getByRole("link", { name: "Home" });
    expect(home).toHaveAttribute("href", "/");
    expect(home).toHaveClass("focus-visible:ring-2");
    expect(home).toHaveClass("focus-visible:ring-border-strong");

    const current = within(nav).getByText("Our story");
    expect(current).toHaveAttribute("aria-current", "page");
  });

  it("applies Brand Story column and image contracts", () => {
    const { container } = render(<OurStoryPageByAgeState ageState="over21" />);

    const copy = container.querySelector(
      '[data-slot="our-story-brand-story-copy"]',
    );
    const imageFrame = container.querySelector(
      '[data-slot="our-story-brand-story-image"]',
    );
    const image = screen.getByAltText(
      "Velarro lounge display with cigars and accessories",
    );
    const overlay = container.querySelector(
      '[data-slot="our-story-brand-story-image-overlay"]',
    );

    expect(copy).toHaveClass("max-w-[669px]");
    expect(imageFrame).toHaveClass("desktop:h-[696px]");
    expect(imageFrame).toHaveClass("desktop:w-[507px]");
    expect(imageFrame).toHaveClass("rounded-[12px]");
    expect(imageFrame).toHaveClass("overflow-hidden");
    expect(image).toHaveClass("object-cover");
    expect(overlay).toHaveClass("bg-[rgba(21,20,20,0.4)]");
    expect(
      screen.getByRole("heading", { level: 2, name: "Brand Story" }),
    ).toBeInTheDocument();
    expect(container.querySelector("blockquote")).not.toBeNull();
  });

  it("applies Mission stat semantics, order, and geometry", () => {
    const { container } = render(<OurStoryPageByAgeState ageState="over21" />);
    const stats = container.querySelector(
      '[data-slot="our-story-mission-stats"]',
    );
    expect(stats).not.toBeNull();
    expect(stats!.tagName).toBe("DL");
    expect(stats).toHaveClass("gap-[26px]");
    expect(stats).toHaveClass("desktop:pl-[45px]");
    expect(stats).toHaveClass("desktop:w-[388px]");

    const values = within(stats as HTMLElement)
      .getAllByRole("definition")
      .map((node) => node.textContent);
    expect(values).toEqual(["5%", "12+", "200+"]);

    const labels = within(stats as HTMLElement)
      .getAllByRole("term")
      .map((node) => node.textContent);
    expect(labels).toEqual([
      "TOP LEAF SELECTED",
      "YEARS TORCEDOR EXPERIENCE",
      "YEARS OF HERITAGE",
    ]);

    const missionInner = container.querySelector(
      '[data-slot="our-story-mission"] > div',
    );
    expect(missionInner).toHaveClass("desktop:gap-[24px]");
  });

  it("applies Why Connoisseurs card count, order, and geometry", () => {
    const { container } = render(<OurStoryPageByAgeState ageState="over21" />);
    const cards = container.querySelectorAll(
      '[data-slot="our-story-why-connoisseurs-card"]',
    );
    expect(cards).toHaveLength(4);
    expect(
      Array.from(cards).map(
        (card) => card.querySelector("h3")?.textContent ?? "",
      ),
    ).toEqual([
      "Generational Expertise",
      "Quality begins at the source.",
      "Rested & Aged",
      "Origin-Led Blending",
    ]);

    const grid = container.querySelector(
      '[data-slot="our-story-why-connoisseurs-grid"]',
    );
    expect(grid).toHaveClass("gap-[40px]");
    expect(grid).toHaveClass("desktop:grid-cols-4");
    expect(cards[0]).toHaveClass("desktop:min-h-[364px]");
    expect(cards[0]).toHaveClass("rounded-[12px]");
    expect(cards[0]).toHaveClass("p-[20px]");
  });

  it("applies Brand Values card count, order, and geometry", () => {
    const { container } = render(<OurStoryPageByAgeState ageState="over21" />);
    const cards = container.querySelectorAll(
      '[data-slot="our-story-brand-values-card"]',
    );
    expect(cards).toHaveLength(6);
    expect(
      Array.from(cards).map(
        (card) => card.querySelector("h3")?.textContent ?? "",
      ),
    ).toEqual([
      "Heritage",
      "Craftsmanship",
      "Authenticity",
      "Quality",
      "Sustainability",
      "Innovation",
    ]);

    const grid = container.querySelector(
      '[data-slot="our-story-brand-values-grid"]',
    );
    expect(grid).toHaveClass("desktop:gap-x-[40px]");
    expect(grid).toHaveClass("gap-[14px]");
    expect(cards[0]).toHaveClass("rounded-radius-md");
    expect(cards[0]).toHaveClass("px-[20px]");
    expect(cards[0]).toHaveClass("py-[24px]");
  });

  it("does not mask document overflow at the Our Story page root", () => {
    const { container } = render(<OurStoryPageByAgeState ageState="over21" />);
    const page = container.querySelector('[data-slot="our-story-page"]');
    const main = container.querySelector('[data-slot="our-story-main"]');

    expect(page?.className).not.toMatch(/overflow-x-(hidden|clip)/);
    expect(main?.className).not.toMatch(/overflow-x-(hidden|clip)/);

    for (const slot of [
      "our-story-brand-story",
      "our-story-mission",
      "our-story-why-connoisseurs",
      "our-story-brand-values",
    ]) {
      const section = container.querySelector(`[data-slot="${slot}"]`);
      expect(section?.className, slot).not.toMatch(/overflow-x-(hidden|clip)/);
    }
  });

  it("does not introduce fake controls or unsupported destinations", () => {
    const { container } = render(<OurStoryPageByAgeState ageState="over21" />);
    const page = container.querySelector('[data-slot="our-story-page"]');
    expect(page).not.toBeNull();

    const storyLinks = Array.from(
      page!.querySelectorAll("a[href]"),
    ) as HTMLAnchorElement[];
    const storyHrefs = storyLinks
      .map((link) => link.getAttribute("href"))
      .filter((href) => href && !href.startsWith("#"));

    // Breadcrumb Home is required; footer/nav may include deferred destinations
    // already approved in shared shell — assert no invented Our Story CTAs.
    expect(
      within(
        container.querySelector(
          '[data-slot="our-story-why-connoisseurs"]',
        ) as HTMLElement,
      ).queryAllByRole("link"),
    ).toHaveLength(0);
    expect(
      within(
        container.querySelector(
          '[data-slot="our-story-brand-values"]',
        ) as HTMLElement,
      ).queryAllByRole("button"),
    ).toHaveLength(0);
    expect(storyHrefs).not.toContain("/shop");
    expect(storyHrefs).not.toContain("/checkout");
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
    expect(
      screen.getAllByText("Origin character guides every blend decision"),
    ).toHaveLength(1);
    expect(screen.getByText("Innovation")).toBeInTheDocument();
  });

  it("adds subtle hover lift and reduced-motion treatment to Why Connoisseurs cards", () => {
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
      expect(card).toHaveClass("motion-reduce:transition-none");
      expect(card).not.toHaveAttribute("tabindex");
    }
  });

  it("adds subtle hover lift and reduced-motion treatment to Brand Values cards", () => {
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
      expect(card).toHaveClass("motion-reduce:transition-none");
      expect(card).not.toHaveAttribute("tabindex");
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
