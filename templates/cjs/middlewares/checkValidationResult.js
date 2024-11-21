const {validationResult} = require('express-validator');

/**
 * Check express-validator results. Returns 400 HTTP status if parameter is invalid.
 */
module.exports = (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty())
    next();
  else
    res.status(400).end();
    // res.status(400).json({errors: result.array()});
}