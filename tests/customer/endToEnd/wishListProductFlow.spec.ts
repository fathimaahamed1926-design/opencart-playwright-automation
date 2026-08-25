import {test} from "../../../fixtures/customer.fixture"
test.describe("end to end tests related to wish list", ()=> {
  test("customer can add and remove a product to or from wishlist", async({homePage, myAccountPage, productPage, wishListPage})=> {
    const productName="MacBook"
    await homePage.openHomePage();
    await myAccountPage.customerAccount.header.searchProduct(productName);
    const product= await productPage.getProductByName(productName);
    await product.addToWishList();
    await productPage.verifyWishlistAddedSuccessMessage(productName);
    await myAccountPage.customerAccount.header.navigateToWishlist();
    await wishListPage.verifyWishlistVisible();
    await wishListPage.verifyProductInWishlist(productName);
    await wishListPage.removeProduct(productName);
    await wishListPage.verifyWishlistModifiedSuccessMessage();
    await wishListPage.verifyProductNotInWishlist(productName);
    await wishListPage.clickContinue();
    await myAccountPage.verifyPageLoaded();
  })
})