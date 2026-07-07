"use client";

import { useEffect, useRef } from "react";

interface UseOverlayFocusLockProps {
  open: boolean;
  onClose: () => void;
  containerRef: React.RefObject<HTMLElement | null>;
  initialFocusRef?: React.RefObject<HTMLElement | null>;
}

const FOCUSABLE_SELECTOR = [
  "button:not([disabled])",
  "[href]",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

/**
 * Locks an open overlay for accessibility:
 * - traps Tab / Shift+Tab focus inside the container,
 * - closes on Escape,
 * - locks body scroll while active,
 * - isolates background content with the `inert` attribute,
 * - restores focus to the previously focused element on close.
 */
export function useOverlayFocusLock({
  open,
  onClose,
  containerRef,
  initialFocusRef,
}: UseOverlayFocusLockProps) {
  // Kept in a ref so an inline `onClose` closure does not tear down and
  // re-initialize the lock (refocus, re-inert) on every parent render.
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const container = containerRef.current;

    if (!container) {
      return;
    }

    const getFocusableElements = (): HTMLElement[] => {
      const activeContainer = containerRef.current;

      if (!activeContainer) {
        return [];
      }

      return Array.from(
        activeContainer.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((element) => !element.hasAttribute("aria-hidden"));
    };

    const previousActiveElement =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    // Isolate the background: mark every sibling on the path from the
    // container up to <body> as inert. Elements that were already inert
    // (e.g. from a stacked overlay) are skipped so we never un-inert them.
    const inertedElements: HTMLElement[] = [];
    let node: HTMLElement | null = container;

    while (node && node !== document.body) {
      const parent: HTMLElement | null = node.parentElement;

      if (!parent) {
        break;
      }

      for (const sibling of Array.from(parent.children)) {
        if (
          sibling !== node &&
          sibling instanceof HTMLElement &&
          !sibling.hasAttribute("inert")
        ) {
          sibling.setAttribute("inert", "");
          inertedElements.push(sibling);
        }
      }

      node = parent;
    }

    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const initialFocusTarget =
      initialFocusRef?.current ?? getFocusableElements()[0] ?? container;

    initialFocusTarget.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCloseRef.current();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const activeContainer = containerRef.current;

      if (!activeContainer) {
        return;
      }

      const focusableElements = getFocusableElements();

      if (focusableElements.length === 0) {
        event.preventDefault();
        activeContainer.focus();
        return;
      }

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];
      const active = document.activeElement;
      const activeIndex =
        active instanceof HTMLElement ? focusableElements.indexOf(active) : -1;
      // Focus resting on the container itself (tabindex="-1") or outside the
      // trap is treated as a boundary so the next Tab wraps back inside.
      const isAtTrapBoundary = activeIndex === -1;

      if (event.shiftKey) {
        if (isAtTrapBoundary || active === first) {
          event.preventDefault();
          last.focus();
        }
        return;
      }

      if (isAtTrapBoundary || active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);

      for (const element of inertedElements) {
        element.removeAttribute("inert");
      }

      document.body.style.overflow = previousBodyOverflow;

      if (previousActiveElement && previousActiveElement.isConnected) {
        previousActiveElement.focus();
      }
    };
  }, [open, containerRef, initialFocusRef]);
}
