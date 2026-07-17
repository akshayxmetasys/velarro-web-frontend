import { render, screen } from "@testing-library/react";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { usePathname } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";
import TheVaultRoute, { metadata } from "@/app/the-vault/page";
import { THE_VAULT_COMING_SOON_BACKGROUND } from "@/components/m05-vault/the-vault-assets";
import { TheVaultPageByAgeState } from "@/components/m05-vault/the-vault-page-by-age-state";
import { THE_VAULT_COMING_SOON_COPY } from "@/components/m05-vault/the-vault-data";
import { getInitialAgeStateFromCookies } from "@/lib/age/get-initial-age-state";
import {
  findRouteManifestEntry,
  ROUTE_MANIFEST,
} from "@/lib/seo/route-manifest";

vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    priority,
    fill,
    width,
    height,
    className,
    ...rest
  }: {
    src: string;
    alt: string;
    priority?: boolean;
    fill?: boolean;
    width?: number;
    height?: number;
    className?: string;
    "data-slot"?: string;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      data-priority={priority ? "true" : undefined}
      data-fill={fill ? "true" : undefined}
      data-width={width}
      data-height={height}
      data-slot={rest["data-slot"]}
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

  it("shows the age gate for unknown visitors and hides Coming Soon content", () => {
    render(<TheVaultPageByAgeState ageState="unknown" />);

    expect(
      screen.getByRole("heading", { name: "Age Verification Required" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: /Unveiling/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(THE_VAULT_COMING_SOON_COPY.description),
    ).not.toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="the-vault-page"]'),
    ).not.toBeInTheDocument();
  });

  it("blocks under-21 visitors from Coming Soon content", () => {
    render(<TheVaultPageByAgeState ageState="under21" />);

    expect(
      screen.getByRole("navigation", { name: "Under-21 navigation" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: "THE ROASTERY" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: /Unveiling/i }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Oops")).not.toBeInTheDocument();
    expect(
      screen.queryByText(THE_VAULT_COMING_SOON_COPY.description),
    ).not.toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="the-vault-page"]'),
    ).not.toBeInTheDocument();
  });

  it("renders the approved Coming Soon page for over-21 visitors", () => {
    render(<TheVaultPageByAgeState ageState="over21" />);

    expect(
      screen.getByRole("navigation", { name: "Main navigation" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: /Unveiling\s*soon/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(THE_VAULT_COMING_SOON_COPY.description),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: THE_VAULT_COMING_SOON_COPY.homepageLabel }),
    ).toHaveAttribute("href", "/");
    expect(
      screen.getByRole("button", {
        name: THE_VAULT_COMING_SOON_COPY.productsDeferredLabel,
      }),
    ).toBeDisabled();
    expect(
      screen.getByRole("heading", { level: 2, name: "Stay in Know" }),
    ).toBeInTheDocument();
  });

  it("preserves section order and Figma node contracts", () => {
    const { container } = render(
      <TheVaultPageByAgeState ageState="over21" />,
    );

    const orderedSlots = [
      "the-vault-visual",
      "the-vault-content",
      "the-vault-actions",
    ];
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
      container.querySelector('[data-figma-node="12339:55472"]'),
    ).toHaveAttribute("data-slot", "the-vault-page");
    expect(
      container.querySelector('[data-figma-node="12339:55474"]'),
    ).toHaveAttribute("data-slot", "the-vault-visual");
    expect(
      container.querySelector('[data-figma-node="12339:55473"]'),
    ).toHaveAttribute("data-slot", "the-vault-oops");
    expect(
      container.querySelector('[data-figma-node="12379:13365"]'),
    ).toHaveAttribute("data-slot", "the-vault-content");
  });

  it("applies visual region desktop height and decorative Oops semantics", () => {
    const { container } = render(
      <TheVaultPageByAgeState ageState="over21" />,
    );
    const visual = container.querySelector('[data-slot="the-vault-visual"]');
    const oops = container.querySelector('[data-slot="the-vault-oops"]');

    expect(visual).toHaveClass("desktop:h-[772px]");
    expect(visual).toHaveClass("overflow-hidden");
    expect(oops).toHaveAttribute("aria-hidden", "true");
    expect(oops).toHaveTextContent(THE_VAULT_COMING_SOON_COPY.decorativeOops);
  });

  it("uses the local Coming Soon background path without temporary Figma URLs", () => {
    const { container } = render(
      <TheVaultPageByAgeState ageState="over21" />,
    );

    expect(THE_VAULT_COMING_SOON_BACKGROUND).toBe(
      "/images/m05-vault/the-vault-coming-soon-background.jpg",
    );
    expect(
      existsSync(
        join(
          process.cwd(),
          "public",
          "images",
          "m05-vault",
          "the-vault-coming-soon-background.jpg",
        ),
      ),
    ).toBe(true);

    const background = container.querySelector(
      '[data-slot="the-vault-background-image"] img',
    );
    expect(background).toHaveAttribute(
      "src",
      THE_VAULT_COMING_SOON_BACKGROUND,
    );
    expect(background).toHaveAttribute("alt", "");
    expect(background?.getAttribute("src") ?? "").not.toContain("figma.com");
    expect(background?.getAttribute("src") ?? "").not.toContain("mcp/asset");
    expect(background?.getAttribute("src") ?? "").not.toContain("http");
    expect(container.innerHTML).not.toContain("figma.com/api/mcp/asset");
  });

  it("keeps Homepage active and Products deferred without href", () => {
    const { container } = render(
      <TheVaultPageByAgeState ageState="over21" />,
    );

    const homepage = screen.getByRole("link", {
      name: THE_VAULT_COMING_SOON_COPY.homepageLabel,
    });
    expect(homepage).toHaveAttribute("href", "/");
    expect(homepage).toHaveClass("focus-visible:ring-2");

    const products = screen.getByRole("button", {
      name: THE_VAULT_COMING_SOON_COPY.productsDeferredLabel,
    });
    expect(products).toBeDisabled();
    expect(products).not.toHaveAttribute("href");
    expect(
      container.querySelector('[data-slot="the-vault-products-deferred"] a'),
    ).toBeNull();
  });

  it("removes obsolete Vault offer content from the runtime page", () => {
    render(<TheVaultPageByAgeState ageState="over21" />);

    expect(screen.queryByText("THE VAULT")).not.toBeInTheDocument();
    expect(screen.queryByText("Offer 01")).not.toBeInTheDocument();
    expect(screen.queryByText("Build Your Collection")).not.toBeInTheDocument();
    expect(screen.queryByText("ENROLLMENT OPEN")).not.toBeInTheDocument();
    expect(screen.queryByText("VIEW DETAILS")).not.toBeInTheDocument();
    expect(screen.queryByText("RARE OPPORTUNITIES")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Distinguished Selections"),
    ).not.toBeInTheDocument();
    expect(document.querySelectorAll("[data-vault-offer-card]")).toHaveLength(
      0,
    );
    expect(screen.queryByRole("navigation", { name: "Breadcrumb" })).toBeNull();
  });

  it("does not mask document overflow at the Vault page root", () => {
    const { container } = render(
      <TheVaultPageByAgeState ageState="over21" />,
    );
    const page = container.querySelector('[data-slot="the-vault-page"]');
    const main = container.querySelector('[data-slot="the-vault-main"]');

    expect(page?.className).not.toMatch(/overflow-x-(hidden|clip)/);
    expect(main?.className).not.toMatch(/overflow-x-(hidden|clip)/);
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
  });
});

describe("/the-vault route", () => {
  it("preserves noindex metadata with Coming Soon description", () => {
    expect(metadata.title).toBe("The Vault");
    expect(metadata.description).toBe(
      "We're creating an experience worthy of the Velarro name while The Vault is prepared for its arrival.",
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
      screen.getByRole("heading", { level: 1, name: /Unveiling\s*soon/i }),
    ).toBeInTheDocument();
  });

  it("marks /the-vault manifest at Coming Soon node and leaves /coming-soon unimplemented", () => {
    expect(findRouteManifestEntry("/the-vault")).toMatchObject({
      route: "/the-vault",
      module: "M05-vault",
      figmaNodeId: "12339:55472",
      implemented: true,
      public: true,
      indexable: false,
      audience: "age-gated",
    });

    expect(findRouteManifestEntry("/coming-soon")).toMatchObject({
      route: "/coming-soon",
      module: "M01-home",
      figmaNodeId: "12339:55472",
      implemented: false,
      public: true,
      indexable: false,
      audience: "review",
    });

    expect(
      ROUTE_MANIFEST.filter((entry) => entry.figmaNodeId === "12339:55472"),
    ).toHaveLength(2);
  });
});
