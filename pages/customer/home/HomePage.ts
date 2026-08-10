import {Page, Locator, expect} from "@playwright/test";
import { BasePage } from "../../BasePage";
import { HeaderComponent } from "../../../components/customer/HeaderComponent";
import { FooterComponent } from "../../../components/customer/FooterComponent";
import { AlertComponent } from "../../../components/common/AlertComponent";

export class HomePage extends BasePage {

  readonly header: HeaderComponent;
  readonly footer: FooterComponent;
  readonly alert: AlertComponent;

  constructor(page: Page) {
    super(page);  // use the parent class constructor to initialize the page property

    this.header = new HeaderComponent(page);
    this.footer = new FooterComponent(page);
    this.alert = new AlertComponent(page);
  }

  async openHomePage(): Promise<void> {
    await this.openCustomerAppPortal();
  }

  async verifyHomePageLoaded(): Promise<void> {
    await this.verifyPageTitle('Your Store');
    await this.verifyURLContains('route=common/home');
  }

}