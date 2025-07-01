import { Page } from "playwright";

export class DateComponent {
  private page: Page;
  private elements: { [key: string]: string };

  constructor(page: Page) {
    this.page = page;

    this.elements = {
      iframe: '//iframe',
      header: 'div[data-test-id="profile-header"]',
      noDateAvailable:
        'i18n-string[data-key="prebook.datePicker.noPreviousMonthReason"]',
      nextMonthButton: 'button[data-test-id="date-picker-header-next-btn"]',
      enabledDateButton:
        'button[data-test-id="available-date"]:not([aria-disabled="true"])',
      enabledTimeButton:
        'div[data-test-id="time-picker-btn"]:not([aria-disabled="true"])',
    };
  }

  async getIframe() {
    const iframeElement = await this.page.locator(this.elements.iframe).first();
    const iframe = await iframeElement.contentFrame();
    if (!iframe) {
      throw new Error('Could not locate iframe');
    }
    return iframe;
  }

  async isComponentVisible(): Promise<boolean> {
    const iframe = await this.getIframe();
    await iframe.locator(this.elements.header).waitFor({ state: 'visible', timeout: 10000 });
    return true;
  }

  async selectEarliestAvailableDate(): Promise<void> {
    const iframe = await this.getIframe();
    // Check if "No available dates" message is displayed
    const noDateElement = await iframe
      .locator(this.elements.noDateAvailable)
      .first();

    if (await noDateElement.isVisible()) {
      // If no dates are available in current month, click next month button
      await iframe.locator(this.elements.nextMonthButton).first().click();
    }

    // Click on the first enabled date button
    const firstAvailableDate = iframe
      .locator(this.elements.enabledDateButton)
      .first();
    await firstAvailableDate.click();

    // Wait for time slots to load
    await this.page.waitForTimeout(500);

    // Click on the first enabled time button
    const firstAvailableTime = iframe
      .locator(this.elements.enabledTimeButton)
      .first();
    await firstAvailableTime.click();
  }
}
