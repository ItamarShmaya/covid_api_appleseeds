export function hideSpinner() {
  const spinner = document.querySelector(".spinner");
  const chartContainer = document.querySelector(".chart-container");
  chartContainer.classList.remove("hidden");
  setTimeout(() => {
    chartContainer.classList.remove("opacity-0");
  }, 100);
  spinner.classList.add("hidden");
}