import {test} from "../../../fixtures/testData/registration.fixture"
import { PurchaseFlow } from "../../../flows/PurchaseFlow"

test.describe("Guest End to End tests", ()=> {
  
  const productName = "MacBook Pro"

  test("Guest user can place order successfully without registering a new account", async({checkoutPage, homePage, productPage, shoppingCartPage,randomRegistrationData })=> {
    
    const purchaseFlow = new PurchaseFlow(homePage, productPage, shoppingCartPage);

    await purchaseFlow.addProductToCheckout(productName);

    await checkoutPage.checkoutAsNewCustomerViaGuestCheckout(randomRegistrationData);

    await checkoutPage.verifyOrderPlacedSuccessfully();
    
  })

  test.only("Guest user can place order successfully while registering a new account", async({checkoutPage, homePage, productPage, shoppingCartPage,randomRegistrationData })=> {
    
    const purchaseFlow = new PurchaseFlow(homePage, productPage, shoppingCartPage);

    await purchaseFlow.addProductToCheckout(productName);

    await checkoutPage.checkoutAsNewCustomerViaRegisterAccount(randomRegistrationData);

    await checkoutPage.verifyOrderPlacedSuccessfully();
    
  })
})