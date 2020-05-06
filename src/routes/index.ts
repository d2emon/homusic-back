import express from 'express';
import ArtistHandler from '../handlers/artist';
import PageHandler from '../handlers/page';

const router = express.Router();

/* GET home page. */
router.get('/', (req: express.Request, res: express.Response) => res.redirect('/index.json'));

router.get('/index.:format?', (req: express.Request, res: express.Response) => res.json({}));

router.get('/artists/all', ArtistHandler.getAll);

router.get('/artists/other', ArtistHandler.getOther);

router.get('/artists/num', ArtistHandler.getNum);

router.get('/artists/:language/:letter', ArtistHandler.byLetter);

router.get('/pages', PageHandler.responsePages);

router.get('/page/:filename', PageHandler.responsePage);

export default router;
