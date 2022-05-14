import { getRegionByCountryCode } from "./get_countries_data/get_countries_data.js";

async function getApiData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function fetchCovidStatsFromApi() {
  const covidURL = "https://secure-tundra-08816.herokuapp.com/https://corona-api.com/countries"
  return (await getApiData(covidURL)).data;
}

async function fetchContinentsFromApi() {
  const continentsURL = "https://secure-tundra-08816.herokuapp.com/https://restcountries.herokuapp.com/api/v1";
  return await getApiData(continentsURL); 
}

export async function addRegionToCovidApiCountries() {
  try {
    const covidCountryData = await fetchCovidStatsFromApi();
    const continentsApiData = await fetchContinentsFromApi(); 
    covidCountryData.forEach((country) => {
      let region = getRegionByCountryCode(continentsApiData, country.code);
      if(region === "Americas") region = "America";
      country.region = region
    })
    localStorage.setItem("covidStatsObj", JSON.stringify(covidCountryData));
    return covidCountryData;
  } catch (e) {
    console.log(e);
  }
}

async function generateIndividualCountryURL() {
  const covidApiData = await fetchCovidStatsFromApi();
  return covidApiData.map((country) => {
    return `https://secure-tundra-08816.herokuapp.com/http://corona-api.com/countries/${country.code}`
  })
}

export async function fetchExtraInfoForCountries() {
  const URLs = await generateIndividualCountryURL();
  const requests = URLs.map((url) => fetch(url));
  try {
    const covidApiData = await Promise.all(requests).then((responses) => Promise.all(responses.map((r) => r.json())));
    const extraInfo = covidApiData.map((country) => {
      const timeline = country.data.timeline;
      const days = country.data.timeline.length;
      const index = Math.ceil(days / 150); // 150 = the amount local storgae can handle
      return { 
        name : country.data.name,
        timeline : timeline.filter((day, i) => {
          return i % index === 0;
        })}
      });
      localStorage.setItem("extraInfo", JSON.stringify(extraInfo));
      return extraInfo;
    } catch(e) {
      console.log("something went wrong!", e);
    }
}

