import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Employee } from './Employee';
import { DispatchContext, StateContext } from '../context/StateContext';

export const EmployeesList = ({
  listName, employees, groupedBy
}) => {
  const { activeIds } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  return (
    <>
      <h3>{listName}</h3>
      <ul className={cn('EmployeesList', {
        'EmployeesList--by-lastname': groupedBy === 'lastName',
        'EmployeesList--by-month': groupedBy === 'month',
      })}>
        {employees.length ?
          employees.map(({ id, ...employee }) => (
            <li key={id}>
              <Employee
                withDob={groupedBy === 'month'}
                isActive={activeIds.includes(id)}
                {...employee}
              >
                {groupedBy === 'lastName' && <>
                  <div>
                    <input
                      type="radio"
                      id={`${id}-inactive`}
                      value="false"
                      name={`employee-${id}-activity`}
                      checked={!activeIds.includes(id)}
                      onChange={() => dispatch(['removeActiveId', id])}
                    />
                    <label htmlFor={`${id}-inactive`}>inactive</label>
                  </div>

                  <div>
                    <input
                      type="radio"
                      id={`${id}-active`}
                      value="true"
                      name={`employee-${id}-activity`}
                      checked={activeIds.includes(id)}
                      onChange={() => dispatch(['addActiveId', id])}
                    />
                    <label htmlFor={`${id}-active`}>active</label>
                  </div>
                </>}
              </Employee>
            </li>
          )) : (
            <li>
              <p>-----</p>
            </li>
          )}
      </ul>
    </>
  );
};

EmployeesList.propTypes = {
  listName: PropTypes.string,
  employees: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  ),
  groupedBy: PropTypes.string,
};

EmployeesList.defaultProps = {
  listName: '',
  employees: [],
  groupedBy: '',
};
