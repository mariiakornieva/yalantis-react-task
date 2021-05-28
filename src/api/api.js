export const fetchEmployees = () => {
  return fetch(process.env.REACT_APP_API_URL)
    .then((response) => response.json());
};
