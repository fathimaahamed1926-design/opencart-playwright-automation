import { test } from "../../../fixtures/customer.fixture";


test.describe("End to End Tests-Customer Purchase Flow", () => {
  test("Customer can place order successfully", async ({ purchaseFlow }) => {

    const productName = "MacBook Air";

    await purchaseFlow.addProductToCart(productName);

    await purchaseFlow.navigateToShoppingCart();

    await purchaseFlow.updateShoppingCart(productName,"2")

    await purchaseFlow.proceedToCheckout();

    await purchaseFlow.fillCheckoutDetailsAndConfirmOrder();

    await purchaseFlow.verifyOrderPlaced();

  })
})