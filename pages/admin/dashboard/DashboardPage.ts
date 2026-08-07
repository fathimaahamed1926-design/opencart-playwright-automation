import {Page, Locator, expect} from "@playwright/test"
import { AdminBasePage } from "../AdminBasePage";

export class DashboardPage extends AdminBasePage {
  private readonly dashboardHeading: Locator;
  private readonly totalOrdersValue: Locator;
  private readonly totalSalesValue: Locator;
  private readonly totalCustomersValue: Locator;
  private readonly peopleOnlineValue: Locator;

  constructor(page: Page) {
    super(page);
    this.dashboardHeading = page.getByRole('heading', { name: 'Dashboard' });
    this.totalOrdersValue = page.locator(".tile-primary").filter({ hasText: "TOTAL ORDERS" }).locator("h2");
    this.totalSalesValue = page.locator(".tile-primary").filter({ hasText: "TOTAL SALES" }).locator("h2");
    this.totalCustomersValue = page.locator(".tile-primary").filter({ hasText: "TOTAL CUSTOMERS" }).locator("h2");
    this.peopleOnlineValue = page.locator(".tile-primary").filter({ hasText: "PEOPLE ONLINE" }).locator("h2");
  }

  async open(): Promise<void> {
    await this.page.goto("");
  }

  async verifyDashboardLoaded(){
    await this.verifyURLContains("route=common/dashboard");
    await expect(this.dashboardHeading).toBeVisible();
  }

  async getTotalOrders(){
    return (this.getNumber(this.totalOrdersValue));
  }

  async getTotalSales() {
    return (this.getNumber(this.totalSalesValue));
  }

  async getTotalCustomers() {
    return (this.getNumber(this.totalCustomersValue));
  }

  async getPeopleOnline() {
    return (this.getNumber(this.peopleOnlineValue));
  }

}