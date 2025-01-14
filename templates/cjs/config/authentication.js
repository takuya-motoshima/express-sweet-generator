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
   * The session store instance, defaults to a new MemoryStore(memory) instance.
   * @type {'memory|redis'}
   */
  session_store: 'memory',

  /**
   * The name of the session ID cookie to set in the response (and read from in the request).
   * The default value is 'connect.sid'.
   * @type {string|undefined}
   */
  cookie_name: 'connect.sid',

  /**
   * Specifies the boolean value for the Secure Set-Cookie attribute.
   * The default is true, which sets the Secure attribute on the cookie.
   * @type {boolean|undefined}
   */
  cookie_secure: false,

  /**
   * Specifies the boolean value for the HttpOnly Set-Cookie attribute. 
   * Defaults to true, which sets the HttpOnly attribute on the cookie.
   * @type {boolean|undefined}
   */
  cookie_httpOnly: true,

  /**
   * If the session is stored in "redis", this field is required and should be set to the hostname of the Redis server.
   * For example, to connect to redis on localhost on port 6379, set "redis://localhost:6379".
   * To connect to a different host or port, use a connection string in the format "redis[s]://[[username][:password]@][host][:port][/db-number]".
   * For example, "redis://alice:foobared@awesome.redis.server:6380".
   * @type {string|undefined}
   */
  redis_host: undefined,

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
   * @type {string|((req: express.Request, res: express.Response) => string)}
   * @example
   * // Set the URL to redirect to in case of login failure as a string.
   * failure_redirect: '/login',
   *
   * // Dynamically set the url to redirect to on login failure.
   * failure_redirect: (req, res) => {
   *   // If the role stored in the cookie is admin, redirect to the admin login screen.
   *   return req.cookies.role === 'admin' ? '/adminlogin' : 'login';
   * },
   */
  failure_redirect: '/login',

  /**
   * This hook is called when authenticating a user.
   * Please find the user information that owns the credentials based on the user name and password you received and return it.
   * If the user who owns the credentials cannot be found, return null.
   *
   * Note that the user information must include an ID value that can identify the user.
   * 
   * @type {(username: string, password: string, req: express.Request) => Promise<{[key: string]: any}|null>}
   */
  authenticate_user: async (username, password, req) => {
    return UserModel.findOne({
      where: {
        email: username,
        password
      },
      raw: true
    });
  },

  /**
   * This hook is called when user authentication is successful.
   * Please search and return the authenticated user information to be set in the session based on the user ID of the parameter.
   * The returned data will be set in the req.user property and the view's session variable.
   * 
   * @type {(id: number|string) => Promise<{[key: string]: any}>}
   */
  subscribe_user: async (id) => {
    return UserModel.findOne({
      where: {id},
      raw: true
    });
  },

  /**
   * URL without authentication. If the URL described in the access URL partially matches, authentication will not be performed, defaults to none.
   * @type {(string|RegExp)[]}
   */
  allow_unauthenticated: [
    '/api/users/login'
  ],

  /**
   * Authenticated user session expiration, defaults to 24 hours (24 * 3600000).
   * @type {number}
   */
  expiration: 24 * 3600000,
}