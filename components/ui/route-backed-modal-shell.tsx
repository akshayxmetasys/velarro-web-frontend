"use client";

import type { ReactNode } from "react";
import { useId, useRef } from "react";
import { useOverlayFocusLock } from "@/lib/a11y/use-overlay-focus-lock";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";

export interface RouteBackedModalShellProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  /**
   * Stable route identifier for route-backed modal pattern (Next.js intercepting routes).
   * Presentation-only in M00; wired to App Router in later modules.
   */
  routeLabel?: string;
}

export function RouteBackedModalShell({
  open,
  onClose,
  title,
  description,
  children,
  className,
  routeLabel,
}: RouteBackedModalShellProps) {
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);

  useOverlayFocusLock({
    open,
    onClose,
    containerRef: dialogRef,
    initialFocusRef: dialogRef,
  });

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-spacing-24">
      <button
        type="button"
        tabIndex={-1}
        aria-label="Dismiss dialog backdrop"
        className="absolute inset-0 bg-velarro-text/50"
        onClick={onClose}
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        data-route-label={routeLabel}
        tabIndex={-1}
        className={cn(
          "relative z-10 w-full max-w-lg rounded-radius-md bg-background-page p-spacing-24 shadow-auth-modal outline-none",
          className,
        )}
      >
        <header className="mb-spacing-20 flex items-start justify-between gap-4">
          <div>
            <h2 id={titleId} className="text-text-display text-[length:var(--font-size-3)]">
              {title}
            </h2>
            {description ? (
              <p id={descriptionId} className="mt-2 text-[length:var(--font-size-1)] text-text-secondary-body-text">
                {description}
              </p>
            ) : null}
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            aria-label="Close dialog"
            onClick={onClose}
          >
            Close
          </Button>
        </header>
        {children}
      </div>
    </div>
  );
}
