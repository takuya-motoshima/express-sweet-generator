import {Router} from 'express';
import UserModel from '../models/UserModel.js';

const router = Router();

router.get('/', async (req, res) => {
  const user = await UserModel.getUser(req.user.id);
  res.render('profile/show', {user: user.toJSON()});
});

router.get('/edit', async (req, res) => {
  const user = await UserModel.getUser(req.user.id);
  res.render('profile/edit', {user: user.toJSON()});
});

export default router;
