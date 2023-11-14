import data from '../data/dataset.js';
import { getUniqueFields, createDropdownOptions } from '../components/view.js';

export function Home() {
  const uniqueFields = getUniqueFields(data, 'mainField');
  const dropdownOptions = createDropdownOptions(uniqueFields);

  return `
    <main>
        <h2>📌 ¡Conócelas e interactúa con ellas! 🔍</h2>
      <section id="controls">
        <label for="filterByField">Filtrar por área:</label>
        <select data-testid="select-filter" name="mainField" id="filterByField">
          ${dropdownOptions}
        </select>

        <label for="sortByOrder">Ordenar por:</label>
        <select data-testid="select-sort" name="name" id="sortByOrder">
          <option value="asc">Ordenar por nombre A-Z</option>
          <option value="desc">Ordenar por nombre Z-A</option>
        </select>

        <button id="clearFilters" data-testid="button-clear">Limpiar Filtros</button>
      </section>

      <p id="stats">|| Total de personajes mostrados: <span id="count"></span> ||</p>

      <div class="itemsContainer"><div>
    </main>
  `;
}
