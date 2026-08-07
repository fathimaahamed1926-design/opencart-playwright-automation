import { Locator, Page, expect } from "@playwright/test";
import { CustomerAccountBasePage } from "./CustomerAccountBasePage";

export class WishlistPage extends CustomerAccountBasePage {

    private readonly wishlistTable: Locator;
    private readonly continueButton: Locator;

    constructor(page: Page) {
        super(page);

        this.wishlistTable = page.locator('.table-responsive');

        this.continueButton = page.getByRole('link', { name: 'Continue' });
    }

    async verifyWishlistVisible() {
        await expect(this.wishlistTable).toBeVisible();
    }

    async clickContinue() {
        await this.continueButton.click();
    }

    async removeProduct(productName: string) {
        await this.page.locator('tr', { hasText: productName }).locator('.fa-trash').click();
    }

    async addProductToCart(productName: string) {
        await this.page.locator('tr', { hasText: productName }).locator('.fa-shopping-cart').click();
    }

    async verifyProductInWishlist(productName: string) {
        const productRow = this.page.locator('tr', { hasText: productName });
        await expect(productRow).toBeVisible();
    }

    async verifyProductNotInWishlist(productName: string) {
        const productRow = this.page.locator('tr', { hasText: productName });
        await expect(productRow).not.toBeVisible();
    } 

    async verifyWishlistEmpty() {
        const emptyMessage = this.page.locator('#content').getByText('Your wish list is empty.');
        await expect(emptyMessage).toBeVisible();
    }

}