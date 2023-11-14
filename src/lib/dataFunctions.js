// Estas funciones son ejemplos, aquí puedes desarrollar tus propias funciones.
export const filterData = (data, filterBy, value) => {
  if (value === "") return data;
  return data.filter(item => item.facts[filterBy].includes(value));
};

export const sortData = (data, sortBy, sortOrder) => {
  if (sortOrder === 'asc') {
    return data.slice().sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
  } else if (sortOrder === 'desc') {
    return data.slice().sort((a, b) => b[sortBy].localeCompare(a[sortBy]));
  }
};

export const computeStats = (data) => {
  const length = data.reduce((acc) => acc + 1, 0);
  return parseInt(length);
};
