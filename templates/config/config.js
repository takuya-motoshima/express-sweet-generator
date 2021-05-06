const path = require('path');

/**
 * Express Sweet basic configuration interface.
 */
module.exports = {
  /**
   * Environment variable file (.env) path, defaults to none (undefined).
   * @type {string}
   */
  env_path: '.env',

  /**
   * CORS permission, defaults to invalid (false).
   * @type {{enabled: boolean}}
   */
  cors_enabled: true,

  /**
   * Maximum body size you can request, defaults to `100kb`.
   * @type {string|number}
   */
  max_body_size: '100kb',

  /**
   * Absolute path to the router directory, defaults to `<application root directory>/routes`.
   * @type {string}
   */
  router_dir: path.join(process.cwd(), 'routes'),

  /**
   * The endpoint to run when the root URL is requested, defaults to none (undefined).
   * @type {string}
   */
  default_router: '/home'
}