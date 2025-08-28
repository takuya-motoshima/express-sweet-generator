const isEmpty = require('../shared/isEmpty');

/**
 * Validates if a value is a valid image Data URL.
 * @param {string} value The value to validate.
 * @returns {boolean} True if the value is a valid image Data URL or empty, otherwise throws an error.
 * @throws {Error} If the value is not a valid image Data URL format.
 */
module.exports = (value) => {
  if (isEmpty(value))
    return true; // Empty values are considered valid
  const dataUrlRegex = /^data:image\/[\w-+\d.]+;\w+,/;
  if (!dataUrlRegex.test(value))
    throw new Error('Invalid image Data URL format.');
  return true;
}