const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');

// Edit User.
router.get('/:id(\\d+)', async (req, res) => {
  // Find a user that matches your ID.
  const user = await UserModel.findByPk(req.params.id, {
    attributes: ['id', 'email', 'name'],
    raw: true
  });

  // Redirect to user list if user not found.
  if (!user)
    return void res.redirect('/users');

  // Display user edit page.
  res.render('user', {user, edit: true});
});

// Create User.
router.get('/new', async (req, res) => {
  res.render('user', {edit: false});
});

// User List.
router.get('/', async (req, res) => {
  res.render('users');
});

module.exports = router;