import { HomePage } from "../pages/customer/home/HomePage";
import { ProductPage } from "../pages/customer/product/ProductPage";
import { ShoppingCartPage } from "../pages/customer/cart/ShoppingCartPage";
import { CheckoutPage } from "../pages/customer/cart/CheckoutPage";

export class PurchaseFlow {

    constructor(
        private readonly homePage: HomePage,
        private readonly productPage: ProductPage,
        private readonly shoppingCartPage: ShoppingCartPage,
        private readonly checkoutPage: CheckoutPage
    ) { }

    async addProductToCart(productName: string) {

        await this.homePage.openHomePage();

        await this.homePage.header.searchProduct(productName);

        const product = await this.productPage.getProductByName(productName);

        await product.clickProduct();

        await this.productPage.productDetails.addToCartIfProductIsAvailable();

        await this.productPage.verifyProductAddedSuccessMessage(productName);

    }

    async navigateToShoppingCart() {
        await this.productPage.header.navigateToShoppingCart();
    }

    async updateShoppingCart(productName: string, updateQuantity: string) {
        await this.shoppingCartPage.updateQuantity(productName, updateQuantity);
    }

    async proceedToCheckout() {
        await this.shoppingCartPage.proceedToCheckout();
        await this.checkoutPage.verifyCheckoutPageLoaded();
    }

    async fillCheckoutDetailsAndConfirmOrder() {
        await this.checkoutPage.fillBillingDetails();
        await this.checkoutPage.fillDeliveryDetails();
        await this.checkoutPage.chooseDeliveryMethod();
        await this.checkoutPage.selectPaymentMethod();
        await this.checkoutPage.confirmOrder();
    }

    async verifyOrderPlaced() {
        await this.checkoutPage.verifyOrderPlacedSuccessfully();
    }

    async placeReturningCustomerOrder(productName: string, updateQuantity?: string) {
        await this.addProductToCart(productName);
        await this.navigateToShoppingCart();
        if (updateQuantity) {
            await this.updateShoppingCart(productName, updateQuantity);
        }
        await this.proceedToCheckout();
        await this.fillCheckoutDetailsAndConfirmOrder();
        await this.verifyOrderPlaced();
    }
}