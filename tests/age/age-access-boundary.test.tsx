import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AgeAccessBoundary } from "@/components/age/age-access-boundary";
import { getRouteAccess } from "@/lib/age/route-access";

vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
  }: {
    src: string;
    alt: string;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}));

vi.mock("@/lib/age/age-actions", () => ({
  confirmAgeStateAction: vi.fn(),
}));

describe("AgeAccessBoundary", () => {
  it("renders the age gate when policy decides gate", () => {
    expect(getRouteAccess("/the-vault", "unknown").decision).toBe("gate");

    render(
      <AgeAccessBoundary route="/the-vault" ageState="unknown">
        <p>Restricted content</p>
      </AgeAccessBoundary>,
    );

    expect(
      screen.getByRole("heading", { name: "Age Verification Required" }),
    ).toBeInTheDocument();
    expect(screen.queryByText("Restricted content")).not.toBeInTheDocument();
  });

  it("renders the under-21 shell when policy decides block", () => {
    expect(getRouteAccess("/the-estate", "under21").decision).toBe("block");

    render(
      <AgeAccessBoundary route="/the-estate" ageState="under21">
        <p>Restricted content</p>
      </AgeAccessBoundary>,
    );

    expect(
      screen.getByRole("navigation", { name: "Under-21 navigation" }),
    ).toBeInTheDocument();
    expect(screen.queryByText("Restricted content")).not.toBeInTheDocument();
  });

  it("renders children for allow and review decisions", () => {
    expect(getRouteAccess("/careers", "under21").decision).toBe("review");
    expect(getRouteAccess("/careers", "over21").decision).toBe("allow");

    const { rerender } = render(
      <AgeAccessBoundary route="/careers" ageState="under21">
        <p>Review content</p>
      </AgeAccessBoundary>,
    );

    expect(screen.getByText("Review content")).toBeInTheDocument();

    rerender(
      <AgeAccessBoundary route="/careers" ageState="over21">
        <p>Allowed content</p>
      </AgeAccessBoundary>,
    );

    expect(screen.getByText("Allowed content")).toBeInTheDocument();
  });
});
