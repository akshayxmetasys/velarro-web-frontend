import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MembershipBenefitsTable } from "@/components/m09-membership/membership-benefits-table";
import {
  MEMBERSHIP_BENEFITS_COPY,
  MEMBERSHIP_BENEFIT_ROWS,
  MEMBERSHIP_BENEFIT_TIER_COLUMNS,
} from "@/components/m09-membership/membership-data";

describe("MembershipBenefitsTable", () => {
  it("renders corrected spelling and semantic table headers", () => {
    render(<MembershipBenefitsTable />);

    expect(
      screen.getByRole("heading", { name: MEMBERSHIP_BENEFITS_COPY.heading }),
    ).toBeInTheDocument();
    expect(screen.getByText(MEMBERSHIP_BENEFITS_COPY.columnLabel)).toBeInTheDocument();
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
