import { Locator, Page, expect } from "@playwright/test";
import { AddressFormComponent } from "../../../components/customer/AddressFormComponent";
import { BillingInfo } from "../../../types/types";
import { CustomerAccountBasePage } from "./CustomerAccountBasePage";

// This class represents the Address Book page in the customer account section of the application. It extends the CustomerAccountBasepage class, inheriting common functionality for customer account pages.
export class AddressBookPage extends CustomerAccountBasePage {

  readonly addressForm: AddressFormComponent;
  private readonly addressBookHeading: Locator;
  private readonly editExistingAddressButton: Locator;
  private readonly addNewAddressButton: Locator;
  private readonly deleteAddressButton: Locator;

  constructor(page: Page) {
    super(page);

    this.addressForm = new AddressFormComponent(page);
    this.addressBookHeading = page.getByRole('heading', { name: 'Address Book Entries' });
    this.editExistingAddressButton = page.getByRole('link', { name: 'Edit', exact: true });
    this.addNewAddressButton = page.getByRole('link', { name: 'New Address' });
    this.deleteAddressButton = page.getByRole('link', { name: 'Delete' });
  }

  async verifyAddressBookPageLoaded(): Promise<void> {
    await expect(this.addressBookHeading).toBeVisible();
  }

  async editExistingAddress(addressData: BillingInfo, defaultAddress: boolean): Promise<void> {
    await this.editExistingAddressButton.click();
    await this.addressForm.fillAddressForm(addressData);
    await this.addressForm.setDefaultAddress(defaultAddress); // You can set this based on your requirements
    await this.addressForm.clickContinueButton();
  }

  async addNewAddress(addressData: BillingInfo, defaultAddress: boolean): Promise<void> {
    await this.addNewAddressButton.click();
    await this.addressForm.fillAddressForm(addressData);
    await this.addressForm.setDefaultAddress(defaultAddress);
    await this.addressForm.clickContinueButton();
  }

  async deleteAddress(): Promise<void> {
    await this.deleteAddressButton.click();
    await this.page.on('dialog', async dialog => {
      await dialog.accept();
    });
  }

}