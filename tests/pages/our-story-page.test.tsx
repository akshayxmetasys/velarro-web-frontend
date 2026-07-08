import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import OurStoryRoute, { metadata } from "@/app/our-story/page";

describe("OurStory page", () => {
  it("renders the Figma-inspected story structure and copy", () => {
    const { container } = render(<OurStoryRoute />);

    expect(screen.getByRole("heading", { level: 1, name: "OUR STORY" })).toBeInTheDocument();
    expect(screen.getAllByText("Crafted with purpose, aged with time")).toHaveLength(2);
    expect(screen.getByRole("heading", { level: 2, name: "Brand Story" })).toBeInTheDocument();
    expect(screen.getByText(/A legacy rooted in the earth/)).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Our Mission" })).toBeInTheDocument();
    expect(screen.getByText("5%")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Why Connoisseurs" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Brand Values" })).toBeInTheDocument();
    expect(container.querySelector("#ld-breadcrumb-list")).toBeInTheDocument();
  });

  it("exports indexable metadata for the story route", () => {
    expect(metadata.alternates?.canonical).toBe("/our-story");
    expect(metadata.robots).toMatchObject({ index: true, follow: true });
  });
});
