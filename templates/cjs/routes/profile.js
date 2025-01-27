const express = require('express');
const UserModel = require('../models/UserModel');

const router = express.Router();

router.get('/', async (req, res) => {
  const user = await UserModel.getUser(req.user.id);
  res.render('profile/show', {user: user.toJSON()});
});

router.get('/edit', async (req, res) => {
  const user = await UserModel.getUser(req.user.id);
  res.render('profile/edit', {user: user.toJSON()});
});

module.exports = router;