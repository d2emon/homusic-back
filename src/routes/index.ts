import express from 'express';
import ArtistHandler from '../handlers/artist';
import PageHandler from '../handlers/page';
import getLetter from '../helper/letters/index';
import HttpException from '../exceptions';

const router = express.Router();

/* GET home page. */
router.get('/', (req: express.Request, res: express.Response) => res
    .redirect('/index.json'));

router.get('/index.:format?', (req: express.Request, res: express.Response) => res
    .json({}));

router.get('/artists/:language/:letter', (req: express.Request, res: express.Response) => {
    const {
        language,
        letter,
    } = req.params;
    const handler = new ArtistHandler(req, res);
    if (!language || !letter) return handler.responseArtists(undefined, letter);
    const translated = getLetter(language, letter);
    return translated
        ? handler.find(translated)
        : handler.responseArtists(undefined);
});

router.get('/artists/:special', (req: express.Request, res: express.Response) => {
    const {
        special,
    } = req.params;
    const handler = new ArtistHandler(req, res);
    if (special === 'all') {
        return handler.find(undefined, 'Все');
    } else if (special === 'other') {
        return handler.find(undefined, 'Разные песни', { name: null });
    } else if (special === 'num') {
        return handler.find(undefined, '[0-9]', '#');
    } else {
        return handler.responseError(new HttpException(400, 'Unknown special query'));
    }
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
