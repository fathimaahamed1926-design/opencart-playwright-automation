import {Locator, Page} from "@playwright/test";
import { BasePage } from "../BasePage";
import { ProductCard } from "../../components/customer/ProductCardComponent";

export class ProductPage extends BasePage {
  private readonly productCards: Locator;
  private readonly sortByDropdown: Locator;

  constructor(page: Page) {
    super(page);

    this.productCards = page.locator('.product-thumb');
    this.sortByDropdown = page.locator('#input-sort');
  }

  // Method to get a product card by its name and return an instance of ProductCard class 
  async getProductByName(productName:string) : Promise<ProductCard> {
    const card = this.productCards.filter({hasText:productName}).first();
    return new ProductCard(card);
  }

  async sortProductsBy(option:string): Promise<void> {
    await this.sortByDropdown.selectOption({label: option});
  }
}