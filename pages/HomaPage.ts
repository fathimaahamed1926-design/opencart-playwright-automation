import {Page, Locator, expect} from "@playwright/test";
import {TestConfig} from "../test.config";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {

  readonly logo: Locator;
  readonly myAccountLink: Locator;
  readonly loginLink: Locator;
  readonly registerLink: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly cartButton: Locator;
  readonly checkoutLink: Locator;
  readonly wishlistButton: Locator;
  readonly currencyButton: Locator;
  readonly aboutUsLink: Locator;
  readonly contactUsLink: Locator;
  readonly returnsLink: Locator;    
  readonly orderHistoryLink: Locator;
  readonly newsletterLink: Locator;
  readonly footerLinks: Locator;

  constructor(page: Page) {
    super(page);  // use the parent class constructor to initialize the page property

    this.logo = page.getByRole('link', { name: 'Your Store' });
    this.myAccountLink = page.getByRole('link', { name: /My Account/ });
    this.loginLink = page.getByRole('link', { name: 'Login' });
    this.registerLink = page.locator('#top-links').getByRole('link', { name: 'Register' });
    this.searchInput = page.getByRole('textbox', { name: 'Search' });
    this.searchButton = page.locator('#search').getByRole('button');
    this.cartButton = page.getByRole('link', { name: /Shopping Cart/ });
    this.checkoutLink = page.getByRole('link', { name: /Checkout/ });
    this.currencyButton = page.getByRole('button', { name: 'Currency' });
    this.wishlistButton = page.getByRole('link', { name: /Wish List/ });
    this.aboutUsLink = page.getByRole('link', { name: 'About Us' });
    this.contactUsLink = page.getByRole('link', { name: 'Contact Us' });
    this.returnsLink = page.getByRole('link', { name: 'Returns' });
    this.orderHistoryLink = page.getByRole('link', { name: 'Order History' });
    this.newsletterLink = page.getByRole('link', { name: 'Newsletter' });
    this.footerLinks = page.getByText('Powered By OpenCart Your');
  }

  async navigateToHomePage() : Promise<void> {
    await this.page.goto(TestConfig.appUrl);
  }

  async openMyAccountMenu() : Promise<void> {
    await this.myAccountLink.click();
  }

  async navigateToLogin() : Promise<void> {
    await this.openMyAccountMenu();
    await this.loginLink.click();
  }

  async navigateToRegister() : Promise<void> {
    await this.openMyAccountMenu();
    await this.registerLink.click();
  }

  async searchProduct(productName:string) : Promise<void> {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }

  async navigateToCart() : Promise<void> {
    await this.cartButton.click();
  }

  async navigateToCheckout() : Promise<void> {
    await this.checkoutLink.click();
  }

  async changeCurrency(currency:string) : Promise<void> {
    await this.currencyButton.click();
    const currencyOption = this.page.getByRole('button', { name: currency });
    await currencyOption.click();
  }
  
  async navigateToWishlist() : Promise<void> {
    await this.wishlistButton.click();
  }   

  async navigateToAboutUs() : Promise<void> {
    await this.aboutUsLink.click();
  }

  async navigateToContactUs() : Promise<void> {
    await this.contactUsLink.click();
  }

  async navigateToReturns() : Promise<void> {
    await this.returnsLink.click();
  }

  async navigateToOrderHistory() : Promise<void> {
    await this.orderHistoryLink.click();
  }

  async navigateToNewsletter() : Promise<void> {
    await this.newsletterLink.click();
  } 

}   

