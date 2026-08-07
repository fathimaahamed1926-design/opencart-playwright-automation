import {Page, Locator, expect} from "@playwright/test"
import { BasePage } from "../../BasePage"
import { LoginCredentials } from "../../../types/types";
import { AlertComponent } from "../../../components/common/AlertComponent";

export class LoginPage extends BasePage {
  readonly alert:AlertComponent;
  private readonly username: Locator;
  private readonly password: Locator;
  private readonly forgotPasswordLink : Locator;
  private readonly loginButton: Locator;
  private readonly loginErrorMessage: Locator;

  constructor(page:Page) {
    super(page);
    this.alert = new AlertComponent(page);
    this.username = page.getByRole('textbox', { name: 'Username' });
    this.password = page.getByRole('textbox', { name: 'Password' });
    this.forgotPasswordLink = page.getByRole('link', { name: 'Forgotten Password' });
    this.loginButton = page.getByRole('button', { name: /Login/i });
    this.loginErrorMessage = page.getByRole('alert', { name: 'Error' });
  }

  async open(){
    await this.openAdminAppPortal();
  }

  async setAdminUsername(username: string) {
    await this.username.fill(username);
  }

  async setAdminPassword(password: string) {
    await this.password.fill(password);
  }

  async clickLogin(){
    await this.loginButton.click();
  }

  async login(data:LoginCredentials) {               // Accepts an object of type loginCredentials 
    await this.setAdminUsername(data.email);
    await this.setAdminPassword(data.password);
    await this.clickLogin();
  }

  async getErrorMessage(): Promise<string | null>{
    await this.loginErrorMessage.waitFor({state:'visible', timeout: 5000});
    return (await this.loginErrorMessage.textContent())?.trim() ||null;
  }

  async verifyLoginFailed(expectedMessage: string) {
    const actualErrorMessage= await this.getErrorMessage();
    expect(actualErrorMessage).toContain(expectedMessage);
  }

  async clickForgotPasswordLink() {
    await this.forgotPasswordLink.click();
  } 

  async verifyLoginPageLoaded() {
    await this.verifyPageTitle('Administration');
    await this.verifyURLContains('route=common/login');
  }
}