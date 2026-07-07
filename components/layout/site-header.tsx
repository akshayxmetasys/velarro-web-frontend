"use client";

import type { HTMLAttributes } from "react";
import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { Container } from "@/components/layout/container";
import { LogoMark } from "@/components/layout/logo-mark";
import { MobileNavigationDrawer } from "@/components/layout/mobile-navigation-drawer";
import {
  mainNavigationLinks,
  utilityNavigationLinks,
} from "@/components/layout/navigation-data";

export interface SiteHeaderProps extends HTMLAttributes<HTMLElement> {
  variant?: "default" | "image";
}

/**
 * MAIN NAVBAR shell. Figma-verified visible text: The Estate, Partner,
 * Our Story, Velarro Estate, SINCE  1919, Search.., Cart, Login.
 */
export function SiteHeader({ className, variant = "default", ...props }: SiteHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b-[0.5px] border-icon-default bg-background-navbar/60 text-icon-default backdrop-blur-[10px]",
        variant === "image" && "bg-background-navbar/80",
        className,
      )}
      {...props}
    >
      <Container className="flex min-h-[73px] max-w-[1440px] items-center justify-between gap-spacing-24 px-spacing-20 py-2 min-[1440px]:gap-[195px] min-[1440px]:px-spacing-40">
        <div className="flex shrink-0 items-center gap-spacing-24 min-[1440px]:gap-[42px]">
          <button
            type="button"
            aria-label="Open menu"
            className="inline-flex h-[30px] w-8 items-center justify-center rounded-[37px] p-1 text-icon-default"
            onClick={() => setMobileOpen(true)}
          >
            <span
              aria-hidden="true"
              className="h-px w-6 bg-current shadow-[0_6px_0_current,0_-6px_0_current]"
            />
          </button>
          <nav aria-label="Main navigation" className="hidden min-[768px]:block">
            <ul className="flex items-center gap-[42px]">
              {mainNavigationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="whitespace-nowrap text-[length:var(--velarro-ui-elements-navbar-font-size)] leading-[var(--velarro-ui-elements-navbar-line-height)] text-icon-default hover:text-text-hover-button"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="hidden shrink-0 justify-center min-[768px]:flex">
          <LogoMark compact />
        </div>

        <div className="flex shrink-0 items-center justify-end gap-spacing-20 min-[1024px]:h-[42px] min-[1440px]:gap-[50px]">
          <button
            type="button"
            aria-label="Search"
            className="hidden h-[35px] w-[159px] items-center gap-[25px] rounded-[24px] bg-button-fill/30 px-[21px] text-[length:var(--velarro-ui-elements-navbar-font-size)] leading-[23px] text-text-text-white/75 min-[1024px]:inline-flex"
          >
            <span>Search..</span>
            <span aria-hidden="true" className="h-[22px] w-[22px] rounded-full border border-current" />
          </button>
          {utilityNavigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hidden whitespace-nowrap text-[length:var(--velarro-ui-elements-navbar-font-size)] text-icon-default hover:text-text-hover-button min-[768px]:inline-flex"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </Container>
      <MobileNavigationDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
