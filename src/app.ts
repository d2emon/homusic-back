import bodyParser from 'body-parser'
import debug from './debug';
import express from 'express'
// import mongoose from 'mongoose'
import logger from 'morgan'
import path from 'path'
import HttpException from './exceptions';
import routes from './routes'

const publicPath = path.join(__dirname, '..', 'public');

const app =express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// app.use(express.static(publicPath));

debug(`Public path: ${publicPath}`);
debug(app.locals);

app.use('/', routes);

app.use((req: express.Request, res: any, next: express.NextFunction) => {
    res
        .status(404)
        .send('Not Found');
});

if (app.get('env') === 'development') {
    app.use((err: HttpException, req: express.Request, res: express.Response) => {
        res
            .status(err.status || 500)
            .json({
                error: err.status,
                errorMessage: err.message,
                errorDetails: err
            });
    });
}

app.use((err: HttpException, req: express.Request, res: express.Response) => {
    res
        .status(err.status || 500)
        .json({
            error: err.status,
            errorMessage: err.message,
        });
});

export default app;
