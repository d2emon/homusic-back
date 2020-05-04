import nconf from 'nconf';
import path from 'path';

const file = path.join(__dirname, '..', '..', 'config', 'config.json');

nconf
    .argv()
    .env()
    .file({ file });

export default nconf;
