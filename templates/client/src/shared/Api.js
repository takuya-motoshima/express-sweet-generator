import {components} from 'metronic-extension';

/**
 * Base API client class.
 */
export default class extends components.Api {
  /**
   * Initializes the API client.
   * @param {string} path The base URL for requests.
   */
  constructor(path) {
    super(path, null, {
      headers: {
        // Indicate an AJAX request to the server.
        'X-Requested-With': 'XMLHttpRequest',
      },
    });
  }

  // /**
  //  * Initializes the API client.
  //  * @param {string} path The base URL for requests.
  //  * @param {string} [origin] The origin for requests.
  //  * @param {import('axios').AxiosRequestConfig} [options] Additional options for the Axios instance.
  //  */
  // constructor(path, origin, options) {
  //   super(path, origin, Object.assign({}, {
  //     headers: {
  //       // Indicate an AJAX request to the server.
  //       'X-Requested-With': 'XMLHttpRequest',
  //     },
  //   }, options));
  // }

  /**
   * Handles API errors.
   * @param {number} code The HTTP status code.
   * @param {Error} err The error object.
   * @return {void}
   */
  errorHook(code, err) {
    // Check if the error object and request properties exist to avoid runtime errors
    if (err && err.request && err.request.responseURL) {
      const {pathname} = new URL(err.request.responseURL);
      if (pathname !== '/api/users/login' && code === 401) {
        // Redirect to the login page if an authentication error occurs on a non-login request.
        location.replace('/');
      }
    }
  }
}