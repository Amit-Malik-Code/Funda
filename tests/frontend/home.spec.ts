import { test, expect } from "playwright/test";
import { CookieConsentModel } from "../../models/CookieConsentModel";
import { HomePage } from "../../pages/HomePage";
import { CommonPage } from "../../pages/CommonPage";

test.beforeEach('Given User open funda homepage', async ({ page, request }) => {
  const commonPage = new CommonPage(page);
  const cookieConsentModel = new CookieConsentModel(page);

  console.log(`Running ${test.info().title}`);
  commonPage.goto();
  await cookieConsentModel.rejectAllCookiesButton.click();
  await commonPage.handleContinueBrowsingFrame();
});

test.describe('Find an NVM Agent for Property Purchase', () => {
  test('User should be able to search for an NVM agent to buy a property', async ({ page }) => {
    const homePage = new HomePage(page);
    const commonPage = new CommonPage(page);

    await test.step('When I click the "Find an NVM agent" link on the homepage', async () => {
      await homePage.nvmAgentLink.click();
    });

    await test.step('And I select the "Buy" option', async () => {
      await page.waitForLoadState('domcontentloaded');
      await homePage.nvmAgentForBuy.click();
    });

    await test.step('And I enter a city name in the search bar and selects a suggestion', async () => {
      await commonPage.performSearch('Amstelveen');
    });

    await test.step('And I click on the search button', async () => {
      await homePage.serachButton.click();
    });

    await test.step('Then I should see that the page title should contain NVM buying agents', async () => {
      const pageTitle = await page.title();
      expect(pageTitle).toContain('NVM buying agents');
    });

    await test.step('And the agent "Admiraal ERA Makelaardij" should be visible on the page', async () => {
      await expect(homePage.nvmAgent).toBeVisible();
    });
  });
});

test.describe('Home Page Elements Visibility', () => {
  test('User should see all key elements when landing on the home page', async ({ page }) => {
    const homePage = new HomePage(page);
    const commonPage = new CommonPage(page);

    await test.step('When I open the home page the search box should be visible', async () => {
      await expect(commonPage.searchBox).toBeVisible();
    });

    await test.step('And the "For Sale" button should be visible', async () => {
      await expect(homePage.forSaleSearch).toBeVisible();
    });

    await test.step('And the "For Rent" button should be visible', async () => {
      await expect(homePage.forRentSearch).toBeVisible();
    });

    await test.step('And the "Newly Built" button should be visible', async () => {
      await expect(homePage.newlyBuiltSearch).toBeVisible();
    });

    await test.step('And the "Recreation" button should be visible', async () => {
      await expect(homePage.recreationSearch).toBeVisible();
    });

    await test.step('And the "Find an NVM Agent" link should be visible', async () => {
      await expect(homePage.nvmAgentLink).toBeVisible();
    });

    await test.step('Then the "Find Commercial Property" link should be visible', async () => {
      await expect(homePage.findCommercialPropertyLink).toBeVisible();
    });
  });
});

test.describe('Header Elements Visibility', () => {
  test('User should see all key elements in the header when landing on the home page', async ({ page }) => {
    const homePage = new HomePage(page);
    const commonPage = new CommonPage(page);

    await test.step('When I open the home page the "Buy" button should be visible in the header', async () => {
      await expect(homePage.buyButton).toBeVisible();
    });

    await test.step('And the "Rent" button should be visible in the header', async () => {
      await expect(homePage.rentButton).toBeVisible();
    });

    await test.step('And the "Sell" button should be visible in the header', async () => {
      await expect(homePage.sellButton).toBeVisible();
    });

    await test.step('And the "Favourites" link should be visible in the header', async () => {
      await expect(homePage.favouritesLink).toBeVisible();
    });

    await test.step('And the "My Home" link should be visible in the header', async () => {
      await expect(homePage.myHomeLink).toBeVisible();
    });

    await test.step('Then the "Log In" button should be visible in the header', async () => {
      await expect(commonPage.loginButton).toBeVisible();
    });
  });
});
