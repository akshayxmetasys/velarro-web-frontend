import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Accordion } from "@/components/ui/accordion";

describe("Accordion", () => {
  it("opens and closes panels", async () => {
    const user = userEvent.setup();

    render(
      <Accordion
        aria-label="Account settings"
        items={[
          {
            id: "notifications",
            title: "Notifications",
            children: <p>Email preferences</p>,
          },
        ]}
      />,
    );

    const summary = screen.getByText("Notifications");
    expect(screen.queryByText("Email preferences")).not.toBeVisible();

    await user.click(summary);
    expect(screen.getByText("Email preferences")).toBeVisible();

    await user.click(summary);
    expect(screen.queryByText("Email preferences")).not.toBeVisible();
  });
});
