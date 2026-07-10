import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { HomePageByAgeState } from "@/components/m01-home/home-page-by-age-state";
import { M01_HOME_APPROVED_IMAGES } from "@/lib/assets/approved-image-hosts";

vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    priority,
    fill,
    ...props
  }: {
    src: string;
    alt: string;
    priority?: boolean;
    fill?: boolean;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      data-priority={priority ? "true" : undefined}
      data-fill={fill ? "true" : undefined}
      {...props}
    />
  ),
}));

vi.mock("@/lib/age/age-actions", () => ({
  confirmAgeStateAction: vi.fn(),
}));

describe("HomePageByAgeState", () => {
  it("shows the age gate for unknown visitors", () => {
    render(<HomePageByAgeState ageState="unknown" />);

    expect(
      screen.getByRole("heading", { name: "Age Verification Required" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "COLLECTOR SERIES" }),
    ).not.toBeInTheDocument();
  });

  it("does not render tobacco homepage content for under-21 visitors", () => {
    render(<HomePageByAgeState ageState="under21" />);

    expect(
      screen.getByRole("heading", { name: "Access restricted" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "COLLECTOR SERIES" }),
    ).not.toBeInTheDocument();
    expect(screen.queryByAltText("Collector Series lifestyle imagery")).not.toBeInTheDocument();
  });

  it("renders the over-21 shell when age state is over21", () => {
    render(<HomePageByAgeState ageState="over21" />);

    expect(screen.getByRole("navigation", { name: "Main navigation" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "COLLECTOR SERIES" })).toBeInTheDocument();
    expect(screen.getByAltText("Velarro Estate")).toHaveAttribute(
      "src",
      M01_HOME_APPROVED_IMAGES.navbarLogoScript,
    );
  });
});
