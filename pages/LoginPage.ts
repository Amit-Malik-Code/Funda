import { Page, Locator } from '@playwright/test'

export class LoginPage {

    page: Page;
    emailField: Locator;
    passwordField: Locator;
    accountButton: Locator;
    errorMessageOnWrongCredentials: Locator;
    logOutOption: Locator;


    constructor(page: Page) {
        this.page = page;
        this.emailField = page.locator('#UserName');
        this.passwordField = page.locator('#Password');
        this.accountButton = page.locator('#headlessui-menu-button-v-0-24');
        this.errorMessageOnWrongCredentials = page.locator('text=/Er is geen account gevonden voor dit e-mailadres.|The email and password you entered did not match our records./');
        this.logOutOption = page.locator('#headlessui-menu-item-v-0-26').getByText('Log out');
    }

    async loginToFunda(username: string, password: string) {
        await this.emailField.fill(username);
        await this.passwordField.fill(password);
    }
} 
