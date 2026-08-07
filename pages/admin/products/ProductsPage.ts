  import { Page, Locator, expect } from "@playwright/test"
  import { AdminBasePage } from "../AdminBasePage"
  import { ProductFilter } from "../../../types/types";
import { ProductMessages } from "../../../constants/admin/messages";
import { RandomDataGenerator } from "../../../utils/randomDataGenerator";
import { AddOrEditProductsPage } from "./AddOrEditProductsPage";

  export class ProductsPage extends AdminBasePage {
    private readonly addOrEditProductsPage: AddOrEditProductsPage;
    private readonly productTable: Locator;
    private readonly productRows: Locator;

    private readonly productNameInput: Locator;
    private readonly modelInput: Locator;
    private readonly priceInput: Locator;
    private readonly quantityInput: Locator;
    private readonly statusDropdown: Locator;
    private readonly filterButton: Locator;
    private readonly addNewProductButton: Locator;

    constructor(page: Page) {
      super(page);
      this.addOrEditProductsPage = new AddOrEditProductsPage(page);
      this.productTable = page.locator(".table-responsive table");
      this.productRows = page.locator("table tbody tr");
      this.productNameInput = page.getByRole('textbox', { name: 'Product Name' });
      this.modelInput = page.getByRole('textbox', { name: 'Model' });
      this.priceInput = page.getByRole('textbox', { name: 'Price' });
      this.quantityInput = page.getByRole('textbox', { name: 'Quantity' });
      this.statusDropdown = page.locator("select[name='filter_status']");
      this.filterButton = page.getByRole('button', { name: /Filter/i });
      this.addNewProductButton = page.locator("a[data-original-title='Add New']");
    }

    async verifyProductPageLoaded() {
      await this.verifyURLContains("route=catalog/product&user_token");
      await this.filterButton.waitFor({ state: "visible" });
      await this.verifyElementVisible(this.filterButton);
      await this.verifyElementVisible(this.productTable);
    }

    private getProductRow(productName: string): Locator {
      return this.productRows.filter({ has: this.page.getByText(productName, { exact: true }) });
    }

    private getProductCell(columnIndex:number): Locator {
      return this.productRows.locator(`td:nth-child(${columnIndex})`);
    }

    async getDisplayedProductNames(): Promise<string[]> {
      const displayedProductNames = await this.getProductCell(3).allTextContents();
      console.log("Displayed Product Names:", displayedProductNames);
      return displayedProductNames;
    }

    async getDisplayedProductModels(): Promise<string[]> {
      return await this.getProductCell(4).allTextContents();
    }

    async getDisplayedProductPrices(): Promise<number[]> {
      const textContents = await this.getProductCell(5).allTextContents();
      return textContents.map((text) => parseFloat(text.replace('$', '')));      //
    }

    async getDisplayedProductQuantities(): Promise<number[]> {
      const textContents = await this.getProductCell(6).allTextContents();
      return textContents.map(Number);
    }

    async getDisplayedProductStatuses(): Promise<string[]> {
      return await this.getProductCell(7).allTextContents();
    }
  
    private getProductCheckBox(productName: string): Locator {
      return this.getProductRow(productName).locator("input[type='checkbox']");
    }

    private getProductEditButton(productName: string): Locator {
      return this.getProductRow(productName).locator("a[data-original-title='Edit']");    //if it doesn't work, try locator(".btn-primary")
    }

    private getPageLink(pageNo: number): Locator {
      return this.page.locator("ul.pagination a").filter({hasText:pageNo.toString()});
    }

    async editProduct(productName: string) {
      await this.findProduct(productName);
      await this.getProductEditButton(productName).click();
    }

    async addNewProduct() {
      await this.addNewProductButton.click();
    }

    async copyProduct(productName: string): Promise<void> {
      await this.findProduct(productName);
      await this.getProductCheckBox(productName).check();
      await this.toolbar.clickCopyButton();
  }

    async deleteProduct(productName: string, alertControl: "accept" | "dismiss" = "accept"): Promise<void> {
      await this.findProduct(productName);
      await this.getProductCheckBox(productName).check();
      this.page.once("dialog",async dialog =>{
         if (alertControl === "accept") {
            await dialog.accept();
         } else {
            await dialog.dismiss();
         }
      })
      await this.toolbar.clickDeleteButton();
    }

    async filterProducts(filter: ProductFilter): Promise<void> {
      if (filter.productName !== undefined) {                     //for optional values, best approach is to check the value is defined (rather than true or false) before filling it otherwise playwright throws error
        await this.productNameInput.fill(filter.productName);
      }
      if (filter.model !== undefined) {
        await this.modelInput.fill(filter.model);
      }
      if (filter.price !== undefined) {
        await this.priceInput.fill(filter.price.toString());    //fill requires string input
      }
      if (filter.quantity !== undefined) {
        await this.quantityInput.fill(filter.quantity.toString());
      }
      if (filter.status !== undefined) {
        await this.statusDropdown.selectOption({ label: filter.status });  // raw filter.status throws error, so explicitly defining using value
      }
      await this.filterButton.click();
    }

    async verifyProductExists(productName: string, shouldExist: boolean): Promise<void> {
      await this.findProduct(productName);
      if (shouldExist) {
        await expect(this.getProductRow(productName)).toBeVisible();
      } else {
        await expect(this.getProductRow(productName)).not.toBeVisible();
      }
    }

      // handle pagination
      //1. check product on current page
      private async isProductOnCurrentPage(productName:string): Promise<boolean> {
        return (await this.getProductRow(productName).count())>0;                   // results execute faster while using count() instead of visible option. it doesn't have to wait for element to become visible, rather the count is immedietely available
      }

      //2. go to first page deliberately to start searching from page 1
      private async goToFirstPage() {
        const firstPageLink = this.getPageLink(1);
        if(await firstPageLink.count()>0){
          await firstPageLink.click();
        }
      }

      //3. Find the actual product on any page
      private async findProduct(productName:string): Promise<void> {
        await this.goToFirstPage();
        let currentPage = 1;
        while(true){
        if(await this.isProductOnCurrentPage(productName)){
          return;
        }
        currentPage++;
        const nextPage = this.getPageLink(currentPage);
        if(!(await nextPage.isVisible())){
          console.log(`Product "${productName}" not found, check product name or filter criteria`);
          return;
        }
        await nextPage.click();
        }
      }
    }