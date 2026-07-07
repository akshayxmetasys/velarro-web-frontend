"use client";

import { useEffect } from "react";

interface UseOverlayFocusLockProps {
  open: boolean;
  onClose: () => void;
  containerRef: React.RefObject<HTMLElement | null>;
  initialFocusRef?: React.RefObject<HTMLElement | null>;
}

export function useOverlayFocusLock({
  open,
  onClose,
  containerRef,
  initialFocusRef,
}: UseOverlayFocusLockProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const container = containerRef.current;

    if (!container) {
      return;
    }

    const getFocusableElements = () => {
      return Array.from(
        container.querySelectorAll<HTMLElement>(
          [
            "button:not([disabled])",
            "[href]",
            "input:not([disabled])",
            "select:not([disabled])",
            "textarea:not([disabled])",
            '[tabindex]:not([tabindex="-1"])',
          ].join(","),
        ),
      ).filter((element) => !element.hasAttribute("aria-hidden"));
    };

    const previousActiveElement = document.activeElement as HTMLElement;

    requestAnimationFrame(() => {
      const firstFocusTarget =
        initialFocusRef?.current ?? getFocusableElements()[0] ?? container;

      firstFocusTarget.focus();
    });

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusableElements = getFocusableElements();

      if (!focusableElements.length) {
        event.preventDefault();
        container.focus();
        return;
      }

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      const active = document.activeElement;

      if (event.shiftKey) {
        if (active === first) {
          event.preventDefault();
          last.focus();
        }
      } else {
        if (active === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);

      if (previousActiveElement instanceof HTMLElement) {
        previousActiveElement.focus();
      }
    };
  }, [open, onClose, containerRef, initialFocusRef]);
}