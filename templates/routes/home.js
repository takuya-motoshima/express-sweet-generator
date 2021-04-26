const express = require('express');
const router = express.Router();

/**
 * Home page.
 */
router.get('/', async (req, res, next) => {
  try {
    res.render('home');
  } catch(e) {
    next(e);
  }
});

module.exports = router;