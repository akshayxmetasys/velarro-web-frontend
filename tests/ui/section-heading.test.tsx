import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SectionHeading } from "@/components/ui/section-heading";

describe("SectionHeading", () => {
  it("renders the default heading level for a section variant", () => {
    render(<SectionHeading variant="section">Featured Collection</SectionHeading>);

    const heading = screen.getByRole("heading", { level: 2, name: "Featured Collection" });
    expect(heading).toBeInTheDocument();
  });

  it("renders an optional eyebrow above the heading", () => {
    render(
      <SectionHeading variant="page" eyebrow="The Estate">
        Our Heritage
      </SectionHeading>,
    );

    expect(screen.getByText("The Estate")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: "Our Heritage" })).toBeInTheDocument();
  });

  it("allows an explicit heading level override", () => {
    render(
      <SectionHeading variant="card" as="h4">
        Pairing Notes
      </SectionHeading>,
    );

    expect(screen.getByRole("heading", { level: 4, name: "Pairing Notes" })).toBeInTheDocument();
  });
});
