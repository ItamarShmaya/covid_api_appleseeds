import { setChartTopLabel, setChartxAxisLabels, setChartyAxisLabels, setChartColors, setChartBorderColors} from "./chartjs_setters.js";
import { generateBgColor, generateBorderColor } from "./colors.js";

export const ctx = document.getElementById('myChart').getContext('2d');

export function chartInitialValues(chart, title, xAxis, yAxis) {
    setChartTopLabel(chart, title);
    setChartxAxisLabels(chart, xAxis);
    setChartyAxisLabels(chart, yAxis);
    const bgColors = generateBgColor(xAxis.length);
    const borderColor = generateBorderColor(bgColors);
    setChartColors(chart, bgColors);
    setChartBorderColors(chart, borderColor);
    chart.update();
}

export const config = {
  type: "bar",
  data: {
      labels: [],
      datasets: [{
          label: "",
          data: [],
          backgroundColor: [],
          borderColor: [],
          borderWidth: 1
      }]
  },
  options: {
      scales: {
          x: {
            ticks: {
              autoSkip: false,
              // maxRotation: 90,
              minRotation: 60
            }
          },
          y: {
              beginAtZero: true,
              display: true
          }
      },
      legend: {
        Position : "bottom"
      }
  }
}

export const defaultScales = {
    x: {
      ticks: {
        autoSkip: false,
        // maxRotation: 90,
        minRotation: 60
      }
    },
    y: {
        beginAtZero: true,
        display: true
    }
}