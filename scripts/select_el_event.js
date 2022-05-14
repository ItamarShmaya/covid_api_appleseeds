import { getCountryStats, getTotalCases } from "./covid_stats/covid_stats_getters.js";
import { setChartType, displayIndividualCountry, setOnChartLabels, setChartLabelPosition, removeScales, setChartPadding, 
  setTitle, changeLegendPosition } from "./chartjs/chartjs_setters.js";
import { timelineBtn, setTimelineValue } from "./button_events.js";

export const selectElement = document.getElementById("selectCountries");
export let countryName;

export function changeSelectOptions(selectElement, array) {
  [...selectElement.children].forEach(optionEl => {
    optionEl.remove();
  })
  array.forEach(item => {
    const option = document.createElement("option");
    option.innerText = item;
    option.value = item;
    selectElement.append(option)
  })
}

export function selectCountryEvent(covidStats, chart) {
  selectElement.addEventListener("change", (e) => {
    setTimelineValue(false);
    const criticalBtn = document.querySelector("[data-type=critical]")
    criticalBtn.innerText = "Critical";
    const country = covidStats.find(country => {
      if(country.name.includes(",")) {
        return country.name.slice(0, country.name.indexOf(",")) === e.target.value;
      }
      return country.name === e.target.value;
    })
    countryName = country.name;
    const countryStats = getCountryStats(country);
    const labels = ["Total Confirmed", "New Cases", "Total Deaths", "New Deaths", "Total Recovered", "In Critical Condition"];
    setChartType(chart, "pie")
    displayIndividualCountry(chart, labels, countryStats );
    setOnChartLabels(chart);
    setChartLabelPosition(chart, "outside");
    removeScales(chart);
    setChartPadding(chart, 10);
    setTitle(chart, `${e.target.value}'s Total Cases: ${getTotalCases(country)}`);
    changeLegendPosition(chart, "left");
    if([...timelineBtn.classList].includes("hidden")) timelineBtn.classList.remove("hidden");

    chart.update();
  })
}