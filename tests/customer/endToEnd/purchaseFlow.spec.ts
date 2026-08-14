import {test, expect} from "../../../fixtures/customer.fixture"
import { CheckoutMessages } from "../../../constants/customer/messages";

test.describe("End to End Tests-Customer Purchase Flow", ()=> {
  test("Customer can place order successfully", async({homePage, myAccountPage, shoppingCartPage, checkoutPage, productPage})=> {
    
    const productName = "MacBook Air";

    await homePage.openHomePage();

    await myAccountPage.header.searchProduct(productName);

    const searchItem= await productPage.getProductByName(productName);
    await searchItem.clickProduct();

    const availability= await productPage.productDetails.getAvailability();
    console.log("availability: ", availability);
    if(availability === "In Stock"){
      await productPage.productDetails.addToCart();
    }

    const expectedMessage = `Success: You have added ${productName} to your shopping cart!`;
    await productPage.verifyProductAddedSuccessMessage(expectedMessage);
    await productPage.header.navigateToShoppingCart();
    
    await shoppingCartPage.updateQuantity(productName,"2");

    await shoppingCartPage.proceedToCheckout();

    await checkoutPage.fillBillingDetails();
    await checkoutPage.fillDeliveryDetails();
    await checkoutPage.chooseDeliveryMethod();
    await checkoutPage.selectPaymentMethod();
    await checkoutPage.confirmOrder();
    await checkoutPage.verifyOrderPlacedSuccessfully();

  })
})