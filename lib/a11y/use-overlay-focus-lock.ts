"use client";

import { useEffect, type RefObject } from "react";
import { getFocusableElements, trapFocus } from "@/lib/a11y/focus-trap";

export interface UseOverlayFocusLockOptions {
  open: boolean;
  onClose: () => void;
  containerRef: RefObject<HTMLElement | null>;
  initialFocusRef?: RefObject<HTMLElement | null>;
  closeOnEscape?: boolean;
}

export function useOverlayFocusLock({
  open,
  onClose,
  containerRef,
  initialFocusRef,
  closeOnEscape = true,
}: UseOverlayFocusLockOptions): void {
  useEffect(() => {
    if (!open) {
      return;
    }

    const previousFocus = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const inertElements: HTMLElement[] = [];

    const applyInert = () => {
      const container = containerRef.current;
      if (!container) {
        return;
      }

      for (const child of Array.from(document.body.children)) {
        if (
          child instanceof HTMLElement &&
          child !== container &&
          !child.contains(container)
        ) {
          child.inert = true;
          inertElements.push(child);
        }
      }
    };

    applyInert();

    const focusInitial = () => {
      const initialTarget = initialFocusRef?.current ?? containerRef.current;
      initialTarget?.focus();
    };

    focusInitial();
    const focusFrame = requestAnimationFrame(focusInitial);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (closeOnEscape && event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      const container = containerRef.current;
      if (container) {
        trapFocus(container, event);
      }
    };

    const handleFocusIn = (event: FocusEvent) => {
      const container = containerRef.current;
      if (!container) {
        return;
      }

      const target = event.target;
      if (target instanceof Node && !container.contains(target)) {
        const focusable = getFocusableElements(container);
        (focusable[0] ?? container).focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("focusin", handleFocusIn);

    return () => {
      cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("focusin", handleFocusIn);
      document.body.style.overflow = originalOverflow;

      for (const element of inertElements) {
        element.inert = false;
      }

      previousFocus?.focus();
    };
  }, [open, onClose, containerRef, initialFocusRef, closeOnEscape]);
}
