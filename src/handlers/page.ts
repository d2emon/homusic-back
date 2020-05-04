import express from 'express';
import ErrorHandler from './error';
import debug from '../debug';
import HttpException from '../exceptions';
import Page from '../models/page';

class PageHandler {
    res: express.Response;

    constructor(req: express.Request, res: express.Response) {
        this.res = res;
    }

    responsePages() {
        return Page
            .all()
            .then(pages => this.res.json({ pages }))
            .catch(this.responseError);
    }

    responsePage(filename: string) {
        return Page
            .find(filename)
            .then(page => this.res.json({ page }))
            .catch(this.responseError);
    }

    responseError(error: HttpException) {
        debug(error);
        return ErrorHandler(this.res, error)
    }
}

export default PageHandler;
