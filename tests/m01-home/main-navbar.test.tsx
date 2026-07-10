import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MainNavbar } from "@/components/m01-home/main-navbar";
import { M01_HOME_APPROVED_IMAGES } from "@/lib/assets/approved-image-hosts";

vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}));

describe("MainNavbar", () => {
  it("renders the main navigation landmark and deferred controls", () => {
    render(<MainNavbar />);

    expect(screen.getByRole("navigation", { name: "Main navigation" })).toBeInTheDocument();
    expect(screen.getByAltText("Velarro Estate")).toHaveAttribute(
      "src",
      M01_HOME_APPROVED_IMAGES.navbarLogoScript,
    );
    expect(screen.queryByText(/SINCE\s+1919/)).not.toBeInTheDocument();
    expect(screen.getByLabelText(/The Estate \(deferred/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Search \(deferred/i)).toBeDisabled();
    expect(screen.getByLabelText(/Cart \(deferred/i)).toBeDisabled();
    expect(screen.getByLabelText(/Login \(deferred/i)).toBeDisabled();
  });
});
