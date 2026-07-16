import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { metadata as rootMetadata } from "@/app/layout";
import { Over21HomePage } from "@/components/m01-home/over21-home-page";
import { AgeGate } from "@/components/age/age-gate";

vi.mock("next/font/google", () => ({
  Noto_Sans: () => ({ variable: "--font-noto-sans" }),
}));

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

describe("skip link and main landmark", () => {
  it("exposes a skip link targeting a single main-content landmark", () => {
    render(
      <>
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <Over21HomePage />
      </>,
    );

    const skipLink = screen.getByRole("link", { name: "Skip to main content" });
    expect(skipLink).toHaveAttribute("href", "#main-content");
    expect(document.querySelectorAll("#main-content")).toHaveLength(1);
    expect(document.getElementById("main-content")?.tagName).toBe("MAIN");
  });

  it("keeps a single main-content landmark on the age gate", () => {
    render(<AgeGate />);

    expect(document.querySelectorAll("#main-content")).toHaveLength(1);
  });

  it("keeps root metadata free of tobacco terms", () => {
    const description = String(rootMetadata.description).toLowerCase();
    expect(description).not.toContain("cigar");
    expect(description).not.toContain("tobacco");
  });
});
