import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../BasePage';
import { BillingInfo, ShippingInfo } from '../../../types/types';
import { AddressFormComponent } from '../../../components/customer/AddressFormComponent';

export class CheckoutPage extends BasePage {

    readonly addressForm: AddressFormComponent;
    private readonly checkoutHeader: Locator;
    private readonly continueButton: Locator;
    private readonly useExistingAddressRadio: Locator;
    private readonly useNewAddressRadio: Locator;
    private readonly addressDropdown: Locator;
    private readonly flatRateRadio: Locator;
    private readonly commentSection: Locator;
    private readonly cashOnDeliveryRadio: Locator;
    private readonly termsCheckbox: Locator;
    private readonly confirmOrderButton: Locator;
    private readonly orderConfirmationMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.addressForm = new AddressFormComponent(page);
        this.checkoutHeader = page.getByRole('heading', { name: 'Checkout', exact: true });
        this.continueButton = page.getByRole('button', { name: 'Continue' }); // Assuming the first Continue button is for billing details
        this.useExistingAddressRadio = page.locator('input[value="existing"]');
        this.useNewAddressRadio = page.locator('input[value="new"]');
        this.addressDropdown = page.locator('select[name="address_id"]');
        this.flatRateRadio = page.locator('input[value="flat.flat"]');
        this.commentSection = page.locator('textarea[name="comment"]');
        this.cashOnDeliveryRadio = page.locator('input[value="cod"]');
        this.termsCheckbox = page.locator('input[name="agree"]');
        this.confirmOrderButton = page.getByRole('button', { name: 'Confirm Order' });
        this.orderConfirmationMessage = page.getByRole('heading', { name: 'Your order has been placed!' });
    }

    async isCheckoutHeaderVisible(): Promise<boolean> {
        return await this.checkoutHeader.isVisible();
    }

    async fillBillingAddress(billingInfo: BillingInfo): Promise<void> {
        await this.addressForm.fillAddressForm(billingInfo);
    }

    async fillBillingDetails(type: 'existing' | 'new', addressdata?: BillingInfo): Promise<void> {
        if (await this.useExistingAddressRadio.isVisible()) {
            if (type === 'existing') {
                await this.useExistingAddressRadio.check();
                // Optionally, select an existing address from the dropdown if there are multiple addresses
                await this.addressDropdown.selectOption({ index: 0 }); // Example of selecting an existing address
            } else {
                await this.useNewAddressRadio.check();
                if (addressdata) {
                    await this.addressForm.fillAddressForm(addressdata);
                }
            }
        } else {
            if (addressdata) {
                await this.addressForm.fillAddressForm(addressdata);
            }
        }
    }

    async clickContinueButton(): Promise<void> {
        await this.continueButton.click();
    }

    async fillDeliveryDetails(type: 'existing' | 'new', addressdata?: ShippingInfo): Promise<void> {
        if (type === 'existing') {
            await this.useExistingAddressRadio.check();
            // Optionally, select an existing address from the dropdown if there are multiple addresses
            await this.addressDropdown.selectOption({ index: 0 }); // Example of selecting an existing address
        } else {
            await this.useNewAddressRadio.check();
            if (addressdata) {
                await this.addressForm.fillAddressForm(addressdata);
            }
        }
    }

    async chooseDeliveryMethod(comment?: string): Promise<void> {
        if (await this.flatRateRadio.isVisible()) {
            await this.flatRateRadio.check();
        }
        if (comment) {
            await this.commentSection.fill(comment);
        }
    }

    async selectPaymentMethod(): Promise<void> {
        if (await this.cashOnDeliveryRadio.isVisible()) {
            await this.cashOnDeliveryRadio.check();
        }
        await this.termsCheckbox.check();
    }

    async confirmOrder(): Promise<void> {
        await this.confirmOrderButton.click();
        await this.orderConfirmationMessage.waitFor({ state: 'visible', timeout: 1000 }); // Wait for the confirmation message to be visible
    }

}