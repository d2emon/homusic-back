import express from 'express';
import ArtistHandler from '../handlers/artist';

const router = express.Router();

router.get('/:slug', ArtistHandler.getArtist);

router.get('/:slug/page', ArtistHandler.getArtistPage);

router.get('/wikipedia/:name', ArtistHandler.getArtistWiki);

router.post('/', ArtistHandler.addArtist);

router.put('/:id', ArtistHandler.updateArtist);

router.delete('/:slug', ArtistHandler.removeArtist);

export default router;
