import express from 'express';
import {
    capitalize,
    slugToTitle,
} from '../helpers/title';
import Artist, {
    IArtistDocument,
} from '../models/artist';
import getLetter from "../helpers/letters";
import {
    successResponse,
    errorResponse,
} from './response';
import {DocumentQuery} from "mongoose";
import HttpException from "../exceptions/http";

const injectUnprocessed = (processed: IArtistDocument[], letter?: string): Promise<IArtistDocument[]> => Artist
    .getUnprocessed(letter)
    .then((response: string[]) => response.map((slug) => ({
        name: slugToTitle(slug),
        slug,
        unprocessed: true,
    })))
    .then((unprocessed:IArtistDocument[]) => [
        ...processed,
        ...unprocessed,
    ]);

const find = (
    res: express.Response,
    query: DocumentQuery<IArtistDocument[], IArtistDocument>,
    title: string,
    letter?: string,
) => query
    .sort({ name: 1 })
    .then((artists: IArtistDocument[]) => injectUnprocessed(artists, letter))
    .then((artists: IArtistDocument[]) => successResponse(res, { artists, title }))
    .catch((error: HttpException) => errorResponse(res, error));

export default {
    byLetter: (req: express.Request, res: express.Response) => {
        const {
            language,
            letter,
        } = req.params;
        if (!language || !letter) return errorResponse(res, new HttpException(400, 'No letter'));
        const translated = getLetter(language, letter) || letter;
        return find(
            res,
            Artist.findByLetter(letter),
            capitalize(translated),
            translated,
        );
    },

    getAll: (req: express.Request, res: express.Response) => find(
        res,
        Artist.find({}),
        'Все',
    ),

    getOther: (req: express.Request, res: express.Response) => find(
        res,
        Artist.find({ name: null }),
        'Разные песни',
    ),

    getNum: (req: express.Request, res: express.Response) => find(
        res,
        Artist.findByLetter('[0-9]'),
        '#',
        '[0-9]',
    ),

    getArtist: (req: express.Request, res: express.Response) => Artist
        .findOne({ slug: req.params.slug })
        .populate('albums')
        .populate('songs')
        .then((artist: IArtistDocument) => artist)
        // .then((artist: IArtistDocument) => artist || Artist.findInWikipedia({ name: Artist.slugToName(slug), slug })
        // .then(artist => Artist.files(slug).then(files => ({ artist, files })))
        .then(artist => Artist
            .files(req.params.slug)
            .then((files) => {
                artist.pages = [
                    ...(artist.pages || []),
                    ...(files || []),
                ];
                return artist;
            }))
        .then(artist => Artist
            .descriptionFile(req.params.slug)
            .then(description => {
                artist.description = artist.description || (description ? description.text : '');
                return artist;
            }))
        .then(artist => successResponse(res, { artist }))
        .catch((error: HttpException) => errorResponse(res, error)),

    getArtistPage: (req: express.Request, res: express.Response) => Artist
        .file(req.params.slug, req.query.page as string)
        .then(page => successResponse(res, { page }))
        .catch((error: HttpException) => errorResponse(res, error)),

    getArtistWiki: (req: express.Request, res: express.Response) => Artist
        .findInWikipedia({ name: req.params.name })
        .then(artist => successResponse(res, { artist }))
        .catch((error: HttpException) => errorResponse(res, error)),

    addArtist: (req: express.Request, res: express.Response) => {
        const artist = new Artist(req.body);
        return artist.save()
            .then(response => successResponse(res, { artist: response }))
            .catch((error: HttpException) => errorResponse(res, error))
    },

    updateArtist: (req: express.Request, res: express.Response) => Artist
        .updateOne({ _id: req.params.id }, req.body)
        .then((response) => Promise.all([
            response,
            Artist.findById(req.params.id),
        ]))
        .then(([artist, result]) => successResponse(res, { artist, result }))
        .catch((error: HttpException) => errorResponse(res, error)),

    removeArtist: (req: express.Request, res: express.Response) => Artist
        .deleteOne({ slug: req.params.slug })
        .then(result => successResponse(res, { result }))
        .catch((error: HttpException) => errorResponse(res, error)),
}
