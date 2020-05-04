import app from './app';
import config from './config';
import debug from './debug';

const port = config.get('PORT');

app.set('port', port);
app.listen(
    app.get('port'),
    () => debug(`Express server listening on port ${port}`),
);
