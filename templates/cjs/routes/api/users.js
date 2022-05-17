const express = require('express');
const router = express.Router();
const UserModel = require('../../models/UserModel');
const Authentication = require('express-sweet').services.Authentication;

// Login.
router.post('/login', async (req, res, next) => {
  const isAuthenticated = await Authentication.authenticate(req, res, next);
  res.json(isAuthenticated);
});

// Logout.
router.get('/logout', (req, res) => {
  Authentication.logout(req);
  res.redirect('/');
});

// Get a list of users.
router.get('/', async (req, res) => {
  const data = await UserModel.paginate({
    offset: req.query.offset,
    limit: req.query.limit,
    search: req.query.search,
    order: req.query.order,
    dir: req.query.dir
  });
  data.draw = req.query.draw;
  res.json(data);
});

// Create User.
router.post('/', async (req, res) => {
  // Email duplication check.
  const emailExists = (await UserModel.count({
    where: {
      email: req.body.email
    }
  })) > 0;

  // Returns an error if the email exists.
  if (emailExists)
    return void res.json({error: 'Email is already in use.'});

  // Add new user.
  const result = await UserModel.create({
    email: req.body.email,
    password: req.body.password,
    name: req.body.name
  });

  // Returns the ID of the added user.
  res.json({id: result.id});
});

// Update User.
router.put('/:id(\\d+)', async (req, res) => {
  // Email duplication check.
  const emailExists = (await UserModel.count({
    where: {
      id: {[UserModel.Op.ne]: req.params.id},
      email: req.body.email
    }
  })) > 0;

  // Returns an error if the email exists.
  if (emailExists)
    return void res.json({error: 'Email is already in use.'});

  // Update data.
  const set = {
    email: req.body.email,
    name: req.body.name
  };

  // Password with leading and trailing spaces removed.
  const password = req.body.password.replace(/(^[\s　]+)|([\s　]+$)/g, '');

  // If there is a password entered, set the password in the update data.
  if (password)
    set.password = password;

  // Update user data.
  await UserModel.update(set, {
    where: {
      id: req.params.id
    }
  });
  res.json(true);
});

// Delete user.
router.delete('/:id(\\d+)', async (req, res) => {
  await UserModel.destroy({where: {id: req.params.id}});
  res.json(true);
});

module.exports = router;