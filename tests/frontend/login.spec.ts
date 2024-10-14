import { test, expect } from "playwright/test";
import { CookieConsentModel } from "../../models/CookieConsentModel";
import { LoginPage } from "../../pages/LoginPage";
import { CommonPage } from "../../pages/CommonPage";

test.beforeEach('Given User open funda homepage', async ({ page }) => {
    const commonPage = new CommonPage(page);
    const cookieConsentModel = new CookieConsentModel(page);

    console.log(`Running ${test.info().title}`);
    commonPage.goto();
    await cookieConsentModel.rejectAllCookiesButton.click();
    await commonPage.handleContinueBrowsingFrame();
});

test.describe('Check Login Page functionality', () => {
    test('User should successfully login with correct credentials and fail with incorrect credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const commonPage = new CommonPage(page);

        await test.step('When I click on the login button on the home page', async () => {
            await commonPage.loginButton.click();
        });

        await test.step('And I fill in with invalid credentials', async () => {
            await loginPage.loginToFunda(process.env.USERNAME_INVALID, process.env.PASSWORD_INVALID);
        });

        await test.step('And I click on Log in button', async () => {
            await commonPage.loginButton.click();
        });

        await test.step('Then I should see an error message displayed on the page', async () => {
            await expect(loginPage.errorMessageOnWrongCredentials).toBeVisible();
        });

        await test.step('When I fill in with valid credentials', async () => {
            await loginPage.loginToFunda(process.env.USERNAME_VALID, process.env.PASSWORD_VALID);
        });

        await test.step('And I click on Log in button', async () => {
            await commonPage.loginButton.click();
        });

        await test.step('Then I should see i am  successfully logged in and see Account button on the page', async () => {
            await expect(loginPage.accountButton).toBeVisible();
        });

        await test.step('When I click on account button', async () => {
            await loginPage.accountButton.click();
        });

        await test.step('Then I should see logout button on the page', async () => {
            await expect(loginPage.logOutOption).toBeVisible();
        });

        await test.step('And I click on Log out menu option', async () => {
            await loginPage.logOutOption.click();
        });
    });
});
