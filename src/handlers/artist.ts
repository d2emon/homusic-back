import express from 'express';
import ErrorHandler from './error';
import HttpException from '../exceptions/http';
import {
    capitalize,
    slugToTitle,
} from '../helpers/title';
import Artist, {
    IArtistDocument,
} from '../models/artist';

class ArtistHandler {
    req: express.Request;

    res: express.Response;

    constructor(req: express.Request, res: express.Response) {
        this.req = req;
        this.res = res;
    }

    find(letter?: string, title?: string, query?: {}) {
        const response = letter
            ? Artist.findByLetter(letter)
            : Artist.find(query);
        return response
            .sort({ name: 1 })
            .then((artists: IArtistDocument[]) => this.responseArtists(title, letter, artists))
            .catch(error => this.responseError(error))
    }

    responseArtists(title?: string, letter?: string, processed: IArtistDocument[] = []) {
        return Artist
            .getUnprocessed(letter)
            .then((response: string[]) => response.map((slug) => ({
                name: slugToTitle(slug),
                slug,
                unprocessed: true,
            })))
            .then((unprocessed:IArtistDocument[]) => [
                ...processed,
                ...unprocessed,
            ])
            .then((artists: IArtistDocument[]) => this.res.json({
                artists,
                title: title || capitalize(letter),
            }));
    }

    responseError(error: HttpException) {
        return ErrorHandler(error, this.req, this.res);
    }
}

export default ArtistHandler;
