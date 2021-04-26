const path = require('path');
const UserModel = require('../models/UserModel');

/**
 * Express Sweet configuration interface.
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
   * @type {string}
   */
  max_body_size: '100mb',

  /**
   * Absolute path to the router directory, defaults to `<application root directory>/routes`.
   * @type {string}
   */
  router_dir: path.join(process.cwd(), 'routes'),

  /**
   * The endpoint to run when the root URL is requested, defaults to none (undefined).
   * @type {string}
   */
  default_router: '/home',

  /**
   * Absolute path to the directory where the view files are located, defaults to `<application root directory>/views`.
   * @type {string}
   */
  views_dir: path.join(process.cwd(), 'views'),

  /**
   * Path to partials templates, one or several directories, defaults to `<application root directory>/views/partials`.
   * @type {string|string[]}
   */
  views_partials_dir: path.join(process.cwd(), 'views/partials'),

  /**
   * Path to layout templates, defaults to `<application root directory>/views/layout`.
   * @type {string}
   */
  views_layouts_dir: path.join(process.cwd(), 'views/layout'),

  /**
   * Absolute path to default layout template. defaults to `<application root directory>/views/layout/default.hbs`.
   * @type {string}
   */
  views_default_layout: path.join(process.cwd(), 'views/layout/default.hbs'),

  /**
   * Extension for templates & partials, defaults to `.hbs`,
   * @type {string}
   */
  views_extension: '.hbs',

  /**
   * Enable user authentication, defaults to disabled (false).
   * @type {boolean}
   */
  auth_enabled: true,

  /**
   * Authentication user ID field name, defaults to `username`.
   * @type {string}
   */
  auth_username: 'email',

  /**
   * Authentication password field name, defaults to `password`.
   * @type {string}
   */
  auth_password: 'password',

  /**
   * URL to redirect after successful authentication, defaults to `/`.
   * @type {string}
   */
  auth_success_redirect: '/',

  /**
   * URL to redirect after log off, defaults to `/login`.
   * @type {string}
   */
  auth_failure_redirect: '/login',

  /**
   * Model class used for authentication, this is a required field.
   * @type {typeof Model}
   */
  auth_model: UserModel,

  /**
   * URL without authentication. If the URL described in the access URL partially matches, authentication will not be performed, defaults to none.
   * @type {string}
   */
  auth_exclude: ['/test', '/api'],

  /**
   * .Authenticated user session expiration, defaults to 24 hours (24 * 3600000).
   * @type {number}
   */
  auth_expiration: 24 * 3600000
}