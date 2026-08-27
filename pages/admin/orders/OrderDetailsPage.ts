import {Page,Locator,expect} from "@playwright/test";
import { AdminBasePage } from "../AdminBasePage";

export class OrderDetailsPage extends AdminBasePage {
  private readonly orderHeading: Locator;
  private readonly customerDetailsPanel: Locator;
  private readonly customerName: Locator;
  private readonly customerEmail: Locator;

  private readonly orderPanel:Locator;
  private readonly productTable: Locator;
  private readonly productRows: Locator;

  constructor(page: Page) {
    super(page);

    this.orderHeading = page.getByRole("heading", { name: /Order \(#\d+\)/});  //#d+ --> regex expression, #->starts with #, d-->then any digits from 0-9, + --> one or more digits (simply means Order (#some number)) 
    this.customerDetailsPanel = page.locator("div.panel-default").filter({hasText: "Customer Details"});
    this.customerName = this.customerDetailsPanel.locator("a[href*='route=customer/customer/edit']");
    this.customerEmail = this.customerDetailsPanel.locator("a[href^='mailto:']");

    this.orderPanel = page.locator("div.panel-default").filter({hasText: /Order \(#\d+\)/});
    this.productTable = this.orderPanel.locator("table").filter({hasText:"Product"});
    this.productRows = this.productTable.locator("tbody tr");
  }

  async verifyOrderDetailsPageLoaded(): Promise<void> {
    await expect(this.orderHeading).toBeVisible();
  }

  async getCustomerName():Promise<string> {
    return (await this.customerName.innerText()).trim();
  }

  async getCustomerEmail(): Promise<string> {
    return (await this.customerEmail.innerText()).trim();
  }

  private getProductRow(productName:string): Locator {
    return (this.productRows.filter({hasText:productName}));
  }

  async getProductName(productName:string): Promise<string> {
    return (await this.getProductRow(productName).locator("td").nth(0).innerText()).trim();
  }

  async getProductQuantity(productName:string): Promise<number> {
    const quantity = (await this.getProductRow(productName).locator("td").nth(2).innerText()).trim();
    return Number(quantity);
  }

}