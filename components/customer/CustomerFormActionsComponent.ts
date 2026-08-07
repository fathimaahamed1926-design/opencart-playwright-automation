import { Page, expect } from '@playwright/test';

export class CustomerFormActionsComponent {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

async clickContinueButton(): Promise<void> {
    const continueButton = this.page.getByRole('button', { name: 'Continue' });
    await continueButton.click();
  }

  async clickBackButton(): Promise<void> {  
    const backButton = this.page.getByRole('link', { name: 'Back' });
    await backButton.click();
  }
}