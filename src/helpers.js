export const sortEmployees = (employees, sortBy) => {
  const sorted = [...employees];

  switch (sortBy) {
    case 'lastName':
      return sorted.sort((first, second) => (
        first.lastName.localeCompare(second.lastName)
      ));
    default:
      return sorted;
  }
};

export const filterEmployees = (employees, filterBy, value) => {
  switch (filterBy) {
    case 'lastName':
      return employees.filter(({ lastName }) => (
        lastName[0].toUpperCase() === value
      ));
    case 'month':
      return employees.filter(({ dob }) => (
        new Date(dob).getMonth() === value
      ));
    case 'active':
      return employees.filter(({ id }) => value.includes(id));
    default:
      return [...employees];
  }
};
