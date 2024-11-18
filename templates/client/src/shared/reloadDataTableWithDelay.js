/**
 * Reloads a DataTable after a specified delay.
 * @param {object} dataTable The DataTable instance to reload.
 * @param {number} delay The delay in milliseconds before reloading.
 */
export default (dataTable, delay = 500) => {
  let timer;
  return function() { // Preserve the timer using a closure
    clearTimeout(timer);
    timer = setTimeout(() => dataTable.reload(), delay);
  };
}