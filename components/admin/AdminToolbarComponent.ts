import { Page, Locator } from "@playwright/test";

export class AdminToolbarComponent {
  private readonly page: Page;
  private readonly saveButton: Locator;
  private readonly backButton: Locator;
  private readonly cancelButton: Locator;
  private readonly deleteButton: Locator;
  private readonly editButton: Locator;
  private readonly copyButton: Locator;
  //private readonly addButton: Locator;
  private readonly refreshButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.saveButton = page.locator(".page-header button[data-original-title='Save']");     // if it does not work, remove .page-header

    this.backButton = page.locator(".page-header button[data-original-title='Back']");

    this.cancelButton = page.locator(".page-header button[data-original-title='Cancel']");

    //this.addButton = page.locator(".page-header button[data-original-title='Add']");

    this.deleteButton = page.locator(".page-header button[data-original-title='Delete']");

    this.refreshButton = page.locator(".page-header button[data-original-title='Refresh']");

    this.editButton = page.locator(".page-header button[data-original-title='Edit']");

    this.copyButton = page.locator(".page-header button[data-original-title='Copy']");

  }

  async clickSaveButton() {
    await this.saveButton.click();
  }

  async clickBackButton() {
    await this.backButton.click();
  }

  async clickCancelButton() {
    await this.cancelButton.click();
  }

  async clickCopyButton() {
    await this.copyButton.click();
  }

  /*async clickAddButton() {
    await this.addButton.click();
  }*/

  async clickDeleteButton() {
    await this.deleteButton.click();
  }

  async clickRefreshButton() {
    await this.refreshButton.click();
  }

  async clickEditButton() {
    await this.editButton.click();
  }

  async isSaveVisible(): Promise<boolean> {
    return await this.saveButton.isVisible();
  }

  async isBackVisible(): Promise<boolean> {
    return await this.backButton.isVisible();
  }

  async isCancelVisible(): Promise<boolean> {
    return await this.cancelButton.isVisible();
  }

  async isCopyVisible() : Promise<boolean> {
    return await this.copyButton.isVisible();
  }

  /*async isAddVisible(): Promise<boolean> {
    return await this.addButton.isVisible();
  }*/

  async isDeleteVisible(): Promise<boolean> {
    return await this.deleteButton.isVisible();
  }

  async isRefreshVisible(): Promise<boolean> {
    return await this.refreshButton.isVisible();
  }

  async isEditVisible(): Promise<boolean> {
    return await this.editButton.isVisible();
  }

}
