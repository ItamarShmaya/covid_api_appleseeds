export function getRegionByCountryCode(countriesArray, countryCode) {
   return countriesArray.find(countryObj => {
    return countryCode === countryObj.cca2;
  }).region;
}