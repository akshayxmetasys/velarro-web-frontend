import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Textarea } from "@/components/ui/textarea";

describe("Textarea", () => {
  it("generates unique IDs when none are supplied", () => {
    render(
      <>
        <Textarea label="Message" />
        <Textarea label="Notes" />
      </>,
    );

    const message = screen.getByLabelText("Message");
    const notes = screen.getByLabelText("Notes");

    expect(message.id).toBeTruthy();
    expect(notes.id).toBeTruthy();
    expect(message.id).not.toBe(notes.id);
  });

  it("uses an explicit ID when provided", () => {
    render(<Textarea id="press-message" label="Message" />);

    const textarea = screen.getByLabelText("Message");
    expect(textarea).toHaveAttribute("id", "press-message");
  });

  it("associates labels with controls", () => {
    render(<Textarea label="Message" name="message" />);

    const textarea = screen.getByLabelText("Message");
    expect(textarea).toHaveAttribute("name", "message");
  });

  it("exposes aria-invalid and error-message association", () => {
    render(<Textarea label="Message" error="Message is required" />);

    const textarea = screen.getByLabelText("Message");
    expect(textarea).toHaveAttribute("aria-invalid", "true");
    expect(textarea).toHaveAccessibleDescription("Message is required");
  });
});
