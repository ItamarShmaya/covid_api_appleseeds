export function getChartType(chart) {
  return chart.$context.type
}

export function getChartxAxisLabels(chart) {
  return chart.data.labels;
}

export function getChartLabel(chart) {
  return chart.data.datasets[0].label;
}

export function getChartyAxisLabels(chart) {
  return chart.data.datasets[0].data;
}

export function getAutoSkip(chart) {
  return chart.config._config.options.scales.x.ticks.autoSkip;
}

export function getScales(chart) {
  return chart.config._config.options.scales;
}

export function isTitleDisplayed(chart) {
  return  chart.config._config.options.plugins.title.display 
}

export function getChartTitle (chart) {
  return chart.config._config.options.plugins.title.text;
}