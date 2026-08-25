import { Locator, Page, expect } from "@playwright/test";
import { CustomerAccountBasePage } from "./CustomerAccountBasePage";
import { WishListMessages } from "../../../constants/customer/messages";

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

    private getProductRow(productName:string):Locator {
        return this.page.locator('tr', { has: this.page.getByRole('link', {name:productName, exact:true})});
    }

    async removeProduct(productName: string) {
        await this.getProductRow(productName).locator("a[data-original-title='Remove']").click();
    }

    async addProductToCart(productName: string) {
        await this.getProductRow(productName).locator('.fa-shopping-cart').click();
    }

    async verifyProductInWishlist(productName: string) {
        const productRow = this.getProductRow(productName);
        await expect(productRow).toBeVisible();
    }

    async verifyProductNotInWishlist(productName: string) {
        const productRow = this.getProductRow(productName);
        await expect(productRow).not.toBeVisible();
    } 

    async verifyWishlistEmpty() {
        const emptyMessage = this.page.locator('#content').getByText('Your wish list is empty.');
        await expect(emptyMessage).toBeVisible();
    }

    async verifyWishlistModifiedSuccessMessage() {
        this.alert.verifySuccessMessage(WishListMessages.WISHLIST_MODIFIED);
    }

}