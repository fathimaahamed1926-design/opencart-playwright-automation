import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "../../BasePage";

export class LogoutPage extends BasePage {
    private readonly btnContinue: Locator;
    private readonly heading:Locator;

    constructor(page: Page) {
        super(page);
        this.btnContinue = page.locator('.btn.btn-primary');
        this.heading= page.getByRole('heading', )
    }

    async clickContinue(): Promise<void> {
        await this.btnContinue.click();
        //use this inside test==> await expect((this.page)).toHaveURL(/.*route=common\/home/);  //regex usage: //- search string starting to ending .* means any character before the upcoming text will be ignored, \ - escape character, used to tell playwright that search string is not ending here
    }

    async isContinueButtonVisible(): Promise<boolean> {
        try {
            return await this.btnContinue.isVisible();
        } catch {
            return false;
        }

    }
} 