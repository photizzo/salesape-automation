import { Page } from "playwright";

export class ContactInfoComponent {
    private page: Page;
    private elements: { [key: string]: string };

    constructor(page: Page) {
        this.page = page;

        this.elements = {
            iframe: '//iframe',
            title: '*[data-key="prebook.details.yourInfo"]',
            firstNameInput: 'input[data-test-id="confirm-firstName-field"]',
            lastNameInput: 'input[data-test-id="confirm-lastName-field"]',
            emailInput: 'input[data-test-id="booking-form-field-email-input"]',
            mobilePhoneInput: 'input[data-test-id="confirm-mobilephone-field"]',
            confirmButton: 'button[data-test-id="forward-btn"]',
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
        await iframe.locator(this.elements.title).waitFor({ state: 'visible', timeout: 10000 });
        return true;
    }

    async fillContactInfo(firstName: string, lastName: string, mobilePhone: string): Promise<void> {
        const iframe = await this.getIframe();
        await iframe.locator(this.elements.firstNameInput).fill(firstName);
        await iframe.locator(this.elements.lastNameInput).fill(lastName);
    }

    async clickConfirmButton(): Promise<void> {
        const iframe = await this.getIframe();
        await iframe.locator(this.elements.confirmButton).click();
    }
}