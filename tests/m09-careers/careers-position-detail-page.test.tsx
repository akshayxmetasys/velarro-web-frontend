import { render, screen, within } from "@testing-library/react";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { beforeEach, describe, expect, it, vi } from "vitest";
import CareersPositionDetailRoute, {
  generateMetadata,
  generateStaticParams,
} from "@/app/careers/positions/[jobId]/page";
import { CareersPositionDetailPageByAgeState } from "@/components/m09-careers/careers-position-detail-page-by-age-state";
import {
  CAREERS_POSITION_DETAIL_FIGMA_NODE,
  getCareerPositionBySlug,
  getCareerPositionDetailBySlug,
} from "@/components/m09-careers/careers-position-details-data";
import { getInitialAgeStateFromCookies } from "@/lib/age/get-initial-age-state";
import { getRouteAccess } from "@/lib/age/route-access";
import { findRouteManifestEntry } from "@/lib/seo/route-manifest";

const { notFoundMock, usePathnameMock } = vi.hoisted(() => ({
  notFoundMock: vi.fn(() => {
    throw new Error("NOT_FOUND");
  }),
  usePathnameMock: vi.fn(() => "/"),
}));

vi.mock("next/navigation", async () => {
  const actual = await vi.importActual<typeof import("next/navigation")>(
    "next/navigation",
  );

  return {
    ...actual,
    notFound: notFoundMock,
    usePathname: usePathnameMock,
  };
});

vi.mock("@/lib/age/get-initial-age-state", () => ({
  getInitialAgeStateFromCookies: vi.fn(),
}));

const areaSalesManagerPosition = getCareerPositionBySlug("area-sales-manager");
const areaSalesManagerDetail = getCareerPositionDetailBySlug("area-sales-manager");

if (!areaSalesManagerPosition || !areaSalesManagerDetail) {
  throw new Error("Expected Area Sales Manager fixtures to exist.");
}

describe("CareersPositionDetailPageByAgeState", () => {
  beforeEach(() => {
    usePathnameMock.mockReturnValue("/careers/positions/area-sales-manager");
  });

  it.each(["unknown", "under21", "over21"] as const)(
    "renders the public review detail page for %s visitors",
    (ageState) => {
      const { container } = render(
        <CareersPositionDetailPageByAgeState
          ageState={ageState}
          position={areaSalesManagerPosition}
          detail={areaSalesManagerDetail}
        />,
      );

      const page = container.querySelector(
        "[data-route='/careers/positions/[jobId]']",
      );
      expect(page).toHaveAttribute(
        "data-figma-node",
        CAREERS_POSITION_DETAIL_FIGMA_NODE,
      );
      expect(page).toHaveAttribute("data-route-audience", "review");
      expect(page).toHaveAttribute("data-age-state", ageState);
      expect(
        screen.queryByRole("heading", { name: "Age Verification Required" }),
      ).not.toBeInTheDocument();
    },
  );

  it("renders breadcrumb, metadata, sections, HR contact, and implemented apply link", () => {
    render(
      <CareersPositionDetailPageByAgeState
        ageState="unknown"
        position={areaSalesManagerPosition}
        detail={areaSalesManagerDetail}
      />,
    );

    const breadcrumb = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(within(breadcrumb).getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(within(breadcrumb).getByRole("link", { name: "Careers" })).toHaveAttribute(
      "href",
      "/careers",
    );
    expect(
      within(breadcrumb).getByRole("link", { name: "Positions" }),
    ).toHaveAttribute("href", "/careers/positions");
    expect(within(breadcrumb).getByText("Job description")).toHaveAttribute(
      "aria-current",
      "page",
    );

    expect(
      screen.getByRole("heading", { level: 1, name: "Area Sales Manager" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Publication Date")).toBeInTheDocument();
    expect(screen.getByText("01-06-2026")).toBeInTheDocument();
    expect(screen.getByText("Hyderabad, India")).toBeInTheDocument();
    expect(screen.getByText("Permanent Position")).toBeInTheDocument();
    expect(screen.getByText("100%")).toBeInTheDocument();
    expect(screen.getByText(/world-class handcrafted cigars/i)).toBeInTheDocument();
    expect(screen.getByText(/performance-driven professionals/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Responsibilities" })).toBeInTheDocument();
    expect(screen.getByText("Manage regional distributor and retail relationships.")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Qualification and Experience" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Bachelor’s degree in Business/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "What We Offer" })).toBeInTheDocument();
    expect(screen.getByText(/growing luxury lifestyle brand/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "HR Contact" })).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("hr@velarroestate.gmail.com")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /hr@/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /\+01 345/i })).not.toBeInTheDocument();
    const hrPanel = document.querySelector(
      '[data-contact-verification-status="figma-review-unverified"]',
    );
    expect(hrPanel?.className).not.toContain("bg-background-section");

    const applyLink = screen.getByRole("link", { name: "Apply for this job" });
    expect(applyLink).toHaveAttribute(
      "href",
      "/careers/positions/area-sales-manager/apply",
    );
    expect(applyLink).toHaveAttribute("data-application-status", "implemented");
    expect(applyLink).toHaveAttribute(
      "data-application-route",
      "/careers/positions/area-sales-manager/apply",
    );
    expect(screen.queryByRole("button", { name: /Apply for this job \(unavailable/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("form", { name: /application/i })).not.toBeInTheDocument();
  });

  it("uses a GET search form that targets the positions listing", () => {
    render(
      <CareersPositionDetailPageByAgeState
        ageState="unknown"
        position={areaSalesManagerPosition}
        detail={areaSalesManagerDetail}
      />,
    );

    const form = document.querySelector(
      "[data-careers-positions-search-form]",
    ) as HTMLFormElement;
    expect(form).toHaveAttribute("method", "get");
    expect(form).toHaveAttribute("action", "/careers/positions");
    expect(form.querySelector('input[name="q"]')).toBeInTheDocument();
  });

  it("does not use route-specific images or Figma MCP URLs", () => {
    const { container } = render(
      <CareersPositionDetailPageByAgeState
        ageState="unknown"
        position={areaSalesManagerPosition}
        detail={areaSalesManagerDetail}
      />,
    );

    expect(container.innerHTML).not.toContain("figma.com");
    expect(container.innerHTML).not.toContain("mcp/asset");
    expect(
      existsSync(join(process.cwd(), "public", "images", "m09-careers-position-detail")),
    ).toBe(false);

    const detailSection = container.querySelector(
      "[data-section='careers-position-detail']",
    );
    expect(detailSection?.querySelectorAll("img")).toHaveLength(0);
  });
});

describe("/careers/positions/[jobId] route", () => {
  beforeEach(() => {
    notFoundMock.mockClear();
    usePathnameMock.mockReturnValue("/careers/positions/area-sales-manager");
  });

  it("generates metadata and static params for implemented detail slugs only", async () => {
    expect(generateStaticParams()).toEqual([{ jobId: "area-sales-manager" }]);

    const metadata = await generateMetadata({
      params: Promise.resolve({ jobId: "area-sales-manager" }),
    });
    expect(metadata.title).toBe("Area Sales Manager Careers");
    expect(metadata.robots).toMatchObject({ index: false, follow: false });

    const missingMetadata = await generateMetadata({
      params: Promise.resolve({ jobId: "production-manager" }),
    });
    expect(missingMetadata.title).toBe("Position Not Found");
  });

  it("calls notFound for unsupported slugs", async () => {
    await expect(
      CareersPositionDetailRoute({
        params: Promise.resolve({ jobId: "production-manager" }),
      }),
    ).rejects.toThrow("NOT_FOUND");
    expect(notFoundMock).toHaveBeenCalledOnce();
  });

  it("renders the approved detail route for area-sales-manager", async () => {
    vi.mocked(getInitialAgeStateFromCookies).mockResolvedValue("under21");

    render(
      await CareersPositionDetailRoute({
        params: Promise.resolve({ jobId: "area-sales-manager" }),
      }),
    );

    expect(screen.getByRole("heading", { level: 1, name: "Area Sales Manager" })).toBeInTheDocument();
  });

  it("marks the route as implemented review/public in the manifest", () => {
    expect(findRouteManifestEntry("/careers/positions/[jobId]")).toMatchObject({
      route: "/careers/positions/[jobId]",
      module: "M09-engagement",
      figmaNodeId: "13148:15939",
      implemented: true,
      public: true,
      indexable: false,
      audience: "review",
    });
  });

  it.each(["unknown", "under21", "over21"] as const)(
    "keeps /careers/positions/area-sales-manager visible for %s visitors",
    (ageState) => {
      expect(
        getRouteAccess("/careers/positions/area-sales-manager", ageState).decision,
      ).not.toBe("block");
      expect(
        getRouteAccess("/careers/positions/area-sales-manager", ageState).decision,
      ).not.toBe("gate");
    },
  );
});
