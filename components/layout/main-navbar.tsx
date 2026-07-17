import { MainMenuSidebar } from "@/components/layout/main-menu-sidebar";
import {
  M01_HOME_APPROVED_IMAGES,
  assertApprovedImageUrl,
} from "@/lib/assets/approved-image-hosts";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

const NAVBAR_LOGO_URL = assertApprovedImageUrl(
  M01_HOME_APPROVED_IMAGES.navbarLogoScript,
);

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <circle cx="9.5" cy="9.5" r="6.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M14.5 14.5L19 19"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      aria-hidden="true"
      width="15"
      height="16"
      viewBox="0 0 15 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path
        d="M1 1H2.4L3.6 12.2H12.8L14 4.4H4"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="5.5" cy="14" r="1" fill="currentColor" />
      <circle cx="11.5" cy="14" r="1" fill="currentColor" />
    </svg>
  );
}

function LoginIcon() {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path
        d="M6 2H15V16H6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 9H2M2 9L5 6M2 9L5 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NavbarLink({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      className="whitespace-nowrap font-[family-name:var(--velarro-ui-elements-navbar-font-family)] text-[length:var(--velarro-ui-elements-navbar-font-size)] font-normal leading-normal text-icon-default"
    >
      {label}
    </Link>
  );
}

function DeferredSearchPill() {
  return (
    <button
      type="button"
      disabled
      aria-disabled="true"
      aria-label="Search (deferred: search behavior not approved)"
      title="Search - search behavior not approved"
      className="inline-flex h-[35px] cursor-not-allowed items-center gap-[25px] rounded-[24px] bg-[rgba(249,245,237,0.37)] px-[21px] text-icon-default"
    >
      <span className="whitespace-nowrap font-[family-name:var(--velarro-ui-elements-navbar-font-family)] text-[length:var(--velarro-ui-elements-navbar-font-size)] font-normal leading-[23px] text-text-text-white opacity-75">
        Search..
      </span>
      <SearchIcon />
    </button>
  );
}

interface DeferredUtilityControlProps {
  label: string;
  icon: ReactNode;
  reason: string;
}

function DeferredUtilityControl({
  label,
  icon,
  reason,
}: DeferredUtilityControlProps) {
  return (
    <button
      type="button"
      disabled
      aria-disabled="true"
      aria-label={`${label} (deferred: ${reason})`}
      title={`${label} - ${reason}`}
      className="inline-flex cursor-not-allowed items-center gap-[6px] whitespace-nowrap border-0 bg-transparent p-0 font-[family-name:var(--velarro-ui-elements-navbar-font-family)] text-[length:var(--velarro-ui-elements-navbar-font-size)] font-normal leading-normal text-icon-default"
    >
      <span>{label}</span>
      {icon}
    </button>
  );
}

/**
 * Shared Over-21 MainNavbar.
 * Desktop geometry follows Figma `14279:30062` / `14406:85640` at 1440px.
 * Below desktop, progressive disclosure is engineering-derived (no approved
 * responsive navbar frame): desktop links hide under `desktop`; deferred
 * utilities hide under `min-[1024px]` so tablet/mobile rely on MainMenuSidebar.
 */
export function MainNavbar() {
  return (
    <nav
      aria-label="Main navigation"
      className="sticky top-0 z-50 isolate w-full border-b-[0.5px] border-border-strong"
      data-figma-node="14406:85640"
      data-figma-source="14279:30062"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-background-navbar-overlay backdrop-blur-[10px]"
      />
      <div className="relative grid h-[73px] w-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center px-4 py-[8px] tablet:px-6 desktop:px-[40px]">
        <div className="flex min-w-0 items-center justify-start gap-4 desktop:gap-[42px]">
          <MainMenuSidebar />
          <div
            className="hidden items-center gap-[42px] desktop:flex"
            data-navbar-cluster="desktop-links"
          >
            <NavbarLink label="The Estate" href="/the-estate" />
            <NavbarLink label="Partner" href="/partner" />
            <NavbarLink label="Our Story" href="/our-story" />
          </div>
        </div>

        <Link
          href="/"
          aria-label="Go to Velarro homepage"
          className="flex w-[140px] max-w-full flex-col items-center justify-self-center tablet:w-[160px] desktop:w-[173px]"
        >
          <Image
            src={NAVBAR_LOGO_URL}
            alt="Velarro Estate"
            width={173}
            height={54}
            preload
            className="h-auto w-full max-w-[173px] object-contain desktop:h-[54px] desktop:w-[173px]"
          />
        </Link>

        <div
          className="hidden h-[42px] min-w-0 items-center justify-end gap-6 min-[1024px]:flex desktop:gap-[50px]"
          data-navbar-cluster="utilities"
        >
          <DeferredSearchPill />
          <div className="flex items-center gap-6 desktop:gap-[50px]">
            <DeferredUtilityControl
              label="Cart"
              icon={<CartIcon />}
              reason="cart route not approved for this scope"
            />
            <DeferredUtilityControl
              label="Login"
              icon={<LoginIcon />}
              reason="login route not approved for this scope"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
