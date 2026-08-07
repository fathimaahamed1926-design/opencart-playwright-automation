import { Locator, Page } from '@playwright/test';

export class FooterComponent {

    private readonly page: Page;

    private readonly aboutUsLink: Locator;
    private readonly myAccountLink: Locator;
    private readonly orderHistoryLink: Locator;
    private readonly newsletterLink: Locator;
    private readonly wishlistLink: Locator;
    private readonly contactUsLink: Locator;
    private readonly returnsLink: Locator;
    private readonly siteMapLink: Locator;
    private readonly brandsLink: Locator;
    private readonly giftCertificatesLink: Locator;
    private readonly affiliateLink: Locator;
    private readonly specialsLink: Locator;

    constructor(page: Page) {

        this.page = page;

        const footer = page.getByRole('contentinfo');

        this.myAccountLink = footer.getByRole('link', { name: 'My Account' });

        this.orderHistoryLink = footer.getByRole('link', { name: 'Order History' });

        this.newsletterLink = footer.getByRole('link', { name: 'Newsletter' });

        this.wishlistLink = footer.getByRole('link', { name: 'Wish List' });

        this.aboutUsLink = footer.getByRole('link', { name: 'About Us' });

        this.contactUsLink = footer.getByRole('link', { name: 'Contact Us' });

        this.returnsLink = footer.getByRole('link', { name: 'Returns' });

        this.siteMapLink = footer.getByRole('link', { name: 'Site Map' });

        this.brandsLink = footer.getByRole('link', { name: 'Brands' });

        this.giftCertificatesLink = footer.getByRole('link', {name: 'Gift Certificates'});

        this.affiliateLink = footer.getByRole('link', { name: 'Affiliate' });

        this.specialsLink = footer.getByRole('link', { name: 'Specials' });

    }

    async navigateToAboutUs(): Promise<void> {
        await this.aboutUsLink.click();
    }

    async navigateToMyAccount(): Promise<void> {
        await this.myAccountLink.click();
    }

    async navigateToOrderHistory(): Promise<void> {
        await this.orderHistoryLink.click();
    }

    async navigateToNewsletter(): Promise<void> {
        await this.newsletterLink.click();
    }

    async navigateToWishlist(): Promise<void> {
        await this.wishlistLink.click();
    } 

    async navigateToContactUs(): Promise<void> {
        await this.contactUsLink.click();
    }

    async navigateToReturns(): Promise<void> {
        await this.returnsLink.click();
    }

    async navigateToSiteMap(): Promise<void> {
        await this.siteMapLink.click();
    }

    async navigateToBrands(): Promise<void> {
        await this.brandsLink.click();
    }

    async navigateToGiftCertificates(): Promise<void> {
        await this.giftCertificatesLink.click();
    }

    async navigateToAffiliate(): Promise<void> {
        await this.affiliateLink.click();
    }

    async navigateToSpecials(): Promise<void> {
        await this.specialsLink.click();
    }

}