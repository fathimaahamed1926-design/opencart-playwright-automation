import { Locator, Page } from "@playwright/test";

export class AdminHeaderComponent {

    protected readonly page: Page;

    private readonly profileDropdown: Locator;
    private readonly logoutLink: Locator;
    private readonly storefrontLink: Locator;
    private readonly openCartHomePageLink: Locator;
    private readonly openCartDocumentationLink: Locator;
    private readonly openCartSupportForumLink: Locator;

    constructor(page: Page) {

        this.page = page;

        this.profileDropdown = page.locator('#header .navbar-right .dropdown-toggle');
        this.logoutLink = page.getByRole('link', { name: 'Logout' });
        this.storefrontLink = page.getByRole('link', { name: 'Your Store' });
        this.openCartHomePageLink = page.getByRole('link', { name: /OpenCart Homepage/i });
        this.openCartDocumentationLink = page.getByRole('link', { name: /Documentation/i });
        this.openCartSupportForumLink = page.getByRole('link', { name: /Support Forum/i });

    }

    async openProfileMenu(): Promise<void> {
        await this.profileDropdown.click();
    }

    async logout(): Promise<void> {
        await this.openProfileMenu();
        await this.logoutLink.click();
    }

    async openStoreFront(): Promise<void> {
        await this.storefrontLink.click();
    }

    async openNotifications(): Promise<void> {
        await this.openCartHomePageLink.click();
    }
    
    async openDocumentation(): Promise<void> {
        await this.openCartDocumentationLink.click();
    }

    async openSupportForum(): Promise<void> {
        await this.openCartSupportForumLink.click();
    } 
}