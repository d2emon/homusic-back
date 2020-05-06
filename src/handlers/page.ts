import express from 'express';
import Page from '../models/page';
import {
    successResponse,
    errorResponse,
} from './response';

export default {
    responsePages: (req: express.Request, res: express.Response) => Page
        .all()
        .then(pages => successResponse(res, { pages }))
        .catch(error => errorResponse(res, error)),
    responsePage: (req: express.Request, res: express.Response) => Page
        .find(req.params.filename)
        .then(page => successResponse(res, { page }))
        .catch(error => errorResponse(res, error)),
};
