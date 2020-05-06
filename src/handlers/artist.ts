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
}
