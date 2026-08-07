import { Locator, Page } from "@playwright/test";
import { AdminBasePage } from "../AdminBasePage";
import { CreateProductData } from "../../../types/types";

export class AddOrEditProductsPage extends AdminBasePage {

    private readonly productNameInput: Locator;
    private readonly metaTitleInput: Locator;
    private readonly dataTab: Locator;
    private readonly modelInput: Locator;

    constructor(page: Page) {

        super(page);

        this.productNameInput = page.getByRole('textbox', { name: 'Product Name' });

        this.metaTitleInput = page.getByRole('textbox', { name: 'Meta Tag Title' });

        this.dataTab = page.getByRole('link', { name: 'Data' });

        this.modelInput = page.getByRole('textbox', { name: 'Model' });

    }

    async setProductName(name: string) {

        await this.productNameInput.fill(name);
    }

    async setMetaTitle(title: string) {

        await this.metaTitleInput.fill(title);
    }

    async setModel(model: string) {

        await this.dataTab.click();

        await this.modelInput.fill(model);
    }

     async getProductName() : Promise<string>{

        return await this.productNameInput.inputValue();
    }

    async getMetaTitle() : Promise<string> {

        return await this.metaTitleInput.inputValue();
    }

    async getModel() : Promise<string> {

        await this.dataTab.click();

        return await this.modelInput.inputValue();
    }

    async createProduct(productData: CreateProductData) {

        await this.setProductName(productData.productName);

        await this.setMetaTitle(productData.metaTagTitle);

        await this.setModel(productData.model);

        await this.saveDetails();
    }

    async saveDetails() {
        await this.toolbar.clickSaveButton();
    }

}