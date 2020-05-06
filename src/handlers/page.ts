import express from 'express';
import ErrorHandler from './error';
import HttpException from '../exceptions/http';
import Page from '../models/page';

class PageHandler {
    req: express.Request;

    res: express.Response;

    constructor(req: express.Request, res: express.Response) {
        this.req = req;
        this.res = res;
    }

    responsePages() {
        return Page
            .all()
            .then(pages => this.res.json({ pages }))
            .catch(error => this.responseError(error))
    }

    responsePage(filename: string) {
        return Page
            .find(filename)
            .then(page => this.res.json({ page }))
            .catch(error => this.responseError(error))
    }

    responseError(error: HttpException) {
        return ErrorHandler(error, this.req, this.res);
    }
}

export default PageHandler;
