import { Locator, Page } from '@playwright/test';

export class AccountMenuComponent {

    private readonly page: Page;

    private readonly loginLink: Locator;
    private readonly registerLink: Locator;
    private readonly forgottenPasswordLink: Locator;
    private readonly myAccountLink: Locator;
    private readonly addressBookLink: Locator;
    private readonly wishListLink: Locator;
    private readonly orderHistoryLink: Locator;
    private readonly downloadsLink: Locator;
    private readonly recurringPaymentsLink: Locator;
    private readonly rewardPointsLink: Locator;
    private readonly returnsLink: Locator;
    private readonly transactionsLink: Locator;
    private readonly newsletterLink: Locator;

    constructor(page: Page) {

        this.page = page;

        const accountMenu = page.locator('#column-right');

        this.loginLink = accountMenu.getByRole('link', { name: 'Login' });

        this.registerLink = accountMenu.getByRole('link', { name: 'Register' });

        this.forgottenPasswordLink = accountMenu.getByRole('link', {name: 'Forgotten Password'});

        this.myAccountLink = accountMenu.getByRole('link', { name: 'My Account'});

        this.addressBookLink = accountMenu.getByRole('link', { name: 'Address Book'});

        this.wishListLink = accountMenu.getByRole('link', { name: 'Wish List'});

        this.orderHistoryLink = accountMenu.getByRole('link', {name: 'Order History'});

        this.downloadsLink = accountMenu.getByRole('link', {  name: 'Downloads'});

        this.recurringPaymentsLink = accountMenu.getByRole('link', {  name: 'Recurring payments'});

        this.rewardPointsLink = accountMenu.getByRole('link', {  name: 'Reward Points'});

        this.returnsLink = accountMenu.getByRole('link', {name: 'Returns'});

        this.transactionsLink = accountMenu.getByRole('link', {name: 'Transactions'});

        this.newsletterLink = accountMenu.getByRole('link', {name: 'Newsletter'});

    }

    async openLogin(): Promise<void> {
        await this.loginLink.click();
    }

    async openRegister(): Promise<void> {
        await this.registerLink.click();
    }

    async openForgottenPassword(): Promise<void> {
        await this.forgottenPasswordLink.click();
    }

    async openMyAccount(): Promise<void> {
        await this.myAccountLink.click();
    }

    async openAddressBook(): Promise<void> {
        await this.addressBookLink.click();
    }

    async openWishList(): Promise<void> {
        await this.wishListLink.click();
    }

    async openOrderHistory(): Promise<void> {
        await this.orderHistoryLink.click();
    }

    async openDownloads(): Promise<void> {
        await this.downloadsLink.click();
    }

    async openRecurringPayments(): Promise<void> {
        await this.recurringPaymentsLink.click();
    }

    async openRewardPoints(): Promise<void> {
        await this.rewardPointsLink.click();
    }

    async openReturns(): Promise<void> {
        await this.returnsLink.click();
    }

    async openTransactions(): Promise<void> {
        await this.transactionsLink.click();
    }

    async openNewsletter(): Promise<void> {
        await this.newsletterLink.click();
    }

}