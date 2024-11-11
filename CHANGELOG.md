# Changelog
All notable changes to this project will be documented in this file.

## [2.0.4] - 2024/11/11
### Changed
- Extended [API (templates/client/src/shared/Api.js)](templates/client/src/shared/Api.js) and [Datatable (templates/client/src/shared/Datatable.js)](templates/client/src/shared/Datatable.js) classes were added to the frontend JavaScript templates.

    The login request endpoint excluded from API authentication error checks should be modified as needed according to the project.

    `client/src/shared/Api.js`:

    ```js
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
    ```

[2.0.4]: https://github.com/takuya-motoshima/express-sweet/compare/v2.0.3...v2.0.4