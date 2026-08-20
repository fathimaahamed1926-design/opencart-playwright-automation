import { Locator, Page } from "@playwright/test";
import { RegisterAccountComponent } from "../../../components/customer/RegisterAccountComponent";
import { CustomerAccountBasePage } from "../myAccount/CustomerAccountBasePage";
import { BasePage } from "../../BasePage";


export class RegisterPage extends BasePage {

  readonly registerForm: RegisterAccountComponent;
  readonly customerAccount: CustomerAccountBasePage;
  private readonly firstNameInput:Locator;
  private readonly lastNameInput:Locator;
  private readonly emailInput:Locator;
  private readonly telephoneInput:Locator;
  private readonly passwordInput:Locator;
  private readonly passwordConfirmInput:Locator;
  private readonly yesNewsletterRadio:Locator;
  private readonly noNewsletterRadio:Locator;


  constructor(page: Page) {
    super(page);
    this.customerAccount = new CustomerAccountBasePage(page);
    this.registerForm = new RegisterAccountComponent(page);
    this.firstNameInput = page.getByRole('textbox', { name: /First Name/ });
    this.lastNameInput = page.getByRole('textbox', { name: /Last Name/ });
    this.emailInput = page.getByPlaceholder('E-Mail');
    this.telephoneInput = page.getByPlaceholder('Telephone');
    this.passwordInput = page.getByPlaceholder('Password', {exact:true});
    this.passwordConfirmInput = page.getByPlaceholder('Password Confirm', {exact:true});
    this.yesNewsletterRadio = page.locator("input[value='1']");
    this.noNewsletterRadio = page.locator("input[value='0']");
  }

  async open() {
    await this.openCustomerAppPortal();
    await this.customerAccount.header.clickRegister();
  }

  async verifyRegisterPageLoaded(): Promise<void> {
    await this.verifyURLContains('route=account/register');
  }

  async setFirstName(firstName?: string) {
    if(firstName)
    await this.firstNameInput.fill(firstName);
  }

  async setLastName(lastName?: string) {
    if(lastName)
    await this.lastNameInput.fill(lastName);
  }

  async setEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async setTelephone(telephone: number) {
    await this.telephoneInput.fill(telephone.toString());
  }

  async setPassword(password?: string) {
    if (password) {
      await this.passwordInput.fill(password);
    }

  }

  async setPasswordConfirm(passwordConfirm?: string) {
    if (passwordConfirm) {
      await this.passwordConfirmInput.fill(passwordConfirm);
    }
  }

  async subscribeNewsletter(subscribe: boolean): Promise<void> {
    if (subscribe) {
      await this.yesNewsletterRadio.click();
    } else {
      await this.noNewsletterRadio.click();
    }
  }


}
