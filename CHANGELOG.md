# Changelog
All notable changes to this project will be documented in this file.

## [1.0.5] - 2022-07-27
### Fixed
- You can now set hook functions that are called before the view is rendered.  
    Hook functions can be used, for example, to set local variables that can be used in the view.  
    
    To use, add the beforeRender hook function to "config/view.js" as follows.
    ```js
    /**
     * Hook function just before the view is rendered.
     * For example, you can set your own local variables that can be used within the view.
     *
     * @example
     * // The message set here can be referenced in the view as {{message}}.
     * beforeRender: res => {
     *   res.loclas.message = 'Hello World';
     * }
     *
     * @type {(res: express.Response) => void}
     */
    beforeRender: res => {
      res.loclas.message = 'Hello World';
    }
    ```

## [1.0.4] - 2022-05-18
### Fixed
- Version 1.0.18 of express-sweet now supports redis as session store for authentication, so we have added the relevant options (session_store, redis_host) to the authentication configuration of the template.

## [1.0.3] - 2022-05-17
### Fixed
- Fix UX of template views.

## [1.0.2] - 2022-02-13
### Fixed
- Changed the type of 'config/authentication.js#allow_unauthenticated' from'string[]' to'(string|RegExp)[]}'.

## [1.0.1] - 2021-06-10
### Fixed
- Removed packages that don't need to be installed from the template package.json.
- Added ESM template.

    Create an EJS template application:
    ```sh
    express-sweet -o esm myapp;
    ```

    Create a CJS template application:
    ```sh
    express-sweet myapp;
    # or
    express-sweet -o cjs myapp;
    ```

[1.0.1]: https://github.com/takuya-motoshima/express-sweet-generator/compare/v1.0.0...v1.0.1
[1.0.2]: https://github.com/takuya-motoshima/express-sweet-generator/compare/v1.0.1...v1.0.2
[1.0.3]: https://github.com/takuya-motoshima/express-sweet-generator/compare/v1.0.2...v1.0.3
[1.0.4]: https://github.com/takuya-motoshima/express-sweet-generator/compare/v1.0.3...v1.0.4
[1.0.5]: https://github.com/takuya-motoshima/express-sweet-generator/compare/v1.0.4...v1.0.5