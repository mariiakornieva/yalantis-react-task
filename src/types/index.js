import PropTypes from 'prop-types';

export const EmployeeType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  dob: function(props, propName, componentName) {
    if (isNaN(Date.parse(props[propName]))) {
      return new Error(`Invalid prop ${propName} passed to ${componentName}`);
    }
  },
});
