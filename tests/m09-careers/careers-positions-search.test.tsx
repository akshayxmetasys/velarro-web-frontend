import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { CareersPositionsSearch } from "@/components/m09-careers/careers-positions-search";
import {
  CAREER_POSITIONS,
  filterCareerPositions,
  getCareerPositionResultsStatus,
} from "@/components/m09-careers/careers-positions-data";

describe("careers positions search data", () => {
  it("filters by title, department, location, and employment type", () => {
    expect(filterCareerPositions(CAREER_POSITIONS, "Production Manager")).toHaveLength(1);
    expect(filterCareerPositions(CAREER_POSITIONS, "sales")).toHaveLength(3);
    expect(filterCareerPositions(CAREER_POSITIONS, "Regional")).toHaveLength(2);
    expect(filterCareerPositions(CAREER_POSITIONS, "Nicaragua")).toHaveLength(2);
    expect(filterCareerPositions(CAREER_POSITIONS, "full-time")).toHaveLength(6);
  });

  it("trims whitespace and restores all jobs for an empty query", () => {
    expect(filterCareerPositions(CAREER_POSITIONS, "  torcedor  ")).toHaveLength(1);
    expect(filterCareerPositions(CAREER_POSITIONS, "   ")).toHaveLength(6);
  });

  it("returns accessible result status copy", () => {
    expect(getCareerPositionResultsStatus(6, false)).toBe("6 positions found");
    expect(getCareerPositionResultsStatus(1, true)).toBe("1 position found");
    expect(getCareerPositionResultsStatus(0, true)).toBe(
      "No positions match your search.",
    );
  });
});

describe("CareersPositionsSearch", () => {
  it("filters positions on Search Jobs submission and Enter", async () => {
    const user = userEvent.setup();
    render(<CareersPositionsSearch />);

    const searchField = screen.getByRole("searchbox", {
      name: "Search by keywords",
    });

    fireEvent.change(searchField, { target: { value: "Production Manager" } });
    await user.click(screen.getByRole("button", { name: "Search Jobs" }));

    expect(document.querySelectorAll("[data-careers-position-card]")).toHaveLength(1);
    expect(screen.getByText("Production Manager")).toBeInTheDocument();
    expect(
      screen.getByText("1 position found", { selector: ".sr-only" }),
    ).toBeInTheDocument();

    fireEvent.change(searchField, { target: { value: "" } });
    await user.click(screen.getByRole("button", { name: "Search Jobs" }));

    expect(document.querySelectorAll("[data-careers-position-card]")).toHaveLength(6);
  });

  it("announces no-results state and keeps deferred filters non-operable", async () => {
    const user = userEvent.setup();
    render(<CareersPositionsSearch />);

    fireEvent.change(
      screen.getByRole("searchbox", { name: "Search by keywords" }),
      { target: { value: "nonexistent role" } },
    );
    await user.click(screen.getByRole("button", { name: "Search Jobs" }));

    expect(screen.getAllByText("No positions match your search.")).toHaveLength(2);
    expect(document.querySelectorAll("[data-careers-position-card]")).toHaveLength(0);

    const filterButtons = screen.getAllByRole("button", {
      name: /filter \(unavailable/i,
    });
    expect(filterButtons).toHaveLength(5);
    for (const filterButton of filterButtons) {
      expect(filterButton).toBeDisabled();
      expect(filterButton).toHaveAttribute("data-filter-status", "deferred");
    }
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("does not perform network or storage writes when searching", async () => {
    const user = userEvent.setup();
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response("{}"),
    );
    const storageSpy = vi.spyOn(Storage.prototype, "setItem");

    render(<CareersPositionsSearch />);

    await user.type(
      screen.getByRole("searchbox", { name: "Search by keywords" }),
      "Torcedor",
    );
    await user.keyboard("{Enter}");

    expect(fetchSpy).not.toHaveBeenCalled();
    expect(storageSpy).not.toHaveBeenCalled();

    fetchSpy.mockRestore();
    storageSpy.mockRestore();
  });

  it("initializes from an initial query value", () => {
    render(<CareersPositionsSearch initialQuery="manager" />);

    expect(screen.getByRole("searchbox", { name: "Search by keywords" })).toHaveValue(
      "manager",
    );
    expect(document.querySelectorAll("[data-careers-position-card]")).toHaveLength(2);
  });
});
