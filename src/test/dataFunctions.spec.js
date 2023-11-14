import { sortData, filterData, computeStats } from '../src/dataFunctions.js';
import { data as fakeData } from './data.js';

describe('Los datos deben tener una estructura específica', () => {
  expect.hasAssertions();

  fakeData.forEach(item => {
    expect(item).toHaveProperty('id');
    expect(item).toHaveProperty('name');
    expect(item).toHaveProperty('shortDescription');
    expect(item).toHaveProperty('description');
    expect(item).toHaveProperty('imageUrl');
    expect(item).toHaveProperty('facts');
    expect(item.facts).toHaveProperty('yearOfBirth');
    expect(item.facts).toHaveProperty('birthPlace');
    expect(item.facts).toHaveProperty('mainField');
  });
});

describe('sortData', () => {
  const fakeSortedData = [
    {
      "id": "ada-lovelace",
      "name": "Ada Lovelace"
    },
    {
      "id": "grace-hopper",
      "name": "Grace Hopper",
    },
    {
      "id": "yoko-shimomura",
      "name": "Yoko Shimomura",
    }
  ];

  it('debería ordenar los datos en orden ascendente por nombre', () => {
    const sortedData = sortData(fakeData, 'name', 'asc');

    expect(sortedData[0].name).toEqual(fakeSortedData[0].name);
  });

  it('debería ordenar los datos en orden descendente por nombre', () => {
    const sortedData = sortData(fakeData, 'name', 'desc');

    expect(sortedData[0].name).toEqual(fakeSortedData[2].name);
  });
});

describe('filterData', () => {
  it('debería devolver todos los datos si mainField está vacío', () => {
    const filteredData = filterData(fakeData, 'mainField', '');

    expect(filteredData.length).toEqual(fakeData.length);
  });

  it('debería filtrar los datos por campo principal (mainField)', () => {
    const value = 'Matemáticas';
    const filteredData = filterData(fakeData, 'mainField', value);

    for (const item of filteredData) {
      expect(item.facts.mainField).toContain(value);
    }
  });

  it('debería devolver un arreglo vacío si no hay coincidencias en el campo principal', () => {
    const value = 'Física Teórica'; // Un campo que no existe en los datos de prueba
    const filteredData = filterData(fakeData, 'mainField', value);

    expect(filteredData.length).toEqual(0);
  });
});

describe('computeStats', () => {
  it('debería calcular la longitud total de los datos', () => {
    const totalLength = computeStats(fakeData);

    expect(totalLength).toEqual(fakeData.length);
  });
});
