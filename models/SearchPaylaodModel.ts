import { searchData } from '../tests/resources/searchDataInput';

export const searchPayload = {
  aggregationType: searchData.aggregationType,
  constructionType: searchData.constructionType,
  geoInformation: searchData.geoInformation,
  offeringType: searchData.offeringType,
  zoning: searchData.zoning,
  price: {
    priceRangeType: searchData.priceRangeType,
    lowerBound: searchData.lowerBandPrice,
    upperBound: searchData.upperBandPrice,
  },
  cultureInfo: searchData.cultureInfo,
};
