import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { DispatchContext, StateContext } from '../context/StateContext';
import { EmployeeType } from '../types';

export const EmployeesByLastname = ({ letter, group }) => {
  const { activeIds } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  return (
    <>
      <h3>{letter}</h3>
      <ul className="EmployeesGroup EmployeesGroup--by-lastname">
        {group.length ?
          group.map(({ id, firstName, lastName }) => (
            <li key={id}>
              <h3 className={cn('Employee', {
                'Employee--active': activeIds.includes(id)
              })}>
                {`${lastName} ${firstName}`}
              </h3>
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
            </li>
          )) : (
            <li>
              <h3>-----</h3>
            </li>
          )}
      </ul>
    </>
  );
};

EmployeesByLastname.propTypes = {
  letter: PropTypes.string.isRequired,
  group: PropTypes.arrayOf(EmployeeType),
};

EmployeesByLastname.defaultProps = {
  group: [],
};
