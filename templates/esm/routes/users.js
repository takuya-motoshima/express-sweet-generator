import {Router} from 'express';
import UserModel from '../models/UserModel.js';

const router = Router();

router.get('/', (req, res) => {
  res.render('users');
});

router.get('/personal', async (req, res) => {
  const user = await UserModel.getUser(req.user.id);
  res.render('personal', {user: user.toJSON()});
});

router.get('/edit-personal', async (req, res) => {
  const user = await UserModel.getUser(req.user.id);
  res.render('edit-personal', {user: user.toJSON()});
});

export default router;