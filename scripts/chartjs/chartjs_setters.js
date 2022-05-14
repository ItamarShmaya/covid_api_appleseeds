export function setChartType(chart, type) {
  chart.config.type = type;
}

export function setChartxAxisLabels(chart, labelsArray) {
  chart.data.labels = labelsArray;
}

export function setChartTopLabel(chart, title) {
  chart.data.datasets[0].label = title;
}

export function setChartyAxisLabels(chart, labelsArray) {
  chart.config._config.data.datasets[0].data = labelsArray;
}

export function displayIndividualCountry(chart, labels, stats) {
  setChartxAxisLabels(chart, labels);
  setChartyAxisLabels(chart, stats)
}

export function setChartColors(chart, colorArray) {
  chart.data.datasets[0].backgroundColor = colorArray;
}
export function setChartBorderColors(chart, colorArray) {
  chart.data.datasets[0].borderColor = colorArray;
}

export function setAutoSkip(chart, boolean) {
  chart.config._config.options.scales.x.ticks.autoSkip = boolean;
}

export function setOnChartLabels(chart) {
  if(!chart.config._config.options.plugins.labels) chart.config._config.options.plugins.labels = {};
  chart.config._config.options.plugins.labels.render = (context) => {
    const sum = context.dataset.data.reduce((a, b) => {
      return a + b;
    })
    return context.value
  };  
}

export function removeOnChartLabels(chart) {
  if(!chart.config._config.options.plugins.labels) chart.config._config.options.plugins.labels = {};
  chart.config._config.options.plugins.labels.render = (context) => {
    const sum = context.dataset.data.reduce((a, b) => {
      return a + b;
    })
    return "";
  };  
}

export function setChartLabelPosition(chart, position) {
  chart.config._config.options.plugins.labels.position = position;
}

export function removeScales(chart) {
  delete chart.config._config.options.scales;
}

export function setDefaultScales(chart, scales) {
  chart.config._config.options.scales = scales;
}

export function setChartPadding(chart, padding) {
  if(!chart.config._config.options.layout) chart.config._config.options.layout = {};
  chart.config._config.options.layout.padding = padding;
}

export function setTitle(chart, title) {
  if(!chart.config._config.options.plugins.title) chart.config._config.options.plugins.title = {};
  chart.config._config.options.plugins.title.display = true;
  chart.config._config.options.plugins.title.text = title;
}

export function hideTitle(chart) {
  chart.config._config.options.plugins.title.display = false;
}

export function changeLegendPosition(chart, position) {
  if(!chart.config._config.options.plugins.legend) chart.config._config.options.plugins.legend = {};
  chart.config._config.options.plugins.legend.display = true;
  chart.config._config.options.plugins.legend.position = position;
}

export function removeLegend(chart) {
  chart.config._config.options.plugins.legend.display = false;
}