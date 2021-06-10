import {Router} from 'express';
const router = Router();

/**
 * Login page.
 */
router.get('/', (req, res) => {
  res.render('login');
});

export default router;