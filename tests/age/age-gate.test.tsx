import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AgeGate } from "@/components/age/age-gate";
import { M01_HOME_APPROVED_IMAGES } from "@/lib/assets/approved-image-hosts";

vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    fill,
  }: {
    src: string;
    alt: string;
    fill?: boolean;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} data-fill={fill ? "true" : undefined} />
  ),
}));

vi.mock("@/lib/age/age-actions", () => ({
  confirmAgeStateAction: vi.fn(),
}));

describe("AgeGate", () => {
  it("renders the Figma-matched age verification structure", () => {
    render(<AgeGate />);

    expect(screen.getByText("21+ only")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Age Verification Required" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /This website contains premium cigar and tobacco-related content/i,
      ),
    ).toBeInTheDocument();
    expect(screen.getByText(/By entering this site, you confirm that:/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Yes, I'm 21\+/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /No, I'm not 21\+/i }),
    ).toBeInTheDocument();
  });

  it("uses a decorative blurred collector hero background", () => {
    const { container } = render(<AgeGate />);

    expect(
      container.querySelector('[data-slot="age-gate-background"]'),
    ).toBeInTheDocument();
    expect(screen.getByAltText("")).toHaveAttribute(
      "src",
      M01_HOME_APPROVED_IMAGES.collectorHero,
    );
  });

  it("does not render navbar or readable homepage hero content", () => {
    render(<AgeGate />);

    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "COLLECTOR SERIES" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByAltText("Collector Series lifestyle imagery"),
    ).not.toBeInTheDocument();
  });
});
