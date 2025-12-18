import * as expx from 'express-sweet';
import {Router} from 'express';
import {query, body} from 'express-validator';
import UserModel from '../../models/UserModel.js';
import NotFoundError from '../../errors/NotFoundError.js';
import isValidImageDataUrl from '../../validators/isValidImageDataUrl.js';
import checkValidationResult from '../../middlewares/checkValidationResult.js';

const router = Router();

router.post('/login', [
  body('email').trim().not().isEmpty().isEmail(),
  body('password').trim().not().isEmpty(),
  checkValidationResult,
], async (req, res, next) => {
  const isAuthenticated = await expx.services.Authentication.authenticate(req, res, next);
  res.json(isAuthenticated);
});

router.get('/logout', (req, res) => {
  expx.services.Authentication.logout(req);
  res.redirect('/');
});

router.get('/', [
  query('draw').not().isEmpty().isInt({min: 0}),
  query('start').not().isEmpty().isInt({min: 0}),
  query('length').not().isEmpty().isInt({min: 1}),
  query('order').not().isEmpty().isIn(['name', 'email', 'modified']),
  query('dir').optional({nullable: true, checkFalsy: true}).isIn(['asc', 'desc']),
  query('search').trim().optional({nullable: true, checkFalsy: true}).trim(),
  checkValidationResult,
], async (req, res) => {
  const data = await UserModel.paginate(req.query);
  data.draw = req.query.draw;
  res.json(data);
});

router.get('/email-exists', [
  query('user.email').trim().not().isEmpty(),
  query('excludeUserId').optional({nullable: true, checkFalsy: true}).isInt({min: 1}),
  checkValidationResult,
], async (req, res) => {
  const emailExists = await UserModel.emailExists(req.query.user.email, req.query.excludeUserId || null);
  res.json({valid: !emailExists});
}); 

router.post('/', [
  body('user.email').trim().not().isEmpty().isEmail(),
  body('user.name').trim().not().isEmpty().isLength({max: 30}),
  body('user.password').trim().not().isEmpty().isLength({max: 128}),
  body('user.icon').not().isEmpty().custom(isValidImageDataUrl),
  checkValidationResult,
], async (req, res) => {
  await UserModel.createUser(req.body.user);
  res.json(true);
});

router.get(/^\/(?<userId>\d+)$/, async (req, res) => {
  const user = await UserModel.getUser(req.params.userId);
  res.json(user.toJSON());
});

router.put(/^\/(?<userId>\d+)$/, [
  body('user.email').trim().not().isEmpty().isEmail(),
  body('user.name').trim().not().isEmpty().isLength({max: 30}),
  body('user.password').trim().optional({nullable: true, checkFalsy: true}).isLength({max: 128}),
  body('user.icon').not().isEmpty().custom(isValidImageDataUrl),
  checkValidationResult,
], async (req, res, next) => {
  try {
    await UserModel.updateUser(req.params.userId, req.body.user);
    res.json(true);
  } catch (error) {
    if (error instanceof NotFoundError)
      res.json({error: error.name});
    else
      next(error);
  }
});

router.delete(/^\/(?<userId>\d+)$/, async (req, res) => {
  await UserModel.deleteUser(req.params.userId);
  res.json(true);
});

export default router;