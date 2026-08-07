import { Locator, Page, expect } from "@playwright/test";

export class AlertComponent {

    private readonly page: Page;
    private readonly successAlert: Locator;
    private readonly dangerAlert: Locator;

    constructor(page: Page) {
        this.page = page;
        this.successAlert = this.page.locator(".alert-success");
        this.dangerAlert = this.page.locator(".alert-danger");
    }

    async getSuccessMessage() {

        await expect(this.successAlert).toBeVisible();
        await this.successAlert.waitFor({ state: 'visible' });
        return (await this.successAlert.textContent())?.trim();

    }

    async getErrorMessage() {

        await expect(this.dangerAlert).toBeVisible();
        await this.dangerAlert.waitFor({ state: 'visible' });
        return (await this.dangerAlert.textContent())?.trim();

    }

    async verifySuccessMessage(expectedMessage: string) {

        const actualMessage = await this.getSuccessMessage();

        expect(actualMessage).toContain(expectedMessage);

    }

    async verifyErrorMessage(expectedMessage: string) {

        const actualMessage = await this.getErrorMessage();

        expect(actualMessage).toContain(expectedMessage);

    }

    async clickOk() {
        this.page.once("dialog", async dialog => {
            await dialog.accept();
        });
    }

    async clickCancel() {
        this.page.once("dialog", async dialog => {
            await dialog.dismiss();
        });
    }
}
