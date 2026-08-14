import {Locator, Page} from "@playwright/test";
import { RegisterAccountComponent } from "../../../components/customer/RegisterAccountComponent";
import { CustomerAccountBasePage } from "../myAccount/CustomerAccountBasePage";
import { BasePage } from "../../BasePage";


export class RegisterPage extends BasePage {

    readonly registerForm: RegisterAccountComponent;
    readonly customerAccount:CustomerAccountBasePage;

    constructor(page: Page) {
        super(page);
        this.customerAccount = new CustomerAccountBasePage(page);
        this.registerForm = new RegisterAccountComponent(page);
    }

    async open() {
        await this.navigateToHomePage();
        await this.customerAccount.header.clickRegister();
    }

    async verifyRegisterPageLoaded(): Promise<void> {
      await this.verifyURLContains('route=account/register');
    }
}
