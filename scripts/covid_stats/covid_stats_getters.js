export function filterByRegion(countriesArray, region) {
  return countriesArray.filter(country => {
    return country.region.toLowerCase() === region.toLowerCase();
  })
}

export function getCountriesNames(countriesArray) {
  return countriesArray.map(country => {
    if(country.name.includes(",")) {
      return country.name.slice(0, country.name.indexOf(","))
    }
    return country.name;
  })
}

export function getConfirmedCases(countriesArray) {
  return countriesArray.map(country => {
    return country.latest_data.confirmed;
  })
}

export function getDeathCases(countriesArray) {
  return countriesArray.map(country => {
    return country.latest_data.deaths;
  })
}

export function getRecoveredCases(countriesArray) {
  return countriesArray.map(country => {
    return country.latest_data.recovered;
  })
}

export function getCriticalCases(countriesArray) {
  return countriesArray.map(country => {
    return country.latest_data.critical;
  })
}

export function getStatsByCase(countriesArray, cases) {
  return countriesArray.map(country => {
    return country.latest_data[cases] 
  })
} 

export function getTotalCases(country) {
  return country.latest_data.confirmed + country.latest_data.deaths + country.latest_data.recovered + country.latest_data.critical;
}

export function getTotalConfirmedCases(country) {
  return country.latest_data.confirmed;
}
export function getNewCases(country) {
  return country.today.confirmed;
}

export function getNewDeathCases(country) {
  return country.today.deaths;
}

export function getTotalDeaths(country) {
  return country.latest_data.deaths;
}

export function getTotalRecovered(country) {
  return country.latest_data.recovered;
}

export function getTotalCritical(country) {
  return country.latest_data.critical;
}

export function getCountryStats(country) {
  return [getTotalConfirmedCases(country), getNewCases(country), getTotalDeaths(country), getNewDeathCases(country), getTotalRecovered(country), getTotalCritical(country)]
}

