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
   * @param {Error} error The error object.
   * @return {void}
   */
  errorHook(code, error) {
    // Check if the error object and request properties exist to avoid runtime errors
    if (error && error.request && error.request.responseURL) {
      // Log the error details.
      console.error(`API Error: Code ${code}, Message: ${error.message}, URL: ${error.request.responseURL}`);

      // Get the pathname from the request URL.
      const {pathname} = new URL(error.request.responseURL);

      // Define paths that should be excluded from the redirect.
      const excludedPaths = ['/api/users/login']; 

      // Redirect to the login page if an authentication error occurs on a non-login request.
      if (!excludedPaths.includes(pathname) && code === 401) {
        location.replace('/');
      }
    }
  }
}