import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from '../../BasePage';

export class ShoppingCartPage extends BasePage {
  private readonly cartTable = this.page.locator('.table-responsive');
  private readonly checkoutButton = this.page.getByRole('link', { name: 'Checkout' });

  constructor(page: Page) {
    super(page);
  }

  //Locator Functions

  // Helper to find a specific product row locator
  getProductRow(name: string) {
    return this.cartTable.locator('tr').filter({ hasText: name });
  }
  //get row input quantity locator
  getRowInputQuantity(row: Locator) {
    return row.locator('input[name*="quantity"]');
  }

  //get unit price of product locator
  getRowUnitPrice(row: Locator) {
    return row.locator('td.text-right');
  }

  //get rowTotal locator
  getRowTotal(row: Locator) {
    return row.locator('td.text-right');
  }

  //-----------------------------------------------------------------

  //Helper Functions

  //Function parse price text to number
  private async parsePrice(locator: Locator): Promise<number> {
    const priceText = await locator.innerText();
    // Remove currency symbols and commas, then parse to float
    const cleanedText = priceText.replace(/[^0-9.]/g, '');
    return parseFloat(cleanedText);
  }

  // Function to Update Quantity
  async updateQuantity(productName: string, quantity: string) {
    const row = this.getProductRow(productName);
    const qtyInput = this.getRowInputQuantity(row);

    await qtyInput.clear();
    await qtyInput.fill(quantity);
    await row.getByRole('button', { name: 'Update' }).click();

    // wait for the success message to ensure the update finished
    await expect(this.page.locator('.alert-success')).toBeVisible();
  }

  // Function to Remove Product
  async removeProduct(productName: string) {
    const row = this.getProductRow(productName);
    await row.getByRole('button', { name: 'Remove' }).click();
  }

  // Function to Proceed to Checkout
  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async getAllProductNames(): Promise<string[]> {
    const rows = this.cartTable.locator('tbody tr');
    const productNames = rows.locator('td.text-left a').allTextContents();
    return await productNames;
  }

  async getRowData(productName: string) {
    const row = this.getProductRow(productName);

    const unitPrice = await this.parsePrice(this.getRowUnitPrice(row));
    const unitQuantity = parseInt(await this.getRowInputQuantity(row).inputValue());
    const unitTotal = await this.parsePrice(this.getRowTotal(row));

    return { unitPrice, unitQuantity, unitTotal };
  }

  async calculateExpectedGrandTotal(): Promise<number> {
    const productNames = await this.getAllProductNames();
    let total = 0;

    for (const name of productNames) {
      const product = this.getRowData(name);
      total += (await product).unitPrice * (await product).unitQuantity;
    }
    return total;
  }

  async getDisplayedGrandTotal(): Promise<number> {
    const lastRow = this.cartTable.locator('tbody tr').last();
    return await this.parsePrice(lastRow.locator('td.text-right').last());
  }

  async validateTotalPrice(): Promise<boolean> {
    const expectedTotal = await this.calculateExpectedGrandTotal();
    const displayedTotal = await this.getDisplayedGrandTotal();

    return expectedTotal === displayedTotal;
  }

}