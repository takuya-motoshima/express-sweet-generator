/**
 * Logging configuration interface.
 */
module.exports = {
  /**
   * Morgan logging format. Common formats: 'combined', 'common', 'dev', 'short', 'tiny'
   * You can also define custom format string, defaults to 'combined'.
   * @type {string}
   * @example
   * ```js
   * // Use predefined format
   * format: 'combined',
   * 
   * // Use custom format
   * format: ':method :url :status :res[content-length] - :response-time ms',
   * ```
   */
  format: 'combined',

  /**
   * Function to determine if logging should be skipped for a request.
   * Return true to skip logging, false to log the request, defaults to none (undefined).
   * @type {(req: express.Request, res: express.Response) => boolean}
   * @example
   * ```js
   * // Skip logging for successful requests
   * skip: (req, res) => res.statusCode < 400,
   * 
   * // Skip logging for specific routes
   * skip: (req, res) => req.path === '/health',
   * 
   * // Skip logging in test environment
   * skip: (req, res) => process.env.NODE_ENV === 'test',
   * ```
   */
  skip: undefined
}