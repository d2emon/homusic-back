import express from 'express';
import ArtistHandler from '../handlers/artist';
import PageHandler from '../handlers/page';

const router = express.Router();

/* GET home page. */
router.get('/', (req: express.Request, res: express.Response) => res
    .redirect('/index.json'));

router.get('/index.:format?', (req: express.Request, res: express.Response) => res
    .json({}));

router.get('/artists/all', (req: express.Request, res: express.Response) => {
    const handler = new ArtistHandler(req, res);
    return handler.getAll();
});

router.get('/artists/other', (req: express.Request, res: express.Response) => {
    const handler = new ArtistHandler(req, res);
    return handler.getOther();
});

router.get('/artists/num', (req: express.Request, res: express.Response) => {
    const handler = new ArtistHandler(req, res);
    return handler.getNum();
});

router.get('/artists/:language/:letter', (req: express.Request, res: express.Response) => {
    const handler = new ArtistHandler(req, res);
    return handler.byLetter(req.params.language, req.params.letter);
});

router.get('/pages', (req: express.Request, res: express.Response) => {
    const handler = new PageHandler(req, res);
    return handler.responsePages();
});

router.get('/page/:filename', (req: express.Request, res: express.Response) => {
    const handler = new PageHandler(req, res);
    return handler.responsePage(req.params.filename);
});

export default router;
