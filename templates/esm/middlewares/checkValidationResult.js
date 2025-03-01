import {validationResult} from 'express-validator';

/**
 * Check express-validator results. Returns 400 HTTP status if parameter is invalid.
 */
export default (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty())
    next();
  else {
    // Log validation errors only if LOG_VALIDATION_ERRORS is enabled
    if (process.env.LOG_VALIDATION_ERRORS === 'true')
      console.error('Validation errors:', result.array());

    // Return validation errors as JSON.
    res.status(400).json({errors: result.array()});
    // res.status(400).end();
  }
}