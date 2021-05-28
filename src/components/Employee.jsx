import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { MONTHS } from '../constants';

export const Employee = ({
  firstName, lastName, dob, withDob, isActive, children
}) => {
  const getDateStr = useCallback(() => {
    const date = new Date(dob);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    return `${day} ${MONTHS[month]}, ${year} year`;
  }, [dob]);

  return (
    <>
      <p
        className={cn('Employee', {
          'Employee--active': isActive,
        })}
      >
        {`${lastName} ${firstName}`}
        {withDob && ` - ${getDateStr()}`}
      </p>
      {children}
    </>
  );
};

Employee.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  dob: function (props, propName, componentName) {
    if (isNaN(Date.parse(props[propName]))) {
      return new Error(`Invalid prop ${propName} passed to ${componentName}`);
    }
  },
  withDob: PropTypes.bool,
  isActive: PropTypes.bool,
  children: PropTypes.any,
};

Employee.defaultProps = {
  firstName: '',
  lastName: '',
  dob: '',
  withDob: false,
  isActive: false,
  children: null,
};
