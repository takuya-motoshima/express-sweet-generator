import {components} from 'metronic-extension';

/**
 * Custom DataTable class extending Metronic's Datatable component.
 */
export default class extends components.Datatable {
  /**
   * Initializes the DataTable with custom options.
   * @param {string|HTMLTableElement|JQuery} table The table element selector, DOM element, or jQuery object.
   * @param {object} options The DataTable options.
   */
  constructor(table, options) {
    // Initialize options with default values.
    options = Object.assign({
      // Option to show the column visibility toggle button.
      columnVisibility: false,

      // Selector for columns to be visible by default.
      visibleColumns: undefined,
    }, options);

    if (options.columnVisibility) {
      // If column visibility option is enabled.
      // Place the column visibility toggle button in the DOM.
      options.dom = `<'row align-items-center'<'col dataTables_pager'p><'col-auto'B>><'row'<'col-12'tr>><'row'<'col-12 dataTables_pager'p>>`;

      // Add the column visibility toggle button.
      options.buttons = {
        dom: {
          button: {
            className: null,
          },
          buttonLiner: {
            tag: null,
          },
        },
        buttons: [
          {
            extend: 'colvis',
            columns: options.visibleColumns,
            text: '<i class="ki-solid ki-gear fs-1"></i>',
            // className: 'btn btn-sm btn-icon btn-color-primary btn-active-light-primary',
            className: 'btn btn-icon btn-color-gray-500 btn-active-color-primary',
            align: 'container',
          },
        ],
      };

      // Remove custom options as they are no longer needed.
      delete options.columnVisibility;
      delete options.visibleColumns;
    }

    /**
     * Generates a unique state key for the DataTable.
     * @param {object} settings DataTables settings object.
     * @return {string} The generated state key.
     */
    const getStateKey = (settings) => {
      let stateKey = settings.sTableId;
      stateKey += '_';
      stateKey += location.pathname;
      if (settings.nTable.getAttribute('data-ref')) {
        stateKey += '/_';
        stateKey += settings.nTable.getAttribute('data-ref');
      }
      return stateKey;
    };


    // // Set locale to Japanese.
    // options.locale = 'ja';

    // Save sorting criteria.
    options.stateSave = true;
    options.stateSaveCallback = (settings, data) => {
      // Save state with a name that doesn't conflict with other tables.
      localStorage.setItem(getStateKey(settings), JSON.stringify(data));
    };
    options.stateLoadCallback = (settings) => {
      // Return the saved state.
      return JSON.parse(localStorage.getItem(getStateKey(settings)));
    };
    options.stateSaveParams = (settings, data) => {
      // Don't save search criteria and offset.
      delete data.search;
      delete data.start;
    };

    super(table, options);
  }

  /**
   * Handles AJAX errors.
   * @param {number} code The HTTP status code of the error.
   * @return {void}
   */
  ajaxErrorHook(code) {
    // Log the error details.
    console.error(`DataTable AJAX error: Status code ${code}`);

    // Redirect to login page if authentication error occurs.
    if (code === 401) {
      location.replace('/');
    }
  }
}
