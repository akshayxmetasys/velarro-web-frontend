import { render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { MembershipDocumentOverflowLock } from "@/components/m09-membership/membership-document-overflow-lock";

describe("MembershipDocumentOverflowLock", () => {
  afterEach(() => {
    document.documentElement.style.removeProperty("overflow-x");
    document.body.style.removeProperty("overflow-x");
  });

  it("locks document horizontal overflow while mounted and restores on unmount", () => {
    document.documentElement.style.overflowX = "visible";
    document.body.style.overflowX = "visible";

    const { unmount } = render(<MembershipDocumentOverflowLock />);

    expect(document.documentElement.style.overflowX).toBe("hidden");
    expect(document.body.style.overflowX).toBe("hidden");

    unmount();

    expect(document.documentElement.style.overflowX).toBe("visible");
    expect(document.body.style.overflowX).toBe("visible");
  });
});
