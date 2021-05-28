import React, { useEffect, useMemo, useContext } from 'react';
import './App.css';

import { DispatchContext, StateContext } from './context/StateContext';
import { EmployeesList } from './components/EmployeesList';
import { sortEmployees, filterEmployees } from './helpers'
import { ALPHABET, MONTHS, FIRST_MONTH_IDX, ORDERED_MONTHS } from './constants';
import { fetchEmployees } from './api/api';

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
    const grouped = MONTHS.map((month, idx) => (
      filterEmployees(activeEmployees, 'month', idx)
    ));

    return grouped.slice(FIRST_MONTH_IDX).concat(grouped.slice(0, FIRST_MONTH_IDX));
  }, [activeEmployees]);

  return (
    <div className="App">
      <div className="Employees">
        <h2 className="Title">Employees</h2>

        <ul className="Alphabet">
          {ALPHABET.split('').map((letter, idx) => (
            <li key={letter} className="Alphabet__item">
              <EmployeesList
                groupedBy="lastName"
                listName={letter}
                employees={groupedByLastname[idx]}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="EmployeesBDays">
        <h2 className="Title EmployeesBDays__title">
          Employees Birthday
        </h2>

        {groupedByMonth.some(month => month.length > 0) ? (
          <ul className="MonthsList">
            {ORDERED_MONTHS.map((month, idx) => (
              groupedByMonth[idx]?.length > 0 && (
                <li key={month}>
                  <EmployeesList
                    groupedBy="month"
                    listName={month}
                    employees={groupedByMonth[idx]}
                  />
                </li>
              )
            ))}
          </ul>
        ) : (
          <p className="MonthsList">
            Employees List is empty
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
