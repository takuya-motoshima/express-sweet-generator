const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('users/index');
});

module.exports = router;