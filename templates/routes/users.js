const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');

/**
 * User edit page.
 */
router.get('/:id(\\d+)', async (req, res, next) => {
  try {
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
  } catch(e) {
    next(e);
  }
});

/**
 * User addition page.
 */
router.get('/new', async (req, res, next) => {
  try {
    res.render('user', {edit: false});
  } catch(e) {
    next(e);
  }
});

/**
 * Users page.
 */
router.get('/', async (req, res, next) => {
  try {
    res.render('users');
  } catch(e) {
    next(e);
  }
});

module.exports = router;