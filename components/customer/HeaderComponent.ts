import { Locator, Page } from '@playwright/test';

export class HeaderComponent {

    private readonly page: Page;

    private readonly logo: Locator;
    //private readonly myAccountMenu: Locator;
    private readonly myAccountLink: Locator;
    private readonly orderHistoryLink: Locator;
    private readonly downloadsLink: Locator;
    private readonly transactionsLink: Locator;
    private readonly logoutLink: Locator;
    private readonly loginLink: Locator;
    private readonly registerLink: Locator;
    private readonly wishlistLink: Locator;
    private readonly shoppingCartLink: Locator;
    private readonly checkoutLink: Locator;
    private readonly searchInput: Locator;
    private readonly searchButton: Locator;
    private readonly currencyButton: Locator;

    constructor(page: Page) {

        this.page = page;

        this.logo = page.getByRole('link', { name: 'Your Store' });

        //this.myAccountMenu = page.locator('#top-links .dropdown-toggle').filter({ hasText: /My Account/ });

        const topLinks = page.locator('#top-links');

        this.myAccountLink = topLinks.locator('.dropdown-toggle').filter({ hasText: /My Account/ });

        this.downloadsLink = page.getByRole('link', { name: 'Downloads' });

        this.transactionsLink = page.getByRole('link', { name: 'Transactions' });

        this.logoutLink = page.getByRole('link', { name: 'Logout' });

        this.wishlistLink = topLinks.locator('#wishlist-total');

        this.shoppingCartLink = topLinks.getByTitle('Shopping Cart');

        this.checkoutLink = topLinks.getByTitle('Checkout');

        this.loginLink = page.getByRole('link', { name: 'Login' });

        this.registerLink = page.getByRole('link', { name: 'Register' });

        this.orderHistoryLink = page.getByRole('link', { name: 'Order History' });

        this.searchInput = page.getByRole('textbox', { name: 'Search' });

        this.searchButton = page.locator('#search').getByRole('button');

        this.currencyButton = page.getByRole('button', { name: /Currency/ });

    }

    async clickLogo(): Promise<void> {
        await this.logo.click();
    }

    async openMyAccountMenu(): Promise<void> {
        await this.myAccountLink.click();
    }

    async clickLogin(): Promise<void> {
        await this.openMyAccountMenu();
        await this.loginLink.click();
    }

    async clickRegister(): Promise<void> {
        await this.openMyAccountMenu();
        await this.registerLink.click();
    }

    async clickLogout(): Promise<void> {
        await this.openMyAccountMenu();
        await this.logoutLink.click();
    }

    async clickMyAccount(): Promise<void> {
        await this.openMyAccountMenu();
        await this.myAccountLink.click();
    }

    async clickOrderHistory(): Promise<void> {
        await this.openMyAccountMenu();
        await this.orderHistoryLink.click();
    }

    async clickDownloads(): Promise<void> {
        await this.openMyAccountMenu();
        await this.downloadsLink.click();
    }

    async clickTransactions(): Promise<void> {
        await this.openMyAccountMenu();
        await this.transactionsLink.click();
    }

    async searchProduct(productName: string): Promise<void> {
        await this.searchInput.fill(productName);
        await this.searchButton.click();
    }

    async navigateToShoppingCart(): Promise<void> {
        await this.shoppingCartLink.click();
    }

    async navigateToCheckout(): Promise<void> {
        await this.checkoutLink.click();
    }

    async navigateToWishlist(): Promise<void> {
        await this.wishlistLink.click();
    }

    async changeCurrency(currency: string): Promise<void> {

        await this.currencyButton.click();

        const currencyOption = this.page.getByRole('button', {
            name: currency
        });

        await currencyOption.click();
    }

}