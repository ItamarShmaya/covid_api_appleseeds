export function getDates(country, ) {
  return country.timeline.map(data => {
    return data.date;
  })
}
export function getConfirmedByDates(country, ) {
  return country.timeline.map(data => {
    return data.confirmed;
  })
}
export function getDeathsByDates(country, ) {
  return country.timeline.map(data => {
    return data.deaths
  })
}
export function getRecoveredByDates(country, ) {
  return country.timeline.map(data => {
    return data.recovered;
  })
}

export function findCountry(timelineStats, countryName) {
  return timelineStats.find(country => {
    return country.name === countryName;
  })
}

export function getActiveCasesByDates(country, ) {
  return country.timeline.map(data => {
    return data.active;
  })
}