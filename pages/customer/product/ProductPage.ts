import {Locator, Page, expect} from "@playwright/test";
import { BasePage } from "../../BasePage"
import { ProductCard } from "../../../components/customer/ProductCardComponent";
import { AlertComponent } from "../../../components/common/AlertComponent";
import { ProductDetailsComponent } from "../../../components/customer/ProductDetailsComponent";
import { HeaderComponent } from "../../../components/customer/HeaderComponent";

export class ProductPage extends BasePage {
  private readonly productCards: Locator;
  private readonly sortByDropdown: Locator;
  private readonly alert: AlertComponent;
  readonly productDetails: ProductDetailsComponent;
  readonly header: HeaderComponent;

  constructor(page: Page) {
    super(page);
    this.alert = new AlertComponent(page);
    this.productDetails = new ProductDetailsComponent(page);
    this.header = new HeaderComponent(page);
    this.productCards = page.locator('.product-thumb');
    this.sortByDropdown = page.locator('#input-sort');
  }

  // Method to get a product card by its name and return an instance of ProductCard class 
  async getProductByName(productName:string) : Promise<ProductCard> {
    const card = this.productCards.filter({has: this.page.getByRole('link', {name: productName, exact:true})});
    await expect(card).toHaveCount(1);
    return new ProductCard(card);
  }


  async sortProductsBy(option:string): Promise<void> {
    await this.sortByDropdown.selectOption({label: option});
  }

  async verifyProductAddedSuccessMessage(successMessage:string) {
    await this.alert.verifySuccessMessage(successMessage);
  }

}