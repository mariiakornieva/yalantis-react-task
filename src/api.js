const USERS_API_URL = 'https://yalantis-react-school-api.yalantis.com/api/task0/users';

export const fetchEmployees = () => {
  return fetch(USERS_API_URL)
    .then(response => response.json());
};
