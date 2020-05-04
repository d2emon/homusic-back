import express from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', (req: express.Request, res: express.Response) => res
    .redirect('/index.json'));

router.get('/index.:format?', (req: express.Request, res: express.Response) => res
    .json({}));

export default router;
