import debug from './debug';
import express from 'express'
import logger from 'morgan'
import path from 'path'
import mongoDb from './db/mongo';
import NotFoundException from './exceptions/notFound';
import ErrorHandler from './handlers/error';
import routes from './routes'
// import usersRouter from './routes/users';
// import artistRouter from './routes/artist';
// import albumRouter from './routes/album';
// import songRouter from './routes/song';

const publicPath = path.join(__dirname, '..', 'public');

const app =express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded());

debug(`Public path: ${publicPath}`);
debug(app.locals);

mongoDb.on('error', error => debug(error || ''));
mongoDb.once('open', () => debug('MongoDB connected'));

app.use('/', routes);
// app.use('/users', usersRouter);
// app.use('/artist', artistRouter);
// app.use('/album', albumRouter);
// app.use('/song', songRouter);
app.use((req: express.Request, res: express.Response) => ErrorHandler(new NotFoundException(), req, res));
app.use(ErrorHandler);

export default app;
