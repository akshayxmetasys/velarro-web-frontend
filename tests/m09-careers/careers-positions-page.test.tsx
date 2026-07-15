import { render, screen, within } from "@testing-library/react";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { usePathname } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";
import CareersPositionsRoute, {
  metadata,
} from "@/app/careers/positions/page";
import { CareersPositionsPageByAgeState } from "@/components/m09-careers/careers-positions-page-by-age-state";
import {
  CAREER_POSITIONS,
  CAREERS_POSITIONS_COPY,
  CAREERS_POSITIONS_FIGMA_NODE,
} from "@/components/m09-careers/careers-positions-data";
import { getInitialAgeStateFromCookies } from "@/lib/age/get-initial-age-state";
import { getRouteAccess } from "@/lib/age/route-access";
import { findRouteManifestEntry } from "@/lib/seo/route-manifest";

vi.mock("@/lib/age/get-initial-age-state", () => ({
  getInitialAgeStateFromCookies: vi.fn(),
}));

describe("CareersPositionsPageByAgeState", () => {
  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValue("/careers/positions");
  });

  it.each(["unknown", "under21", "over21"] as const)(
    "renders the public review positions page for %s visitors",
    (ageState) => {
      const { container } = render(
        <CareersPositionsPageByAgeState ageState={ageState} />,
      );

      const page = container.querySelector("[data-route='/careers/positions']");
      expect(page).toHaveAttribute("data-figma-node", CAREERS_POSITIONS_FIGMA_NODE);
      expect(page).toHaveAttribute("data-route-audience", "review");
      expect(page).toHaveAttribute("data-age-state", ageState);
      expect(
        screen.queryByRole("heading", { name: "Age Verification Required" }),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/access restricted/i),
      ).not.toBeInTheDocument();
    },
  );

  it("renders breadcrumb, search, filters, and six job cards in order", () => {
    render(<CareersPositionsPageByAgeState ageState="unknown" />);

    const breadcrumb = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(within(breadcrumb).getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(within(breadcrumb).getByRole("link", { name: "Careers" })).toHaveAttribute(
      "href",
      "/careers",
    );
    expect(within(breadcrumb).getByText("Positions")).toHaveAttribute(
      "aria-current",
      "page",
    );

    expect(
      screen.getByRole("searchbox", { name: CAREERS_POSITIONS_COPY.searchLabel }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: CAREERS_POSITIONS_COPY.searchButton }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Filter" })).toBeInTheDocument();

    const positionCards = document.querySelectorAll("[data-careers-position-card]");
    expect(positionCards).toHaveLength(6);
    expect(positionCards[0]).toHaveAttribute(
      "data-position-slug",
      CAREER_POSITIONS[0].slug,
    );
    expect(positionCards[5]).toHaveAttribute(
      "data-position-slug",
      CAREER_POSITIONS[5].slug,
    );

    expect(screen.getByText("Manufacturing & Operations — Estelí, Nicaragua")).toBeInTheDocument();
    expect(screen.getByText("Sales & Distribution — Regional")).toBeInTheDocument();
    expect(screen.getAllByText("Full-time")).toHaveLength(6);
    expect(screen.queryByText(/Reginonal/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Full - time/i)).not.toBeInTheDocument();

    expect(
      screen.getByRole("navigation", { name: "Main navigation" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("marks deferred filters and navigable detail status per position", () => {
    render(<CareersPositionsPageByAgeState ageState="unknown" />);

    expect(document.querySelectorAll('[data-filter-status="deferred"]')).toHaveLength(5);

    const areaSalesManagerCard = document.querySelector(
      '[data-position-slug="area-sales-manager"]',
    );
    expect(areaSalesManagerCard).toHaveAttribute(
      "data-position-detail-status",
      "implemented",
    );
    expect(
      within(areaSalesManagerCard as HTMLElement).getByRole("link", {
        name: /Area Sales Manager/i,
      }),
    ).toHaveAttribute("href", "/careers/positions/area-sales-manager");

    for (const position of CAREER_POSITIONS.filter(
      (entry) => entry.slug !== "area-sales-manager",
    )) {
      const card = document.querySelector(
        `[data-position-slug="${position.slug}"]`,
      );
      expect(card).toHaveAttribute("data-position-detail-status", "deferred");
      expect(card?.querySelector("a")).toBeNull();
    }
  });

  it("does not use temporary Figma URLs or route-specific images", () => {
    const { container } = render(
      <CareersPositionsPageByAgeState ageState="unknown" />,
    );

    expect(container.innerHTML).not.toContain("figma.com");
    expect(container.innerHTML).not.toContain("mcp/asset");
    expect(
      existsSync(join(process.cwd(), "public", "images", "m09-careers-positions")),
    ).toBe(false);

    const positionsSection = container.querySelector(
      "[data-section='careers-positions']",
    );
    expect(positionsSection?.querySelectorAll("img")).toHaveLength(0);
  });

  it("uses centralized data-driven card and filter rendering", () => {
    const cardSource = readFileSync(
      join(process.cwd(), "components/m09-careers/careers-position-card.tsx"),
      "utf8",
    );
    const searchSource = readFileSync(
      join(process.cwd(), "components/m09-careers/careers-positions-search.tsx"),
      "utf8",
    );
    const filterSource = readFileSync(
      join(
        process.cwd(),
        "components/m09-careers/careers-position-filter-panel.tsx",
      ),
      "utf8",
    );

    expect(cardSource.match(/data-careers-position-card/g)).toHaveLength(1);
    expect(searchSource).toContain("visiblePositions.map");
    expect(searchSource.match(/<CareersPositionCard/g)?.length).toBe(1);
    expect(filterSource).toContain("CAREER_POSITION_FILTERS.map");
  });
});

describe("/careers/positions route", () => {
  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValue("/careers/positions");
  });

  it("has noindex page metadata for the public review page", () => {
    expect(metadata.title).toBe("Careers Positions");
    expect(metadata.alternates?.canonical).toBe(
      "https://velarroestate.com/careers/positions",
    );
    expect(metadata.robots).toMatchObject({ index: false, follow: false });
  });

  it("marks the route as implemented review/public in the manifest", () => {
    expect(findRouteManifestEntry("/careers/positions")).toMatchObject({
      route: "/careers/positions",
      module: "M09-engagement",
      figmaNodeId: "13148:15855",
      implemented: true,
      public: true,
      indexable: false,
      audience: "review",
    });
  });

  it.each(["unknown", "under21", "over21"] as const)(
    "keeps /careers/positions visible for %s visitors",
    (ageState) => {
      expect(getRouteAccess("/careers/positions", ageState).decision).not.toBe(
        "block",
      );
      expect(getRouteAccess("/careers/positions", ageState).decision).not.toBe(
        "gate",
      );
    },
  );

  it("uses the cookie age state for the route render without gating positions", async () => {
    vi.mocked(getInitialAgeStateFromCookies).mockResolvedValue("under21");

    render(
      await CareersPositionsRoute({
        searchParams: Promise.resolve({}),
      }),
    );

    expect(getInitialAgeStateFromCookies).toHaveBeenCalledOnce();
    expect(screen.getByRole("heading", { name: "Filter" })).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Age Verification Required" }),
    ).not.toBeInTheDocument();
  });
});
