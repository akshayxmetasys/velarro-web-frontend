import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SiteFooter } from "@/components/layout/site-footer";

describe("SiteFooter", () => {
  it("renders Figma-verified footer text and route-safe links", () => {
    render(<SiteFooter />);

    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Stay in Know" })).toBeInTheDocument();
    expect(screen.getByText("Receive the latest news in your inbox")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Your name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Your email")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "SUBMIT" })).toHaveAttribute("type", "button");
    expect(screen.getByRole("link", { name: "The House" })).toHaveAttribute(
      "href",
      "/the-house",
    );
    expect(screen.getByRole("link", { name: "Privacy Policy" })).toHaveAttribute(
      "href",
      "/privacy-policy",
    );
    expect(screen.getByText("Surgeon General Warning:")).toBeInTheDocument();
    expect(screen.getByText(/Highest level of Encryption/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Ascend" })).toHaveAttribute("href", "#top");
  });
});

