import express from 'express';
import {
    successResponse,
    errorResponse,
} from './response';
import HttpException from '../exceptions/http';
import Album, {
    IAlbumDocument,
} from '../models/album';
import Artist from "../models/artist";

export default {
    getAlbum: (req: express.Request, res: express.Response) => Album
        .findOne({ slug: req.params.slug })
        .populate('author')
        .populate('songs')
        .then((album: IAlbumDocument) => successResponse(res, { album }))
        .catch((error: HttpException) => errorResponse(res, error)),

    addAlbum: (req: express.Request, res: express.Response) => Artist
        .findOne({ slug: req.body.author })
        .then((author) => {
            const album = new Album({
                ...req.body,
                author: author && author.id,
            });
            return album.save();
        })
        .then(album => successResponse(res, { album }))
        .catch((error: HttpException) => errorResponse(res, error)),

    updateAlbum: (req: express.Request, res: express.Response) => Album
        .updateOne({ _id: req.params.id }, req.body)
        .then((response) => Promise.all([
            response,
            Album.findById(req.params.id),
        ]))
        .then(([album, result]) => successResponse(res, { album, result }))
        .catch((error: HttpException) => errorResponse(res, error)),

    removeAlbum: (req: express.Request, res: express.Response) => Album
        .deleteOne({ slug: req.params.slug })
        .then(result => successResponse(res, { result }))
        .catch((error: HttpException) => errorResponse(res, error)),
}
