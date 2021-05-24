const UserModel = require('../models/UserModel');

/**
 * User authentication configuration interface.
 */
module.exports = {
  /**
   * Enable user authentication, defaults to disabled (false).
   * @type {boolean}
   */
  enabled: true,

  /**
   * Authentication user ID field name, defaults to `username`.
   * @type {string}
   */
  username: 'email',

  /**
   * Authentication password field name, defaults to `password`.
   * @type {string}
   */
  password: 'password',

  /**
   * URL to redirect after successful authentication, defaults to `/`.
   * @type {string}
   */
  success_redirect: '/',

  /**
   * URL to redirect after log off, defaults to `/login`.
   * @type {string}
   */
  failure_redirect: '/login',

  /**
   * Model class used for authentication, this is a required field.
   * @type {typeof Model}
   */
  model: UserModel,

  /**
   * URL without authentication. If the URL described in the access URL partially matches, authentication will not be performed, defaults to none.
   * @type {string}
   */
  allow_unauthenticated: ['/api'],

  /**
   * Authenticated user session expiration, defaults to 24 hours (24 * 3600000).
   * @type {number}
   */
  expiration: 24 * 3600000
}