import { Locator, Page, expect } from "@playwright/test";
import { Env } from "../utils/environment";
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  protected async navigateToHomePage(): Promise<void> {
    await this.page.goto('');
  }

  protected async openCustomerAppPortal(): Promise<void> {
    await this.page.goto(Env.CUSTOMER_URL);
  }

  protected async openAdminAppPortal(): Promise<void> {
    await this.page.goto(Env.ADMIN_URL);
  }

  protected async refreshPage(): Promise<void> {
    await this.page.reload();
  }

  protected async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  protected async verifyURLContains(text: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(text));
  }

  protected async verifyPageTitle(text: string): Promise<void> {
    await expect(this.page).toHaveTitle(text); // toHaveTitle is inbuilt method checks naturally for partial match
  }

  protected async verifyElementVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }

  protected async verifyElementClickable(locator: Locator): Promise<void> {
    await expect(locator).toBeEnabled();
  }

  protected async openAndCaptureNewPage(clickAction: () => Promise<void>): Promise<Page> {
    const pagePromise = this.page.context().waitForEvent('page');  //starting only the listener
    await clickAction();
    const newPage = await pagePromise;
    await newPage.waitForLoadState('domcontentloaded'); // Ensure the new page has loaded
    return newPage;
  }

  async navigateToCategory(mainCategory: string, subCategory?: string): Promise<void> {
    // 1. Find the main category menu item and hover to trigger the dropdown
    const mainCategoryLink = this.page.getByRole('link', { name: mainCategory, exact: true })
    await mainCategoryLink.hover();

    // 2. Click the sub-category link that is now visible in the dropdown
    if (subCategory) {
      const subCategoryLink = this.page.getByRole('link', { name: subCategory });
      await subCategoryLink.waitFor({ state: 'visible', timeout: 5000 }); // Ensure the sub-category link is visible after hovering
      await subCategoryLink.click();
    }
    else {
      // If no sub-category is provided, click the main category link
      await mainCategoryLink.click();
    }
  }

  protected async getText(locator: Locator): Promise<string> {
    const text = await locator.textContent();
    return (text?.trim()) ?? "";  // ?? is used to return empty string when the text value is null or undefined
  }

  protected async getNumber(locator: Locator): Promise<number> {
    const value = Number(await this.getText(locator));
    if (Number.isNaN(value)) {
      throw new Error(`Expected a numeric value, but found ${value}`);
    }
    return value;
  }

  //method to just enter date
  protected async enterDate(input: Locator, date: Date): Promise<void> {
    const formattedDate = this.formatDate(date);

    await input.fill(formattedDate);
    await input.press("Tab");
  }

  //helper method to format date
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  //method to select date from calender
  protected async selectDatefromCalender(input: Locator, date: Date): Promise<void> {
    await this.openDatePicker(input);
    const previousButton = this.page.locator(".datepicker th.prev");
    const nextButton = this.page.locator(".datepicker th.next");
    const expectedMonthYear = this.getMonthyear(date);
    while (true) {
      const displayedMonthYear = (await this.page.locator(".datepicker th.picker-switch").textContent())?.trim();
      if (!displayedMonthYear) {
        throw new Error("Unable to determine the displayed month and year from the calendar.");
      }

      if (displayedMonthYear === expectedMonthYear) {
        break;
      }
      const displayedDate = new Date(displayedMonthYear)
      if(displayedDate>date){
        previousButton.click();
      }else {
        nextButton.click();
      }
    }

    const expectedDateLocator= this.page.locator(".datepicker tbody.td.day").filter({hasText: date.getDate().toString()});
    await expectedDateLocator.click();
  }

  //helper to get date(month,year) in string
  private getMonthyear(date: Date): string {
    return date.toLocaleString("en-US", {
      month: "long",
      year: "numeric"
    });
  }

  //helper to open date picker
  private async openDatePicker(input: Locator): Promise<void> {
    await input.locator("xpath=following-sibling::span/button").click();  //// find the calendar button associated with this input
  }

  

}