import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../../BasePage';
import { BillingInfo, ShippingInfo } from '../../../types/types';
import { AddressFormComponent } from '../../../components/customer/AddressFormComponent';

export class CheckoutPage extends BasePage {

    readonly addressForm: AddressFormComponent;
    private readonly checkoutHeader: Locator;
    private readonly continueButton: Locator;
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


    constructor(page: Page) {
        super(page);
        this.addressForm = new AddressFormComponent(page);
        this.checkoutHeader = page.getByRole('heading', { name: 'Checkout', exact: true });
        this.continueButton = page.getByRole('button', { name: 'Continue' }); // Assuming the first Continue button is for billing details
        this.useExistingBillingAddressRadio = page.locator('#collapse-payment-address').locator('input[value="existing"]');
        this.useNewBillingAddressRadio = page.locator('#collapse-payment-address').locator('input[value="new"]');
        this.useExistingDeliveryAddressRadio = page.locator('#collapse-shipping-address').locator('input[value="existing"]');
        this.useNewDeliveryAddressRadio = page.locator('#collapse-shipping-address').locator('input[value="new"]');
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
        this.deliveryDetailsPanel = page.locator('#collapse-shipping-address');
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
        await this.continueCheckoutStep(this.billingDetailsContinueButton, this.deliveryDetailsPanel);
    }

    async fillDeliveryDetails(addressdata?: ShippingInfo): Promise<void> {
        if (addressdata) {
            await this.useNewDeliveryAddressRadio.check();
            await this.addressForm.fillAddressForm(addressdata);
        } else {
            await this.useExistingDeliveryAddressRadio.check();
            //await this.addressDropdown.selectOption({ index: 0 });
        }
        await this.deliveryDetailsContinueButton.click();
    }

    async chooseDeliveryMethod(comment?: string): Promise<void> {
        if (await this.flatRateRadio.isVisible()) {
            await this.flatRateRadio.check();
        }
        if (comment) {
            await this.commentSection.fill(comment);
        }
        await this.deliveryMethodContinueButton.click();
    }

    async selectPaymentMethod(): Promise<void> {
        if (await this.cashOnDeliveryRadio.isVisible()) {
            await this.cashOnDeliveryRadio.check();
        }
        await this.termsCheckbox.check();

        await this.paymentMethodContinueButton.click();
    }

    async confirmOrder(): Promise<void> {
        await this.confirmOrderButton.click();
    }

    async verifyOderPlacedSuccessfully(): Promise<void> {
        await this.orderConfirmationMessage.waitFor({ state: 'visible', timeout: 1000 }); // Wait for the confirmation message to be visible
        await this.verifyURLContains('route=checkout/success');
    }

    private async continueCheckoutStep(button: Locator, nextPanel: Locator): Promise<void> {
        await button.click();

        if (!(await nextPanel.isVisible())) {
            await button.click();
        }

        await expect(nextPanel).toBeVisible();
    }
}