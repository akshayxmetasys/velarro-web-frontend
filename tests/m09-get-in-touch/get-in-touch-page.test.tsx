import { render, screen, within } from "@testing-library/react";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { usePathname } from "next/navigation";
import type { CSSProperties } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import GetInTouchRoute, { metadata } from "@/app/get-in-touch/page";
import { GET_IN_TOUCH_ASSETS } from "@/components/m09-get-in-touch/get-in-touch-assets";
import { GetInTouchPageByAgeState } from "@/components/m09-get-in-touch/get-in-touch-page-by-age-state";
import {
  GET_IN_TOUCH_FIGMA_NODE,
  GET_IN_TOUCH_FORM_COPY,
  GET_IN_TOUCH_FORM_FIELDS,
  GET_IN_TOUCH_HERO_COPY,
  GET_IN_TOUCH_INTRO_COPY,
  GET_IN_TOUCH_MESSAGE_FIELD,
  GET_IN_TOUCH_SUBJECT_FIELD,
} from "@/components/m09-get-in-touch/get-in-touch-data";
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

describe("GetInTouchPageByAgeState", () => {
  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValue("/get-in-touch");
  });

  it.each(["unknown", "under21", "over21"] as const)(
    "renders the public review Get in Touch page for %s visitors",
    (ageState) => {
      const { container } = render(
        <GetInTouchPageByAgeState ageState={ageState} />,
      );

      const page = container.querySelector("[data-route='/get-in-touch']");
      expect(page).toHaveAttribute("data-figma-node", GET_IN_TOUCH_FIGMA_NODE);
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
          name: GET_IN_TOUCH_HERO_COPY.title,
        }),
      ).toBeInTheDocument();
    },
  );

  it("renders hero, breadcrumb, intro, form shell, contact info, and deferred map", () => {
    const { container } = render(
      <GetInTouchPageByAgeState ageState="unknown" />,
    );

    const hero = screen.getByTestId("get-in-touch-hero");
    expect(hero).toHaveClass("desktop:h-[655px]");

    const heroImage = screen.getByTestId("get-in-touch-hero-image");
    expect(heroImage).toHaveAttribute("src", GET_IN_TOUCH_ASSETS.hero.url);
    expect(heroImage).toHaveAttribute("data-asset-slot", "get_in_touch_hero");
    expect(heroImage).toHaveAttribute("data-asset-status", "approved");
    expect(container.querySelectorAll("[data-testid='get-in-touch-hero-image']")).toHaveLength(1);
    expect(heroImage).toHaveClass("object-cover");
    expect(heroImage).toHaveStyle({
      objectFit: "cover",
      objectPosition: "50% 50%",
      width: "100%",
      height: "100%",
    });
    expect(heroImage).not.toHaveStyle({ transform: "scale(1.1)" });

    const breadcrumb = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(within(breadcrumb).getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(within(breadcrumb).getByText("Get in Touch")).toHaveAttribute(
      "aria-current",
      "page",
    );

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: GET_IN_TOUCH_INTRO_COPY.heading,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(GET_IN_TOUCH_INTRO_COPY.body),
    ).toBeInTheDocument();

    expect(container.querySelector("[data-get-in-touch-form]")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: GET_IN_TOUCH_FORM_COPY.heading }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Contact Information" }),
    ).toBeInTheDocument();

    const map = screen.getByTestId("get-in-touch-map-deferred");
    expect(map).toHaveAttribute("data-asset-slot", "get_in_touch_map");
    expect(map).toHaveAttribute("data-asset-status", "deferred");
    expect(map.querySelector("iframe")).toBeNull();
    expect(map.querySelector("img")).toBeNull();
  });

  it("renders all five form controls with semantic labels and required state", () => {
    render(<GetInTouchPageByAgeState ageState="unknown" />);

    for (const field of GET_IN_TOUCH_FORM_FIELDS) {
      const control = screen.getByLabelText(field.label);
      expect(control).toHaveAttribute("name", field.name);
      expect(control).toHaveAttribute("type", field.type);
      expect(control).toBeRequired();
      expect(control).toHaveAttribute("placeholder", field.placeholder);
    }

    const subject = screen.getByLabelText(GET_IN_TOUCH_SUBJECT_FIELD.label);
    expect(subject.tagName).toBe("INPUT");
    expect(subject).toBeRequired();
    expect(subject).toHaveAttribute("placeholder", GET_IN_TOUCH_SUBJECT_FIELD.placeholder);

    const message = screen.getByLabelText(GET_IN_TOUCH_MESSAGE_FIELD.label);
    expect(message.tagName).toBe("TEXTAREA");
    expect(message).toBeRequired();
    expect(message).toHaveAttribute(
      "placeholder",
      GET_IN_TOUCH_MESSAGE_FIELD.placeholder,
    );
  });

  it("does not use temporary Figma URLs, raw crop values, or local route images", () => {
    const { container } = render(
      <GetInTouchPageByAgeState ageState="unknown" />,
    );
    const html = container.innerHTML;

    expect(html).not.toContain("figma.com");
    expect(html).not.toContain("mcp/asset");
    expect(html).not.toContain("1452px");
    expect(html).not.toContain("1162px");
    expect(html).not.toContain("-309px");
    expect(html).not.toContain("/images/m09-get-in-touch");
    expect(GET_IN_TOUCH_ASSETS.map.url).toBeNull();
    expect(
      existsSync(join(process.cwd(), "public", "images", "m09-get-in-touch")),
    ).toBe(false);
  });

  it("uses only approved remote image hosts for inherited shared images", () => {
    const { container } = render(
      <GetInTouchPageByAgeState ageState="unknown" />,
    );
    const imageSources = Array.from(container.querySelectorAll("img")).map((image) =>
      image.getAttribute("src"),
    );

    for (const src of imageSources) {
      expect(src).not.toBeNull();
      expect(isApprovedImageUrl(src as string)).toBe(true);
    }
  });
});

describe("/get-in-touch route", () => {
  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValue("/get-in-touch");
  });

  it("has noindex page metadata for the public review page", () => {
    expect(metadata.title).toBe("Get in Touch");
    expect(metadata.description).toBe(
      "Contact Velarro for orders, product questions, vendor inquiries, and general support.",
    );
    expect(metadata.alternates?.canonical).toBe(
      "https://velarroestate.com/get-in-touch",
    );
    expect(metadata.robots).toMatchObject({ index: false, follow: false });
  });

  it("marks the route as implemented review/public in the manifest", () => {
    expect(findRouteManifestEntry("/get-in-touch")).toMatchObject({
      route: "/get-in-touch",
      module: "M09-engagement",
      figmaNodeId: "14644:34661",
      implemented: true,
      public: true,
      indexable: false,
      audience: "review",
    });
  });

  it.each(["unknown", "under21", "over21"] as const)(
    "keeps /get-in-touch visible for %s visitors",
    (ageState) => {
      expect(getRouteAccess("/get-in-touch", ageState).decision).not.toBe("block");
      expect(getRouteAccess("/get-in-touch", ageState).decision).not.toBe("gate");
    },
  );

  it("uses the cookie age state for the route render without gating Get in Touch", async () => {
    vi.mocked(getInitialAgeStateFromCookies).mockResolvedValue("under21");

    render(await GetInTouchRoute());

    expect(getInitialAgeStateFromCookies).toHaveBeenCalledOnce();
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: GET_IN_TOUCH_HERO_COPY.title,
      }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Access restricted" }),
    ).not.toBeInTheDocument();
  });
});
