/**
 * Checks if a string is empty or contains only whitespace characters.
 * @param {string|null|false} str The string to check.
 * @return {boolean} True if the string is empty or contains only whitespace, false otherwise.
 */
export default str => {
  if (str == null || str === false)
    return true;
  return str.toString().trim() === '';
}