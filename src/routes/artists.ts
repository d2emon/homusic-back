import express from 'express';
import ArtistHandler from '../handlers/artist';

const router = express.Router();

router.get('/', ArtistHandler.getAll);

router.get('/other', ArtistHandler.getOther);

router.get('/num', ArtistHandler.getNum);

router.get('/:language/:letter', ArtistHandler.byLetter);

export default router;
