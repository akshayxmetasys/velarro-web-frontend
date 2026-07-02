import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Switch } from "@/components/ui/switch";

describe("Switch", () => {
  it("toggles in uncontrolled mode", async () => {
    const user = userEvent.setup();

    render(<Switch label="Email alerts" defaultChecked={false} />);

    const control = screen.getByRole("switch", { name: "Email alerts" });
    expect(control).toHaveAttribute("aria-checked", "false");

    await user.click(control);
    expect(control).toHaveAttribute("aria-checked", "true");

    await user.click(control);
    expect(control).toHaveAttribute("aria-checked", "false");
  });

  it("calls onCheckedChange in controlled mode without owning state", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();

    render(
      <Switch label="Email alerts" checked={false} onCheckedChange={onCheckedChange} />,
    );

    const control = screen.getByRole("switch", { name: "Email alerts" });
    await user.click(control);

    expect(onCheckedChange).toHaveBeenCalledWith(true);
    expect(control).toHaveAttribute("aria-checked", "false");
  });

  it("does not toggle when disabled", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();

    render(
      <Switch
        label="Email alerts"
        defaultChecked={false}
        disabled
        onCheckedChange={onCheckedChange}
      />,
    );

    const control = screen.getByRole("switch", { name: "Email alerts" });
    expect(control).toBeDisabled();

    await user.click(control);
    expect(onCheckedChange).not.toHaveBeenCalled();
    expect(control).toHaveAttribute("aria-checked", "false");
  });

  it("supports keyboard activation", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();

    render(
      <Switch label="Email alerts" defaultChecked={false} onCheckedChange={onCheckedChange} />,
    );

    const control = screen.getByRole("switch", { name: "Email alerts" });
    control.focus();

    await user.keyboard(" ");
    expect(onCheckedChange).toHaveBeenCalledWith(true);
    expect(control).toHaveAttribute("aria-checked", "true");
  });
});
