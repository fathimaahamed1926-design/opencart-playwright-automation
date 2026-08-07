import { Locator, Page } from "@playwright/test";

export class AdminSidebarComponent {
  private readonly page: Page;

    //================ Main Menus ================//

    private readonly dashboardMenu: Locator;
    private readonly catalogMenu: Locator;
    private readonly salesMenu: Locator;
    private readonly customersMenu: Locator;

   //================ Catalog ================//

    private readonly categoriesMenu: Locator;
    private readonly productsMenu: Locator;
    private readonly recurringProfilesMenu: Locator;
    private readonly filtersMenu: Locator;
    private readonly attributesMenu: Locator;
    private readonly optionsMenu: Locator;
    private readonly manufacturersMenu: Locator;
    private readonly downloadsMenu: Locator;
    private readonly reviewsMenu: Locator;
    private readonly informationMenu: Locator;

    //================ Sales ================//

    private readonly ordersMenu: Locator;
    private readonly recurringOrdersMenu: Locator;
    private readonly returnsMenu: Locator;
    private readonly giftVouchersMenu: Locator;

    //================ Customers ================//

    private readonly customersListMenu: Locator;
    private readonly customerGroupsMenu: Locator;
    private readonly customerApprovalsMenu: Locator;
    private readonly customFieldsMenu: Locator;

    constructor(page: Page) {
      this.page = page;

       //---------------- Main ----------------//

        this.dashboardMenu = page.locator('#menu-dashboard');
        this.catalogMenu = page.locator('#menu-catalog');
        this.salesMenu = page.locator('#menu-sale');
        this.customersMenu = page.locator('#menu-customer');

        //---------------- Catalog ----------------//

        this.categoriesMenu = page.getByRole('link', { name: 'Categories' });
        this.productsMenu = page.getByRole('link', { name: 'Products' });
        this.recurringProfilesMenu = page.getByRole('link', { name: 'Recurring Profiles' });
        this.filtersMenu = page.getByRole('link', { name: 'Filters' });
        this.attributesMenu = page.getByRole('link', { name: 'Attributes' });
        this.optionsMenu = page.getByRole('link', { name: 'Options' });
        this.manufacturersMenu = page.getByRole('link', { name: 'Manufacturers' });
        this.downloadsMenu = page.getByRole('link', { name: 'Downloads' });
        this.reviewsMenu = page.getByRole('link', { name: 'Reviews' });
        this.informationMenu = page.getByRole('link', { name: 'Information' });

        //---------------- Sales ----------------//

        this.ordersMenu = page.getByRole('link', { name: 'Orders' });
        this.recurringOrdersMenu = page.getByRole('link', { name: 'Recurring Orders' });
        this.returnsMenu = page.getByRole('link', { name: 'Returns' });
        this.giftVouchersMenu = page.getByRole('link', { name: 'Gift Vouchers' });

        //---------------- Customers ----------------//

        this.customersListMenu = page.getByRole('link', { name: /^Customers$/ });
        this.customerGroupsMenu = page.getByRole('link', { name: 'Customer Groups' });
        this.customerApprovalsMenu = page.getByRole('link', { name: 'Customer Approvals' });
        this.customFieldsMenu = page.getByRole('link', { name: 'Custom Fields' });
    }

    private async openSubMenu(parentMenu: Locator, subMenu: Locator): Promise<void> {

      const expanded = await parentMenu.getAttribute('aria-expanded');
      if (expanded !== 'true') {
        await parentMenu.click();
      }
      await subMenu.waitFor({ state: 'visible' });
      await subMenu.click();
    }

    //======= Main Navigation =========
    async openDashboard() {
        await this.dashboardMenu.click();
    }

    //======== Catalog =========

    async openCategories() {
        await this.openSubMenu(this.catalogMenu, this.categoriesMenu);
    }

    async openProducts() {
        await this.openSubMenu(this.catalogMenu, this.productsMenu);
    }

    async openRecurringProfiles() {
        await this.openSubMenu(this.catalogMenu, this.recurringProfilesMenu);
    }

    async openFilters() {
        await this.openSubMenu(this.catalogMenu, this.filtersMenu);
    }

    async openAttributes() {
        await this.openSubMenu(this.catalogMenu, this.attributesMenu);
    }

    async openOptions() {
        await this.openSubMenu(this.catalogMenu, this.optionsMenu);
    }

    async openManufacturers() {
        await this.openSubMenu(this.catalogMenu, this.manufacturersMenu);
    }

    async openDownloads() {
        await this.openSubMenu(this.catalogMenu, this.downloadsMenu);
    }

    async openReviews() {
        await this.openSubMenu(this.catalogMenu, this.reviewsMenu);
    }

    async openInformation() {
        await this.openSubMenu(this.catalogMenu, this.informationMenu);
    }
    
    // ======= Sales =========
    async openOrders() {
        await this.openSubMenu(this.salesMenu, this.ordersMenu);
    }

    async openRecurringOrders() {
        await this.openSubMenu(this.salesMenu, this.recurringOrdersMenu);
    }

    async openReturns() {
        await this.openSubMenu(this.salesMenu, this.returnsMenu);
    }

    async openGiftVouchers() {
        await this.openSubMenu(this.salesMenu, this.giftVouchersMenu);
    }
    
    // ======= Customers =========
    async openCustomers() {
        await this.openSubMenu(this.customersMenu, this.customersListMenu);
    }

    async openCustomerGroups() {
        await this.openSubMenu(this.customersMenu, this.customerGroupsMenu);
    }

    async openCustomerApprovals() {
        await this.openSubMenu(this.customersMenu, this.customerApprovalsMenu);
    }

    async openCustomFields() {
        await this.openSubMenu(this.customersMenu, this.customFieldsMenu);
    }

}