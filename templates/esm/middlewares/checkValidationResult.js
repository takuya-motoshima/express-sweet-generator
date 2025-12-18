import {validationResult} from 'express-validator';

/**
 * Check express-validator results. Returns 400 HTTP status if parameter is invalid.
 */
export default (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty())
    next();
  else {
    // Log request information and validation errors
    console.error('Validation failed:', {
      method: req.method,
      url: req.originalUrl,
      errors: result.array()
    });

    // Return validation errors as JSON.
    res.status(400).json({errors: result.array()});
    // res.status(400).end();
  }
}