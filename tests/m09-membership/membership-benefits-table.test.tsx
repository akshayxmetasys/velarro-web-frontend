import { render, screen, within } from "@testing-library/react";
import type { CSSProperties } from "react";
import { describe, expect, it, vi } from "vitest";
import { MEMBERSHIP_ASSETS } from "@/components/m09-membership/membership-assets";
import { MembershipBenefitsTable } from "@/components/m09-membership/membership-benefits-table";
import {
  MEMBERSHIP_BENEFITS_COPY,
  MEMBERSHIP_BENEFIT_ROWS,
  MEMBERSHIP_BENEFIT_TIER_COLUMNS,
} from "@/components/m09-membership/membership-data";

vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    className,
    style,
    fill,
    ...props
  }: {
    src: string;
    alt: string;
    className?: string;
    style?: CSSProperties;
    fill?: boolean;
    [key: string]: unknown;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      data-fill={fill ? "true" : undefined}
      {...props}
    />
  ),
}));

describe("MembershipBenefitsTable", () => {
  it("renders corrected spelling and semantic table headers", () => {
    render(<MembershipBenefitsTable />);

    expect(
      screen.getByRole("heading", { name: MEMBERSHIP_BENEFITS_COPY.heading }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(MEMBERSHIP_BENEFITS_COPY.columnLabel),
    ).toBeInTheDocument();
    expect(screen.queryByText(/COMPARISSION/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/BENIFITS/i)).not.toBeInTheDocument();
    expect(screen.queryByText("ATLIER")).not.toBeInTheDocument();
    expect(screen.getByText("ATELIER")).toBeInTheDocument();

    const table = screen.getByRole("table", {
      name: /comparison of velarro membership tier benefits/i,
    });
    const columnHeaders = within(table).getAllByRole("columnheader");
    expect(columnHeaders).toHaveLength(6);
    expect(within(table).getAllByRole("rowheader")).toHaveLength(
      MEMBERSHIP_BENEFIT_ROWS.length,
    );
  });

  it("uses a fixed table layout with one benefits column and five equal tier columns", () => {
    const { container } = render(<MembershipBenefitsTable />);

    const table = screen.getByRole("table", {
      name: /comparison of velarro membership tier benefits/i,
    });
    expect(table).toHaveClass("table-fixed");

    const cols = container.querySelectorAll("colgroup col");
    expect(cols).toHaveLength(1 + MEMBERSHIP_BENEFIT_TIER_COLUMNS.length);
    expect(cols[0]).toHaveClass("w-[286px]");
  });

  it("renders permanent header emblems reusing the five tier assets", () => {
    const { container } = render(<MembershipBenefitsTable />);

    for (const column of MEMBERSHIP_BENEFIT_TIER_COLUMNS) {
      const emblem = container.querySelector(
        `[data-membership-table-emblem="${column.assetKey}"]`,
      );
      expect(emblem).not.toBeNull();
      expect(emblem).toHaveAttribute("data-asset-status", "permanent");
      expect(emblem).toHaveAttribute("data-figma-node", column.figmaEmblemNode);
      expect(emblem?.querySelector("img")).toHaveAttribute(
        "src",
        MEMBERSHIP_ASSETS[column.assetKey].path,
      );
    }
  });

  it("renders the exact availability matrix with accessible included states", () => {
    render(<MembershipBenefitsTable />);

    for (const benefit of MEMBERSHIP_BENEFIT_ROWS) {
      expect(screen.getByText(benefit.title)).toBeInTheDocument();
      expect(screen.getByText(benefit.description)).toBeInTheDocument();

      for (const column of MEMBERSHIP_BENEFIT_TIER_COLUMNS) {
        const included = benefit.availability[column.id];
        const expectedLabel = included
          ? `Included in ${column.accessibleName}`
          : `Not included in ${column.accessibleName}`;
        expect(screen.getAllByText(expectedLabel).length).toBeGreaterThan(0);
      }
    }

    expect(
      screen.getAllByText("Not included in Velarro House").length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText("Included in Velarro Reserve").length,
    ).toBeGreaterThan(0);
  });
});
