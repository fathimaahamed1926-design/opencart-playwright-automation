import { expect } from "@playwright/test";
import { HomePage } from "../pages/customer/home/HomePage";
import { ProductPage } from "../pages/customer/product/ProductPage";
import { ShoppingCartPage } from "../pages/customer/cart/ShoppingCartPage";

export class PurchaseFlow {

    constructor(
        private readonly homePage: HomePage,
        private readonly productPage: ProductPage,
        private readonly shoppingCartPage: ShoppingCartPage
    ) {}

    async addProductToCheckout(productName: string) {

        await this.homePage.openHomePage();

        await this.homePage.header.searchProduct(productName);

        const product =
            await this.productPage.getProductByName(productName);

        await product.clickProduct();

        await this.productPage.productDetails.verifyProductIsInStock();

        await this.productPage.productDetails.addToCart();

        await this.productPage.header.navigateToShoppingCart();

        await this.shoppingCartPage.proceedToCheckout();
    }
}