import { test } from "../../../fixtures/testData/registration.fixture"
import { PurchaseFlow } from "../../../flows/PurchaseFlow"

test.describe("Guest End to End tests", () => {

  const productName = "MacBook Pro"

  test("Guest user can place order successfully without registering a new account", async ({ checkoutPage, randomRegistrationData, purchaseFlow }) => {

    await purchaseFlow.addProductToCart(productName);

    await purchaseFlow.navigateToShoppingCart();

    await purchaseFlow.proceedToCheckout();

    await checkoutPage.checkoutAsNewCustomerViaGuestCheckout(randomRegistrationData);

    await checkoutPage.verifyOrderPlacedSuccessfully();

  })

  test("Guest user can place order successfully while registering a new account", async ({ checkoutPage, randomRegistrationData, purchaseFlow }) => {

    await purchaseFlow.addProductToCart(productName);

    await purchaseFlow.navigateToShoppingCart();

    await purchaseFlow.proceedToCheckout();

    await checkoutPage.checkoutAsNewCustomerViaRegisterAccount(randomRegistrationData);

    await checkoutPage.verifyOrderPlacedSuccessfully();

  })
})