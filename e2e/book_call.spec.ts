import { test, expect } from "@playwright/test";
import { BookACallPage } from "./pages/bookACall.page";


test.describe("Book a Call Form", () => {
  test("Should successfully book a call with valid input", async ({ page }) => {
    await page.goto("/book-a-call-form");
    await page.waitForLoadState("load");

    const bookACallPage = new BookACallPage(page);
    expect(await bookACallPage.isPageVisible()).toBe(true);
    await bookACallPage.fillEmail("ememakpanekpo@gmail.com");
    await bookACallPage.selectInboundLeadsOption("0-100 leads/month");
    await bookACallPage.clickNextButton();
    await bookACallPage.selectDate();
    await bookACallPage.fillContactInfo("John", "Doe", "1234567890");
    await bookACallPage.clickConfirmButton();
    expect(await bookACallPage.isBookingConfirmationCompleted()).toBe(true);
  });

  test("Should not book a call with invalid input", async ({ page }) => {
    await page.goto("/book-a-call-form");
    await page.waitForLoadState("load");

    const bookACallPage = new BookACallPage(page);
    expect(await bookACallPage.isPageVisible()).toBe(true);
    await bookACallPage.fillEmail("ememakpanekpom");
    await page.keyboard.press("Enter");
    await page.waitForTimeout(1000);
    expect(await bookACallPage.isEmailErrorMessageVisible()).toBe(true);
  });
});