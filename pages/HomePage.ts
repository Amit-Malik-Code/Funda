import { Page, Locator } from '@playwright/test'

export class HomePage {

    page: Page;
    forSaleSearch: Locator
    forRentSearch: Locator;
    newlyBuiltSearch: Locator;
    recreationSearch: Locator;
    findCommercialPropertyLink: Locator;
    buyButton: Locator;
    rentButton: Locator;
    sellButton: Locator;
    favouritesLink: Locator;
    myHomeLink: Locator;
    nvmAgentLink: Locator;
    nvmAgentForBuy: Locator;
    serachButton: Locator;
    nvmAgent: Locator;


    constructor(page: Page) {
        this.page = page;
        this.forSaleSearch = page.getByRole('button', { name: 'For sale' });
        this.forRentSearch = page.getByRole('button', { name: 'For rent' });
        this.newlyBuiltSearch = page.getByRole('button', { name: 'Newly built' });
        this.recreationSearch = page.getByRole('button', { name: 'Recreation' });
        this.nvmAgentLink = page.getByRole('link', { name: 'Find an NVM agent Broker' });
        this.findCommercialPropertyLink = page.getByRole('link', { name: 'Find commercial property' });
        this.buyButton = page.locator('#headlessui-menu-button-v-0-12').getByText('Buy');
        this.rentButton = page.locator('#headlessui-menu-button-v-0-15').getByText('Rent');
        this.sellButton = page.locator('#headlessui-menu-button-v-0-18').getByText('Sell');
        this.favouritesLink = page.getByRole('link', { name: 'Favourites' });
        this.myHomeLink = page.getByRole('link', { name: 'My Home' }).locator('span');
        this.nvmAgentForBuy = page.getByTestId('intend-aankoop');
        this.serachButton = page.getByTestId('search-button');
        this.nvmAgent = page.getByRole('link', { name: 'Admiraal ERA Makelaardij', exact: true });
    }
}
