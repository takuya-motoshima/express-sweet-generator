import path from 'path';

/**
 * Express Sweet basic configuration interface.
 */
export default {
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
  default_router: '/users',

  /**
   * This is a hook that rewrites the base URL.
   * If you want to rewrite the app.locals.baseUrl property and the view's baseUrl variable, use this hook to return a new base URL.
   * The default value is the referrer's origin (eg https://example.com).
   *
   * @example
   * rewrite_base_url: baseUrl => {
   *   return `${baseUrl}/admin`;
   * }
   * 
   * @type {(baseUrl: string): string}
   */
  rewrite_base_url: baseUrl => {
    return baseUrl;
  },

  /**
  * How to determine if it is an ajax request.
  * The default is that if there is an XMLHttpRequest in the request header (req.xhr) returns true.
  * For example, if there is no XMLHttpRequest in req(express.Request) and the Ajax endpoint starts with /api, a custom Ajax decision can be made like "return /^\/api\//.test(req.path)".
  *
  * @type {(req: express.Request) => boolean}
  * @example
  * is_ajax: req => {
  *   // If the request URL begins with /api, it is assumed to be Ajax.
  *   return /^\/api/.test(req.path);
  *   // return !!req.xhr;
  * }
  */
  is_ajax: req => !!req.xhr,

  /**
   * Hooks the default behavior on request errors.
   * If unset, simply returns an error HTTP status. (<code>res.status(err.status||500).end();</code>)
   *
   * @type {(err: any, req: express.Request, res: express.Response, next: express.NextFunction) => void}
   * @example
   * hook_handle_error: (err, req, res, next) => {
   *   if (err.status === 404)
   *     // If the URL cannot be found, a 404 error screen (views/error-404.hbs) is displayed.
   *     res.render('error-404');
   *   else
   *     // For other errors, unknown error screen (views/error-unknown.hbs) is displayed.
   *     res.render('error-unknown');
   * },
   */
  hook_handle_error: undefined,
}