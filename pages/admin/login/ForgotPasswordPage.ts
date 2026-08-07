import {Page, Locator, expect} from "@playwright/test"
import { BasePage } from "../../BasePage";
import { AlertComponent } from "../../../components/common/AlertComponent";

export class ForgotPasswordPage extends BasePage{

  readonly alert: AlertComponent;
  private readonly registeredEmailAddress: Locator;
  private readonly resetButton: Locator;
  private readonly cancelButton: Locator;

  constructor(page: Page) {
    super(page);
    this.alert = new AlertComponent(page);
    this.registeredEmailAddress = page.getByRole('textbox', { name: 'E-Mail Address' });
    this.resetButton = page.getByRole('button', { name: /Reset/i });
    this.cancelButton = page.locator("button[data-original-title='Cancel']");

  }

  async setRegEmailAddress(emailAddress: string) {
    await this.registeredEmailAddress.fill(emailAddress);
  }

  async clickReset(){
    await this.resetButton.click();
  }

  async resetPassword(emailAddress:string) {
    await this.setRegEmailAddress(emailAddress);
    await this.clickReset();
  }

  async cancelResetPassword() {
    await this.cancelButton.click();
  }

  async verifyForgotPasswordPageLoaded() {
    await this.verifyURLContains('route=common/forgotten');
    await expect(this.registeredEmailAddress).toBeVisible();      
  }

}