import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { GetInTouchForm } from "@/components/m09-get-in-touch/get-in-touch-form";
import {
  GET_IN_TOUCH_FORM_FIELDS,
  GET_IN_TOUCH_MESSAGE_FIELD,
  GET_IN_TOUCH_SUBJECT_FIELD,
  GET_IN_TOUCH_SUBMITTED_COPY,
} from "@/components/m09-get-in-touch/get-in-touch-data";

function fillValidGetInTouchForm() {
  return async function fill(user: ReturnType<typeof userEvent.setup>) {
    await user.type(screen.getByLabelText("Name"), "John Doe");
    await user.type(screen.getByLabelText("Email address"), "john@example.com");
    await user.type(screen.getByLabelText("Phone number"), "000 0000 000");
    await user.type(screen.getByLabelText("Subject"), "General support");
    await user.type(
      screen.getByLabelText("Message"),
      "I have a question about my order.",
    );
  };
}

describe("GetInTouchForm", () => {
  it("validates required fields and focuses the first invalid field", async () => {
    const user = userEvent.setup();
    render(<GetInTouchForm />);

    await user.click(screen.getByRole("button", { name: "SUBMIT" }));

    const name = screen.getByLabelText("Name");
    expect(name).toHaveFocus();
    expect(name).toHaveAttribute("aria-invalid", "true");
    expect(name).toHaveAttribute("aria-describedby");
    expect(screen.getByText("Name is required.")).toBeInTheDocument();

    for (const field of GET_IN_TOUCH_FORM_FIELDS.slice(1)) {
      expect(screen.getByText(`${field.label} is required.`)).toBeInTheDocument();
    }
    expect(
      screen.getByText(`${GET_IN_TOUCH_SUBJECT_FIELD.label} is required.`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${GET_IN_TOUCH_MESSAGE_FIELD.label} is required.`),
    ).toBeInTheDocument();
  });

  it("validates email format without submitting", async () => {
    const user = userEvent.setup();
    render(<GetInTouchForm />);

    await user.type(screen.getByLabelText("Name"), "John Doe");
    await user.type(screen.getByLabelText("Email address"), "not-an-email");
    await user.type(screen.getByLabelText("Phone number"), "000 0000 000");
    await user.type(screen.getByLabelText("Subject"), "General support");
    await user.type(screen.getByLabelText("Message"), "Help please.");
    await user.click(screen.getByRole("button", { name: "SUBMIT" }));

    expect(screen.getByLabelText("Email address")).toHaveFocus();
    expect(screen.getByText("Enter a valid email address.")).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: GET_IN_TOUCH_SUBMITTED_COPY.title }),
    ).not.toBeInTheDocument();
  });

  it("transitions to the UI-only submitted state without network or storage", async () => {
    const user = userEvent.setup();
    const fetchSpy = vi.fn();
    const storageSetItemSpy = vi.spyOn(Storage.prototype, "setItem");
    const consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const consoleInfoSpy = vi.spyOn(console, "info").mockImplementation(() => {});
    const consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubGlobal("fetch", fetchSpy);
    const initialCookie = document.cookie;

    render(<GetInTouchForm />);
    await fillValidGetInTouchForm()(user);
    await user.click(screen.getByRole("button", { name: "SUBMIT" }));

    expect(fetchSpy).not.toHaveBeenCalled();
    expect(storageSetItemSpy).not.toHaveBeenCalled();
    expect(document.cookie).toBe(initialCookie);
    expect(consoleLogSpy).not.toHaveBeenCalled();
    expect(consoleInfoSpy).not.toHaveBeenCalled();
    expect(consoleWarnSpy).not.toHaveBeenCalled();
    expect(consoleErrorSpy).not.toHaveBeenCalled();

    expect(
      screen.getByRole("heading", { name: GET_IN_TOUCH_SUBMITTED_COPY.title }),
    ).toBeInTheDocument();
    expect(screen.queryByDisplayValue("john@example.com")).not.toBeInTheDocument();
    expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "SUBMIT" })).not.toBeInTheDocument();

    vi.unstubAllGlobals();
    storageSetItemSpy.mockRestore();
    consoleLogSpy.mockRestore();
    consoleInfoSpy.mockRestore();
    consoleWarnSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  it("returns to the form from the submitted state", async () => {
    const user = userEvent.setup();
    render(<GetInTouchForm />);
    await fillValidGetInTouchForm()(user);
    await user.click(screen.getByRole("button", { name: "SUBMIT" }));

    await user.click(
      screen.getByRole("button", { name: GET_IN_TOUCH_SUBMITTED_COPY.backToForm }),
    );

    expect(screen.getByRole("button", { name: "SUBMIT" })).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
  });
});
