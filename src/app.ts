import bodyParser from 'body-parser'
import debug from './debug';
import express from 'express'
// import mongoose from 'mongoose'
import logger from 'morgan'
import path from 'path'
// import db from './db/mongo';
import HttpException from './exceptions';
import routes from './routes'
// import usersRouter from './routes/users';
// import artistRouter from './routes/artist';
// import albumRouter from './routes/album';
// import songRouter from './routes/song';

const publicPath = path.join(__dirname, '..', 'public');

const app =express();

app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());
app.use(express.json());
app.use(express.urlencoded());
// app.use(express.static(publicPath));

debug(`Public path: ${publicPath}`);
debug(app.locals);

// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', () => console.log('MongoDB connected'));

app.use('/', routes);
// app.use('/users', usersRouter);
// app.use('/artist', artistRouter);
// app.use('/album', albumRouter);
// app.use('/song', songRouter);

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
