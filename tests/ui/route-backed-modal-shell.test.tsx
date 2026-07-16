import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { RouteBackedModalShell } from "@/components/ui/route-backed-modal-shell";

function renderModal(onClose = vi.fn()) {
  render(
    <>
      <button type="button">Open trigger</button>
      <RouteBackedModalShell open onClose={onClose} title="Sign out" description="Confirm sign out">
        <button type="button">Confirm action</button>
        <button type="button">Cancel action</button>
      </RouteBackedModalShell>
    </>,
  );

  return { onClose };
}

describe("RouteBackedModalShell", () => {
  it("moves initial focus into the dialog surface", () => {
    renderModal();

    expect(screen.getByRole("dialog", { name: "Sign out" })).toHaveFocus();
  });

  it("keeps Tab focus within the dialog panel and excludes the backdrop", async () => {
    const user = userEvent.setup();
    renderModal();

    const dialog = screen.getByRole("dialog", { name: "Sign out" });
    const backdrop = screen.getByLabelText("Dismiss dialog backdrop");
    const closeButton = screen.getByRole("button", { name: "Close dialog" });
    const confirm = screen.getByRole("button", { name: "Confirm action" });
    const cancel = screen.getByRole("button", { name: "Cancel action" });

    expect(dialog).toHaveFocus();
    expect(backdrop).toHaveAttribute("tabindex", "-1");

    await user.tab();
    expect(closeButton).toHaveFocus();
    expect(backdrop).not.toHaveFocus();

    await user.tab();
    expect(confirm).toHaveFocus();

    await user.tab();
    expect(cancel).toHaveFocus();

    await user.tab();
    expect(closeButton).toHaveFocus();
  });

  it("keeps Shift+Tab focus within the dialog panel and excludes the backdrop", async () => {
    const user = userEvent.setup();
    renderModal();

    const dialog = screen.getByRole("dialog", { name: "Sign out" });
    const cancel = screen.getByRole("button", { name: "Cancel action" });

    expect(dialog).toHaveFocus();

    await user.tab({ shift: true });
    expect(cancel).toHaveFocus();
    expect(screen.getByLabelText("Dismiss dialog backdrop")).not.toHaveFocus();

    await user.tab({ shift: true });
    expect(screen.getByRole("button", { name: "Confirm action" })).toHaveFocus();

    await user.tab({ shift: true });
    expect(screen.getByRole("button", { name: "Close dialog" })).toHaveFocus();

    await user.tab({ shift: true });
    expect(cancel).toHaveFocus();
  });

  it("closes when Escape is pressed", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    renderModal(onClose);

    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("closes when the backdrop dismissal control is activated", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    renderModal(onClose);

    await user.click(screen.getByLabelText("Dismiss dialog backdrop"));
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
          <RouteBackedModalShell
            open={open}
            onClose={() => setOpen(false)}
            title="Sign out"
          >
            <p>Modal body</p>
          </RouteBackedModalShell>
        </>
      );
    }

    render(<Fixture />);

    const trigger = screen.getByRole("button", { name: "Open trigger" });
    await user.click(trigger);
    expect(screen.getByRole("dialog", { name: "Sign out" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Close dialog" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
