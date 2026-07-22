import { expect, test } from "@playwright/test";

test.describe("M09 Careers position application page", () => {
  test("renders the review application flow at 1440px", async ({ page }) => {
    const consoleErrors: string[] = [];
    const blockedMethods = ["POST", "PUT", "PATCH"];

    page.on("console", (message) => {
      if (message.type() === "error") {
        consoleErrors.push(message.text());
      }
    });

    page.on("request", (request) => {
      if (
        blockedMethods.includes(request.method()) &&
        !request.url().includes("_next")
      ) {
        throw new Error(`Unexpected ${request.method()} request: ${request.url()}`);
      }
    });

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/careers/positions/area-sales-manager");

    const applyLink = page.getByRole("link", { name: "Apply for this job" });
    await expect(applyLink).toHaveAttribute(
      "href",
      "/careers/positions/area-sales-manager/apply",
    );
    await expect(applyLink).toHaveAttribute("data-application-status", "implemented");
    await applyLink.click();
    await expect(page).toHaveURL(/\/careers\/positions\/area-sales-manager\/apply$/);

    await expect(page.getByRole("navigation", { name: "Main navigation" })).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();

    const breadcrumb = page.getByRole("navigation", { name: "Breadcrumb" });
    await expect(breadcrumb.getByRole("link", { name: "Job description" })).toHaveAttribute(
      "href",
      "/careers/positions/area-sales-manager",
    );
    await expect(breadcrumb.getByText("Application")).toBeVisible();

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /Join the legacy of velarro estate/i,
      }),
    ).toBeVisible();
    await expect(page.getByText(/Become part of a team dedicated to excellence/i)).toBeVisible();

    await expect(page.getByLabel(/First Name/i)).toBeVisible();
    await expect(page.getByLabel(/Last Name/i)).toBeVisible();
    await expect(page.getByLabel(/Email Address/i)).toBeVisible();
    await expect(page.getByLabel(/^Phone number/i)).toBeVisible();
    await expect(page.getByLabel(/^City/i)).toBeVisible();
    await expect(page.getByLabel(/^Country/i)).toBeVisible();
    await expect(page.getByLabel(/Upload Resume/i)).toBeVisible();
    await expect(page.getByLabel(/Upload Cover Letter/i)).toBeVisible();
    await expect(page.getByRole("link", { name: "GO BACK" })).toBeVisible();
    await expect(page.getByRole("button", { name: "APPLY TO THIS JOB" })).toBeVisible();

    await page.getByRole("button", { name: "APPLY TO THIS JOB" }).click();
    await expect(page.getByText("First Name is required.")).toBeVisible();
    await expect(page.getByLabel(/First Name/i)).toBeFocused();

    await page.getByLabel(/First Name/i).fill("Alex");
    await page.getByLabel(/Last Name/i).fill("Example");
    await page.getByLabel(/Email Address/i).fill("alex.example@example.test");
    await page.getByLabel(/^Phone number/i).fill("9876543210");
    await page.getByLabel(/^City/i).fill("Hyderabad");
    await page.getByLabel(/^Country/i).selectOption("India");

    await page.getByLabel(/Upload Resume/i).setInputFiles({
      name: "resume.pdf",
      mimeType: "application/pdf",
      buffer: Buffer.from("%PDF-1.4 test"),
    });
    await page.getByLabel(/Upload Cover Letter/i).setInputFiles({
      name: "cover-letter.docx",
      mimeType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      buffer: Buffer.from("PK test"),
    });

    await expect(page.getByText("resume.pdf")).toBeVisible();
    await expect(page.getByText("cover-letter.docx")).toBeVisible();

    await page.getByRole("button", { name: "APPLY TO THIS JOB" }).click();
    await expect(
      page.getByText(
        "Application submission is not connected in this review build. No personal information or files were sent.",
      ),
    ).toBeVisible();
    await expect(page.getByLabel(/First Name/i)).toHaveValue("Alex");
    await expect(page.getByText(/application submitted/i)).toHaveCount(0);

    const currentUrl = page.url();
    expect(currentUrl).toMatch(/\/careers\/positions\/area-sales-manager\/apply$/);

    const pageMetrics = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      figmaAssets: Array.from(document.querySelectorAll("*"))
        .map((node) => node.outerHTML)
        .join(" ")
        .includes("figma.com/api/mcp/asset"),
    }));
    expect(pageMetrics.scrollWidth).toBeLessThanOrEqual(pageMetrics.clientWidth);
    expect(pageMetrics.figmaAssets).toBe(false);
    expect(consoleErrors).toEqual([]);

    await page.getByRole("link", { name: "GO BACK" }).click();
    await expect(page).toHaveURL(/\/careers\/positions\/area-sales-manager$/);

    await page.screenshot({
      path: "test-results/m09-careers-position-application-1440-review.png",
      fullPage: true,
    });
  });

  test("returns not found for unsupported application slugs", async ({ page }) => {
    const response = await page.goto(
      "/careers/positions/production-manager/apply",
    );
    expect(response?.status()).toBe(404);
  });
});
