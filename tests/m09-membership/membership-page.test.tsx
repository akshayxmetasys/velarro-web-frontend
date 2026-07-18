import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { usePathname } from "next/navigation";
import type { CSSProperties } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import MembershipRoute, { metadata } from "@/app/membership/page";
import {
  MEMBERSHIP_ASSETS,
  MEMBERSHIP_EMBLEM_ASSET_KEYS,
} from "@/components/m09-membership/membership-assets";
import { MembershipPageByAgeState } from "@/components/m09-membership/membership-page-by-age-state";
import {
  MEMBERSHIP_BENEFITS_COPY,
  MEMBERSHIP_CTA_COPY,
  MEMBERSHIP_FIGMA_NODE,
  MEMBERSHIP_TIERS,
} from "@/components/m09-membership/membership-data";
import { getInitialAgeStateFromCookies } from "@/lib/age/get-initial-age-state";
import { getRouteAccess } from "@/lib/age/route-access";
import { findRouteManifestEntry } from "@/lib/seo/route-manifest";
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
    fill,
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
    fill?: boolean;
    [key: string]: unknown;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      data-preload={preload ? "true" : undefined}
      data-width={width}
      data-height={height}
      data-fill={fill ? "true" : undefined}
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

function localAssetPath(path: string) {
  return join(process.cwd(), "public", ...path.replace(/^\//, "").split("/"));
}

function pngSignature(path: string) {
  const bytes = readFileSync(path).subarray(0, 8);
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join(" ");
}

describe("MembershipPageByAgeState", () => {
  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValue("/membership");
  });

  it.each(["unknown", "under21", "over21"] as const)(
    "renders the public review Membership page for %s visitors",
    (ageState) => {
      const { container } = render(
        <MembershipPageByAgeState ageState={ageState} />,
      );

      const page = container.querySelector("[data-route='/membership']");
      expect(page).toHaveAttribute("data-figma-node", MEMBERSHIP_FIGMA_NODE);
      expect(page).toHaveAttribute("data-route-audience", "review");
      expect(page).toHaveAttribute("data-age-state", ageState);
      expect(
        screen.queryByRole("heading", { name: "Age Verification Required" }),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("heading", { name: "Access restricted" }),
      ).not.toBeInTheDocument();
      expect(screen.getByRole("heading", { name: "HOUSE" })).toBeInTheDocument();
      expect(
        screen.getByRole("heading", {
          name: MEMBERSHIP_BENEFITS_COPY.heading,
        }),
      ).toBeInTheDocument();
    },
  );

  it("renders all five tier cards in order with permanent emblem assets", () => {
    const { container } = render(
      <MembershipPageByAgeState ageState="unknown" />,
    );

    const cards = container.querySelectorAll("[data-membership-tier-card]");
    expect(cards).toHaveLength(5);
    expect(cards[0]).toHaveAttribute("data-membership-tier-id", "house");
    expect(cards[4]).toHaveAttribute(
      "data-membership-tier-id",
      "private-circle",
    );

    for (const tier of MEMBERSHIP_TIERS) {
      const marker = screen.getByTestId(tier.testId);
      const asset = MEMBERSHIP_ASSETS[tier.assetKey];
      expect(marker).toHaveAttribute("data-asset-slot", asset.slot);
      expect(marker).toHaveAttribute("data-asset-status", "permanent");
      expect(marker).toHaveAttribute("data-figma-node", asset.figmaNodeId);
      expect(marker).toHaveAttribute("data-membership-emblem-width", "124");
      const image = marker.querySelector("img");
      expect(image).not.toBeNull();
      expect(image).toHaveAttribute("src", asset.path);
      expect(image).toHaveAttribute("alt", "");
    }
  });

  it("renders breadcrumb, benefits table, CTA, and shared layout", () => {
    render(<MembershipPageByAgeState ageState="unknown" />);

    const breadcrumb = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(
      within(breadcrumb).getByRole("link", { name: "Home" }),
    ).toHaveAttribute("href", "/");
    expect(within(breadcrumb).getByText("Membership")).toHaveAttribute(
      "aria-current",
      "page",
    );

    expect(
      screen.getByRole("table", {
        name: /comparison of velarro membership tier benefits/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(MEMBERSHIP_CTA_COPY.heading)).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: "Main navigation" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("does not claim a current visitor tier or request account data", () => {
    const { container } = render(
      <MembershipPageByAgeState ageState="over21" />,
    );

    const main = screen.getByRole("main");

    expect(container.textContent).not.toMatch(/your current tier/i);
    expect(container.textContent).not.toMatch(/account created for you/i);
    expect(within(main).queryByLabelText(/email/i)).not.toBeInTheDocument();
    expect(within(main).queryByLabelText(/password/i)).not.toBeInTheDocument();
  });

  it("uses over-21 Estate navigation for the CTA and blocks under-21 Estate entry", () => {
    const { rerender } = render(
      <MembershipPageByAgeState ageState="over21" />,
    );

    expect(
      screen.getByRole("link", { name: MEMBERSHIP_CTA_COPY.button }),
    ).toHaveAttribute("href", "/the-estate");

    rerender(<MembershipPageByAgeState ageState="unknown" />);
    expect(
      screen.getByRole("link", { name: MEMBERSHIP_CTA_COPY.button }),
    ).toHaveAttribute("href", "/the-estate");

    rerender(<MembershipPageByAgeState ageState="under21" />);
    const gatedButton = screen.getByRole("button", {
      name: /DISCOVER THE COLLECTION \(unavailable/i,
    });
    expect(gatedButton).toBeDisabled();
    expect(gatedButton).not.toHaveAttribute("href");
  });

  it("uses permanent local Membership assets without temporary Figma URLs", () => {
    const { container } = render(
      <MembershipPageByAgeState ageState="unknown" />,
    );

    expect(container.innerHTML).not.toContain("figma.com");
    expect(container.innerHTML).not.toContain("mcp/asset");
    expect(container.querySelectorAll('[data-asset-status="deferred"]')).toHaveLength(
      0,
    );
    expect(container.querySelector('[data-testid$="-deferred"]')).toBeNull();

    const emblemPaths = MEMBERSHIP_EMBLEM_ASSET_KEYS.map(
      (key) => MEMBERSHIP_ASSETS[key].path,
    );
    expect(new Set(emblemPaths).size).toBe(5);

    for (const key of MEMBERSHIP_EMBLEM_ASSET_KEYS) {
      const asset = MEMBERSHIP_ASSETS[key];
      expect(asset.status).toBe("permanent");
      expect(asset.path.startsWith("/images/m09-membership/")).toBe(true);
      expect(asset.path.startsWith("http")).toBe(false);
      expect(existsSync(localAssetPath(asset.path))).toBe(true);
      expect(pngSignature(localAssetPath(asset.path))).toBe(
        "89 50 4e 47 0d 0a 1a 0a",
      );
    }

    const cta = MEMBERSHIP_ASSETS.ctaBanner;
    expect(cta.status).toBe("permanent");
    expect(cta.path).toBe("/images/m09-membership/membership-cta-banner.png");
    expect(existsSync(localAssetPath(cta.path))).toBe(true);
    expect(pngSignature(localAssetPath(cta.path))).toBe(
      "89 50 4e 47 0d 0a 1a 0a",
    );

    expect(screen.getByTestId("membership-cta-banner")).toHaveAttribute(
      "data-asset-status",
      "permanent",
    );
    expect(
      screen.getByTestId("membership-cta-banner").querySelector("img"),
    ).toHaveAttribute("src", cta.path);
  });

  it("reuses the five emblem assets in benefits table headers", () => {
    const { container } = render(
      <MembershipPageByAgeState ageState="unknown" />,
    );

    for (const key of MEMBERSHIP_EMBLEM_ASSET_KEYS) {
      const header = container.querySelector(
        `[data-membership-table-emblem="${key}"]`,
      );
      expect(header).not.toBeNull();
      expect(header?.querySelector("img")).toHaveAttribute(
        "src",
        MEMBERSHIP_ASSETS[key].path,
      );
    }
  });

  it("uses only approved remote image hosts for inherited shared images", () => {
    const { container } = render(
      <MembershipPageByAgeState ageState="unknown" />,
    );
    const imageSources = Array.from(container.querySelectorAll("img")).map(
      (image) => image.getAttribute("src"),
    );

    for (const src of imageSources) {
      expect(src).not.toBeNull();
      if ((src as string).startsWith("/images/m09-membership/")) {
        continue;
      }
      expect(isApprovedImageUrl(src as string)).toBe(true);
    }
  });

  it("keeps shared sidebar routes intact and marks Membership implemented", async () => {
    const user = userEvent.setup();
    render(<MembershipPageByAgeState ageState="unknown" />);

    await user.click(screen.getByRole("button", { name: "Open main menu" }));

    const dialog = screen.getByRole("dialog", { name: "Estate Index" });
    const menu = within(dialog).getByRole("navigation", { name: "Main menu" });

    expect(
      within(menu).getByRole("link", { name: "Pairing Guide" }),
    ).toHaveAttribute("href", "/pairing-guide");

    const membershipLink = within(menu).getByRole("link", {
      name: "Membership",
    });
    expect(membershipLink).toHaveAttribute("href", "/membership");
    expect(membershipLink).toHaveAttribute("aria-current", "page");
    expect(membershipLink).toHaveAttribute("data-route-implemented", "true");
  });
});

describe("/membership route", () => {
  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValue("/membership");
  });

  it("has noindex page metadata for the public review page", () => {
    expect(metadata.title).toBe("Membership");
    expect(metadata.alternates?.canonical).toBe(
      "https://velarroestate.com/membership",
    );
    expect(metadata.robots).toMatchObject({ index: false, follow: false });
  });

  it("marks the route as implemented review/public in the manifest", () => {
    expect(findRouteManifestEntry("/membership")).toMatchObject({
      route: "/membership",
      module: "M09-engagement",
      figmaNodeId: "15008:38309",
      implemented: true,
      public: true,
      indexable: false,
      audience: "review",
    });
  });

  it.each(["unknown", "under21", "over21"] as const)(
    "keeps /membership visible for %s visitors",
    (ageState) => {
      expect(getRouteAccess("/membership", ageState).decision).not.toBe(
        "block",
      );
      expect(getRouteAccess("/membership", ageState).decision).not.toBe("gate");
    },
  );

  it("uses the cookie age state for the route render without gating Membership", async () => {
    vi.mocked(getInitialAgeStateFromCookies).mockResolvedValue("under21");

    render(await MembershipRoute());

    expect(getInitialAgeStateFromCookies).toHaveBeenCalledOnce();
    expect(screen.getByRole("heading", { name: "HOUSE" })).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Access restricted" }),
    ).not.toBeInTheDocument();
  });
});
