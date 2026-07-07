"use client";

import Link from "next/link";
import { Drawer } from "@/components/ui/drawer";
import {
  footerNavigationSections,
  mainNavigationLinks,
  utilityNavigationLinks,
} from "@/components/layout/navigation-data";

export interface MobileNavigationDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNavigationDrawer({ open, onClose }: MobileNavigationDrawerProps) {
  return (
    <Drawer open={open} onClose={onClose} title="Estate Index" side="left" className="max-w-[220px] bg-background-section">
      <nav aria-label="Mobile navigation" className="flex flex-col gap-spacing-48">
        <div className="flex flex-col items-start">
          {[...mainNavigationLinks, ...footerNavigationSections[0].links.slice(1, 3)].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex h-[50px] w-full items-center px-spacing-20 py-2 text-[20px] font-[number:var(--velarro-heading-section-font-weight)] leading-[26px] text-text-heading"
              onClick={onClose}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/the-chronicle"
            className="flex h-[50px] w-full items-center px-spacing-20 py-2 text-[20px] font-[number:var(--velarro-heading-section-font-weight)] leading-[26px] text-text-heading"
            onClick={onClose}
          >
            News &amp; Events
          </Link>
          {[{ label: "Membership", href: "/membership" as const }, { label: "Get in touch", href: "/get-in-touch" as const }].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex h-[50px] w-full items-center px-spacing-20 py-2 text-[20px] font-[number:var(--velarro-heading-section-font-weight)] leading-[26px] text-text-heading"
              onClick={onClose}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-spacing-20 border-t border-border-light pt-spacing-20">
          {utilityNavigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[length:var(--font-size-3)] text-color-info-links"
              onClick={onClose}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </Drawer>
  );
}
