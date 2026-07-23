import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { usePathname } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  MAIN_MENU_ITEMS,
  MAIN_MENU_SIDEBAR_COMPONENT_SET_NODE,
  MAIN_MENU_SIDEBAR_FIGMA_NODE,
} from "@/components/layout/main-menu-sidebar";
import { MainNavbar } from "@/components/layout/main-navbar";
import { M01_HOME_APPROVED_IMAGES } from "@/lib/assets/approved-image-hosts";

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

describe("MainNavbar", () => {
  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValue("/the-vault");
  });

  it("renders the main navigation landmark and deferred controls", () => {
    render(<MainNavbar />);

    expect(screen.getByRole("navigation", { name: "Main navigation" })).toBeInTheDocument();
    expect(screen.getByAltText("Velarro Estate")).toHaveAttribute(
      "src",
      M01_HOME_APPROVED_IMAGES.navbarLogoScript,
    );
    expect(screen.getByAltText("Velarro Estate")).toHaveAttribute(
      "data-width",
      "173",
    );
    expect(screen.getByAltText("Velarro Estate")).toHaveAttribute(
      "data-height",
      "54",
    );
    expect(screen.getByAltText("Velarro Estate")).toHaveClass(
      "max-w-[173px]",
      "object-contain",
      "desktop:h-[54px]",
      "desktop:w-[173px]",
    );
    expect(
      screen.getByRole("link", { name: "Go to Velarro homepage" }),
    ).toHaveAttribute("href", "/");
    expect(
      screen.getByRole("button", { name: "Open main menu" }),
    ).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText(/SINCE\s+1919/)).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "The Estate" })).toHaveAttribute(
      "href",
      "/the-estate",
    );
    expect(screen.getByRole("link", { name: "Partner" })).toHaveAttribute(
      "href",
      "/partner",
    );
    expect(screen.getByRole("link", { name: "Our Story" })).toHaveAttribute(
      "href",
      "/our-story",
    );
    expect(screen.getByLabelText(/Search \(deferred/i)).toBeDisabled();
    expect(screen.getByLabelText(/Cart \(deferred/i)).toBeDisabled();
    expect(screen.getByLabelText(/Login \(deferred/i)).toBeDisabled();
  });

  it("preserves the approved desktop primary link order without sidebar duplicates", () => {
    render(<MainNavbar />);

    const desktopLinks = document.querySelector(
      '[data-navbar-cluster="desktop-links"]',
    );
    expect(desktopLinks).not.toBeNull();

    const anchors = Array.from(
      desktopLinks!.querySelectorAll<HTMLAnchorElement>("a"),
    );
    expect(anchors.map((link) => link.textContent)).toEqual([
      "The Estate",
      "Partner",
      "Our Story",
    ]);
    expect(anchors.map((link) => link.getAttribute("href"))).toEqual([
      "/the-estate",
      "/partner",
      "/our-story",
    ]);
    expect(screen.queryByRole("dialog", { name: "Estate Index" })).toBeNull();
    expect(screen.queryByRole("link", { name: "Estate Index" })).toBeNull();
  });

  it("opens the Figma main menu sidebar with the approved route links", async () => {
    const user = userEvent.setup();
    render(<MainNavbar />);

    await user.click(screen.getByRole("button", { name: "Open main menu" }));

    const dialog = screen.getByRole("dialog", { name: "Estate Index" });
    expect(dialog).toHaveAttribute("data-figma-node", MAIN_MENU_SIDEBAR_FIGMA_NODE);
    expect(dialog).toHaveAttribute(
      "data-figma-component-set",
      MAIN_MENU_SIDEBAR_COMPONENT_SET_NODE,
    );
    expect(
      screen.getByRole("button", { name: "Open main menu" }),
    ).toHaveAttribute("aria-expanded", "true");

    const menu = within(dialog).getByRole("navigation", { name: "Main menu" });
    expect(
      within(menu).getByRole("link", { name: "Estate Index" }),
    ).toHaveAttribute("href", "/the-estate");

    for (const item of MAIN_MENU_ITEMS.slice(1)) {
      expect(within(menu).getByRole("link", { name: item.label })).toHaveAttribute(
        "href",
        item.href,
      );
    }

    expect(
      within(menu).getAllByRole("link").map((link) => link.textContent),
    ).toEqual(MAIN_MENU_ITEMS.map((item) => item.label));
    expect(
      within(menu).getByRole("link", { name: "Partner" }),
    ).toHaveAttribute("href", "/partner");
    expect(
      within(menu).getByRole("link", { name: "Our Story" }),
    ).toHaveAttribute("href", "/our-story");

    expect(within(menu).getByRole("link", { name: "The Vault" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(within(menu).getByRole("link", { name: "The Vault" })).toHaveClass(
      "bg-labels-active-selected",
    );
    expect(within(menu).getByRole("link", { name: "The House" })).toHaveAttribute(
      "href",
      "/the-estate/the-house",
    );
    expect(
      within(menu).getByRole("link", { name: "News & Events" }),
    ).toHaveAttribute("href", "/the-chronicle");
    expect(
      within(menu).getByRole("link", { name: "Membership" }),
    ).toHaveAttribute("href", "/membership");
    expect(
      within(menu).getByRole("link", { name: "Membership" }),
    ).toHaveAttribute("data-route-implemented", "true");
  });

  it("keeps Partner and Our Story keyboard reachable inside the sidebar focus loop", async () => {
    const user = userEvent.setup();
    render(<MainNavbar />);

    await user.click(screen.getByRole("button", { name: "Open main menu" }));
    const dialog = screen.getByRole("dialog", { name: "Estate Index" });
    expect(dialog).toHaveFocus();

    await user.tab();
    expect(screen.getByRole("button", { name: "Dismiss main menu backdrop" })).toHaveFocus();

    await user.tab();
    expect(screen.getByRole("link", { name: "Estate Index" })).toHaveFocus();

    await user.tab();
    const partnerLink = within(dialog).getByRole("link", { name: "Partner" });
    expect(partnerLink).toHaveFocus();

    await user.tab();
    const ourStoryLink = within(dialog).getByRole("link", { name: "Our Story" });
    expect(ourStoryLink).toHaveFocus();

    await user.tab({ shift: true });
    expect(partnerLink).toHaveFocus();

    await user.tab({ shift: true });
    expect(screen.getByRole("link", { name: "Estate Index" })).toHaveFocus();
  });

  it("closes the sidebar on Escape and restores focus to the menu button", async () => {
    const user = userEvent.setup();
    render(<MainNavbar />);

    const trigger = screen.getByRole("button", { name: "Open main menu" });
    await user.click(trigger);
    expect(screen.getByRole("dialog", { name: "Estate Index" })).toBeInTheDocument();

    await user.keyboard("{Escape}");

    expect(screen.queryByRole("dialog", { name: "Estate Index" })).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("closes the sidebar from the backdrop and restores focus to the menu button", async () => {
    const user = userEvent.setup();
    render(<MainNavbar />);

    const trigger = screen.getByRole("button", { name: "Open main menu" });
    await user.click(trigger);
    await user.click(screen.getByRole("button", { name: "Dismiss main menu backdrop" }));

    expect(screen.queryByRole("dialog", { name: "Estate Index" })).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("keeps The Vault reachable and closes the sidebar after link activation", async () => {
    const user = userEvent.setup();
    render(<MainNavbar />);

    await user.click(screen.getByRole("button", { name: "Open main menu" }));
    const vaultLink = screen.getByRole("link", { name: "The Vault" });
    vaultLink.addEventListener("click", (event) => event.preventDefault(), {
      once: true,
    });
    await user.click(vaultLink);

    expect(screen.queryByRole("dialog", { name: "Estate Index" })).not.toBeInTheDocument();
  });

  it.each([
    { label: "Partner", href: "/partner" },
    { label: "Our Story", href: "/our-story" },
  ] as const)(
    "activates $label from the keyboard and releases the closed sidebar",
    async ({ label, href }) => {
      const user = userEvent.setup();
      render(<MainNavbar />);

      const trigger = screen.getByRole("button", { name: "Open main menu" });
      await user.click(trigger);
      const dialog = screen.getByRole("dialog", { name: "Estate Index" });

      const link = within(dialog).getByRole("link", { name: label });
      expect(link).toHaveAttribute("href", href);
      link.addEventListener("click", (event) => event.preventDefault(), {
        once: true,
      });

      link.focus();
      await user.keyboard("{Enter}");

      expect(screen.queryByRole("dialog", { name: "Estate Index" })).not.toBeInTheDocument();
      expect(trigger).toHaveFocus();

      await user.tab();
      expect(document.activeElement).not.toBe(link);
    },
  );

  it("keeps deferred sidebar menu behavior unchanged", async () => {
    const user = userEvent.setup();
    render(<MainNavbar />);

    await user.click(screen.getByRole("button", { name: "Open main menu" }));

    const newsLink = screen.getByRole("link", { name: "News & Events" });
    expect(newsLink).toHaveAttribute("href", "/the-chronicle");
    expect(newsLink).toHaveAttribute("data-route-implemented", "false");
  });

  it("progressively discloses desktop link and utility clusters", () => {
    render(<MainNavbar />);

    const links = document.querySelector('[data-navbar-cluster="desktop-links"]');
    const utilities = document.querySelector('[data-navbar-cluster="utilities"]');

    expect(links).toHaveClass("hidden", "desktop:flex");
    expect(utilities).toHaveClass("hidden", "min-[1024px]:flex");
    expect(
      screen.getByRole("navigation", { name: "Main navigation" }),
    ).toContainElement(screen.getByRole("button", { name: "Open main menu" }));
  });
});
