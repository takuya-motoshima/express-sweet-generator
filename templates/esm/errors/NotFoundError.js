/**
 * Custom error class for "Not Found" errors.
 */
export default class extends Error {
  /**
   * Creates a new NotFoundError instance.
   * @param {string} [message='The requested record could not be found.'] - The error message.
   */
  constructor(message = 'The requested record could not be found.') {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404; // HTTP status code for "Not Found"
  }
}