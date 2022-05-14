import { defaultScales }  from "./chartjs/chart.js";
import { setChartTopLabel, setChartxAxisLabels, setChartyAxisLabels, setChartType, setAutoSkip, setDefaultScales, removeOnChartLabels,
  hideTitle, changeLegendPosition, removeLegend, setTitle } from "./chartjs/chartjs_setters.js";
import { getAutoSkip, getScales, isTitleDisplayed } from "./chartjs/chartjs_getter.js";
import { changeSelectOptions, selectElement, countryName } from "./select_el_event.js";
import { filterByRegion, getCountriesNames, getStatsByCase } from "./covid_stats/covid_stats_getters.js";
import { findCountry, getDates, getConfirmedByDates, getDeathsByDates, getRecoveredByDates, getActiveCasesByDates } from "./covid_stats/timeline_getters.js";

let title;
let currentRegion = "africa";
let currentCase = "confirmed";
export let isInTimeline = false;
export const timelineBtn = document.getElementById("timeline");

export function addCaseButtonEvent(covidStats, timelineStats, chart) {
  const caseBtns = [...document.querySelector(".cases-cotainer").children];
  caseBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      currentCase = e.target.innerText.toLowerCase();
      if(!isInTimeline || currentCase === "critical") {
        timelineBtn.classList.add("hidden");
        title = `${currentCase[0].toUpperCase() + currentCase.slice(1)} Cases in ${currentRegion[0].toUpperCase() + currentRegion.slice(1)}`;
        setChartTopLabel(chart, title);
        updateChart(covidStats, chart);
        removeOnChartLabels(chart);
        if(chart.config._config.options.plugins.title && isTitleDisplayed(chart)) hideTitle(chart);
        changeLegendPosition(chart, "top");
        chart.update();
      } else {
        if(timelineStats) updateTimeLineChart(timelineStats, countryName, chart);
      }
    })
  })
}

export function addRegionButtonEvent(covidStats, chart) {
  const regionBtns = [...document.querySelector(".regions-container").children]
  regionBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      isInTimeline = false;
      const criticalBtn = document.querySelector("[data-type=critical]")
      criticalBtn.innerText = "Critical";
      if(![...timelineBtn.classList].includes("hidden")) {
        timelineBtn.classList.add("hidden");
        currentCase = "confirmed";
      }
      currentRegion = e.target.innerText.toLowerCase();
      title = `${currentCase[0].toUpperCase() + currentCase.slice(1)} Cases in ${currentRegion[0].toUpperCase() + currentRegion.slice(1)}`;
      setChartTopLabel(chart, title);
      updateChart(covidStats, chart);
      if(Object.keys(getScales(chart)).length === 0) setDefaultScales(chart, defaultScales)
      if(window.innerWidth < 1000) {
        if(!getAutoSkip(chart)) setAutoSkip(chart, true);
      }
      else {
        if(!getAutoSkip(chart) && currentRegion === "world") setAutoSkip(chart,true);
        else if(getAutoSkip(chart)) setAutoSkip(chart, false);
      }
      removeOnChartLabels(chart);
      if(chart.config._config.options.plugins.title && isTitleDisplayed(chart)) hideTitle(chart);
      changeLegendPosition(chart, "top");
      chart.update();
    })
  })
}

export function addTimelineButtonEvent(timelineStats, chart) {
  timelineBtn.addEventListener("click", () => {
    isInTimeline = true;
    const criticalBtn = document.querySelector("[data-type=critical]")
    criticalBtn.innerText = "Active";
    setChartType(chart, "line");
    removeLegend(chart);
    updateTimeLineChart(timelineStats, countryName, chart);
  })
}

function updateChart(covidStats, chart) {
  let countries = covidStats;
  if(currentRegion !== "world") countries = filterByRegion(covidStats, currentRegion)
    const countriesNames = getCountriesNames(countries);
    const statsByCase = getStatsByCase(countries, currentCase);
    setChartxAxisLabels(chart, countriesNames);
    setChartyAxisLabels(chart, statsByCase);
    changeSelectOptions(selectElement, countriesNames)
    setChartType(chart, "bar");
}

function updateTimeLineChart(timelineStats, countryName, chart) {
  const country = findCountry(timelineStats, countryName);
  const dates = getDates(country, countryName).reverse();
  switch(currentCase) {
    case "critical" :
    case "confirmed" :
      const confirmedByDates = getConfirmedByDates(country).reverse();
      setChartyAxisLabels(chart, confirmedByDates);
      setChartTopLabel(chart, `Confirmed Cases in ${countryName}`);
      setTitle(chart, `Confirmed Cases in ${countryName}`)
      break;
    case "deaths" :
      const deathsByDates = getDeathsByDates(country).reverse();
      setChartyAxisLabels(chart, deathsByDates);
      setChartTopLabel(chart, `Death Cases in ${countryName}`);
      setTitle(chart, `Death Cases in ${countryName}`)
      break;
    case "recovered" :
      const recoveredByDates = getRecoveredByDates(country).reverse();
      setChartyAxisLabels(chart, recoveredByDates);
      setChartTopLabel(chart, `Recovered Cases in ${countryName}`);
      setTitle(chart, `Recovered Cases in ${countryName}`)
      break;
    case "active" :
      const activeCasesdByDates = getActiveCasesByDates(country).reverse();
      setChartyAxisLabels(chart, activeCasesdByDates);
      setChartTopLabel(chart, `Active Cases in ${countryName}`);
      setTitle(chart, `Active Cases in ${countryName}`)
      break;
  }
  setChartxAxisLabels(chart, dates);
  chart.update();
}

export function setTimelineValue(boolean) {
  isInTimeline = boolean;
}