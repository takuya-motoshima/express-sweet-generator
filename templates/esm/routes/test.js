import {Router} from 'express';
const router = Router();

router.get('/', async (req, res) => {
  const text = `APP_DIR=${global.APP_DIR}`;
  res.send(text);
});
export default router;