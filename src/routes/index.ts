import express from 'express';
import PageHandler from '../handlers/page';

const router = express.Router();

/* GET home page. */
router.get('/', (req: express.Request, res: express.Response) => res.redirect('/artists'));

router.get('/pages', PageHandler.responsePages);

router.get('/page/:filename', PageHandler.responsePage);

export default router;
