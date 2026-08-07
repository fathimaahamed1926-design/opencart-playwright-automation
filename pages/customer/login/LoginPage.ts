import { Page, Locator } from "@playwright/test";
import { BasePage } from "../../BasePage";

export class LoginPage extends BasePage {
    private readonly customerEmailAddress: Locator;
    private readonly customerPassword: Locator;
    private readonly loginButton: Locator;
    private readonly loginErrorMessage: Locator;

    constructor(page: Page) {
        super(page);  // use the parent class constructor to initialize the page property
        
        // Initialize locators with CSS selectors
        this.customerEmailAddress = page.getByRole('textbox', { name: 'E-Mail Address' });
        this.customerPassword = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.loginErrorMessage=page.getByRole('alert', { name: 'Error' });
    }
    
    async setEmail(email: string): Promise<void> {
        await this.customerEmailAddress.fill(email);
    }

    async setPassword(pwd: string): Promise<void> {
        await this.customerPassword.fill(pwd);
    }

    async clickLogin(): Promise<void> {
        await this.loginButton.click();
    }

    async login(email: any, password: any): Promise<void> {
        console.log("DEBUG: Attempting login with:", email, password);
        await this.setEmail(email);
        await this.setPassword(password);
        await this.clickLogin();
    }

    async getLoginErrorMessage(): Promise<string | null> {
        await this.loginErrorMessage.waitFor({ state: 'visible', timeout: 5000 });  // Wait for the error message to be visible
        return (await this.loginErrorMessage.textContent())?.trim() || null;  // Return the error message text or null if not found
    }
} 