import { Page, Locator, expect } from "@playwright/test"
import { AdminBasePage } from "../AdminBasePage"
import { OrderFilter } from "../../../types/types"

export class OrdersPage extends AdminBasePage {
  private readonly orderTable: Locator;
  private readonly orderRows: Locator;

  private readonly addNewOrderButton: Locator;
  private readonly printShippingButton: Locator;
  private readonly printInvoiceButton: Locator;
  private readonly orderIdInput: Locator;
  private readonly customerInput: Locator;
  private readonly orderStatusDropdown: Locator;
  private readonly totalInput: Locator;
  private readonly dateAddedInput: Locator;
  private readonly dateModifiedInput: Locator;
  private readonly filterButton: Locator;

  private readonly editOrderButton: Locator;
  private readonly deleteOrderButton: Locator;
  private readonly pageForwardButton: Locator;

  constructor(page: Page) {
    super(page);

    this.orderTable = page.locator(".table-responsive table");
    this.orderRows = page.locator("table tbody tr");

    this.printShippingButton= page.locator('#button-shipping');
    this.printInvoiceButton = page.locator('#button-invoice');
    this.addNewOrderButton = page.locator("a[data-original-title='Add New']");

    this.orderIdInput = page.locator("input[name='filter_order_id']");
    this.customerInput = page.locator("input[name='filter_customer']");
    this.orderStatusDropdown = page.locator("select[name='filter_order_status']");
    this.totalInput = page.locator("input[name='filter_total']");
    this.dateAddedInput = page.locator("input[name='filter_date_added']");
    this.dateModifiedInput = page.locator("input[name='filter_date_modified']");
    this.filterButton = page.locator("button#button-filter");

    this.editOrderButton = page.getByRole('link', { name: /Edit/i });
    this.deleteOrderButton = page.getByRole('link', { name: /Delete/i });
    this.pageForwardButton = page.getByRole('link', { name: '>', exact: true });
  }

  private getOrderIdCell(orderId: string): Locator {
    return this.page.getByRole('cell', { name: orderId, exact: true });
  }

  private getOrderIdRow(orderId: string): Locator {
    return this.getOrderIdCell(orderId).locator("xpath=ancestor::tr");
  }

  private getCheckbox(orderId: string) : Locator {
    return this.getOrderIdRow(orderId).locator(("input[type='checkbox']"));
  }

  private getViewButton(orderId: string) : Locator {
    return this.getOrderIdRow(orderId).locator("a[data-original-title='View']");
  }

  private getDropDownToggleButton(orderId: string) : Locator {
    return this.getOrderIdRow(orderId).locator("button[data-toggle='dropdown']");
  }

  private getCell(orderId:string, columnIndex:number):Locator{
    return this.getOrderIdRow(orderId).locator("td").nth(columnIndex);
  }

  async getCustomer(orderId: string): Promise<string> {
    return await this.getText(this.getCell(orderId, 2));
  }

  async getStatus(orderId: string): Promise<string> {
    return await this.getText(this.getCell(orderId, 3));
  }

  async getTotal(orderId: string): Promise<number> {
    return await this.getNumber(this.getCell(orderId, 4));
  }

  async getDateAdded(orderId: string): Promise<string> {
    return await this.getText(this.getCell(orderId, 5));
  }

  async getDateModified(orderId: string): Promise<string> {
    return await this.getText(this.getCell(orderId, 6));
  }

  async editOrder(orderId: string) {
    await this.getDropDownToggleButton(orderId).click();
    await this.editOrderButton.click();
  }

  async deleteOrder(orderId: string) {
    await this.getDropDownToggleButton(orderId).click();
    await this.deleteOrderButton.click();
  }

  async printShippingList(orderId: string) {
    await this.getCheckbox(orderId).check();
    await this.printShippingButton.click();
  }

  async printInvoice(orderId:string) {
    await this.getCheckbox(orderId).check();
    await this.printInvoiceButton.click();
  }

  async viewOrder(orderId: string) {
    await this.getViewButton(orderId).click();
  }

  async filterOrders(filterOptions: OrderFilter) {
    if(filterOptions.orderId !== undefined){
    await this.orderIdInput.fill(filterOptions.orderId);
    }
    if(filterOptions.customer !== undefined){
      await this.customerInput.fill(filterOptions.customer);
    }
    if(filterOptions.orderStatus !== undefined){
      await this.orderStatusDropdown.selectOption(filterOptions.orderStatus);
    }
    if(filterOptions.total !== undefined) {
      await this.totalInput.fill(filterOptions.total.toString());
    }
    if(filterOptions.dateAdded !== undefined) {
      await this.dateAddedInput.fill(filterOptions.dateAdded);
    }
    if(filterOptions.dateModified !== undefined) {
      await this.dateModifiedInput.fill(filterOptions.dateModified);
    }
  }


}