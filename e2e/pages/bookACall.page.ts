import { Page } from "playwright";
import { expect } from "playwright/test";
import { DateComponent } from "../components/date.component";
import { ContactInfoComponent } from "../components/contactInfo.component";

export class BookACallPage {
    private page: Page;
    private elements: { [key: string]: string };

    constructor(page: Page) {
        this.page = page;

        this.elements = {
            title: '//h1[text()="BOOK A CALL"]',
            emailInput: 'input[data-hsfc-id="TextInput"][type="email"]',
            inboundLeadInput: 'div[class="hsfc-DropdownInput__Caret"]',
            numEmployeesInput: 'input[type="hidden"][name="0-1/numemployees"]',
            numberOfEmployeesDropdownOption: '//li[text()="%s"]',
            nextButton: 'button[type="submit"][data-hsfc-id="Button"]',
            bookingConfirmation: 'h2[class="sa1-section-heading-center"]',
            emailErrorMessage: 'div[data-hsfc-id="ErrorAlert"]',
        };
    }

    async isPageVisible(): Promise<boolean> {
        return await this.page.locator(this.elements.title).isVisible();
    }

    async fillEmail(email: string): Promise<void> {
        await this.page.fill(this.elements.emailInput, email);
    }
    
    async selectInboundLeadsOption(optionText: string): Promise<void> {
        await this.page.click(this.elements.inboundLeadInput);
        const selector = this.elements.numberOfEmployeesDropdownOption.replace('%s', optionText);
        await this.page.locator(selector).click();
    }

    async clickNextButton(): Promise<void> {
        await this.page.click(this.elements.nextButton);
    }

    async selectDate(): Promise<void> {
        const dateComponent = new DateComponent(this.page);
        expect(await dateComponent.isComponentVisible()).toBe(true);
        await dateComponent.selectEarliestAvailableDate();
    }

    async fillContactInfo(firstName: string, lastName: string, mobilePhone: string): Promise<void> {
        const contactInfoComponent = new ContactInfoComponent(this.page);
        expect(await contactInfoComponent.isComponentVisible()).toBe(true);
        await contactInfoComponent.fillContactInfo(firstName, lastName, mobilePhone);
    }

    async clickConfirmButton(): Promise<void> {
        const contactInfoComponent = new ContactInfoComponent(this.page);
        await contactInfoComponent.clickConfirmButton();
    }

    async isBookingConfirmationCompleted(): Promise<boolean> {
        await this.page.locator(this.elements.bookingConfirmation).waitFor({ state: 'visible', timeout: 30000 });
        return true;
    }

    async isEmailErrorMessageVisible(): Promise<boolean> {
        return await this.page.locator(this.elements.emailErrorMessage).first().isVisible();
    }

}