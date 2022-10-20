/**
 * Returns true if the string is empty, false otherwise.
 */
export default str => {
  if (str == null || str === false)
    return true;
  return str.toString().replace(/^[\s　]+|[\s　]+$/g, '') === '';
}
