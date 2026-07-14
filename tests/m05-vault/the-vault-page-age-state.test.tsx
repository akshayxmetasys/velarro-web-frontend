import { render, screen, within } from "@testing-library/react";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { usePathname } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";
import TheVaultRoute, { metadata } from "@/app/the-vault/page";
import {
  THE_VAULT_APPROVED_IMAGES,
  THE_VAULT_HERO_IMAGE_STATUS,
} from "@/components/m05-vault/the-vault-assets";
import { TheVaultPageByAgeState } from "@/components/m05-vault/the-vault-page-by-age-state";
import {
  VAULT_HERO_COPY,
  VAULT_OFFERS,
  VAULT_SECTION_COPY,
} from "@/components/m05-vault/the-vault-data";
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

describe("TheVaultPageByAgeState", () => {
  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValue("/the-vault");
  });

  it("shows the age gate for unknown visitors and hides Vault content", () => {
    render(<TheVaultPageByAgeState ageState="unknown" />);

    expect(
      screen.getByRole("heading", { name: "Age Verification Required" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: VAULT_HERO_COPY.title }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText(VAULT_SECTION_COPY.title)).not.toBeInTheDocument();
  });

  it("blocks under-21 visitors from restricted Vault content", () => {
    render(<TheVaultPageByAgeState ageState="under21" />);

    expect(
      screen.getByRole("heading", { name: "Access restricted" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: VAULT_HERO_COPY.title }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Build Your Collection")).not.toBeInTheDocument();
    expect(
      screen.queryByAltText("Verde Classico cigar product image"),
    ).not.toBeInTheDocument();
  });

  it("renders the Figma Vault sections for over-21 visitors", () => {
    render(<TheVaultPageByAgeState ageState="over21" />);

    expect(
      screen.getByRole("navigation", { name: "Main navigation" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: VAULT_HERO_COPY.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(VAULT_HERO_COPY.body)).toBeInTheDocument();
    expect(screen.getByText("The Vault")).toBeInTheDocument();
    expect(screen.getByText(VAULT_SECTION_COPY.eyebrow)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: VAULT_SECTION_COPY.title,
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByText("Build Your Collection")).toHaveLength(5);
    expect(screen.getAllByText("VIEW DETAILS")).toHaveLength(5);
    expect(
      screen.getByRole("heading", { level: 2, name: "Stay in Know" }),
    ).toBeInTheDocument();
  });

  it("uses Velarro typography tokens for Vault hero and section headings", () => {
    render(<TheVaultPageByAgeState ageState="over21" />);

    const heroTitle = screen.getByRole("heading", {
      level: 1,
      name: VAULT_HERO_COPY.title,
    });
    expect(heroTitle).toHaveClass(
      "font-[family-name:var(--velarro-display-light-font-family)]",
      "desktop:text-[length:var(--velarro-display-light-font-size)]",
      "font-light",
      "uppercase",
      "leading-[var(--velarro-display-light-line-height)]",
    );

    expect(screen.getByText(VAULT_HERO_COPY.body)).toHaveClass(
      "font-[family-name:var(--velarro-body-default-font-family)]",
      "tablet:text-[length:var(--velarro-body-default-font-size)]",
      "font-light",
      "leading-[var(--velarro-body-default-line-height)]",
    );

    expect(screen.getByText(VAULT_SECTION_COPY.eyebrow)).toHaveClass(
      "font-[family-name:var(--velarro-heading-sectionsmall-font-family)]",
      "text-[length:var(--velarro-heading-sectionsmall-font-size)]",
      "font-light",
      "uppercase",
    );

    expect(
      screen.getByRole("heading", { level: 2, name: VAULT_SECTION_COPY.title }),
    ).toHaveClass(
      "font-[family-name:var(--velarro-heading-section-font-family)]",
      "text-[length:var(--velarro-heading-section-font-size)]",
      "font-light",
    );
  });

  it("marks the hero image as deferred without using a runtime image asset", () => {
    const { container } = render(
      <TheVaultPageByAgeState ageState="over21" />,
    );
    const hero = container.querySelector("[data-section='the-vault-hero']");

    expect(hero).toHaveAttribute(
      "data-image-status",
      THE_VAULT_HERO_IMAGE_STATUS,
    );
    expect(hero).toHaveAttribute("data-vault-hero", "deferred");
    expect(hero?.querySelector("img")).toBeNull();
    expect(container.innerHTML).not.toContain("figma.com");
    expect(container.innerHTML).not.toContain("mcp/asset");
    expect(container.innerHTML).not.toContain("/images/m05");
  });

  it("uses the approved Verde Classico image for every offer card", () => {
    const { container } = render(
      <TheVaultPageByAgeState ageState="over21" />,
    );

    expect(THE_VAULT_APPROVED_IMAGES.offerVerdeClassico).toBe(
      M01_HOME_APPROVED_IMAGES.cigarCarouselVerdeClassico,
    );

    const images = screen.getAllByAltText("Verde Classico cigar product image");
    expect(images).toHaveLength(5);
    for (const image of images) {
      expect(image).toHaveAttribute(
        "src",
        THE_VAULT_APPROVED_IMAGES.offerVerdeClassico,
      );
    }

    expect(container.innerHTML).not.toContain("figma.com");
    expect(container.innerHTML).not.toContain("mcp/asset");
  });

  it("renders repeated offer copy and deferred detail controls", () => {
    render(<TheVaultPageByAgeState ageState="over21" />);

    const cards = screen
      .getAllByText("Build Your Collection")
      .map((heading) => heading.closest("article"));

    expect(cards).toHaveLength(VAULT_OFFERS.length);

    for (const card of cards) {
      expect(card).not.toBeNull();
      expect(within(card as HTMLElement).getByText("Offer 01")).toBeInTheDocument();
      expect(
        within(card as HTMLElement).getByText("ENROLLMENT OPEN"),
      ).toBeInTheDocument();
      expect(within(card as HTMLElement).getByText("February 27")).toBeInTheDocument();
      expect(
        within(card as HTMLElement).getByText("Preferred collection pricing"),
      ).toBeInTheDocument();
      expect(
        within(card as HTMLElement).getByRole("button", {
          name: /View details for Build Your Collection/,
        }),
      ).toBeDisabled();
    }
  });

  it("uses the Figma typography scale for Vault offer cards", () => {
    render(<TheVaultPageByAgeState ageState="over21" />);

    const card = screen.getAllByText("Build Your Collection")[0].closest("article");
    expect(card).not.toBeNull();

    expect(within(card as HTMLElement).getByText("Offer 01")).toHaveClass(
      "font-[family-name:var(--velarro-heading-card-font-family)]",
      "text-[length:var(--velarro-heading-card-font-size)]",
      "font-normal",
    );
    expect(within(card as HTMLElement).getByText("ENROLLMENT OPEN")).toHaveClass(
      "font-[family-name:var(--velarro-ui-elements-primary-font-family)]",
      "text-[length:var(--velarro-ui-elements-primary-font-size)]",
      "font-normal",
      "uppercase",
    );
    expect(
      within(card as HTMLElement).getByRole("heading", {
        level: 3,
        name: "Build Your Collection",
      }),
    ).toHaveClass(
      "font-[family-name:var(--velarro-heading-card-font-family)]",
      "tablet:text-[30px]",
      "font-medium",
    );
    expect(within(card as HTMLElement).getByText(VAULT_OFFERS[0].description)).toHaveClass(
      "font-[family-name:var(--velarro-body-default-font-family)]",
      "tablet:text-[length:var(--velarro-body-default-font-size)]",
      "font-light",
      "leading-[var(--velarro-body-default-line-height)]",
    );
    expect(
      within(card as HTMLElement).getByRole("button", {
        name: /View details for Build Your Collection/,
      }),
    ).toHaveClass(
      "font-[family-name:var(--velarro-ui-elements-primary-font-family)]",
      "text-[length:var(--velarro-ui-elements-primary-font-size)]",
      "font-normal",
      "uppercase",
    );
  });

  it("keeps VIEW DETAILS buttons inside the offer content columns", () => {
    render(<TheVaultPageByAgeState ageState="over21" />);

    const cards = screen
      .getAllByText("Build Your Collection")
      .map((heading) => heading.closest("article"));

    expect(cards).toHaveLength(VAULT_OFFERS.length);

    for (const card of cards) {
      expect(card).not.toBeNull();
      const contentColumn = (card as HTMLElement).querySelector(
        "[data-vault-offer-content]",
      );
      expect(contentColumn).not.toBeNull();

      const button = within(contentColumn as HTMLElement).getByRole("button", {
        name: /View details for Build Your Collection/,
      });
      expect(button.closest("article")).toBe(card);
      expect(button.parentElement).toBe(contentColumn);
      expect(button).toHaveClass("mt-[24px]", "desktop:w-full");
      expect(button).not.toHaveClass("mt-auto", "absolute");
    }
  });

  it("uses the Figma desktop width chain for Vault offer cards", () => {
    const { container } = render(<TheVaultPageByAgeState ageState="over21" />);

    const offerList = container.querySelector("[data-vault-offer-list]");
    expect(offerList).not.toBeNull();
    expect(offerList).toHaveClass("w-full", "px-[24px]");
    expect(offerList).not.toHaveClass("max-w-[960px]");
    expect(offerList).not.toHaveClass("max-w-[1024px]");
    expect(offerList).not.toHaveClass("max-w-[1120px]");
    expect(offerList).not.toHaveClass("max-w-[1200px]");
    expect(offerList).not.toHaveClass("max-w-[1314px]");

    const offerGrid = container.querySelector("[data-vault-offer-grid]");
    expect(offerGrid).not.toBeNull();
    expect(offerGrid).toHaveClass("mx-auto", "w-full", "max-w-[1314px]");

    const cards = Array.from(
      container.querySelectorAll("[data-vault-offer-card]"),
    );
    expect(cards).toHaveLength(VAULT_OFFERS.length);

    for (const card of cards) {
      expect(card).toHaveAttribute("data-figma-node", "14581:35996");
      expect(card).toHaveClass(
        "w-full",
        "desktop:max-w-[1314px]",
        "desktop:gap-[80px]",
        "desktop:p-[24px]",
        "border-[1.5px]",
        "rounded-[12px]",
      );
    }
  });

  it("keeps the Figma desktop image and content column dimensions", () => {
    const { container } = render(<TheVaultPageByAgeState ageState="over21" />);

    const cards = Array.from(
      container.querySelectorAll("[data-vault-offer-card]"),
    );
    expect(cards).toHaveLength(VAULT_OFFERS.length);

    for (const card of cards) {
      const imageRegion = card.querySelector("[data-vault-offer-image-region]");
      const contentColumn = card.querySelector("[data-vault-offer-content]");

      expect(imageRegion).not.toBeNull();
      expect(imageRegion).toHaveClass(
        "desktop:h-[398px]",
        "desktop:w-[390px]",
        "desktop:shrink-0",
      );
      expect(imageRegion?.firstElementChild).toHaveClass("desktop:size-[390px]");

      expect(contentColumn).not.toBeNull();
      expect(contentColumn).toHaveClass(
        "desktop:w-[796px]",
        "desktop:max-w-[796px]",
        "desktop:shrink-0",
      );

      const button = within(contentColumn as HTMLElement).getByRole("button", {
        name: /View details for Build Your Collection/,
      });
      expect(button.parentElement).toBe(contentColumn);
      expect(button).toHaveClass("desktop:w-full");
    }
  });

  it("does not add hover animation classes to Vault offer cards", () => {
    render(<TheVaultPageByAgeState ageState="over21" />);

    const cards = screen
      .getAllByText("Build Your Collection")
      .map((heading) => heading.closest("article"));

    expect(cards).toHaveLength(VAULT_OFFERS.length);

    for (const card of cards) {
      expect(card).not.toBeNull();
      expect(card).not.toHaveClass("transition-[transform,box-shadow]");
      expect(card).not.toHaveClass("[@media(hover:hover)]:hover:-translate-y-1");
      expect(card).not.toHaveClass(
        "[@media(hover:hover)]:hover:shadow-[0_14px_28px_rgba(47,41,36,0.12)]",
      );
      expect(card?.className).not.toContain("hover:");
      expect(card?.className).not.toContain("group-hover");
    }
  });

  it("keeps the shared navbar links intact", () => {
    render(<TheVaultPageByAgeState ageState="over21" />);

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

describe("/the-vault route", () => {
  it("has noindex page metadata for the over-21 restricted page", () => {
    expect(metadata.title).toBe("The Vault");
    expect(metadata.description).toBe(
      "Curated Velarro collections, limited releases, and exclusive opportunities.",
    );
    expect(metadata.alternates?.canonical).toBe(
      "https://velarroestate.com/the-vault",
    );
    expect(metadata.robots).toMatchObject({ index: false, follow: false });
  });

  it("uses the cookie age state for the route render", async () => {
    vi.mocked(getInitialAgeStateFromCookies).mockResolvedValue("over21");

    render(await TheVaultRoute());

    expect(getInitialAgeStateFromCookies).toHaveBeenCalledOnce();
    expect(
      screen.getByRole("heading", { level: 1, name: VAULT_HERO_COPY.title }),
    ).toBeInTheDocument();
  });

  it("does not add local M05 image files", () => {
    expect(
      existsSync(join(process.cwd(), "public", "images", "m05")),
    ).toBe(false);
    expect(
      existsSync(join(process.cwd(), "public", "images", "m05-vault")),
    ).toBe(false);
  });
});
