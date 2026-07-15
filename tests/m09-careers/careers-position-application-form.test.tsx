import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { CareersPositionApplicationForm } from "@/components/m09-careers/careers-position-application-form";
import {
  CAREERS_POSITION_APPLICATION_NOT_CONNECTED_STATUS,
  getCareerPositionApplicationBySlug,
} from "@/components/m09-careers/careers-position-application-data";

const application = getCareerPositionApplicationBySlug("area-sales-manager");

if (!application) {
  throw new Error("Expected Area Sales Manager application config.");
}

function createTestFile(name: string, type: string) {
  return new File(["test"], name, { type, lastModified: Date.now() });
}

describe("CareersPositionApplicationForm", () => {
  it("validates empty submission and focuses the first invalid field", async () => {
    const user = userEvent.setup();
    render(
      <CareersPositionApplicationForm
        config={application}
        detailHref="/careers/positions/area-sales-manager"
      />,
    );

    await user.click(screen.getByRole("button", { name: "APPLY TO THIS JOB" }));

    expect(screen.getByLabelText(/First Name/i)).toHaveFocus();
    expect(screen.getByLabelText(/First Name/i)).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("First Name is required.")).toBeInTheDocument();
    expect(screen.getByText("Please correct the errors below before continuing.")).toBeInTheDocument();
  });

  it(
    "shows the not-connected status after a valid submission without network or storage",
    async () => {
    const user = userEvent.setup();
    const fetchSpy = vi.fn();
    const storageSpy = vi.spyOn(Storage.prototype, "setItem");
    const fileReaderSpy = vi.spyOn(FileReader.prototype, "readAsDataURL");
    vi.stubGlobal("fetch", fetchSpy);

    render(
      <CareersPositionApplicationForm
        config={application}
        detailHref="/careers/positions/area-sales-manager"
      />,
    );

    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { name: "firstName", value: "Alex" },
    });
    fireEvent.change(screen.getByLabelText(/Last Name/i), {
      target: { name: "lastName", value: "Example" },
    });
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { name: "email", value: "alex.example@example.test" },
    });
    fireEvent.change(screen.getByLabelText(/^Phone number/i), {
      target: { name: "phone", value: "9876543210" },
    });
    fireEvent.change(screen.getByLabelText(/^City/i), {
      target: { name: "city", value: "Hyderabad" },
    });
    fireEvent.change(screen.getByLabelText(/^Country/i), {
      target: { name: "country", value: "India" },
    });

    const resumeInput = screen.getByLabelText(/Upload Resume/i);
    const coverLetterInput = screen.getByLabelText(/Upload Cover Letter/i);
    fireEvent.change(resumeInput, {
      target: { files: [createTestFile("resume.pdf", "application/pdf")] },
    });
    fireEvent.change(coverLetterInput, {
      target: {
        files: [
          createTestFile(
            "cover-letter.docx",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          ),
        ],
      },
    });

    expect(screen.getByText("resume.pdf")).toBeInTheDocument();
    expect(screen.getByText("cover-letter.docx")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "APPLY TO THIS JOB" }));

    expect(fetchSpy).not.toHaveBeenCalled();
    expect(storageSpy).not.toHaveBeenCalled();
    expect(fileReaderSpy).not.toHaveBeenCalled();
    expect(screen.getByText(CAREERS_POSITION_APPLICATION_NOT_CONNECTED_STATUS)).toBeInTheDocument();
    expect(screen.getByDisplayValue("Alex")).toBeInTheDocument();
    expect(screen.queryByText(/application submitted/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/application id/i)).not.toBeInTheDocument();

    const form = document.querySelector("[data-careers-position-application-form]");
    expect(form).toHaveAttribute("data-form-mode", "ui-only-not-connected");
    expect(form).toHaveAttribute("data-submission-endpoint", "none");
    expect(form).not.toHaveAttribute("action");

    vi.unstubAllGlobals();
    storageSpy.mockRestore();
    fileReaderSpy.mockRestore();
    },
    15000,
  );

  it("renders Go Back as a detail-page link and keeps email as a placeholder", () => {
    render(
      <CareersPositionApplicationForm
        config={application}
        detailHref="/careers/positions/area-sales-manager"
      />,
    );

    expect(screen.getByRole("link", { name: "GO BACK" })).toHaveAttribute(
      "href",
      "/careers/positions/area-sales-manager",
    );
    expect(screen.getByLabelText(/Email Address/i)).toHaveAttribute(
      "placeholder",
      "velarro@gmail.com",
    );
    expect(screen.getByLabelText(/Email Address/i)).toHaveValue("");
    expect(screen.getByLabelText("Calling code")).toHaveDisplayValue("+91");
    expect(within(screen.getByLabelText(/^Country/i)).getByRole("option", { name: "India" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /^mailto:/i })).not.toBeInTheDocument();
  });
});
