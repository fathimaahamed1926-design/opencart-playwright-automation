import { Page } from '@playwright/test';
import { BasePage } from '../../BasePage';
import { HeaderComponent } from '../../../components/customer/HeaderComponent';
import { FooterComponent } from '../../../components/customer/FooterComponent';
import { AccountMenuComponent } from '../../../components/customer/AccountMenuComponent';
import { CustomerFormActionsComponent } from '../../../components/customer/CustomerFormActionsComponent';

// This class serves as a base page for customer account-related pages. It extends the BasePage class and provides common functionality and components for customer account pages.
export class CustomerAccountBasePage extends BasePage {
  readonly header: HeaderComponent;
  readonly footer: FooterComponent;
  readonly customerFormActions: CustomerFormActionsComponent;
  readonly accountMenu: AccountMenuComponent;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderComponent(page);
    this.footer = new FooterComponent(page);
    this.accountMenu = new AccountMenuComponent(page);
    this.customerFormActions = new CustomerFormActionsComponent(page);
  }

}