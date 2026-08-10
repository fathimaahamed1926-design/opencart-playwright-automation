import { expect, Locator, Page } from "@playwright/test";

export class ProductDetailsComponent {
  private readonly page: Page
  private readonly detailsList: Locator;
  private readonly addToCartButton: Locator;
  private readonly addToWishListButton: Locator;
  private readonly compareThisProductButton: Locator;
  private readonly inputQuantity: Locator;

  constructor(page: Page) {
    this.page = page;
    this.detailsList = this.page.locator("div.col-sm-4").locator("ul.list-unstyled");
    this.addToCartButton = this.page.locator('#button-cart');
    this.addToWishListButton = this.page.locator("button[data-original-title='Add to Wish List']");
    this.compareThisProductButton = this.page.locator("button[data-original-title='Compare this Product']");
    this.inputQuantity = this.page.locator('#input-quantity');
  }

  async setInputQuantity(quantity:number):Promise<void>{
    await this.inputQuantity.fill(quantity.toString());
  }
  
  private async getDetail(label: string): Promise<string> {
    const item = this.detailsList.locator("li").filter({ hasText: label });

    const text = await item.innerText();

    return text.replace(`${label}:`, "").trim();
  }

  async getAvailability() {
    return this.getDetail("Availability");
  }

  async getRewardPoints() {
    return this.getDetail("Reward Points");
  }

  async getProductCode() {
    return this.getDetail("Product Code");
  }

  async getBrand() {
    return this.detailsList.locator("li").filter({ hasText: "Brand" }).locator("a").innerText();
  }
  
  async addToCart() {
    await (this.addToCartButton).click();
  }

  async verifyProductDetailsLoaded() {
    expect(this.page).toHaveURL('route=product/product/');
  }

  async addToWishList() {
    await this.addToWishListButton.click();
  }

  async compareThisProduct() {
      await this.compareThisProductButton.click(); 
  }

}