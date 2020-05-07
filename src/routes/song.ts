import express from 'express';
import SongHandler from '../handlers/song';

const router = express.Router();

router.get('/:slug', SongHandler.getSong);

router.post('/', SongHandler.addSong);

router.put('/:id', SongHandler.updateSong);

router.delete('/:slug', SongHandler.removeSong);

export default router;
