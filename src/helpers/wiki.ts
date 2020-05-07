import Wiki from 'wikijs';
import config from '../config';

export default Wiki({
    apiUrl: config.get('WIKIPEDIA.API'),
});
