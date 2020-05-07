import express from 'express';
import AlbumHandler from '../handlers/album';

const router = express.Router();

router.get('/:slug', AlbumHandler.getAlbum);

router.post('/', AlbumHandler.addAlbum);

router.put('/:id', AlbumHandler.updateAlbum);

router.delete('/:slug', AlbumHandler.removeAlbum);

export default router;
