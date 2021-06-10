import {Router} from 'express';
const router = Router();

/**
 * Home page.
 */
router.get('/', (req, res) => {
  res.render('home');
});

export default router;