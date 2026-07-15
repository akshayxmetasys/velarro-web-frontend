import {
  UNDER21_NAVBAR_FIGMA_NODE,
  UNDER21_PRIMARY_NAV_ITEMS,
  type Under21NavbarItem,
} from "@/components/m01-under21/under21-data";
import { UNDER21_NAVBAR_LOGO_URL } from "@/components/m01-under21/under21-assets";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

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

function MenuIcon() {
  return (
    <svg
      aria-hidden="true"
      width="24"
      height="22"
      viewBox="0 0 24 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="block shrink-0 text-icon-default"
    >
      <path d="M0 6H24" stroke="currentColor" strokeWidth="2" />
      <path d="M0 16H24" stroke="currentColor" strokeWidth="2" />
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

function BlockedNavbarItem({ label, reason }: { label: string; reason: string }) {
  return (
    <span
      role="link"
      aria-disabled="true"
      aria-label={`${label} (unavailable: ${reason})`}
      title={`${label} - ${reason}`}
      className="cursor-not-allowed whitespace-nowrap font-[family-name:var(--velarro-ui-elements-navbar-font-family)] text-[length:var(--velarro-ui-elements-navbar-font-size)] font-normal leading-normal text-icon-default opacity-75"
    >
      {label}
    </span>
  );
}

function ReviewNavbarLink({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      className="whitespace-nowrap font-[family-name:var(--velarro-ui-elements-navbar-font-family)] text-[length:var(--velarro-ui-elements-navbar-font-size)] font-normal leading-normal text-icon-default"
    >
      {label}
    </Link>
  );
}

function NavbarItem({ item }: { item: Under21NavbarItem }) {
  if (item.kind === "review-link" && item.href) {
    return <ReviewNavbarLink label={item.label} href={item.href} />;
  }

  return <BlockedNavbarItem label={item.label} reason={item.reason} />;
}

function DeferredMenuButton() {
  return (
    <button
      type="button"
      disabled
      aria-disabled="true"
      aria-label="Open main menu (deferred: menu behavior not approved)"
      title="Main menu - menu behavior not approved"
      className="inline-flex cursor-not-allowed items-center rounded-[37px] p-[4px] text-icon-default opacity-75"
    >
      <MenuIcon />
    </button>
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

export function Under21Navbar() {
  return (
    <nav
      aria-label="Under-21 navigation"
      className="sticky top-0 z-50 isolate w-full border-b-[0.5px] border-border-strong"
      data-figma-node={UNDER21_NAVBAR_FIGMA_NODE}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 backdrop-blur-[10px]"
        style={{ backgroundColor: "rgba(29, 28, 26, 0.6)" }}
      />
      <div className="relative grid h-[73px] w-full grid-cols-[minmax(0,1fr)_173px_minmax(0,1fr)] items-center px-[40px] py-[8px]">
        <div className="flex min-w-0 items-center justify-start gap-[42px]">
          <DeferredMenuButton />
          <div className="flex items-center gap-[42px]">
            {UNDER21_PRIMARY_NAV_ITEMS.slice(0, 2).map((item) => (
              <NavbarItem key={item.label} item={item} />
            ))}
          </div>
          <NavbarItem item={UNDER21_PRIMARY_NAV_ITEMS[2]} />
        </div>

        <Link
          href="/"
          aria-label="Go to Velarro homepage"
          className="flex w-[173px] flex-col items-center justify-self-center"
        >
          <Image
            src={UNDER21_NAVBAR_LOGO_URL}
            alt="Velarro Estate"
            width={173}
            height={54}
            preload
            className="h-[54px] w-[173px] object-contain"
          />
        </Link>

        <div className="flex h-[42px] min-w-0 items-center justify-end gap-[50px]">
          <DeferredSearchPill />
          <div className="flex items-center gap-[50px]">
            <DeferredUtilityControl
              label="Cart"
              icon={<CartIcon />}
              reason="cart route not approved for this scope"
            />
            <DeferredUtilityControl
              label="Login"
              icon={<LoginIcon />}
              reason="login route not approved until M02 Auth"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
