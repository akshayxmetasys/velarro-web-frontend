"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useId, useRef, useState } from "react";
import { useOverlayFocusLock } from "@/lib/a11y/use-overlay-focus-lock";
import { cn } from "@/lib/cn";

export const MAIN_MENU_SIDEBAR_FIGMA_NODE = "14351:51937" as const;
export const MAIN_MENU_SIDEBAR_COMPONENT_SET_NODE = "14351:51939" as const;

export const MAIN_MENU_ITEMS = [
  { label: "Estate Index", href: "/the-estate", implemented: true },
  { label: "Partner", href: "/partner", implemented: true },
  { label: "Our Story", href: "/our-story", implemented: true },
  { label: "The House", href: "/the-estate/the-house", implemented: true },
  { label: "The Vault", href: "/the-vault", implemented: true },
  { label: "Careers", href: "/careers", implemented: true },
  { label: "News & Events", href: "/the-chronicle", implemented: false },
  { label: "Pairing Guide", href: "/pairing-guide", implemented: true },
  { label: "Membership", href: "/membership", implemented: true },
  { label: "Get in touch", href: "/get-in-touch", implemented: true },
] as const;

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

export function MainMenuSidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const dialogId = useId();
  const titleId = useId();
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useOverlayFocusLock({
    open,
    onClose: () => setOpen(false),
    containerRef: overlayRef,
    initialFocusRef: panelRef,
  });

  return (
    <>
      <button
        type="button"
        aria-label="Open main menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? dialogId : undefined}
        onClick={() => setOpen(true)}
        className="inline-flex h-[22px] w-[24px] items-center justify-center border-0 bg-transparent p-0 text-icon-default"
      >
        <MenuIcon />
      </button>

      {open ? (
        <div ref={overlayRef} className="fixed inset-0 z-[60] flex">
          <button
            type="button"
            aria-label="Dismiss main menu backdrop"
            className="absolute inset-0 cursor-default bg-transparent"
            onClick={() => setOpen(false)}
          />
          <aside
            id={dialogId}
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            className="relative z-10 flex h-full w-[220px] flex-col items-center gap-[24px] overflow-x-hidden overflow-y-auto overscroll-contain bg-background-section pt-[72px] shadow-confirmation-modal outline-none"
            data-figma-node={MAIN_MENU_SIDEBAR_FIGMA_NODE}
            data-figma-component-set={MAIN_MENU_SIDEBAR_COMPONENT_SET_NODE}
          >
            <nav aria-label="Main menu" className="flex w-[184px] flex-col">
              <Link
                id={titleId}
                href="/the-estate"
                onClick={() => setOpen(false)}
                className="border-b border-border-default p-[10px] text-center font-[family-name:var(--velarro-display-light-font-family)] text-[24px] font-light leading-[38px] text-text-heading"
              >
                Estate Index
              </Link>
              <ul className="mt-[24px] flex w-full flex-col">
                {MAIN_MENU_ITEMS.slice(1).map((item) => {
                  const active = pathname === item.href;

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        data-route-implemented={item.implemented}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex h-[50px] w-full items-center px-[20px] py-[8px] font-[family-name:var(--velarro-display-light-font-family)] text-[20px] font-light leading-[26px] text-text-heading",
                          active && "bg-labels-active-selected",
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>
        </div>
      ) : null}
    </>
  );
}
