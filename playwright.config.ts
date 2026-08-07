import { defineConfig, devices } from '@playwright/test';
import process, { env } from 'process';
import dotenv from 'dotenv';
import path from 'path';
import { Env } from './utils/environment';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
const ENV=process.env.ENV ?? 'local';  // input ENV variable to specify which .env file to use, default is .env.local
dotenv.config({ path : path.resolve(__dirname,'env', `.env.${ENV}`) }); // Load environment variables from the specified .env file based on the ENV variable, path.resolve(__dirname) implies absolute path to the current directory, ensuring the correct .env file is loaded regardless of where the script is executed from
Env.validate(); // Validate that all required environment variables are set, if any required variable is missing, an error will be thrown with a clear message indicating which variable is missing, preventing the tests from running with incomplete configuration


/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html'], ['allure-playwright']],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  globalSetup: require.resolve('./utils/globalSetUp'), // Specify the path to the global setup file, which will be executed before any tests run, allowing you to perform tasks like checking if the server is up or setting up test data
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    viewport: { width: 1280, height: 720 }, // Set default viewport size for consistency
    ignoreHTTPSErrors: true, // Ignore SSL errors if necessary
    permissions: ['geolocation'], // Set necessary permissions for geolocation-based tests
  },

  //grep : /@master/,

  /* Configure projects for major browsers */
  projects: [
  // =========================================================
  // Authentication Setup Projects
  // =========================================================
    //Customer Authentication Setup
    {
      name: 'customer-setup',
      testMatch: /.*customer\.setup\.ts/,
    },
    /*Admin Authentication Setup - session authentication didn't work for admin logins as it involves sessions that are tightly bound to a dynamic user_token parameter in the URL
    {
      name: 'admin-setup',
      testMatch: /.*admin\.setup\.ts/,  
    },*/
  // =========================================================
  // Test Projects
  // =========================================================
    //Customer Portal
    {
      name: 'customer',
      testDir: './tests/customer',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: process.env.BASE_URL, // Set the base URL for customer tests, allowing you to use relative URLs in your test cases, and making it easy to switch between different environments by changing the value in the .env file
        storageState: 'playwright/.auth/customer.json', // Use the stored authentication state for customer tests, allowing you to run tests as an authenticated user without needing to log in each time
      },
      dependencies: ['customer-setup'], // Ensure that the customer setup tests run before the customer tests, allowing you to set up necessary authentication state or test data before running the main tests
    },
    //Admin Portal
    {
      name: 'admin',
      testDir: './tests/admin',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: process.env.ADMIN_URL,
        storageState: 'playwright/.auth/admin.json',
      },
      //dependencies: ['admin-setup'],
    },
    //Guest Portal (public website)
    {
      name: 'guest',
      testDir: './tests/guest' ,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: process.env.BASE_URL,
      },
    },
    /*{
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], 
       },
    },

    /*{
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    }*/

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
