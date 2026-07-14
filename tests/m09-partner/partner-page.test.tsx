import { render, screen, within } from "@testing-library/react";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { usePathname } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";
import PartnerRoute, { metadata } from "@/app/partner/page";
import { PARTNER_ASSETS } from "@/components/m09-partner/partner-assets";
import { PartnerPageByAgeState } from "@/components/m09-partner/partner-page-by-age-state";
import {
  PARTNER_COPY,
  PARTNER_FIGMA_NODE,
  PARTNER_FORM_FIELDS,
  PARTNER_MESSAGE_FIELD,
} from "@/components/m09-partner/partner-data";
import { getInitialAgeStateFromCookies } from "@/lib/age/get-initial-age-state";
import { isApprovedImageUrl } from "@/lib/assets/approved-image-hosts";

vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    width,
    height,
    className,
  }: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      data-width={width}
      data-height={height}
      className={className}
    />
  ),
}));

vi.mock("@/lib/age/get-initial-age-state", () => ({
  getInitialAgeStateFromCookies: vi.fn(),
}));

describe("PartnerPageByAgeState", () => {
  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValue("/partner");
  });

  it.each(["unknown", "under21", "over21"] as const)(
    "renders the public review Partner page for %s visitors",
    (ageState) => {
      const { container } = render(<PartnerPageByAgeState ageState={ageState} />);

      const page = container.querySelector("[data-route='/partner']");
      expect(page).toHaveAttribute("data-figma-node", PARTNER_FIGMA_NODE);
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
          name: PARTNER_COPY.heading,
        }),
      ).toBeInTheDocument();
    },
  );

  it("renders shared navigation, breadcrumb, form shell, and deferred image panel", () => {
    const { container } = render(<PartnerPageByAgeState ageState="unknown" />);

    expect(
      screen.getByRole("navigation", { name: "Main navigation" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Partner" })).toHaveAttribute(
      "href",
      "/partner",
    );

    const breadcrumb = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(within(breadcrumb).getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(within(breadcrumb).getByText("Partner")).toHaveAttribute(
      "aria-current",
      "page",
    );

    const deferredPanel = container.querySelector("[data-asset-slot='partner_main_image']");
    expect(deferredPanel).toHaveAttribute("data-asset-status", "deferred");
    expect(deferredPanel).toHaveAttribute(
      "data-figma-node",
      PARTNER_ASSETS.partnerMainImage.figmaNodeId,
    );
    expect(deferredPanel?.querySelector("img")).toBeNull();

    expect(container.querySelector("[data-partner-form]")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: PARTNER_COPY.submit })).toBeInTheDocument();
  });

  it("renders all Partner form controls with semantic labels and required state", () => {
    render(<PartnerPageByAgeState ageState="unknown" />);

    for (const field of PARTNER_FORM_FIELDS) {
      const control = screen.getByLabelText(field.label);
      expect(control).toHaveAttribute("name", field.name);
      expect(control).toHaveAttribute("type", field.type);
      expect(control).toBeRequired();
      expect(control).toHaveAttribute("placeholder", field.placeholder);
    }

    const message = screen.getByLabelText(PARTNER_MESSAGE_FIELD.label);
    expect(message.tagName).toBe("TEXTAREA");
    expect(message).toBeRequired();
    expect(message).toHaveAttribute("placeholder", PARTNER_MESSAGE_FIELD.placeholder);
  });

  it("does not use temporary Figma URLs, substitute images, or local M09 Partner images", () => {
    const { container } = render(<PartnerPageByAgeState ageState="unknown" />);

    expect(container.innerHTML).not.toContain("figma.com");
    expect(container.innerHTML).not.toContain("mcp/asset");
    expect(container.innerHTML).not.toContain("unsplash");
    expect(container.innerHTML).not.toContain("/images/m09");
    expect(container.innerHTML).not.toContain("partner_main_image.webp");
    expect(PARTNER_ASSETS.partnerMainImage.url).toBeNull();
    expect(existsSync(join(process.cwd(), "public", "images", "m09"))).toBe(
      false,
    );
    expect(
      existsSync(join(process.cwd(), "public", "images", "m09-partner")),
    ).toBe(false);
  });

  it("uses only approved remote image hosts for inherited shared images", () => {
    const { container } = render(<PartnerPageByAgeState ageState="unknown" />);
    const imageSources = Array.from(container.querySelectorAll("img")).map((image) =>
      image.getAttribute("src"),
    );

    for (const src of imageSources) {
      expect(src).not.toBeNull();
      expect(isApprovedImageUrl(src as string)).toBe(true);
    }
  });
});

describe("/partner route", () => {
  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValue("/partner");
  });

  it("has noindex page metadata for the public review page", () => {
    expect(metadata.title).toBe("Partner");
    expect(metadata.description).toBe(
      "Submit your business details to explore partnering with Velarro.",
    );
    expect(metadata.alternates?.canonical).toBe(
      "https://velarroestate.com/partner",
    );
    expect(metadata.robots).toMatchObject({ index: false, follow: false });
  });

  it("uses the cookie age state for the route render without gating Partner", async () => {
    vi.mocked(getInitialAgeStateFromCookies).mockResolvedValue("under21");

    render(await PartnerRoute());

    expect(getInitialAgeStateFromCookies).toHaveBeenCalledOnce();
    expect(
      screen.getByRole("heading", { level: 1, name: PARTNER_COPY.heading }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Access restricted" }),
    ).not.toBeInTheDocument();
  });
});
