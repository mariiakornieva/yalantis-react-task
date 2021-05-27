import React from 'react';
import PropTypes from 'prop-types';
import { EmployeeType } from '../types';

export const EmployeesByMonth = ({ month, group }) => {
  return (
    <>
      <h3>{month}</h3>
      <ul className="EmployeesGroup EmployeesGroup--by-month">
        {group.map(({
          id, firstName, lastName, dob
        }) => {
          const date = new Date(dob);
          const day = date.getDate();
          const year = date.getFullYear();

          return (
            <li key={id}>
              {`${lastName} ${firstName} - ${day} ${month}, ${year} year`}
            </li>
          );
        })}
      </ul>
    </>
  );
};

EmployeesByMonth.propTypes = {
  month: PropTypes.string.isRequired,
  group: PropTypes.arrayOf(EmployeeType),
};

EmployeesByMonth.defaultProps = {
  group: [],
};