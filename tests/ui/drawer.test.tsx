import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { Drawer } from "@/components/ui/drawer";

function renderDrawer(onClose = vi.fn()) {
  render(
    <>
      <button type="button">Open trigger</button>
      <Drawer open onClose={onClose} title="Filters" description="Refine results">
        <button type="button">Apply filters</button>
        <button type="button">Reset filters</button>
      </Drawer>
    </>,
  );

  return { onClose };
}

describe("Drawer", () => {
  it("moves initial focus into the drawer panel", () => {
    renderDrawer();

    expect(screen.getByRole("dialog", { name: "Filters" })).toHaveFocus();
  });

  it("exposes accessible dialog labelling", () => {
    renderDrawer();

    const dialog = screen.getByRole("dialog", { name: "Filters" });
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAccessibleDescription("Refine results");
  });

  it("keeps Tab focus inside the dialog panel and excludes the backdrop", async () => {
    const user = userEvent.setup();
    renderDrawer();

    const panel = screen.getByRole("dialog", { name: "Filters" });
    const backdrop = screen.getByLabelText("Dismiss drawer backdrop");
    const closeButton = screen.getByRole("button", { name: "Close drawer" });
    const apply = screen.getByRole("button", { name: "Apply filters" });
    const reset = screen.getByRole("button", { name: "Reset filters" });

    expect(panel).toHaveFocus();
    expect(backdrop).toHaveAttribute("tabindex", "-1");

    await user.tab();
    expect(closeButton).toHaveFocus();
    expect(backdrop).not.toHaveFocus();

    await user.tab();
    expect(apply).toHaveFocus();

    await user.tab();
    expect(reset).toHaveFocus();

    await user.tab();
    expect(closeButton).toHaveFocus();
  });

  it("keeps Shift+Tab focus inside the dialog panel and excludes the backdrop", async () => {
    const user = userEvent.setup();
    renderDrawer();

    const panel = screen.getByRole("dialog", { name: "Filters" });
    const reset = screen.getByRole("button", { name: "Reset filters" });

    expect(panel).toHaveFocus();

    await user.tab({ shift: true });
    expect(reset).toHaveFocus();
    expect(screen.getByLabelText("Dismiss drawer backdrop")).not.toHaveFocus();

    await user.tab({ shift: true });
    expect(screen.getByRole("button", { name: "Apply filters" })).toHaveFocus();

    await user.tab({ shift: true });
    expect(screen.getByRole("button", { name: "Close drawer" })).toHaveFocus();

    await user.tab({ shift: true });
    expect(reset).toHaveFocus();
  });

  it("closes when Escape is pressed", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    renderDrawer(onClose);

    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("closes when the backdrop dismissal control is activated", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    renderDrawer(onClose);

    await user.click(screen.getByLabelText("Dismiss drawer backdrop"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("restores focus to the previously focused element after close", async () => {
    const user = userEvent.setup();

    function Fixture() {
      const [open, setOpen] = useState(false);

      return (
        <>
          <button type="button" onClick={() => setOpen(true)}>
            Open trigger
          </button>
          <Drawer open={open} onClose={() => setOpen(false)} title="Filters">
            <p>Drawer body</p>
          </Drawer>
        </>
      );
    }

    render(<Fixture />);

    const trigger = screen.getByRole("button", { name: "Open trigger" });
    await user.click(trigger);
    expect(screen.getByRole("dialog", { name: "Filters" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Close drawer" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
