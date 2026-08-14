import { Locator, Page, expect } from "@playwright/test";
import { AddressFormComponent } from "./AddressFormComponent";
import { BillingInfo, NewCustomerDetails} from "../../types/types";

export class RegisterAccountComponent {
  private readonly page:Page;
  private readonly addressForm: AddressFormComponent;
  private readonly emailInput:Locator;
  private readonly telephoneInput:Locator;
  private readonly passwordInput: Locator;
  private readonly passwordConfirmInput: Locator;
  private readonly newsLetterCheckbox:Locator;
  private readonly sameDeliveryShippingAddressCheckbox:Locator;
  private readonly privacyPolicyCheckbox:Locator;

  constructor(page:Page){
    this.page=page;
    this.addressForm= new AddressFormComponent(page);
    this.emailInput = this.page.locator('#input-payment-email');
    this.telephoneInput = this.page.getByPlaceholder('Telephone');
    this.passwordInput = this.page.locator('#input-payment-password');
    this.passwordConfirmInput = this.page.getByPlaceholder('Password Confirm');
    this.newsLetterCheckbox = this.page.getByRole('checkbox', {name:'newsletter'});
    this.sameDeliveryShippingAddressCheckbox= this.page.getByRole('checkbox', {name:'shipping_address'});
    //this.privacyPolicyCheckbox = this.page.locator('div.pull-right').getByRole('checkbox', {name:'agree'});
    this.privacyPolicyCheckbox=page.locator('input[name="agree"]');
  }

  async setEmail(email:string) {
    await this.emailInput.fill(email);
  }

  async setTelephone(telephone:number) {
    await this.telephoneInput.fill(telephone.toString());
  }

  async setPassword(password:string) {
    await this.passwordInput.fill(password);
  }

  async setPasswordConfirm(passwordConfirm:string) {
    await this.passwordConfirmInput.fill(passwordConfirm);
  }

  async setAddressDetails(addressDetails:BillingInfo) {
    await this.addressForm.fillAddressForm(addressDetails);
  }

  async setAccountDetails(accountDetails:NewCustomerDetails) {
    await this.setEmail(accountDetails.email);
    await this.setTelephone(accountDetails.telephone);
    if(accountDetails.password){
    await this.setPassword(accountDetails.password);
    }
    if(accountDetails.passwordConfirm){
    await this.setPasswordConfirm(accountDetails.passwordConfirm);
    }
    await this.setAddressDetails(accountDetails.addressDetails);
  }

  async setGuestCheckoutDetails(guestAccountDetails:NewCustomerDetails) {
    await this.setEmail(guestAccountDetails.email);
    await this.setTelephone(guestAccountDetails.telephone);
    await this.setAddressDetails(guestAccountDetails.addressDetails);
  }

  async subscribeNewsletter(subscribe:boolean) {
    if(subscribe){
      await this.newsLetterCheckbox.check();
    } else {
      await this.newsLetterCheckbox.uncheck();
    }
  }

  async setSameDeliveryAndBillingAddress(sameAddress:boolean) {
    if(sameAddress){
      await this.sameDeliveryShippingAddressCheckbox.check();
    } else {
      await this.sameDeliveryShippingAddressCheckbox.uncheck();
    }
  }

  async checkPrivacyPolicy(privacyPolicy:boolean) {
    if(privacyPolicy){
      await this.privacyPolicyCheckbox.check();
    } else {
      await this.privacyPolicyCheckbox.uncheck();
    }
  }



}