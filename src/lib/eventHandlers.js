import { filterData, sortData, computeStats } from "./dataFunctions.js";
import { renderItems } from "../components/view.js";
import data from "../data/dataset.js";

let manipulatedData = data;

// Esta función necesita ser definida antes de setupEventListeners para que pueda ser usada dentro de ella
function updateDisplay(dataToDisplay) {
  const root = document.querySelector(".itemsContainer");
  const countElement = document.querySelector("#count");

  const filterSelect = document.querySelector('select[name="mainField"]');
  const sortSelect = document.querySelector('select[name="name"]');
  const filteredData = filterData(dataToDisplay, 'mainField', filterSelect.value);
  const sortedData = sortData(filteredData, 'name', sortSelect.value);
  root.innerHTML = renderItems(sortedData);
  countElement.textContent = computeStats(sortedData);

  const personItems = document.querySelectorAll('.scientist-card');
  personItems.forEach(item => item.addEventListener('click', onPersonClick));
}

export function setupEventListeners() {

  const filterSelect = document.querySelector('select[name="mainField"]');
  const sortSelect = document.querySelector('select[name="name"]');
  const clearFiltersButton = document.getElementById("clearFilters");

  filterSelect.addEventListener("change", (e) => {
    manipulatedData = filterData(data, 'mainField', e.target.value);
    updateDisplay(manipulatedData);
  });

  sortSelect.addEventListener("change", () => {
    updateDisplay(manipulatedData);
  });

  clearFiltersButton.addEventListener("click", () => {
    filterSelect.value = "";
    sortSelect.value = "asc";
    manipulatedData = data; // Restablecer manipulatedData a los datos originales
    updateDisplay(manipulatedData);
  });

  // Inicializa la vista con los datos actuales
  updateDisplay(manipulatedData);
}

function onPersonClick(event) {
  // Buscar el elemento más cercano con la clase 'person-item'
  const personElement = event.target.closest('.scientist-card');
  if (personElement) {
    const personId = personElement.getAttribute('data-id');
    if (personId) {
      // Redireccionar a la página de detalles del personaje
      window.location.href = `/detail-${personId}`;
    }
  }
}
