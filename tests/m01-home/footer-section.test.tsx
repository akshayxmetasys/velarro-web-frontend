import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  FooterSection,
  M01_FOOTER_ASSET_URLS,
} from "@/components/m01-home/footer-section";
import { M01_HOME_APPROVED_IMAGES } from "@/lib/assets/approved-image-hosts";

vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    width,
    height,
    className,
    unoptimized,
  }: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
    unoptimized?: boolean;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      data-width={width}
      data-height={height}
      data-unoptimized={unoptimized ? "true" : undefined}
      className={className}
    />
  ),
}));

describe("FooterSection", () => {
  it("renders the exact Figma footer copy", () => {
    render(<FooterSection />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Stay in Know" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Receive the latest news in your inbox"),
    ).toBeInTheDocument();
    expect(screen.getByAltText("Velarro Estate footer logo")).toBeInTheDocument();
    expect(screen.getByText("Crafted. Refined. Velarro.")).toBeInTheDocument();
    expect(screen.getByText("Surgeon General Warning:")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Cigar smoking can cause cancers of the mouth and throat, even if you do not inhale.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Highest level of Encryption, Security and Trust"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("2026 Velarro Estate - All rights reserved", {
        exact: false,
      }),
    ).toBeInTheDocument();
  });

  it("uses only approved footer asset URLs", () => {
    render(<FooterSection />);

    expect(M01_FOOTER_ASSET_URLS.logo).toBe(
      M01_HOME_APPROVED_IMAGES.navbarLogoScript,
    );
    expect(M01_FOOTER_ASSET_URLS.instagram).toBe(
      "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/instagram-20260626-190912-svg-logo-icon.svg",
    );
    expect(M01_FOOTER_ASSET_URLS.youtube).toBe(
      "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/youtube-20260626-191022-svg-logo-icon.svg",
    );
    expect(M01_FOOTER_ASSET_URLS.facebook).toBe(
      "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/facebook-20260626-190843-svg-logo-icon.svg",
    );
    expect(M01_FOOTER_ASSET_URLS.twitterX).toBe(
      "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/pajamas_twitter-20260626-190952-svg-logo-icon.svg",
    );
    expect(M01_FOOTER_ASSET_URLS.linkedin).toBe(
      "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/linkedin-20260626-190918-svg-logo-icon.svg",
    );
    expect(M01_FOOTER_ASSET_URLS.brandMark).toBe(
      "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/metasys-20260626-191149-svg-logo-icon.svg",
    );
    expect(M01_FOOTER_ASSET_URLS.accessibility).toBe(
      "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/oui_accessibility-20260626-190950-svg-logo-icon.svg",
    );

    const serialized = JSON.stringify(M01_FOOTER_ASSET_URLS);
    expect(serialized).not.toContain("figma.com");
    expect(serialized).not.toContain("mcp/asset");
  });

  it("renders the footer brand block with the approved navbar logo image", () => {
    const { container } = render(<FooterSection />);

    const brandBlock = container.querySelector('[data-slot="footer-brand-block"]');
    const brandMark = container.querySelector('[data-slot="footer-brand-mark"]');
    const brandImage = screen.getByAltText("Velarro Estate footer logo");

    expect(brandBlock).toBeInTheDocument();
    expect(brandMark).toHaveClass("h-[90px]", "w-full");
    expect(brandBlock).toHaveTextContent("Crafted. Refined. Velarro.");
    expect(brandImage).toHaveAttribute("src", M01_HOME_APPROVED_IMAGES.navbarLogoScript);
    expect(brandImage).toHaveAttribute("data-width", "265");
    expect(brandImage).toHaveAttribute("data-height", "90");
    expect(brandImage).toHaveClass("h-[90px]", "w-[265px]", "object-contain");
    expect(brandBlock?.querySelector("img")).toBe(brandImage);
    expect(brandBlock?.innerHTML).not.toContain("figma.com");
    expect(brandBlock?.innerHTML).not.toContain("mcp/asset");
  });

  it("renders full-width footer bands with constrained inner content", () => {
    const { container } = render(<FooterSection />);

    const footer = container.querySelector('[data-slot="m01-over21-footer"]');
    const newsletterPanel = container.querySelector(
      '[data-slot="footer-newsletter-panel"]',
    );
    const mainRow = container.querySelector('[data-slot="footer-main-row"]');

    expect(footer).toHaveClass("w-screen", "max-w-none", "left-1/2", "-translate-x-1/2");
    expect(newsletterPanel).toHaveClass("w-full", "max-w-[1436px]");
    expect(mainRow).toHaveClass("w-full", "max-w-[1216px]");
  });

  it("renders the approved brand and accessibility marks", () => {
    render(<FooterSection />);

    expect(screen.getByAltText("Metasys")).toHaveAttribute(
      "src",
      M01_FOOTER_ASSET_URLS.brandMark,
    );
    expect(
      screen.getByRole("button", {
        name: "Accessibility options (deferred: accessibility widget not approved for this scope)",
      }),
    ).toBeDisabled();
  });

  it("keeps newsletter behavior static and deferred", () => {
    render(<FooterSection />);

    expect(
      screen.getByRole("form", {
        name: "Newsletter signup (deferred: backend not approved for this scope)",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", {
        name: "Your name (deferred: newsletter backend not approved)",
      }),
    ).toBeDisabled();
    expect(
      screen.getByRole("textbox", {
        name: "Your email (deferred: newsletter backend not approved)",
      }),
    ).toBeDisabled();
    expect(
      screen.getByRole("button", {
        name: "Submit newsletter signup (deferred: backend not approved for this scope)",
      }),
    ).toBeDisabled();
  });

  it("does not invent social profile URLs", () => {
    render(<FooterSection />);

    for (const label of ["Instagram", "YouTube", "Facebook", "X", "LinkedIn"]) {
      const control = screen.getByRole("button", {
        name: `${label} social profile (deferred: social URL not approved for this scope)`,
      });

      expect(control).toBeDisabled();
      expect(control).not.toHaveAttribute("href");
    }
  });

  it("renders footer navigation as deferred non-navigating links", () => {
    render(<FooterSection />);

    for (const label of [
      "Our Story",
      "The Humidor",
      "The House",
      "Craftsmanship",
      "Limited Editions",
      "Track Order",
      "Sustainability",
      "Press",
      "Contact Us",
      "FAQ",
      "Privacy Policy",
      "Terms of Service",
      "Cookie Policy",
      "Accessibility",
    ]) {
      expect(
        screen.getByRole("link", {
          name: `${label} (deferred: destination not approved for this scope)`,
        }),
      ).not.toHaveAttribute("href");
    }
  });

  it("scrolls to the top when Ascend is activated", async () => {
    const scrollTo = vi.fn();
    const user = userEvent.setup();

    vi.stubGlobal("scrollTo", scrollTo);
    render(<FooterSection />);

    await user.click(screen.getByRole("button", { name: "Ascend to top" }));

    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
    vi.unstubAllGlobals();
  });
});
