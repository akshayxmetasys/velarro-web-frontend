import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProgressIndicator } from "@/components/ui/progress-indicator";

describe("ProgressIndicator", () => {
  it("exposes accessible progress state", () => {
    render(<ProgressIndicator label="Account deletion" value={2} max={5} />);

    const progressbar = screen.getByRole("progressbar", { name: "Account deletion" });
    expect(progressbar).toHaveAttribute("aria-valuenow", "2");
    expect(progressbar).toHaveAttribute("aria-valuemax", "5");
    expect(progressbar).toHaveAttribute("aria-valuemin", "0");
  });
});
