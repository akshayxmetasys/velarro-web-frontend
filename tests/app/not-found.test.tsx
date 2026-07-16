import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: () => "/missing-route",
}));

import NotFoundPage from "@/app/not-found";

describe("app/not-found", () => {
  it("renders branded not-found with home link and noindex metadata export", async () => {
    render(<NotFoundPage />);

    expect(
      screen.getByRole("heading", { name: "Page not found" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Return home" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("navigation", { name: "Main navigation" })).toBeInTheDocument();
  });
});
