import { Locator, Page, expect } from "@playwright/test";
export class BasePage{
  readonly page:Page;

  constructor(page:Page){
    this.page=page;
  }

  async navigateTo(path:string = '/'): Promise<void> {
    await this.page.goto(path);
  }

  async refreshPage() : Promise<void> {
    await this.page.reload();
  }

  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  async verifyURLContains(text:string): Promise<void>{
    await expect(this.page).toHaveURL(text);
  }

  async verifyPageTitle(text:string): Promise<void>{
    await expect(this.page).toHaveTitle(new RegExp(`.*${text}.*`)); // Using regex to check if title contains the text 
  } 

  async verifyElementVisible(locator:Locator): Promise<void>{
    await expect(locator).toBeVisible();
  }

  async verifyElementClickable(locator:Locator): Promise<void>{
    await expect(locator).toBeEnabled();
  }

  async captureNewPageAndClick(clickAction: () => Promise<void>): Promise<Page> {
    const pagePromise = this.page.context().waitForEvent('page');  //starting only the listener
    await clickAction();
    const newPage = await pagePromise;
    await newPage.waitForLoadState('domcontentloaded'); // Ensure the new page has loaded
    return newPage;
  }

}