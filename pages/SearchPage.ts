import { Page, Locator } from '@playwright/test'

export class SearchPage {

    page: Page;
    filterButton: Locator;
    houseCheckboxFilter: Locator;
    priceFilter: Locator;
    showResultsButton: Locator;
    sortingButton: Locator;
    distanceRangeDropdown: Locator;
    saveSearchButton: Locator;
    removeAllLocationsButton: Locator;
    addLocationButton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.addLocationButton = page.locator('[data-test-id="search-box-button"]');
        this.filterButton = page.locator('[data-test-id="filter-count-button"]');
        this.houseCheckboxFilter = page.locator('[data-test-id="house-checkbox-filter"] label div');
        this.priceFilter = page.locator('[data-test-id="price-filter"] [data-test-id="minmax-filter-min"] [data-test-id="ui-select"]');
        this.showResultsButton = page.locator('[data-test-id="show-results"]');
        this.saveSearchButton = page.getByRole('button', { name: 'Save search' });
        this.sortingButton = page.locator('[data-test-id="sorting-dropdown"]');
        this.removeAllLocationsButton = page.getByRole('button', { name: 'Remove all locations' });
        this.distanceRangeDropdown = page.locator('[data-test-id="search-box-button"]').getByRole('combobox');
    }

    getHeadingAfterSearch(searchTerm: string) {
        return this.page.locator(`h1:has-text("homes for sale in ${searchTerm}")`);
    }

    getPostalCodeHeadingAfterSearch(searchTerm: string) {
        return this.page.locator(`h1:has-text("homes for sale in Postal code ${searchTerm}")`);
    }
}
