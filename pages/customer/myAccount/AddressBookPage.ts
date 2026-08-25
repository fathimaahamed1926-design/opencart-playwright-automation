import { Locator, Page, expect } from "@playwright/test";
import { AddressFormComponent } from "../../../components/customer/AddressFormComponent";
import { BillingInfo } from "../../../types/types";
import { CustomerAccountBasePage } from "./CustomerAccountBasePage";
import { AddressMessages } from "../../../constants/customer/messages";

// This class represents the Address Book page in the customer account section of the application. It extends the CustomerAccountBasepage class, inheriting common functionality for customer account pages.
export class AddressBookPage extends CustomerAccountBasePage {

  readonly addressForm: AddressFormComponent;
  private readonly addressBookHeading: Locator;
  private readonly addNewAddressButton: Locator;

  constructor(page: Page) {
    super(page);

    this.addressForm = new AddressFormComponent(page);
    this.addressBookHeading = page.getByRole('heading', { name: 'Address Book Entries' });
    this.addNewAddressButton = page.getByRole('link', { name: 'New Address' });
  }

  private getAddressRow(address:string):Locator {
    return this.page.locator("table tbody tr").filter({hasText:address});
  }

  private getAddressCell(address:string): Locator {
    return this.page.locator("table tbody td.text-left").filter({hasText:address})
  }

  async verifyAddressBookPageLoaded(): Promise<void> {
    await expect(this.addressBookHeading).toBeVisible();
  }

  async editExistingAddress(addressData: BillingInfo, defaultAddress: boolean, oldAddress:string): Promise<void> {
    await this.getAddressRow(oldAddress).getByRole('link', { name: 'Edit', exact: true }).click();
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

  async deleteAddress(address:string): Promise<void> {
    this.page.once('dialog', async dialog => {
      await dialog.accept();
    });
    await this.getAddressRow(address).getByRole('link', { name: 'Delete' }).click();
  }

  async verifyAddressExists(addressData:BillingInfo): Promise<void> {
    const addressCell = this.getAddressCell(addressData.address1);
    const actualAddress = (await addressCell.innerText()).split("\n").map(line=>line.trim()).filter(Boolean);  //separating strings to next line, trimming white spaces, filtering falsy/null values
    
    const expectedAddress = [
      `${addressData.firstName} ${addressData.lastName}`,
      addressData.companyName,
      addressData.address1,
      addressData.address2,
      `${addressData.city} ${addressData.postcode}`,
      addressData.state,
      addressData.country,
    ];

    expect(actualAddress).toEqual(expectedAddress);
  }

  async verifyAddressDoesnotExist(address:string) {
    await expect(this.getAddressRow(address)).toHaveCount(0);
  }

  async verifyAddressAddedSuccessMessage() {
    await this.alert.verifySuccessMessage(AddressMessages.ADDRESS_ADDED);
  }

  async verifyAddressUpdatedSuccessMessage() {
    await this.alert.verifySuccessMessage(AddressMessages.ADDRESS_UPDATED);
  }

  async verifyWarningMessageForDefaultAddressDeletionAttempt() {
    await this.alert.verifyErrorMessage(AddressMessages.DEFAULT_ADDRESS_DELETE_WARNING);
  }

}