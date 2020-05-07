import express from 'express';
import {
    successResponse,
    errorResponse,
} from './response';
import HttpException from '../exceptions/http';
import Album, {IAlbumDocument} from '../models/album';
import Song, {ISongDocument} from "../models/song";
import Artist, {IArtistDocument} from "../models/artist";

type SongRelations = [
    IArtistDocument,
    IAlbumDocument,
]

export default {
    getSong: (req: express.Request, res: express.Response) => Song
        .findOne({ slug: req.params.slug })
        .populate('author')
        .populate('album')
        .then((song: ISongDocument) => successResponse(res, { song }))
        .catch((error: HttpException) => errorResponse(res, error)),

    addSong: (req: express.Request, res: express.Response) => Promise.all([
        Artist.findOne({ slug: req.body.author }),
        Album.findOne({ slug: req.body.album }),
    ])
        .then(([author, album]: SongRelations) => {
            const song = new Song({
                ...req.body,
                author: author && author.id,
                album: album && album.id,
            });
            return song.save();
        })
        .then(song => successResponse(res, { song }))
        .catch((error: HttpException) => errorResponse(res, error)),

    updateSong: (req: express.Request, res: express.Response) => Song
        .updateOne({ _id: req.params.id }, req.body)
        .then((response) => Promise.all([
            response,
            Song.findById(req.params.id),
        ]))
        .then(([song, result]) => successResponse(res, { song, result }))
        .catch((error: HttpException) => errorResponse(res, error)),

    removeSong: (req: express.Request, res: express.Response) => Song
        .deleteOne({ slug: req.params.slug })
        .then(result => successResponse(res, { result }))
        .catch((error: HttpException) => errorResponse(res, error)),
}
