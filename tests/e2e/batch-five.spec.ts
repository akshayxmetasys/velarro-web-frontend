import { expect, test } from "@playwright/test";

test.describe("Batch 5 public pages", () => {
  test("home renders the Velarro homepage shell", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle("Velarro Estate");
    await expect(page.getByRole("heading", { name: "COLLECTOR SERIES" })).toBeVisible();
    await expect(page.getByText("Velarro cigars")).toBeVisible();
  });

  test("coming soon route renders the noindex placeholder experience", async ({ page }) => {
    await page.goto("/coming-soon");

    await expect(page).toHaveTitle(/Coming Soon/);
    await expect(page.getByRole("heading", { name: /Unveiling soon/ })).toBeVisible();
    await expect(page.getByRole("link", { name: "HOMEPAGE" })).toHaveAttribute("href", "/");
  });

  test("our story route renders story sections", async ({ page }) => {
    await page.goto("/our-story");

    await expect(page).toHaveTitle(/Our Story/);
    await expect(page.getByRole("heading", { name: "OUR STORY" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Brand Story" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Brand Values" })).toBeVisible();
  });
});
