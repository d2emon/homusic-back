import nconf from 'nconf';
import path from 'path';

const appName = 'homusic';
const file = path.join(__dirname, '..', '..', 'config', 'config.json');

// tslint:disable-next-line
console.log(file);

nconf
    .argv()
    .env()
    .file({ file })
    .defaults({
        'APP_NAME': appName,
        'DEBUG': `${appName}:*`,
        'PORT': 3000,
        'FOLDERS.WIKI': './data/wiki',
        'FOLDERS.ARTISTS': './data/artists',
        'WIKIPEDIA.API': 'https://ru.wikipedia.org/w/api.php',
    })
    .required([
        'FOLDERS.ARTISTS',
        'FOLDERS.WIKI',
    ]);

export default nconf;
