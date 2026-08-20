import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../../BasePage';
import { BillingInfo, NewCustomerDetails, ShippingInfo } from '../../../types/types';
import { AddressFormComponent } from '../../../components/customer/AddressFormComponent';
import { RegisterAccountComponent } from '../../../components/customer/RegisterAccountComponent';
import { loginAsCustomer } from '../../../utils/authentication/customerAuth';
import { AlertComponent } from '../../../components/common/AlertComponent';
import { PaymentMessages } from '../../../constants/customer/messages';

export class CheckoutPage extends BasePage {

    readonly addressForm: AddressFormComponent;
    readonly registerAccount: RegisterAccountComponent;
    readonly alert: AlertComponent;
    private readonly checkoutHeader: Locator;
    private readonly addressDropdown: Locator;
    private readonly flatRateRadio: Locator;
    private readonly commentSection: Locator;
    private readonly cashOnDeliveryRadio: Locator;
    private readonly termsCheckbox: Locator;
    private readonly confirmOrderButton: Locator;
    private readonly orderConfirmationMessage: Locator;
    private readonly billingDetailsContinueButton: Locator;
    private readonly deliveryDetailsContinueButton: Locator;
    private readonly deliveryMethodContinueButton: Locator;
    private readonly paymentMethodContinueButton: Locator;
    private readonly useExistingBillingAddressRadio: Locator;
    private readonly useNewBillingAddressRadio: Locator;
    private readonly useExistingDeliveryAddressRadio: Locator;
    private readonly useNewDeliveryAddressRadio: Locator;
    private readonly deliveryDetailsPanel: Locator;
    private readonly checkoutOptionsPanel: Locator;
    private readonly registerAccountRadio: Locator;
    private readonly guestCheckoutRadio: Locator;
    private readonly checkoutOptionsContinueButton: Locator;
    private readonly registerAccountContinueButton: Locator;
    private readonly guestAccountContinueButton: Locator;
    private readonly billingDetailsPanel: Locator;
    private readonly deliveryMethodPanel: Locator;
    private readonly paymentMethodPanel: Locator;
    private readonly confirmCheckoutPanel: Locator;


    constructor(page: Page) {
        super(page);
        this.addressForm = new AddressFormComponent(page);
        this.registerAccount = new RegisterAccountComponent(page);
        this.alert = new AlertComponent(page);
        this.checkoutHeader = page.getByRole('heading', { name: 'Checkout', exact: true });
        this.billingDetailsPanel = page.locator('#collapse-payment-address');
        this.deliveryDetailsPanel = page.locator('#collapse-shipping-address');
        this.deliveryMethodPanel = page.locator('#collapse-shipping-method');
        this.paymentMethodPanel = page.locator('#collapse-payment-method');
        this.confirmCheckoutPanel = page.locator('#collapse-checkout-confirm');
        this.useExistingBillingAddressRadio = this.billingDetailsPanel.locator('input[value="existing"]');
        this.useNewBillingAddressRadio = this.billingDetailsPanel.locator('input[value="new"]');
        this.useExistingDeliveryAddressRadio = this.deliveryDetailsPanel.locator('input[value="existing"]');
        this.useNewDeliveryAddressRadio = this.deliveryDetailsPanel.locator('input[value="new"]');
        this.addressDropdown = page.locator('select[name="address_id"]');
        this.flatRateRadio = page.locator('input[value="flat.flat"]');
        this.commentSection = page.locator('textarea[name="comment"]');
        this.cashOnDeliveryRadio = page.locator('input[value="cod"]');
        this.termsCheckbox = page.locator('input[name="agree"]');
        this.confirmOrderButton = page.getByRole('button', { name: 'Confirm Order' });
        this.orderConfirmationMessage = page.getByRole('heading', { name: 'Your order has been placed!' });
        this.billingDetailsContinueButton = page.locator('#button-payment-address');
        this.deliveryDetailsContinueButton = page.locator('#button-shipping-address');
        this.deliveryMethodContinueButton = page.locator('#button-shipping-method');
        this.paymentMethodContinueButton = page.locator('#button-payment-method');
        this.checkoutOptionsPanel = page.locator('#collapse-checkout-option');
        this.checkoutOptionsContinueButton = this.checkoutOptionsPanel.locator('#button-account');
        this.registerAccountRadio = page.getByRole('radio', { name: 'Register Account' });
        this.guestCheckoutRadio = page.getByRole('radio', { name: 'Guest Checkout' });
        this.registerAccountContinueButton = page.locator('#button-register');
        this.guestAccountContinueButton = page.locator('#button-guest');
    }

    async isCheckoutHeaderVisible(): Promise<boolean> {
        return await this.checkoutHeader.isVisible();
    }

    async fillBillingAddress(billingInfo: BillingInfo): Promise<void> {
        await this.addressForm.fillAddressForm(billingInfo);
    }

    async fillBillingDetails(addressdata?: BillingInfo): Promise<void> {
        if (addressdata) {
            await this.useNewBillingAddressRadio.check();
            await this.addressForm.fillAddressForm(addressdata);
        } else {
            await this.useExistingBillingAddressRadio.check();
            // Optionally, select an existing address from the dropdown if there are multiple addresses
            await this.addressDropdown.selectOption({ index: 0 }); // Example of selecting an existing address
        }
        await this.continueCheckoutStep(this.billingDetailsContinueButton, this.deliveryDetailsPanel); //introducing this step because of an AJAX error in loading the next panel
    }

    async fillDeliveryDetails(addressdata?: ShippingInfo): Promise<void> {
        if (addressdata) {
            await this.useNewDeliveryAddressRadio.check();
            await this.addressForm.fillAddressForm(addressdata);
        } else {
            await this.useExistingDeliveryAddressRadio.check();
            await this.addressDropdown.selectOption({ index: 0 });
        }
        await this.continueCheckoutStep(this.deliveryDetailsContinueButton, this.deliveryMethodPanel)
        //await this.deliveryDetailsContinueButton.click();
    }

    async chooseDeliveryMethod(comment?: string): Promise<void> {
        if (await this.flatRateRadio.isVisible()) {
            await this.flatRateRadio.check();
        }
        if (comment) {
            await this.commentSection.fill(comment);
        }
        await this.continueCheckoutStep(this.deliveryMethodContinueButton, this.paymentMethodPanel);
    }

    async selectPaymentMethod(): Promise<void> {
        if (await this.cashOnDeliveryRadio.isVisible()) {
            await this.cashOnDeliveryRadio.check();
        }
        await this.termsCheckbox.check();

        await this.continueCheckoutStep(this.paymentMethodContinueButton, this.confirmCheckoutPanel);
        //await this.paymentMethodContinueButton.click();
    }

    async confirmOrder(): Promise<void> {
        await this.confirmOrderButton.click();
        await this.orderConfirmationMessage.waitFor({ state: 'visible', timeout: 3000 });
    }

    async verifyOrderPlacedSuccessfully(): Promise<void> {
        await expect(this.orderConfirmationMessage).toBeVisible(); // Wait for the confirmation message to be visible
        await this.verifyURLContains('route=checkout/success');
    }

    // because of an AJAX error, occasionally continue button needed to be clicked twice to expand the next panel
    private async continueCheckoutStep(button: Locator, nextPanel: Locator): Promise<void> {
        await button.click();

        if (!(await nextPanel.isVisible()) && await button.isEnabled()) {
            await button.click();
            await nextPanel.waitFor({ state: 'visible', timeout: 5000 });  //waiting untill the loading status is resolved
        }
        await expect(nextPanel).toBeVisible();

    }

    async checkoutAsNewCustomerViaRegisterAccount(accountDetails: NewCustomerDetails) {
        await this.registerAccountRadio.click();
        await this.continueCheckoutStep(this.checkoutOptionsContinueButton, this.billingDetailsPanel)
        //await this.checkoutOptionsContinueButton.click();
        await this.registerAccount.setRegisterAccountDetails(accountDetails);
        await this.registerAccount.subscribeNewsletter(false);
        await this.registerAccount.checkPrivacyPolicy(true);
        await this.registerAccountContinueButton.click();
        await this.chooseDeliveryMethod();
        await this.selectPaymentMethod();
        await this.confirmOrder();
    }

    async checkoutAsNewCustomerViaGuestCheckout(guestAccountDetails: NewCustomerDetails) {
        await this.guestCheckoutRadio.click();
        await this.continueCheckoutStep(this.checkoutOptionsContinueButton, this.billingDetailsPanel)
        await this.registerAccount.setGuestCheckoutDetails(guestAccountDetails);
        //await this.continueCheckoutStep(this.guestAccountContinueButton, this.deliveryDetailsPanel);
        await this.guestAccountContinueButton.click();
        await this.chooseDeliveryMethod();
        await this.selectPaymentMethod();
        await this.confirmOrder();
    }

    async checkoutAsReturningCustomer(addressdata?: BillingInfo) {
        await loginAsCustomer(this.page);
        await this.fillBillingDetails(addressdata);
        await this.billingDetailsContinueButton.click();
        await this.selectPaymentMethod();
        await this.confirmOrder();
    }

    async verifyNoPaymentOptionsWarningMessage() {
        await this.alert.verifyErrorMessage(PaymentMessages.NO_PAYMENT_OPTIONS)
    }


}