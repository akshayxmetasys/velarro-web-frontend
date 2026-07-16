"use client";

import type { ReactNode } from "react";
import { useId, useRef } from "react";
import { useOverlayFocusLock } from "@/lib/a11y/use-overlay-focus-lock";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  side?: "left" | "right";
  className?: string;
}

export function Drawer({
  open,
  onClose,
  title,
  description,
  children,
  side = "right",
  className,
}: DrawerProps) {
  const titleId = useId();
  const descriptionId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useOverlayFocusLock({
    open,
    onClose,
    containerRef: panelRef,
    initialFocusRef: panelRef,
  });

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex">
      <button
        type="button"
        tabIndex={-1}
        aria-label="Dismiss drawer backdrop"
        className="absolute inset-0 bg-velarro-text/40"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        className={cn(
          "relative z-10 flex h-full w-full max-w-md flex-col bg-background-page shadow-confirmation-modal outline-none",
          side === "left" ? "mr-auto" : "ml-auto",
          className,
        )}
      >
        <header className="flex items-start justify-between gap-4 border-b border-border-light px-spacing-24 py-spacing-20">
          <div>
            <h2 id={titleId} className="text-text-heading text-[length:var(--font-size-3)]">
              {title}
            </h2>
            {description ? (
              <p id={descriptionId} className="mt-1 text-[length:var(--font-size-1)] text-text-secondary-body-text">
                {description}
              </p>
            ) : null}
          </div>
          <Button type="button" variant="ghost" size="sm" aria-label="Close drawer" onClick={onClose}>
            Close
          </Button>
        </header>
        <div className="flex-1 overflow-y-auto px-spacing-24 py-spacing-20">{children}</div>
      </div>
    </div>
  );
}
