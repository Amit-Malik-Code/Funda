import { searchData } from '../tests/resources/searchDataInput';
import { APIRequest, APIRequestContext, Page } from 'playwright';
import { searchPayload } from '../models/SearchPaylaodModel';

export class HousesHelper {
  constructor(private request: APIRequestContext) { }

  searchHouses() {
    return this.request.post(searchData.searchUrl, {
      data: searchPayload,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  getPriceFromString(priceString: string): number {
    return parseFloat(priceString.replace(/[^0-9.-]+/g, ""));
  }
}
