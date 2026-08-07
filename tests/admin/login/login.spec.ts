import { LoginMessages } from "../../../constants/admin/messages";
import { test } from "../../../fixtures/admin.fixture";
import { LoginAttemptHelper } from "../../../utils/database/LoginAttemptHelper";
import { DataProvider } from "../../../utils/dataProvider";
const loginData = DataProvider.getTestDataFromJSON("testdata/admin/adminLoginData.json");

test.describe("Admin Login with valid & invalid credentials", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
    await LoginAttemptHelper.clearAttempts("wronguser");
  });

  test("Admin can login with valid credentials", async ({ loginPage, dashboardPage }) => {
    await loginPage.login(loginData.validUser);
    await dashboardPage.verifyDashboardLoaded();
  });

  test("Admin cannot login with invalid password", async ({ loginPage }) => {
    await loginPage.login(loginData.invalidPassword);
    await loginPage.alert.verifyErrorMessage(LoginMessages.INVALID_CREDENTIALS);
  });

  test("Admin cannot login with invalid user", async ({ loginPage }) => {
    await loginPage.login(loginData.invalidUser);
    await loginPage.alert.verifyErrorMessage(LoginMessages.INVALID_CREDENTIALS);
  });

  test("Admin cannot login with invalid user and password", async ({ loginPage }) => {
    await loginPage.login(loginData.invalidCredentials);
    await loginPage.alert.verifyErrorMessage(LoginMessages.INVALID_CREDENTIALS);
  });

})

test.describe("Record Admin Login attempts with Invalid credentails", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
    await LoginAttemptHelper.clearAttempts("wronguser");
  });

  test("Invalid Login attempts are recorded in database", async ({ loginPage }) => {
    await loginPage.login(loginData.invalidCredentials);
    await LoginAttemptHelper.verifyAttempts("wronguser", 1);
  });

  test("Multiple Invalid Login attempts are recorded in database", async ({ loginPage }) => {
    for (let i = 0; i < 3; i++) {
      await loginPage.login(loginData.invalidCredentials);
    }
    await LoginAttemptHelper.verifyAttempts("wronguser", 3);
  });

  test("Admin login is blocked after 5 invalid login attempts", async ({ loginPage }) => {
    for(let i=0; i <5; i++) {
      await loginPage.login(loginData.invalidCredentials);
    }
    await LoginAttemptHelper.verifyAttempts("wronguser", 5);
    await loginPage.login(loginData.invalidCredentials);  //6th attempt
    await loginPage.alert.verifyErrorMessage(LoginMessages.EXCEEDED_ATTEMPTS);  //on 6th attempt, warning message should display

  });

})


