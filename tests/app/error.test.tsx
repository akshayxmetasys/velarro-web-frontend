import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import ErrorPage from "@/app/error";

describe("app/error", () => {
  it("renders accessible recovery controls without exposing the error stack", async () => {
    const user = userEvent.setup();
    const reset = vi.fn();
    const error = Object.assign(new Error("secret stack detail"), {
      digest: "abc123",
      stack: "Error: secret stack detail\n    at UnitTest",
    });

    render(<ErrorPage error={error} reset={reset} />);

    expect(
      screen.getByRole("heading", { name: "Something went wrong" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "This page could not be displayed. You can try again, or return to the homepage.",
      ),
    ).toBeInTheDocument();
    expect(screen.queryByText("secret stack detail")).not.toBeInTheDocument();
    expect(screen.queryByText(/UnitTest/)).not.toBeInTheDocument();
    expect(screen.queryByText("abc123")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Try again" }));
    expect(reset).toHaveBeenCalledTimes(1);

    expect(screen.getByRole("link", { name: "Return home" })).toHaveAttribute(
      "href",
      "/",
    );
  });
});
