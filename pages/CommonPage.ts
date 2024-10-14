import { Page, Locator } from '@playwright/test'

export class CommonPage {

    page: Page;
    loginButton: Locator;
    continueBrowsing: Locator;
    searchBox: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginButton = page.getByRole('button', { name: 'Log in' });
        this.continueBrowsing = page.getByRole('button', { name: 'Continue browsing' });
        this.searchBox = page.locator('[data-testid="search-box"], #SearchBox-input, #AreaSearch-input');

    }

    async goto() {
        await this.page.goto('en');
    }

    async handleContinueBrowsingFrame() {
        try {
            await this.continueBrowsing.waitFor({ state: 'attached', timeout: 7000 });
            if (await this.continueBrowsing.isVisible()) {
                await this.continueBrowsing.click();
            }
        } catch {
        }
    }

    getSearchBoxSuggestion(searchTerm: string) {
        return this.page.locator(
            `[data-testid="SearchBox-location-suggestion"]:has-text("${searchTerm}"), 
             [data-testid="area-suggestions-0"]:has-text("${searchTerm}"), 
             [data-testid="searchBoxSuggestions"]:has-text("${searchTerm}")`
        ).first();
    }

    async performSearch(searchTerm: string) {
        await this.searchBox.click().then(() => this.searchBox.pressSequentially(searchTerm, { delay: 80 }));
        await this.getSearchBoxSuggestion(searchTerm).click();
    }
}