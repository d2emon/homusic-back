import express from 'express';
import HttpException from '../exceptions';

export default (res: express.Response, error: HttpException) => res
    .status((error.code === 'ENOENT') ? 404 : 500)
    .json({ error: error.toString() });
