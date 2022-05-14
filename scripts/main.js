import { addRegionToCovidApiCountries, fetchExtraInfoForCountries } from "./fetch_api_data.js";
import { ctx, chartInitialValues, config } from "./chartjs/chart.js";
import { addRegionButtonEvent, addCaseButtonEvent, addTimelineButtonEvent} from "./button_events.js";
import { filterByRegion, getCountriesNames, getStatsByCase } from "./covid_stats/covid_stats_getters.js";
import { changeSelectOptions, selectElement, selectCountryEvent } from "./select_el_event.js";
import { removeOnChartLabels } from "./chartjs/chartjs_setters.js"
import { hideSpinner } from "./spinner.js";

async function load() {
  let timelineStats;
  let covidStats;
  if(localStorage.getItem("covidStatsObj"))
    covidStats = JSON.parse(localStorage.getItem("covidStatsObj"));
  else covidStats = await addRegionToCovidApiCountries();
  if(localStorage.getItem("extraInfo")) 
    timelineStats = JSON.parse(localStorage.getItem("extraInfo"));
  else timelineStats = await fetchExtraInfoForCountries();

  if(covidStats) {
    const myChart = new Chart(ctx, config);
    if(timelineStats) {
      timelineStats.sort((a, b) => a.name.localeCompare(b.name));
      addTimelineButtonEvent(timelineStats, myChart);
    }
    covidStats.sort((a, b) => a.name.localeCompare(b.name));
    const countries = filterByRegion(covidStats, "africa");
    const countriesNames = getCountriesNames(countries);
    const statsByCase = getStatsByCase(countries, "confirmed");
    hideSpinner();
    removeOnChartLabels(myChart);
    chartInitialValues(myChart, "Confirmed Cases in Africa", countriesNames, statsByCase );
    changeSelectOptions(selectElement, countriesNames);
    addRegionButtonEvent(covidStats, myChart);
    addCaseButtonEvent(covidStats, timelineStats, myChart);
    selectCountryEvent(covidStats, myChart);
  } else {
    console.log("something went wrong");
  }
}

window.onload = load;