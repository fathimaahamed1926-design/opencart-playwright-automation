import { test} from "../../../fixtures/testData/registration.fixture"

test.describe("Registration flow of a new cusstomer", () => {
  test("New customer can register a new account", async ({ registerPage, randomRegistrationData, myAccountPage, homePage, loginPage }) => {

    await registerPage.open();
    await registerPage.verifyRegisterPageLoaded();

    const firstName = randomRegistrationData.firstName;
    const lastName = randomRegistrationData.lastName;
    const email = randomRegistrationData.email;
    const telephone = randomRegistrationData.telephone;
    const password = randomRegistrationData.password;
    const passwordConfirm = password;

    await registerPage.setFirstName(firstName);
    await registerPage.setLastName(lastName);
    await registerPage.setEmail(email);
    await registerPage.setTelephone(telephone);
    await registerPage.setPassword(password);
    await registerPage.setPasswordConfirm(passwordConfirm);

    await registerPage.subscribeNewsletter(false);
    await registerPage.registerForm.checkPrivacyPolicy(true);

    await registerPage.customerAccount.customerFormActions.clickContinueButton();

    await myAccountPage.verifyAccountCreatedSuccessfully();
    await myAccountPage.clickContinueButton();
    await myAccountPage.verifyPageLoaded();

    await myAccountPage.customerAccount.header.clickLogout();
    await myAccountPage.clickContinueButton();

    await homePage.verifyHomePageLoaded();

    await homePage.header.clickLogin();
    await loginPage.login(email,password);

    await myAccountPage.verifyPageLoaded();

  })
})