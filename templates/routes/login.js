const express = require('express');
const router = express.Router();

/**
 * Login page.
 */
router.get('/', async (req, res, next) => {
  try {
    res.render('login');
  } catch(e) {
    next(e);
  }
});

module.exports = router;