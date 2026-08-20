import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../../BasePage';
import { CustomerAccountBasePage } from './CustomerAccountBasePage';
import { EditAccountPage } from './EditAccountPage';
import { MyAccountMessages } from '../../../constants/customer/messages';

export class MyAccountPage extends BasePage {

  readonly customerAccount: CustomerAccountBasePage;

  private readonly heading: Locator;

  // My Account section
  private readonly editAccountInformationLink: Locator;
  private readonly changePasswordLink: Locator;
  private readonly modifyAddressBookLink: Locator;
  private readonly modifyWishlistLink: Locator;
  private readonly accountCreationSuccessMessage:Locator;
  private readonly accountContinueButton:Locator;

  // Orders
  private readonly orderHistoryLink: Locator;
  private readonly downloadsLink: Locator;
  private readonly rewardPointsLink: Locator;
  private readonly returnRequestsLink: Locator;
  private readonly transactionsLink: Locator;
  private readonly recurringPaymentsLink: Locator;

  // Affiliate
  private readonly affiliateRegistrationLink: Locator;

  // Newsletter
  private readonly subscribeNewsletterLink: Locator;

  constructor(page: Page) {

    super(page);

    this.customerAccount=new CustomerAccountBasePage(page);

    this.heading = page.locator('#content').getByRole('heading', { name: 'My Account' });

    this.accountCreationSuccessMessage = page.locator('#content').getByRole('heading', {name: 'Your Account Has Been Created!'});

    this.accountContinueButton = page.getByRole('link', {name: 'Continue'});

    // === My Account ===

    this.editAccountInformationLink = page.getByRole('link', { name: 'Edit your account information' });

    this.changePasswordLink = page.getByRole('link', { name: 'Change your password' });

    this.modifyAddressBookLink = page.getByRole('link', { name: 'Modify your address book' });

    this.modifyWishlistLink = page.getByRole('link', { name: 'Modify your wish list' });

    // === Orders ===

    this.orderHistoryLink = page.getByRole('link', { name: 'View your order history' });

    this.downloadsLink = page.locator('#content').getByRole('link', { name: 'Downloads' });

    this.rewardPointsLink = page.getByRole('link', { name: 'Your Reward Points' });

    this.returnRequestsLink = page.getByRole('link', { name: 'View your return requests' });

    this.transactionsLink = page.getByRole('link', { name: 'Your Transactions' });

    this.recurringPaymentsLink = page.getByRole('link', { name: 'Recurring payments' });

    // === Affiliate ===

    this.affiliateRegistrationLink = page.getByRole('link', { name: 'Register for an affiliate' });

    // === Newsletter ===

    this.subscribeNewsletterLink = page.getByRole('link', { name: 'Subscribe / unsubscribe to newsletter' });
  }

  async verifyPageLoaded(): Promise<void> {
    await expect(this.heading).toBeVisible();
  }

  async openEditAccountInformation() : Promise<EditAccountPage> {
    await this.editAccountInformationLink.click();
    return new EditAccountPage(this.page);
  }

  async openChangePassword() {
    await this.changePasswordLink.click();
  }

  async openAddressBook() {
    await this.modifyAddressBookLink.click();
  }

  async openWishlist() {
    await this.modifyWishlistLink.click();
  }

  async openOrderHistory() {
    await this.orderHistoryLink.click();
  }

  async openDownloads() {
    await this.downloadsLink.click();
  }

  async openRewardPoints() {
    await this.rewardPointsLink.click();
  }

  async openReturnRequests() {
    await this.returnRequestsLink.click();
  }

  async openTransactions() {
    await this.transactionsLink.click();
  }

  async openRecurringPayments() {
    await this.recurringPaymentsLink.click();
  }

  async openAffiliateRegistration() {
    await this.affiliateRegistrationLink.click();
  }

  async openNewsletterSubscription() {
    await this.subscribeNewsletterLink.click();
  }

  async verifyAccountCreatedSuccessfully() {
    await this.accountCreationSuccessMessage.waitFor({state:'visible', timeout:1000});
    await this.verifyURLContains('route=account/success');
  }

  async clickContinueButton(){
    await this.accountContinueButton.waitFor({state:'visible', timeout:1000});
    await this.accountContinueButton.click();
  }

}