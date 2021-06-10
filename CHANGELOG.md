# Changelog

All notable changes to this project will be documented in this file.

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

[1.0.1]:
