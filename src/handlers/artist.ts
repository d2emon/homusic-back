import express from 'express';
import ErrorHandler from './error';
import debug from '../debug';
import HttpException from '../exceptions';
import {
    capitalize,
    slugToTitle,
} from '../helper/title';
import Artist, {
    ArtistInterface,
    ArtistResponse,
} from '../models/artist';

class ArtistHandler {
    res: express.Response;

    constructor(req: express.Request, res: express.Response) {
        this.res = res;
    }

    find(letter?: string, title?: string, query?: {}) {
        const response: ArtistResponse = letter
            ? Artist.findByLetter(letter)
            : Artist.find(query);
        return response
            .sort({ name: 1 })
            .then(artists => this.responseArtists(title, letter, artists))
            .catch(this.responseError)
    }

    responseArtists(title?: string, letter?: string, processed: ArtistInterface[] = []) {
        return Artist
            .getUnprocessed(letter)
            .then((response) => response.map((slug) => ({
                name: slugToTitle(slug),
                slug,
                unprocessed: true,
            })))
            .then((unprocessed: ArtistInterface[]) => [
                ...processed,
                ...unprocessed,
            ])
            .then((artists) => this.res.json({
                artists,
                title: title || capitalize(letter),
            }));
    }

    responseError(error: HttpException) {
        debug(error);
        return ErrorHandler(this.res, error)
    }
}

export default ArtistHandler;
