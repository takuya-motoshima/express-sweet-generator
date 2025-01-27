import {Router} from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.render('users/index');
});

export default router;