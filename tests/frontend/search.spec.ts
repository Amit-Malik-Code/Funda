import { test, expect } from "playwright/test";
import { CookieConsentModel } from "../../models/CookieConsentModel";
import { SearchPage } from "../../pages/SearchPage";
import { CommonPage } from "../../pages/CommonPage";

test.beforeEach('Given User open funda homepage', async ({ page }) => {
    const commonPage = new CommonPage(page);
    const cookieConsentModel = new CookieConsentModel(page);

    console.log(`Running ${test.info().title}`);
    commonPage.goto();
    await cookieConsentModel.rejectAllCookiesButton.click();
    await commonPage.handleContinueBrowsingFrame();
});

test.describe('Search functionality: User can search by city name or post code', () => {
    test('User searches for houses from the home page using by city name or post code', async ({ page }) => {
        const searchPage = new SearchPage(page);
        const commonPage = new CommonPage(page);

        await test.step('When I enter the city name in the search bar and select it from the suggestions', async () => {
            await commonPage.performSearch('Amsterdam');
        });

        await test.step('Then I should see the heading "homes for sale in Amsterdam" displayed on the page', async () => {
            await expect(searchPage.getHeadingAfterSearch('Amsterdam')).toBeVisible();
        });

        await test.step('And the page title should contain "Homes for sale Amsterdam"', async () => {
            const pageTitle = await page.title();
            expect(pageTitle).toContain('Homes for sale Amsterdam');
        });

        await test.step('When I enter another city name in the search bar', async () => {
            await searchPage.addLocationButton.click();
            await commonPage.performSearch('Amstelveen');
        });

        await test.step('Then I should see the heading "homes for sale in Amsterdam + 1 location" displayed on the page', async () => {
            await expect(searchPage.getHeadingAfterSearch('Amsterdam + 1 location')).toBeVisible();
        });

        await test.step('And the page title should contain "Homes for sale Amsterdam + 1 location"', async () => {
            const pageTitle = await page.title();
            expect(pageTitle).toContain('Homes for sale Amsterdam + 1 location');
        });

        await test.step('When I clear the previous searched locations and enter a new city name in the search bar', async () => {
            await searchPage.addLocationButton.click();
            await searchPage.removeAllLocationsButton.click();
            await commonPage.performSearch('1019');
        });

        await test.step('Then I should see the heading "homes for sale in Postal code 1019" displayed on the page', async () => {
            await expect(searchPage.getPostalCodeHeadingAfterSearch('1019')).toBeVisible();
        });

        await test.step('And the page title should contain "Homes for sale Postal code 1019"', async () => {
            const pageTitle = await page.title();
            expect(pageTitle).toContain('Homes for sale Postal code 1019');
        });
    });
});

test.describe('Filters and Sorting Functionality in Search', () => {
    test('User applies filters and sorting options during a search', async ({ page }) => {
        const searchPage = new SearchPage(page);
        const commonPage = new CommonPage(page);

        await test.step('When I enter the city name in the search bar and select a city from the suggestions', async () => {
            await commonPage.performSearch('Amsterdam');
        });

        await test.step('Then I should see "Filters", "Save Search" and "Sorting" buttons displayed on the page', async () => {
            await expect(searchPage.filterButton).toBeVisible();
            await expect(searchPage.saveSearchButton).toBeVisible();
            await expect(searchPage.sortingButton).toBeVisible();
        });

        await test.step('When I click on the filter button and select the House filter', async () => {
            await searchPage.filterButton.click();
            await searchPage.houseCheckboxFilter.check();
        });

        await test.step('And I click on the show results button', async () => {
            await searchPage.showResultsButton.click();
        });

        await test.step('Then I should see that the House filter is selected with a count of 1', async () => {
            await expect(searchPage.filterButton).toHaveText('Filters 1');
            await expect(searchPage.houseCheckboxFilter).toBeChecked();
        });

        await test.step('When I click on the filter button and select the Price filter, choosing a price option', async () => {
            await searchPage.filterButton.click();
            await searchPage.priceFilter.selectOption('300000');
        });

        await test.step('And I click on the show results button', async () => {
            await searchPage.showResultsButton.click();
        });

        await test.step('Then I should see that the filters are updated to a count of 2', async () => {
            await expect(searchPage.filterButton).toHaveText('Filters 2');
        });

        await test.step('When I select "Price - high to low" from the sorting options', async () => {
            await searchPage.sortingButton.selectOption('price_down');
        });

        await test.step('Then I should see that the price sorting "Price - high to low" is applied, and the sorting button displays "Price"', async () => {
            const selectedOption = await searchPage.sortingButton.inputValue();
            expect(selectedOption).toBe('price_down');
            await expect(searchPage.sortingButton).toContainText('Price');
        });

        await test.step('When I select "Plot area - high to low" from the sorting options', async () => {
            await searchPage.sortingButton.selectOption('plot_area_down');
        });

        await test.step('Then I should see that the plot area sorting is selected, and the sorting button displays "Plot area"', async () => {
            const selectedOption = await searchPage.sortingButton.inputValue();
            expect(selectedOption).toBe('plot_area_down');
            await expect(searchPage.sortingButton).toContainText('Plot area');
        });
        await test.step('When I select the distance range dropdown and choose +10 KM', async () => {
            await searchPage.distanceRangeDropdown.selectOption('10km');
        });

        await test.step('Then I should see that the distance range is set to +10 km', async () => {
            const selectedOption = await searchPage.distanceRangeDropdown.inputValue();
            expect(selectedOption).toBe('10km');
            await expect(searchPage.distanceRangeDropdown).toContainText('+10 km');
        });
    });
});
