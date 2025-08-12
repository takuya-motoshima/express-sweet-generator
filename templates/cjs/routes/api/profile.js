const express = require('express');
// const expx = require('express-sweet');
const {body} = require('express-validator');
const UserModel = require('../../models/UserModel');
const NotFoundError = require('../../errors/NotFoundError');
const isValidImageDataUrl = require('../../validators/isValidImageDataUrl');
const checkValidationResult = require('../../middlewares/checkValidationResult');

const router = express.Router();

router.put('/', [
  body('user.email').trim().not().isEmpty().isEmail(),
  body('user.name').trim().not().isEmpty().isLength({max: 30}),
  body('user.password').trim().optional({nullable: true, checkFalsy: true}).isLength({max: 128}),
  body('user.icon').not().isEmpty().custom(isValidImageDataUrl),
  checkValidationResult,
], async (req, res, next) => {
  try {
    await UserModel.updateUser(req.user.id, req.body.user);
    res.json(true);
  } catch (error) {
    if (error instanceof NotFoundError)
      res.json({error: error.name});
    else
      next(error);
  }
});

module.exports = router;