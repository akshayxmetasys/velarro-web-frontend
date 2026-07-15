import { describe, expect, it } from "vitest";
import {
  CAREER_POSITION_DETAILS,
  IMPLEMENTED_CAREER_POSITION_DETAIL_SLUGS,
  getCareerPositionBySlug,
  getCareerPositionDetailBySlug,
  getCareerPositionDetailHref,
  getImplementedCareerPositionDetailStaticParams,
  hasImplementedCareerPositionDetail,
} from "@/components/m09-careers/careers-position-details-data";
import { CAREER_POSITIONS } from "@/components/m09-careers/careers-positions-data";

describe("careers position detail data", () => {
  it("resolves only the approved Area Sales Manager detail", () => {
    expect(IMPLEMENTED_CAREER_POSITION_DETAIL_SLUGS).toEqual([
      "area-sales-manager",
    ]);
    expect(getCareerPositionDetailBySlug("area-sales-manager")).toBeDefined();
    expect(getCareerPositionDetailBySlug("production-manager")).toBeUndefined();
    expect(getCareerPositionDetailBySlug("unknown-slug")).toBeUndefined();
  });

  it("reuses listing summary identity without duplicating the summary object", () => {
    const position = getCareerPositionBySlug("area-sales-manager");
    const detail = getCareerPositionDetailBySlug("area-sales-manager");

    expect(position).toEqual(
      CAREER_POSITIONS.find((entry) => entry.slug === "area-sales-manager"),
    );
    expect(detail?.slug).toBe(position?.slug);
    expect(CAREER_POSITION_DETAILS).toHaveLength(1);
  });

  it("exposes detail href helpers only for implemented slugs", () => {
    const implemented = CAREER_POSITIONS[1];
    const deferred = CAREER_POSITIONS[0];

    expect(hasImplementedCareerPositionDetail(implemented.slug)).toBe(true);
    expect(getCareerPositionDetailHref(implemented)).toBe(
      "/careers/positions/area-sales-manager",
    );
    expect(hasImplementedCareerPositionDetail(deferred.slug)).toBe(false);
    expect(getCareerPositionDetailHref(deferred)).toBeNull();
  });

  it("generates static params only for implemented detail slugs", () => {
    expect(getImplementedCareerPositionDetailStaticParams()).toEqual([
      { jobId: "area-sales-manager" },
    ]);
  });
});
