import {test, expect} from "../../../fixtures/testData/address.fixture"
import { RandomDataGenerator } from "../../../utils/randomDataGenerator";
test.describe("End-to-End tests related to address book page", ()=>{
  test("customer can add, edit and delete address from Address Book page", async({homePage,myAccountPage,addressBookPage,billingInfo,registerAddressForCleanup})=>{
     
     await homePage.openHomePage();
     await myAccountPage.customerAccount.header.clickMyAccount();
     await myAccountPage.openAddressBook();

     //adding new address
     await addressBookPage.addNewAddress(billingInfo,false);
     registerAddressForCleanup(billingInfo);
     
     await addressBookPage.verifyAddressAddedSuccessMessage();
     await addressBookPage.verifyAddressExists(billingInfo);

     //editing existing address
     const oldAddress = billingInfo.address1;
     const newAddress = RandomDataGenerator.generateRandomAddressDetails();
     await addressBookPage.editExistingAddress(newAddress,false,oldAddress);
     registerAddressForCleanup(newAddress);
     await addressBookPage.verifyAddressUpdatedSuccessMessage();
     await addressBookPage.verifyAddressExists(newAddress);

     //deleting address
     const addressToDelete = newAddress.address1
     await addressBookPage.deleteAddress(addressToDelete);
     await addressBookPage.verifyAddressDoesnotExist(addressToDelete); 

  })
})