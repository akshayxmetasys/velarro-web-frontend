import { describe, expect, it } from "vitest";
import {
  CAREERS_POSITION_APPLICATION_MAX_FILE_SIZE_BYTES,
  CAREERS_POSITION_APPLICATION_NOT_CONNECTED_STATUS,
  getCareerPositionApplicationBySlug,
  getCareerPositionApplicationHref,
  getImplementedCareerApplicationStaticParams,
  hasImplementedCareerPositionApplication,
  validateCareerPositionApplicationForm,
} from "@/components/m09-careers/careers-position-application-data";
import { getCareerPositionBySlug } from "@/components/m09-careers/careers-position-details-data";

const application = getCareerPositionApplicationBySlug("area-sales-manager");

if (!application) {
  throw new Error("Expected Area Sales Manager application config.");
}

describe("careers position application data", () => {
  it("resolves only the approved Area Sales Manager application", () => {
    expect(getImplementedCareerApplicationStaticParams()).toEqual([
      { jobId: "area-sales-manager" },
    ]);
    expect(hasImplementedCareerPositionApplication("area-sales-manager")).toBe(true);
    expect(hasImplementedCareerPositionApplication("production-manager")).toBe(false);
    expect(getCareerPositionApplicationHref("area-sales-manager")).toBe(
      "/careers/positions/area-sales-manager/apply",
    );
    expect(getCareerPositionApplicationBySlug("production-manager")).toBeUndefined();
  });

  it("reuses the Area Sales Manager summary without duplicating it", () => {
    const position = getCareerPositionBySlug("area-sales-manager");
    expect(position?.title).toBe("Area Sales Manager");
    expect(application.slug).toBe(position?.slug);
  });

  it("validates required fields, email, phone, and files", () => {
    const validPdf = new File(["pdf"], "resume.pdf", { type: "application/pdf" });
    const validDocx = new File(["docx"], "cover-letter.docx", {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    expect(
      validateCareerPositionApplicationForm(
        {
          firstName: "",
          lastName: "",
          email: "",
          callingCode: "+91",
          phone: "",
          city: "",
          country: "",
        },
        { resume: null, coverLetter: null },
        application,
      ),
    ).toMatchObject({
      firstName: "First Name is required.",
      resume: "Upload Resume is required.",
      coverLetter: "Upload Cover Letter is required.",
    });

    expect(
      validateCareerPositionApplicationForm(
        {
          firstName: "Alex",
          lastName: "Example",
          email: "not-an-email",
          callingCode: "+91",
          phone: "12",
          city: "Hyderabad",
          country: "India",
        },
        { resume: validPdf, coverLetter: validDocx },
        application,
      ),
    ).toMatchObject({
      email: "Enter a valid email address.",
      phone: "Enter a valid phone number.",
    });

    const oversized = new File(
      [new Uint8Array(CAREERS_POSITION_APPLICATION_MAX_FILE_SIZE_BYTES + 1)],
      "resume.pdf",
      { type: "application/pdf" },
    );

    expect(
      validateCareerPositionApplicationForm(
        {
          firstName: "Alex",
          lastName: "Example",
          email: "alex.example@example.test",
          callingCode: "+91",
          phone: "9876543210",
          city: "Hyderabad",
          country: "India",
        },
        { resume: oversized, coverLetter: validDocx },
        application,
      ).resume,
    ).toBe("Resume must be 10 MB or smaller.");

    const invalidType = new File(["txt"], "resume.txt", { type: "text/plain" });

    expect(
      validateCareerPositionApplicationForm(
        {
          firstName: "Alex",
          lastName: "Example",
          email: "alex.example@example.test",
          callingCode: "+91",
          phone: "9876543210",
          city: "Hyderabad",
          country: "India",
        },
        { resume: invalidType, coverLetter: validDocx },
        application,
      ).resume,
    ).toBe("Upload a PDF, DOC, or DOCX file.");
  });

  it("exposes the exact review-state submission message", () => {
    expect(CAREERS_POSITION_APPLICATION_NOT_CONNECTED_STATUS).toBe(
      "Application submission is not connected in this review build. No personal information or files were sent.",
    );
  });
});
