// import * as expx from 'express-sweet';
import {Router} from 'express';
import {body} from 'express-validator';
import UserModel from '../../models/UserModel.js';
import NotFoundError from '../../errors/NotFoundError.js';
import isValidImageDataUrl from '../../validators/isValidImageDataUrl.js';
import checkValidationResult from '../../middlewares/checkValidationResult.js';

const router = Router();

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

export default router;