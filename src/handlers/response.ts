import express from 'express';
import config from '../config';
import debug from '../debug';
import HttpException from '../exceptions/http';

export const successResponse = (res: express.Response, data: any) => res.json(data);

export const errorResponse = (res: express.Response, error: HttpException) => {
    debug(error);
    return res
        // .status((error.code === 'ENOENT') ? 404 : 500)
        .status(error.status || 500)
        .json({
            error: error.status,
            errorMessage: error.message, // error.toString,
            errorDetails: config.get('DEBUG.ERRORS') ? error : undefined,
        });
}
