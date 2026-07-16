import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { HomePageByAgeState } from "@/components/m01-home/home-page-by-age-state";
import { Under21HomePage } from "@/components/m01-under21/under21-home-page";
import { Under21Navbar } from "@/components/m01-under21/under21-navbar";
import { Under21RoasteryHero } from "@/components/m01-under21/under21-roastery-hero";
import {
  UNDER21_RESTRICTED_CONTENT_TERMS,
  isUnder21PartnerLinkSafe,
} from "@/components/m01-under21/under21-data";
import { M01_HOME_APPROVED_IMAGES } from "@/lib/assets/approved-image-hosts";
import { getRouteAccess } from "@/lib/age/route-access";

vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    priority,
    preload,
    fill,
    width,
    height,
    className,
    unoptimized,
  }: {
    src: string;
    alt: string;
    priority?: boolean;
    preload?: boolean;
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
      data-priority={priority ? "true" : undefined}
      data-preload={preload ? "true" : undefined}
      data-fill={fill ? "true" : undefined}
      data-width={width}
      data-height={height}
      data-unoptimized={unoptimized ? "true" : undefined}
      className={className}
    />
  ),
}));

vi.mock("@/lib/age/age-actions", () => ({
  confirmAgeStateAction: vi.fn(),
}));

describe("Under21HomePage", () => {
  it("renders the dedicated under-21 page instead of the access restricted shell", () => {
    render(<Under21HomePage />);

    expect(
      screen.queryByRole("heading", { name: "Access restricted" }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: "Under-21 navigation" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: "THE ROASTERY" }),
    ).toBeInTheDocument();
  });

  it("does not introduce restricted tobacco commerce terms", () => {
    const { container } = render(<Under21HomePage />);
    const text = container.textContent?.toLowerCase() ?? "";

    for (const term of UNDER21_RESTRICTED_CONTENT_TERMS) {
      expect(text).not.toContain(term);
    }
  });
});

describe("Under21Navbar", () => {
  it("renders required labels with blocked items disabled and Partner linked safely", () => {
    render(<Under21Navbar />);

    expect(screen.getByText("The Estate")).toBeInTheDocument();
    expect(screen.getByText("Partner")).toBeInTheDocument();
    expect(screen.getByText("Our Story")).toBeInTheDocument();
    expect(screen.getByText("Cart")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();

    expect(
      screen.getByLabelText(
        "The Estate (unavailable: route blocked for under-21 visitors)",
      ),
    ).toHaveAttribute("aria-disabled", "true");
    expect(
      screen.getByLabelText(
        "Our Story (unavailable: route blocked for under-21 visitors)",
      ),
    ).toHaveAttribute("aria-disabled", "true");

    const partnerLink = screen.getByRole("link", { name: "Partner" });
    expect(partnerLink).toHaveAttribute("href", "/partner");
    expect(isUnder21PartnerLinkSafe()).toBe(true);
    expect(getRouteAccess("/partner", "under21").decision).toBe("review");

    expect(
      screen.getByRole("button", {
        name: "Cart (deferred: cart route not approved for this scope)",
      }),
    ).toBeDisabled();
    expect(
      screen.getByRole("button", {
        name: "Login (deferred: login route not approved until M02 Auth)",
      }),
    ).toBeDisabled();
    expect(
      screen.getByRole("button", {
        name: "Search (deferred: search behavior not approved)",
      }),
    ).toBeDisabled();
    expect(
      screen.getByRole("button", {
        name: "Open main menu (deferred: menu behavior not approved)",
      }),
    ).toBeDisabled();
  });

  it("uses the approved navbar logo asset", () => {
    render(<Under21Navbar />);

    expect(screen.getByAltText("Velarro Estate")).toHaveAttribute(
      "src",
      M01_HOME_APPROVED_IMAGES.navbarLogoScript,
    );
  });
});

describe("Under21RoasteryHero", () => {
  it("renders the Figma-approved heading, image, slider dots, and deferred CTA", () => {
    render(<Under21RoasteryHero />);

    expect(
      screen.getByRole("heading", { level: 1, name: "THE ROASTERY" }),
    ).toBeInTheDocument();
    expect(screen.getByAltText("Roastery hero imagery")).toHaveAttribute(
      "src",
      M01_HOME_APPROVED_IMAGES.roasteryHero,
    );
    expect(screen.getByAltText("Roastery hero imagery")).toHaveAttribute(
      "data-unoptimized",
      "true",
    );
    expect(
      screen.getByRole("button", {
        name: "Shop now (deferred: destination not approved for this scope)",
      }),
    ).toBeDisabled();
    expect(
      document.querySelector('[data-slot="under21-roastery-slider-dots-static"]'),
    ).toBeInTheDocument();
  });

  it("uses only the approved production image URL", () => {
    const serialized = JSON.stringify(M01_HOME_APPROVED_IMAGES.roasteryHero);

    expect(M01_HOME_APPROVED_IMAGES.roasteryHero).toBe(
      "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/homeu21-hero-20260709-024151-desktop-hero.webp",
    );
    expect(serialized).not.toContain("figma.com");
    expect(serialized).not.toContain("mcp/asset");
  });
});

describe("HomePageByAgeState under-21 integration", () => {
  it("preserves unknown AgeGate behavior", () => {
    render(<HomePageByAgeState ageState="unknown" />);

    expect(
      screen.getByRole("heading", { name: "Age Verification Required" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("navigation", { name: "Under-21 navigation" }),
    ).not.toBeInTheDocument();
  });

  it("preserves over-21 homepage behavior", () => {
    render(<HomePageByAgeState ageState="over21" />);

    expect(screen.getByRole("navigation", { name: "Main navigation" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "COLLECTOR SERIES" })).toBeInTheDocument();
    expect(
      screen.queryByRole("navigation", { name: "Under-21 navigation" }),
    ).not.toBeInTheDocument();
  });

  it("routes under-21 visitors to the new homepage shell", () => {
    render(<HomePageByAgeState ageState="under21" />);

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
      screen.queryByRole("heading", { name: "COLLECTOR SERIES" }),
    ).not.toBeInTheDocument();

    const nav = screen.getByRole("navigation", { name: "Under-21 navigation" });
    expect(within(nav).getByRole("link", { name: "Partner" })).toHaveAttribute(
      "href",
      "/partner",
    );
  });
});
