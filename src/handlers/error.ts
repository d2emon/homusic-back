import express from 'express';
import config from '../config';
import debug from '../debug';
import HttpException from '../exceptions/http';

const errorResponse = (error: HttpException) => ({
    error: error.status,
    errorMessage: error.message,
    // errorMessage: error.toString,
    errorDetails: config.get('DEBUG.ERRORS') ? error : undefined,
});

const errorHandler = (error: HttpException, req: express.Request, res: express.Response, next: express.NextFunction) => res
    // .status((error.code === 'ENOENT') ? 404 : 500)
    .status(error.status || 500)
    .json(errorResponse(error));

export default (error: HttpException, req: express.Request, res: express.Response, next: express.NextFunction) => {
    debug(error);
    return errorHandler(error, req, res, next);
};
