const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const text = `APP_DIR=${global.APP_DIR}`;
  res.send(text);
});
module.exports = router;