import path from 'node:path';

/**
 * View's configuration interface.
 */
export default {
  /**
   * Absolute path to the directory where the view files are located, defaults to `<application root directory>/views`.
   * @type {string}
   */
  views_dir: path.join(process.cwd(), 'views'),

  /**
   * Path to partials templates, one or several directories, defaults to `<application root directory>/views/partials`.
   * @type {string|string[]}
   */
  partials_dir: path.join(process.cwd(), 'views/partials'),

  /**
   * Path to layout templates, defaults to `<application root directory>/views/layout`.
   * @type {string}
   */
  layouts_dir: path.join(process.cwd(), 'views/layout'),

  /**
   * Absolute path to default layout template. defaults to `<application root directory>/views/layout/default.hbs`.
   * @type {string}
   */
  default_layout: path.join(process.cwd(), 'views/layout/default.hbs'),

  /**
   * Extension for templates & partials, defaults to `.hbs`,
   * @type {string}
   */
  extension: '.hbs',

  /**
   * Hook function just before the view is rendered.
   * For example, you can set your own local variables that can be used within the view.
   * @type {(res: express.Response) => Promise<void>|void}
   * @example
   * // The message set here can be referenced in the view as {{message}}.
   * beforeRender: (req, res) => {
   *   res.locals.extra = 'Extra';
   * }
   */
  beforeRender: (req, res) => {
    // Set the initial sidebar state from the cookie, defaulting to 'off'.
    res.locals.sidebar_minimize_state = req.cookies.sidebar_minimize_state || 'off';
    // console.log('Sidebar minimize state from cookie:', req.cookies.sidebar_minimize_state);
  }
}