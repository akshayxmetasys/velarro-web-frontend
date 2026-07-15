import { render, screen, within } from "@testing-library/react";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { beforeEach, describe, expect, it, vi } from "vitest";
import CareersPositionApplicationRoute, {
  generateMetadata,
  generateStaticParams,
} from "@/app/careers/positions/[jobId]/apply/page";
import { CareersPositionApplicationPageByAgeState } from "@/components/m09-careers/careers-position-application-page-by-age-state";
import {
  CAREERS_POSITION_APPLICATION_FIGMA_NODE,
  getCareerPositionApplicationBySlug,
} from "@/components/m09-careers/careers-position-application-data";
import {
  getCareerPositionBySlug,
  getCareerPositionDetailBySlug,
} from "@/components/m09-careers/careers-position-details-data";
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
const areaSalesManagerApplication = getCareerPositionApplicationBySlug(
  "area-sales-manager",
);

if (!areaSalesManagerPosition || !areaSalesManagerDetail || !areaSalesManagerApplication) {
  throw new Error("Expected Area Sales Manager fixtures to exist.");
}

describe("CareersPositionApplicationPageByAgeState", () => {
  beforeEach(() => {
    usePathnameMock.mockReturnValue(
      "/careers/positions/area-sales-manager/apply",
    );
  });

  it.each(["unknown", "under21", "over21"] as const)(
    "renders the public review application page for %s visitors",
    (ageState) => {
      const { container } = render(
        <CareersPositionApplicationPageByAgeState
          ageState={ageState}
          position={areaSalesManagerPosition}
          application={areaSalesManagerApplication}
        />,
      );

      const page = container.querySelector(
        "[data-route='/careers/positions/[jobId]/apply']",
      );
      expect(page).toHaveAttribute(
        "data-figma-node",
        CAREERS_POSITION_APPLICATION_FIGMA_NODE,
      );
      expect(page).toHaveAttribute("data-route-audience", "review");
      expect(
        screen.queryByRole("heading", { name: "Age Verification Required" }),
      ).not.toBeInTheDocument();
    },
  );

  it("renders breadcrumb, heading, description, form shell, navbar, and footer", () => {
    render(
      <CareersPositionApplicationPageByAgeState
        ageState="unknown"
        position={areaSalesManagerPosition}
        application={areaSalesManagerApplication}
      />,
    );

    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Join the legacy of velarro estate/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Become part of a team dedicated to excellence/i)).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Main navigation" })).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();

    const breadcrumb = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(within(breadcrumb).getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(within(breadcrumb).getByRole("link", { name: "Careers" })).toHaveAttribute(
      "href",
      "/careers",
    );
    expect(within(breadcrumb).getByRole("link", { name: "Positions" })).toHaveAttribute(
      "href",
      "/careers/positions",
    );
    expect(
      within(breadcrumb).getByRole("link", { name: "Job description" }),
    ).toHaveAttribute("href", "/careers/positions/area-sales-manager");
    expect(within(breadcrumb).getByText("Application")).toHaveAttribute("aria-current", "page");

    expect(screen.getByLabelText(/First Name/i)).toBeRequired();
    expect(screen.getByLabelText(/Last Name/i)).toBeRequired();
    expect(screen.getByLabelText(/Email Address/i)).toBeRequired();
    expect(screen.getByLabelText(/^Phone number/i)).toBeRequired();
    expect(screen.getByLabelText(/^City/i)).toBeRequired();
    expect(screen.getByLabelText(/^Country/i)).not.toBeRequired();
    expect(screen.getByLabelText(/Upload Resume/i)).toBeRequired();
    expect(screen.getByLabelText(/Upload Cover Letter/i)).toBeRequired();
  });

  it("does not use route-specific images or Figma MCP URLs", () => {
    const { container } = render(
      <CareersPositionApplicationPageByAgeState
        ageState="unknown"
        position={areaSalesManagerPosition}
        application={areaSalesManagerApplication}
      />,
    );

    expect(container.innerHTML).not.toContain("figma.com");
    expect(container.innerHTML).not.toContain("mcp/asset");
    expect(
      existsSync(join(process.cwd(), "public", "images", "m09-careers-position-application")),
    ).toBe(false);

    const applicationSection = container.querySelector(
      "[data-section='careers-position-application']",
    );
    expect(applicationSection?.querySelectorAll("img")).toHaveLength(0);
  });
});

describe("/careers/positions/[jobId]/apply route", () => {
  beforeEach(() => {
    notFoundMock.mockClear();
    usePathnameMock.mockReturnValue(
      "/careers/positions/area-sales-manager/apply",
    );
  });

  it("generates metadata and static params for implemented application slugs only", async () => {
    expect(generateStaticParams()).toEqual([{ jobId: "area-sales-manager" }]);

    const metadata = await generateMetadata({
      params: Promise.resolve({ jobId: "area-sales-manager" }),
    });
    expect(metadata.title).toBe("Apply for Area Sales Manager");
    expect(metadata.robots).toMatchObject({ index: false, follow: false });

    const missingMetadata = await generateMetadata({
      params: Promise.resolve({ jobId: "production-manager" }),
    });
    expect(missingMetadata.title).toBe("Application Not Found");
  });

  it("calls notFound for unsupported slugs", async () => {
    await expect(
      CareersPositionApplicationRoute({
        params: Promise.resolve({ jobId: "production-manager" }),
      }),
    ).rejects.toThrow("NOT_FOUND");
    expect(notFoundMock).toHaveBeenCalledOnce();
  });

  it("marks the route as implemented review/public in the manifest", () => {
    expect(findRouteManifestEntry("/careers/positions/[jobId]/apply")).toMatchObject({
      route: "/careers/positions/[jobId]/apply",
      module: "M09-engagement",
      figmaNodeId: "13563:29858",
      implemented: true,
      public: true,
      indexable: false,
      audience: "review",
    });
  });

  it.each(["unknown", "under21", "over21"] as const)(
    "keeps /careers/positions/area-sales-manager/apply visible for %s visitors",
    (ageState) => {
      expect(
        getRouteAccess("/careers/positions/area-sales-manager/apply", ageState).decision,
      ).not.toBe("block");
      expect(
        getRouteAccess("/careers/positions/area-sales-manager/apply", ageState).decision,
      ).not.toBe("gate");
    },
  );
});
