import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SiteShell } from "@/components/layout/site-shell";

describe("SiteShell", () => {
  it("provides structural header, main, and footer landmarks", () => {
    render(
      <SiteShell header={<span>Header contract</span>} footer={<span>Footer contract</span>}>
        <h1>Foundation content</h1>
      </SiteShell>,
    );

    expect(screen.getByRole("banner")).toHaveTextContent("Header contract");
    expect(screen.getByRole("main")).toHaveTextContent("Foundation content");
    expect(screen.getByRole("contentinfo")).toHaveTextContent("Footer contract");
  });
});
