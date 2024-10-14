import { test, expect } from '@playwright/test';
import { HousesHelper } from '../../helpers/HouseHelper';
import { searchData } from '../resources/searchDataInput';

test.describe('Funda API Tests', () => {
  let housesHelper: HousesHelper;

  test.beforeEach(async ({ request }) => {
    housesHelper = new HousesHelper(request);
  });

  test('User should retrieve property listings that match search criteria', async () => {
    const response = await housesHelper.searchHouses();

    expect(response.status()).toBe(searchData.responseCode);

    const data = await response.json();

    expect(data).toHaveProperty('listings');
    expect(data.listings[0]).toHaveProperty('price');

    const propertyPrices = housesHelper.getPriceFromString(data.listings[0].price);

    expect(propertyPrices).toBeGreaterThanOrEqual(searchData.lowerBandPrice);
    expect(propertyPrices).toBeLessThanOrEqual(searchData.upperBandPrice);

    expect(data.listings[0]).toHaveProperty('agentName');
    expect(data.listings[0]).toHaveProperty('address');
    expect(data.listings[0]).toHaveProperty('listingUrl');
  });
});
