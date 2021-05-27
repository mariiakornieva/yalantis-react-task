import React, { useEffect, useMemo, useCallback, useContext } from 'react';
import './App.css';

import { DispatchContext, StateContext } from './context/StateContext';
import { EmployeesByLastname } from './components/EmployeesByLastname';
import { EmployeesByMonth } from './components/EmployeesByMonth';
import { sortEmployees, filterEmployees } from './helpers'
import { API_URL, ALPHABET, MONTHS } from './constants';
import { fetchEmployees } from './api';

function App() {
  const dispatch = useContext(DispatchContext);
  const { employees, activeIds } = useContext(StateContext);

  useEffect(() => {
    fetchEmployees()
      .then(employees => dispatch(['setEmployees', employees]))
      .catch(reason => console.warn(`Failed to load employees; Reason = ${reason}`));
  }, []);

  const sortedEmployees = useMemo(() => (
    sortEmployees(employees, 'lastName')
  ), [employees]);

  const groupedByLastname = useMemo(() => (
    ALPHABET.split('')
      .map(letter => filterEmployees(sortedEmployees, 'lastName', letter))
  ), [sortedEmployees]);

  const activeEmployees = useMemo(() => (
    filterEmployees(sortedEmployees, 'active', activeIds)
  ), [sortedEmployees, activeIds]);

  const groupedByMonth = useMemo(() => {
    return MONTHS.map((month, idx) => (
      filterEmployees(activeEmployees, 'month', idx)
    ));
  }, [activeEmployees]);

  return (
    <div className="App">
      <div className="Employees">
        <h2 className="title">Employees</h2>
        <ul className="EmployeesList">
          {ALPHABET.split('').map((letter, idx) => (
            <li key={letter} className="EmployeesList__item">
              <EmployeesByLastname
                letter={letter}
                group={groupedByLastname[idx]}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="EmployeesBDays">
        <h2 className="title EmployeesBDays__title">Employees Birthday</h2>
        {groupedByMonth.some(month => month.length > 0) ? (
          <ul className="EmployeesBDays__content">
            {MONTHS.map((month, idx) => (
              groupedByMonth[idx]?.length > 0 && (
                <li key={month}>
                  <EmployeesByMonth
                    month={month}
                    group={groupedByMonth[idx]}
                  />
                </li>
              )
            ))}
          </ul>
        ) : (
            <p className="EmployeesBDays__content">Employees List is empty</p>
        )}
      </div>
    </div>
  );
}

export default App;
