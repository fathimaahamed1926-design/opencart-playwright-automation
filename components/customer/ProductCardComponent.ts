import { Locator, Page } from "@playwright/test";

export class ProductCard {

  constructor(private readonly container: Locator) {
    
   }

    private get title() {
      return this.container.locator('h4 a');
     }

    private get image() {
    return this.container.locator(".image a");
     }

    private  get price() { 
      return this.container.locator('.price');
     }

    private get addToCartButton() { 
      return this.container.getByRole('button', { name: 'Add to Cart' }); 
    }

    private get compareThisProductButton() {
      return this.container.locator("button[data-original-title='Compare this Product']"); 
    }

    async clickProduct() {
        await this.title.click();
    }

    async clickImage() {
        await this.image.click();
    }

     async addToCart() {
        await this.addToCartButton.click();
    }

    async compareThisProduct() {
        await this.compareThisProductButton.click();
    }

    async getTitleText(): Promise<string> {
        return await this.title.textContent() || '';
    }

    async getPriceText(): Promise<string> {
        return await this.price.textContent() || '';
    }


}