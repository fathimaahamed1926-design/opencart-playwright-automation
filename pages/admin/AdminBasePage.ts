import {Page, Locator} from "@playwright/test";
import { BasePage } from "../BasePage";

import { AdminSidebarComponent } from "../../components/admin/AdminSidebarComponent";
import { AdminHeaderComponent } from "../../components/admin/AdminHeaderComponent";
import { AdminToolbarComponent } from "../../components/admin/AdminToolbarComponent";
import { AlertComponent } from "../../components/common/AlertComponent";

export class AdminBasePage extends BasePage {
  readonly sidebar: AdminSidebarComponent;
  readonly header: AdminHeaderComponent;
  readonly toolbar: AdminToolbarComponent;
  readonly alert: AlertComponent;

  constructor(page: Page) {
    super(page);
    this.sidebar = new AdminSidebarComponent(page);
    this.header = new AdminHeaderComponent(page);
    this.toolbar = new AdminToolbarComponent(page);
    this.alert = new AlertComponent(page);
  }
}
