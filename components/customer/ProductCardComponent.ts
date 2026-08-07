import { Locator } from "@playwright/test";

export class ProductCard {
  constructor(private readonly container: Locator) { }

     get title() {
      return this.container.locator('h4 a');
     }
      get price() { 
      return this.container.locator('.price');
     }

     get addToCartButton() { 
      return this.container.getByRole('button', { name: 'Add to Cart' }); 
    }

     async addToCart() {
        await this.addToCartButton.click();
    }

    async getTitleText(): Promise<string> {
        return await this.title.textContent() || '';
    }

    async getPriceText(): Promise<string> {
        return await this.price.textContent() || '';
    }

}