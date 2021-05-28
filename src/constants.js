export const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const FIRST_MONTH = 'May';
export const FIRST_MONTH_IDX = MONTHS.indexOf(FIRST_MONTH);

export const ORDERED_MONTHS = MONTHS.slice(FIRST_MONTH_IDX)
  .concat(MONTHS.slice(0, FIRST_MONTH_IDX));
