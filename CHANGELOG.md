# Changelog

All notable changes to this project will be documented in this file.

## [3.0.1] - 2025-09-02

### Changed

- Added connection pool configuration examples and JSDoc documentation to database configuration template.

## [3.0.0] - 2025-08-26

### Changed

- **Breaking Change**: Updated `express-sweet` dependency from v2.0.9 to v3.0.0
  - Templates now use the new `DatabaseManager` singleton pattern instead of the deprecated `Database` class
  - All generated models automatically benefit from improved database connection management and performance
  - See the [express-sweet changelog](https://github.com/takuya-motoshima/express-sweet/blob/main/CHANGELOG.md) for detailed breaking changes

### Added

- **Logging Configuration**: Added `config/logging.js` to templates for Morgan logging configuration
  - Provides centralized logging settings with configurable format and skip options
  - Default format set to 'combined' with skip property set to undefined for all requests
  - Includes comprehensive JSDoc documentation with usage examples

### Migration Notes

Generated applications using v3.0.0+ templates will automatically use the new database architecture. No manual changes are required for new projects.

For existing projects, update your `package.json` to use `express-sweet@^3.0.0` and follow the migration guide in the [express-sweet changelog](https://github.com/takuya-motoshima/express-sweet/blob/main/CHANGELOG.md).

## [2.0.23] - 2025-08-25

### Changed

- **Security Updates**: Updated dependencies to address security vulnerabilities
  - commander: 2.15.1 → 14.0.0
  - ejs: 2.6.1 → 3.1.10
  - fs-extra: 9.1.0 → 11.3.1

- **Port Configuration Enhancement**: Modified the generated application's `package.json` to include the port specified via express-sweet-generator CLI in the nodemon start script
  - The `npm start` script now uses the port specified with the `-p, --port` option
  - Example: `express-sweet -p 4000 myapp` generates `"start": "PORT=4000 nodemon ..."`

## [2.0.22] - 2025-08-12

### Changed

- Updated `express-sweet` to v2.0.9 for latest fixes and improvements.

## [2.0.21] - 2025-07-22

### Changed

- Updated template dependencies:

  - `express`: 4.19.2 → 4.21.2  
  - `express-sweet`: 2.0.5 → 2.0.7

  See the [express-sweet](https://www.npmjs.com/package/express-sweet) changelog [here](https://github.com/takuya-motoshima/express-sweet/blob/main/CHANGELOG.md).

## [2.0.20] - 2025-02-18

### Changed

- Improved error handling in the template's API client and Datatable. Specifically, added error logging to the errorHook and ajaxErrorHook methods.

## [2.0.19] - 2025-02-09

### Changed

- Reduced container padding and increased content width on tablet and smaller screens.
- Updated metronic-extension from version 3.0.15 to ^3.0.16.
- Changed the login page background to a simple blue image.

## [2.0.18] - 2025-02-04

### Changed

- Updated express-sweet package version from 2.0.3 to 2.0.5, which the template depends on.

## [2.0.17] - 2025-02-02

### Changed

- The template's express-validator result validation process (`middlewares/checkValidationResult.js`) was modified to return an error message in addition to the HTTP status 400 when the input data is invalid.

## [2.0.16] - 2025-01-31

### Changed

- Updated the Metronic extension package version from 3.0.9 to 3.0.15 for templates.

## [2.0.15] - 2025-01-30

### Changed

- Fixed front-end JS comments in templates.

## [2.0.14] - 2025-01-28

### Changed

- Fixed JSDoc and comments in the template frontend JS. 

## [2.0.13] - 2025-01-27

### Changed

- Refactored templates, endpoints, view structure, and frontend JavaScript code.

## [2.0.12] - 2025-01-19

### Changed

- Added logic to control the initial display state of the sidebar based on the sidebar minimize state (sidebar_minimize_state) stored in the cookie.

## [2.0.11] - 2025-01-17

### Changed

- Added an option to `client/webpack.config.js` in the template to allow top-level await.

    `webpack.config.js`:
    ```js
    module.exports = {
      // ... other configurations ...

      experiments: {
        topLevelAwait: true,
      },

      // ... other configurations ...
    };
    ```
- Added `log_date_format: 'YYYY-MM-DD HH:mm:ss'` to `ecosystem.config.js.ejs` for ESM and CJS templates to format PM2 log messages with timestamps.
    ```javascript
    // Instead of:
    import MyModule from '../utils/MyModule.js';

    // You can now use:
    import MyModule from '#~/utils/MyModule.js';
    ```
- Added the `log_date_format` option (`YYYY-MM-DD HH:mm:ss`) to `ecosystem.config.js.ejs` for ESM and CJS templates to specify the date format for log messages in PM2, making it easier to track the time of events in the logs. 

## [2.0.10] - 2024-12-31

### Changed

- Refactored variable names used in the skeleton processing.

## [2.0.9] - 2024-12-31

### Changed

- Validation errors in request data are now logged if the `LOG_VALIDATION_ERRORS` environment variable is set to `true` (`middlewares/checkValidationResult.js`).
- Refactor the skeleton model class.

## [2.0.8] - 2024-11-21

### Changed

- Consolidated request data validation with `express-validator` into a common middleware (`middlewares/checkValidationResult.js`).
- Renamed `shared/empty` to `shared/isEmpty`.
- Changed `shared/CustomValidation.js` to `validators/isValidImageDataUrl.js`.

## [2.0.7] - 2024-11-21

### Changed

- **Refactor:** Renamed the directory for storing custom error classes in the template from `exceptions` to `errors`.
- Removed `errors/UserNotFound` from the template and added a more general-purpose `errors/NotFoundError` class.

## [2.0.6] - 2024-11-18

### Changed

- Refactored variable names.
- Fixed a bug in the [user API](templates/client/src/api/UserApi.js) client module of templates.
- Frontend: Consolidated the datatable filtering logic within templates, introducing a shared function in [templates/client/src/shared/reloadDataTableWithDelay.js](templates/client/src/shared/reloadDataTableWithDelay.js).

## [2.0.5] - 2024-11-13

### Changed

- Added error page handling for 404 and 500 errors.
    - Added `isErrorPage` flag check to `views/layout/default.hbs`.
    - The side menu will not be displayed on error pages when `isErrorPage` is true.

    config/config.js:
    ```js
    hook_handle_error: (error, req, res, next) => {
      if (error.status === 404)
        res.status(404).render('errors/404', {isErrorPage: true});
      else
        res.status(500).render('errors/500', {isErrorPage: true});
    },
    ```

    Examples of error pages:
    * **404 Page (Not Found):**
        ![404-error.jpeg](screencaps/404-error.jpeg)
    * **500 Page (Internal Server Error):**
        ![500-error.jpeg](screencaps/500-error.jpeg)

## [2.0.4] - 2024-11-11

### Changed

- Extended [API (templates/client/src/shared/Api.js)](templates/client/src/shared/Api.js) and [Datatable (templates/client/src/shared/Datatable.js)](templates/client/src/shared/Datatable.js) classes were added to the frontend JavaScript templates.

    The login request endpoint excluded from API authentication error checks should be modified as needed according to the project.

    `client/src/shared/Api.js`:

    ```js
    /**
      * Handles API errors.
      * @param {number} code The HTTP status code.
      * @param {Error} error The error object.
      * @returns {void}
      */
    errorHook(code, error) {
      // Check if the error object and request properties exist to avoid runtime errors
      if (error && error.request && error.request.responseURL) {
        const {pathname} = new URL(error.request.responseURL);
        if (pathname !== '/api/users/login' && code === 401) {
          // Redirect to the login page if an authentication error occurs on a non-login request.
          location.replace('/');
        }
      }
    }
    ```

[2.0.5]: https://github.com/takuya-motoshima/express-sweet/compare/v2.0.4...v2.0.5
[2.0.6]: https://github.com/takuya-motoshima/express-sweet/compare/v2.0.5...v2.0.6
[2.0.7]: https://github.com/takuya-motoshima/express-sweet/compare/v2.0.6...v2.0.7
[2.0.8]: https://github.com/takuya-motoshima/express-sweet/compare/v2.0.7...v2.0.8
[2.0.9]: https://github.com/takuya-motoshima/express-sweet/compare/v2.0.8...v2.0.9
[2.0.10]: https://github.com/takuya-motoshima/express-sweet/compare/v2.0.9...v2.0.10
[2.0.11]: https://github.com/takuya-motoshima/express-sweet/compare/v2.0.10...v2.0.11
[2.0.12]: https://github.com/takuya-motoshima/express-sweet/compare/v2.0.11...v2.0.12
[2.0.13]: https://github.com/takuya-motoshima/express-sweet/compare/v2.0.12...v2.0.13
[2.0.14]: https://github.com/takuya-motoshima/express-sweet/compare/v2.0.13...v2.0.14
[2.0.15]: https://github.com/takuya-motoshima/express-sweet/compare/v2.0.14...v2.0.15
[2.0.16]: https://github.com/takuya-motoshima/express-sweet/compare/v2.0.15...v2.0.16
[2.0.17]: https://github.com/takuya-motoshima/express-sweet/compare/v2.0.16...v2.0.17
[2.0.18]: https://github.com/takuya-motoshima/express-sweet/compare/v2.0.17...v2.0.18
[2.0.19]: https://github.com/takuya-motoshima/express-sweet/compare/v2.0.18...v2.0.19
[2.0.20]: https://github.com/takuya-motoshima/express-sweet/compare/v2.0.19...v2.0.20
[2.0.21]: https://github.com/takuya-motoshima/express-sweet/compare/v2.0.20...v2.0.21
[2.0.22]: https://github.com/takuya-motoshima/express-sweet/compare/v2.0.21...v2.0.22
[2.0.23]: https://github.com/takuya-motoshima/express-sweet/compare/v2.0.22...v2.0.23
[3.0.0]: https://github.com/takuya-motoshima/express-sweet/compare/v2.0.23...v3.0.0
[3.0.1]: https://github.com/takuya-motoshima/express-sweet/compare/vv3.0.0...v3.0.1