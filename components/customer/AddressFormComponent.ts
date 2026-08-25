import { Locator, Page, expect } from "@playwright/test";
import { BillingInfo } from "../../types/types";

export class AddressFormComponent {
  private readonly page: Page;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly companyName: Locator;
  private readonly address1Input: Locator;
  private readonly address2Input: Locator;
  private readonly cityInput: Locator;
  private readonly postCodeInput: Locator;
  private readonly countrySelect: Locator;
  private readonly regionSelect: Locator;
  private readonly yesDefaultRadio: Locator;
  private readonly noDefaultRadio: Locator;
  private readonly backButton: Locator;
  private readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.getByRole('textbox', { name: /First Name/ });
    this.lastNameInput = page.getByRole('textbox', { name: /Last Name/ });
    this.companyName = page.getByRole('textbox', { name: /Company/ });
    this.address1Input = page.getByRole('textbox', { name: /Address 1/ });
    this.address2Input = page.getByRole('textbox', { name: /Address 2/ });
    this.cityInput = page.getByRole('textbox', { name: /City/ });
    this.postCodeInput = page.getByRole('textbox', { name: /Post Code/ });
    this.countrySelect = page.getByLabel('Country');
    this.regionSelect = page.getByLabel('Region / State'); 
    this.yesDefaultRadio = page.getByRole('radio', { name: 'Yes' });
    this.noDefaultRadio = page.getByRole('radio', { name: 'No' });
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.backButton = page.getByRole('link', { name: 'Back' });
  }

  async fillAddressForm(billingInfo: BillingInfo): Promise<void> {
    await this.firstNameInput.fill(billingInfo.firstName);
    await this.lastNameInput.fill(billingInfo.lastName);
    if(billingInfo.companyName){
    await this.companyName.fill(billingInfo.companyName);
    }
    await this.address1Input.fill(billingInfo.address1);
    if(billingInfo.address2){
      await this.address2Input.fill(billingInfo.address2);
    }
    await this.cityInput.fill(billingInfo.city);
    await this.postCodeInput.fill(billingInfo.postcode);
    await this.countrySelect.selectOption({label: billingInfo.country});
    
    const stateOption = this.regionSelect.getByRole('option', {name: billingInfo.state,exact: true});
    await expect(stateOption).toHaveCount(1);

    await this.regionSelect.selectOption({label: billingInfo.state});
    await expect(this.regionSelect.locator('option:checked')).toHaveText(billingInfo.state);
  }

  async setFirstName(firstName: string) {
    await this.firstNameInput.fill(firstName);
  }

  async setLastName(lastName: string) {
    await this.lastNameInput.fill(lastName);
  }

  async clickContinueButton(): Promise<void> {
    await this.continueButton.click();
  }

  async clickBackButton(): Promise<void> {
    await this.backButton.click();
  }

  async setDefaultAddress(isDefaultAddress: boolean): Promise<void> {
    if (isDefaultAddress) {
      await this.yesDefaultRadio.check();
    } else {
      await this.noDefaultRadio.check();
    }
  }

}