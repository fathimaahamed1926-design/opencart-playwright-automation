import {Page, Locator} from "@playwright/test"
import { AdminBasePage } from "../AdminBasePage";

export class CategoriesPage extends AdminBasePage{
  private readonly categoryTable: Locator;
  private readonly addNewCategoryButton: Locator;
  private readonly rebuildButton: Locator;
  private readonly pageForwardButton: Locator;
  //private readonly pageBackwardButton: Locator;

  constructor(page: Page) {
    super(page);
    this.categoryTable = page.locator(".table-responsive table");

    this.rebuildButton = page.locator("a[data-original-title='Rebuild']");
    this.addNewCategoryButton = page.locator("a[data-original-title='Add New']");

    this.pageForwardButton= page.getByRole('link', { name: '>', exact: true });
    //this.pageBackwardButton = page.getByRole('link', { name: '<', exact: true });
  }

  private getPageLink(pageNo: number): Locator {
    return this.page.locator("ul.pagination a").filter({hasText:pageNo.toString()});
  }

  private async goToFirstPage() {
      await this.getPageLink(1).click();
    }

  private async isCategoryOnCurrentPage(categoryName: string): Promise<boolean>  {
    return await this.getCategoryCell(categoryName).isVisible();
  }

  private getCategoryCell(categoryName: string): Locator {
    return this.page.getByRole('cell', { name: categoryName, exact: true });
  }

  private getCategoryRow(categoryName: string) : Locator {
    return this.getCategoryCell(categoryName).locator("xpath=ancestor::tr");
  }

  private getCategoryCheckbox(categoryName: string): Locator {
    return this.getCategoryRow(categoryName).locator("input[type='checkbox']");
  }

  private getCategoryEditButton(categoryName: string): Locator {
    return this.getCategoryRow(categoryName).locator("a[data-original-title='Edit']"); 
  }

  async verifyCategoryPageLoaded() {
    await this.verifyURLContains("route=catalog/category&user_token");
    await this.verifyPageTitle("Categories");
  }

  async findCategory(categoryName: string): Promise<void>{
      await this.goToFirstPage();
     while(true){
      if(await this.isCategoryOnCurrentPage(categoryName)) {
        return;
      };
      if(!(await this.pageForwardButton.isVisible())) {
         throw new Error (
          `category ${categoryName} not found`
         );
      }
      await this.pageForwardButton.click();
      await this.verifyElementVisible(this.categoryTable);
     }
    }

  async editCategory(categoryName: string) {
    await this.findCategory(categoryName);
    await this.getCategoryEditButton(categoryName).click();
  }

  async addNewCategory(categoryName: string) {
    await this.addNewCategoryButton.click();
  }

  async rebuildCategory(categoryName: string) {
    await this.rebuildButton.click();
  }

  async deleteCategory(categoryName: string) {
    await this.findCategory(categoryName);
    await this.getCategoryCheckbox(categoryName).check();
    await this.toolbar.clickDeleteButton();
  }

}