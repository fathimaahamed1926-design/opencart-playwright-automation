import { Locator, Page, expect } from "@playwright/test";
import { CustomerAccountBasePage } from "./CustomerAccountBasePage";

export class ChangePasswordPage extends CustomerAccountBasePage {

    private readonly passwordInput: Locator;
    private readonly confirmPasswordInput: Locator;

    constructor(page: Page) {
        super(page);

        this.passwordInput = page.getByRole('textbox', { name: 'Password', exact: true });
        this.confirmPasswordInput = page.getByRole('textbox', { name: 'Password Confirm' });
    }

    async enterPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async confirmPassword(password: string) {
        await this.confirmPasswordInput.fill(password);
    }

    async changePassword(password: string) {
        await this.enterPassword(password);
        await this.confirmPassword(password);
        await this.customerFormActions.clickContinueButton();
    }

}