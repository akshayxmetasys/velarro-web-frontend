"use client";

import { useEffect } from "react";

/**
 * Prevents document-level horizontal scrolling on Membership while wide
 * comparison tables/tier rows remain in bounded overflow-x-auto regions.
 */
export function MembershipDocumentOverflowLock() {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const previousHtml = html.style.overflowX;
    const previousBody = body.style.overflowX;
    html.style.overflowX = "hidden";
    body.style.overflowX = "hidden";
    html.style.setProperty("overflow-x", "hidden", "important");
    body.style.setProperty("overflow-x", "hidden", "important");
    return () => {
      html.style.removeProperty("overflow-x");
      body.style.removeProperty("overflow-x");
      html.style.overflowX = previousHtml;
      body.style.overflowX = previousBody;
    };
  }, []);

  return null;
}
