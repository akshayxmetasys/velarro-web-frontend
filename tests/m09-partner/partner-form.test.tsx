import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { PartnerForm } from "@/components/m09-partner/partner-form";
import {
  PARTNER_FORM_FIELDS,
  PARTNER_MESSAGE_FIELD,
  PARTNER_SUBMITTED_COPY,
} from "@/components/m09-partner/partner-data";

function fillValidPartnerForm() {
  return async function fill(user: ReturnType<typeof userEvent.setup>) {
    await user.type(screen.getByLabelText("Email Address"), "partner@example.com");
    await user.type(screen.getByLabelText("Full name"), "Avery Stone");
    await user.type(screen.getByLabelText("Phone number"), "+1 555 0100");
    await user.type(screen.getByLabelText("Business name"), "Stone Retail");
    await user.type(screen.getByLabelText("Country"), "United States");
    await user.type(
      screen.getByLabelText("Your message"),
      "We would like to discuss a retail partnership.",
    );
  };
}

describe("PartnerForm", () => {
  it("validates required fields and focuses the first invalid field", async () => {
    const user = userEvent.setup();
    render(<PartnerForm />);

    await user.click(screen.getByRole("button", { name: "SUBMIT" }));

    const email = screen.getByLabelText("Email Address");
    expect(email).toHaveFocus();
    expect(email).toHaveAttribute("aria-invalid", "true");
    expect(email).toHaveAttribute("aria-describedby");
    expect(screen.getByText("Email Address is required.")).toBeInTheDocument();

    for (const field of PARTNER_FORM_FIELDS.slice(1)) {
      expect(screen.getByText(`${field.label} is required.`)).toBeInTheDocument();
    }
    expect(
      screen.getByText(`${PARTNER_MESSAGE_FIELD.label} is required.`),
    ).toBeInTheDocument();
  });

  it("validates email format without submitting", async () => {
    const user = userEvent.setup();
    render(<PartnerForm />);

    await user.type(screen.getByLabelText("Email Address"), "not-an-email");
    await user.type(screen.getByLabelText("Full name"), "Avery Stone");
    await user.type(screen.getByLabelText("Phone number"), "+1 555 0100");
    await user.type(screen.getByLabelText("Business name"), "Stone Retail");
    await user.type(screen.getByLabelText("Country"), "United States");
    await user.type(screen.getByLabelText("Your message"), "Partnership message.");
    await user.click(screen.getByRole("button", { name: "SUBMIT" }));

    expect(screen.getByLabelText("Email Address")).toHaveFocus();
    expect(screen.getByText("Enter a valid email address.")).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: PARTNER_SUBMITTED_COPY.title }),
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

    render(<PartnerForm />);
    await fillValidPartnerForm()(user);
    await user.click(screen.getByRole("button", { name: "SUBMIT" }));

    expect(fetchSpy).not.toHaveBeenCalled();
    expect(storageSetItemSpy).not.toHaveBeenCalled();
    expect(consoleLogSpy).not.toHaveBeenCalled();
    expect(consoleInfoSpy).not.toHaveBeenCalled();
    expect(consoleWarnSpy).not.toHaveBeenCalled();
    expect(consoleErrorSpy).not.toHaveBeenCalled();
    expect(document.cookie).toBe(initialCookie);

    expect(
      screen.getByRole("heading", { name: PARTNER_SUBMITTED_COPY.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(PARTNER_SUBMITTED_COPY.id)).toBeInTheDocument();
    expect(screen.getByText(PARTNER_SUBMITTED_COPY.date)).toBeInTheDocument();
    expect(screen.queryByDisplayValue("partner@example.com")).not.toBeInTheDocument();
    expect(screen.queryByText("Avery Stone")).not.toBeInTheDocument();
    expect(screen.queryByText("Stone Retail")).not.toBeInTheDocument();

    vi.unstubAllGlobals();
    storageSetItemSpy.mockRestore();
    consoleLogSpy.mockRestore();
    consoleInfoSpy.mockRestore();
    consoleWarnSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });
});
