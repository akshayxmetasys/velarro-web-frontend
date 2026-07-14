import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { usePathname } from "next/navigation";
import type { CSSProperties } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import CareersRoute, { metadata } from "@/app/careers/page";
import { CAREERS_APPROVED_IMAGES } from "@/components/m09-careers/careers-assets";
import { CareersPageByAgeState } from "@/components/m09-careers/careers-page-by-age-state";
import {
  CAREERS_CTA_COPY,
  CAREERS_DEFERRED_IMAGE_KEYS,
  CAREERS_FIGMA_NODE,
  CAREERS_HERO_COPY,
  CAREERS_INTRO_COPY,
  CAREERS_JOBS,
  CAREERS_JOBS_COPY,
  CAREERS_TESTIMONIAL_COPY,
  CAREERS_VALUE_CARDS,
  CAREERS_WORKING_COPY,
} from "@/components/m09-careers/careers-data";
import { getInitialAgeStateFromCookies } from "@/lib/age/get-initial-age-state";
import { isApprovedImageUrl } from "@/lib/assets/approved-image-hosts";

vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    preload,
    width,
    height,
    className,
    style,
    unoptimized,
    ...props
  }: {
    src: string;
    alt: string;
    preload?: boolean;
    width?: number;
    height?: number;
    className?: string;
    style?: CSSProperties;
    unoptimized?: boolean;
    [key: string]: unknown;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      data-preload={preload ? "true" : undefined}
      data-width={width}
      data-height={height}
      data-unoptimized={unoptimized ? "true" : undefined}
      className={className}
      style={style}
      {...props}
    />
  ),
}));

vi.mock("@/lib/age/get-initial-age-state", () => ({
  getInitialAgeStateFromCookies: vi.fn(),
}));

describe("CareersPageByAgeState", () => {
  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValue("/careers");
  });

  it.each(["unknown", "under21", "over21"] as const)(
    "renders the public review Careers page for %s visitors",
    (ageState) => {
      const { container } = render(<CareersPageByAgeState ageState={ageState} />);

      const page = container.querySelector("[data-route='/careers']");
      expect(page).toHaveAttribute("data-figma-node", CAREERS_FIGMA_NODE);
      expect(page).toHaveAttribute("data-route-audience", "review");
      expect(page).toHaveAttribute("data-age-state", ageState);
      expect(
        screen.queryByRole("heading", { name: "Age Verification Required" }),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("heading", { name: "Access restricted" }),
      ).not.toBeInTheDocument();
      expect(
        screen.getByRole("heading", {
          level: 1,
          name: CAREERS_HERO_COPY.title,
        }),
      ).toBeInTheDocument();
      expect(screen.getByText(CAREERS_HERO_COPY.body)).toBeInTheDocument();
    },
  );

  it("renders the Figma Careers sections and copy", () => {
    render(<CareersPageByAgeState ageState="unknown" />);

    expect(
      screen.getByRole("navigation", { name: "Main navigation" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Careers")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: CAREERS_INTRO_COPY.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(CAREERS_INTRO_COPY.body)).toBeInTheDocument();
    expect(
      screen.getAllByRole("heading", {
        level: 3,
        name: "Passion for craft",
      }),
    ).toHaveLength(CAREERS_VALUE_CARDS.length);
    expect(
      screen.getByRole("heading", { level: 2, name: CAREERS_WORKING_COPY.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(CAREERS_WORKING_COPY.body)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: CAREERS_JOBS_COPY.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(CAREERS_JOBS_COPY.body)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: CAREERS_TESTIMONIAL_COPY.title,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(CAREERS_TESTIMONIAL_COPY.quote)).toBeInTheDocument();
    expect(
      screen.getByText(CAREERS_TESTIMONIAL_COPY.attribution),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: CAREERS_CTA_COPY.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(CAREERS_CTA_COPY.body)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Stay in Know" }),
    ).toBeInTheDocument();
  });

  it("uses the approved Careers hero Supabase URL with explicit final crop markers", () => {
    const { container } = render(<CareersPageByAgeState ageState="unknown" />);

    const hero = container.querySelector("[data-section='careers-hero']");
    expect(hero).toHaveAttribute("data-figma-node", "13148:15772");
    expect(hero).toHaveClass("desktop:h-[655px]");
    expect(hero?.innerHTML).not.toContain("scale-110");
    expect(hero?.innerHTML).not.toContain("scale-125");
    expect(hero?.innerHTML).not.toContain("scale-150");
    expect(hero?.innerHTML).not.toContain("113.75%");
    expect(hero?.innerHTML).not.toContain("160.46%");
    expect(hero?.innerHTML).not.toContain("-0.04%");

    const heroLayers = container.querySelectorAll(
      "[data-careers-hero-image='approved']",
    );
    expect(heroLayers).toHaveLength(1);
    const heroLayer = heroLayers.item(0);
    expect(heroLayer).toHaveAttribute(
      "data-figma-crop",
      "careers-hero-final-13148-15771",
    );
    expect(heroLayer).toHaveAttribute(
      "data-careers-hero-crop",
      "approved-asset-explicit-fill",
    );
    expect(heroLayer).toHaveAttribute("data-careers-hero-frame-height", "655");
    expect(heroLayer).toHaveAttribute("data-careers-hero-frame-width", "1440");
    expect(heroLayer).toHaveAttribute(
      "data-careers-hero-rendered-crop-width",
      "100%",
    );
    expect(heroLayer).toHaveAttribute(
      "data-careers-hero-rendered-crop-height",
      "100%",
    );
    expect(heroLayer).toHaveAttribute("data-careers-hero-rendered-crop-top", "0");
    expect(heroLayer).toHaveAttribute(
      "data-careers-hero-rendered-crop-left",
      "0",
    );
    expect(heroLayer).toHaveAttribute("data-careers-hero-object-fit", "fill");
    expect(heroLayer).toHaveAttribute(
      "data-careers-hero-object-position",
      "50% 50%",
    );

    const heroImages = hero?.querySelectorAll("img");
    expect(heroImages).toHaveLength(1);
    const heroImage = heroLayer.querySelector("img");
    expect(heroImage).toHaveAttribute("src", CAREERS_APPROVED_IMAGES.hero);
    expect(heroImage).toHaveAttribute(
      "data-careers-approved-image-key",
      "careers_hero",
    );
    expect(heroImage).toHaveAttribute(
      "data-careers-hero-crop-method",
      "explicit-image-fill",
    );
    expect(heroImage).toHaveAttribute("data-width", "1440");
    expect(heroImage).toHaveAttribute("data-height", "655");
    expect(heroImage).toHaveClass("h-full");
    expect(heroImage).toHaveClass("w-full");
    expect(heroImage).toHaveClass("top-0");
    expect(heroImage).toHaveClass("max-w-none");
    expect(heroImage).toHaveStyle({
      height: "100%",
      objectFit: "fill",
      objectPosition: "50% 50%",
      top: "0",
      width: "100%",
    });
    expect(heroImage?.getAttribute("style")).not.toContain("transform");

    const overlay = container.querySelector(
      "[data-careers-hero-overlay='preserved']",
    );
    expect(overlay).toHaveAttribute(
      "data-careers-hero-overlay-color",
      "rgba(21,20,20,0.5)",
    );
    expect(overlay).toHaveClass("bg-[rgba(21,20,20,0.5)]");
  });

  it("renders clean deferred placeholders for all Careers images", () => {
    const { container } = render(<CareersPageByAgeState ageState="unknown" />);

    const deferredImages = Array.from(
      container.querySelectorAll("[data-careers-image-status='deferred']"),
    );

    expect(deferredImages).toHaveLength(CAREERS_DEFERRED_IMAGE_KEYS.length);
    expect(
      deferredImages.map((image) => image.getAttribute("data-deferred-image-key")),
    ).toEqual([...CAREERS_DEFERRED_IMAGE_KEYS]);
    expect(
      deferredImages.map((image) => image.getAttribute("data-deferred-image-key")),
    ).not.toContain("careers_hero");

    for (const image of deferredImages) {
      expect(image.querySelector("img")).toBeNull();
    }
  });

  it("renders static job cards and deferred Careers controls without nested routes", () => {
    render(<CareersPageByAgeState ageState="unknown" />);

    for (const job of CAREERS_JOBS) {
      expect(
        screen.getByRole("heading", { level: 3, name: job.title }),
      ).toBeInTheDocument();
      expect(screen.getByText(job.location)).toBeInTheDocument();
      expect(screen.getAllByText(job.type).length).toBeGreaterThan(0);
    }

    expect(
      screen.getByRole("button", {
        name: "Learn more about working at Velarro (deferred: destination not approved for this scope)",
      }),
    ).toBeDisabled();
    expect(
      screen.getByRole("button", {
        name: "View all positions (deferred: positions route is not approved for this scope)",
      }),
    ).toBeDisabled();
    expect(
      screen.getByRole("button", {
        name: "Join our team (deferred: application flow is not approved for this scope)",
      }),
    ).toBeDisabled();
    expect(screen.queryByRole("link", { name: CAREERS_JOBS_COPY.button })).toBeNull();
    expect(screen.queryByRole("link", { name: CAREERS_CTA_COPY.button })).toBeNull();
  });

  it("does not use temporary Figma URLs, unapproved image placeholders, or local M09 images", () => {
    const { container } = render(<CareersPageByAgeState ageState="unknown" />);

    expect(container.innerHTML).not.toContain("figma.com");
    expect(container.innerHTML).not.toContain("mcp/asset");
    expect(container.innerHTML).not.toContain("unsplash");
    expect(container.innerHTML).not.toContain("/images/m09");
    expect(
      existsSync(join(process.cwd(), "public", "images", "m09")),
    ).toBe(false);
    expect(
      existsSync(join(process.cwd(), "public", "images", "m09-careers")),
    ).toBe(false);
  });

  it("uses only approved remote image hosts for rendered image elements", () => {
    const { container } = render(<CareersPageByAgeState ageState="unknown" />);
    const imageSources = Array.from(container.querySelectorAll("img")).map((image) =>
      image.getAttribute("src"),
    );

    expect(imageSources).toContain(CAREERS_APPROVED_IMAGES.hero);

    for (const src of imageSources) {
      expect(src).not.toBeNull();
      expect(isApprovedImageUrl(src as string)).toBe(true);
    }
  });

  it("keeps shared sidebar routes intact and marks Careers implemented", async () => {
    const user = userEvent.setup();
    render(<CareersPageByAgeState ageState="unknown" />);

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
    expect(
      within(menu).getByRole("link", { name: "Pairing Guide" }),
    ).toHaveAttribute("href", "/pairing-guide");

    const careersLink = within(menu).getByRole("link", { name: "Careers" });
    expect(careersLink).toHaveAttribute("href", "/careers");
    expect(careersLink).toHaveAttribute("aria-current", "page");
    expect(careersLink).toHaveAttribute("data-route-implemented", "true");
  });
});

describe("/careers route", () => {
  it("has noindex page metadata for the public review page", () => {
    expect(metadata.title).toBe("Careers");
    expect(metadata.description).toBe(
      "Explore roles across Velarro production houses, sales teams, and global offices.",
    );
    expect(metadata.alternates?.canonical).toBe(
      "https://velarroestate.com/careers",
    );
    expect(metadata.robots).toMatchObject({ index: false, follow: false });
  });

  it("uses the cookie age state for the route render without gating Careers", async () => {
    vi.mocked(getInitialAgeStateFromCookies).mockResolvedValue("under21");

    render(await CareersRoute());

    expect(getInitialAgeStateFromCookies).toHaveBeenCalledOnce();
    expect(
      screen.getByRole("heading", { level: 1, name: CAREERS_HERO_COPY.title }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Access restricted" }),
    ).not.toBeInTheDocument();
  });
});
