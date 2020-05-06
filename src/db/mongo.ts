import mongoose from 'mongoose';
import config from '../config';

export const connect = mongoose.connect(config.get('MONGO_URI'), { useNewUrlParser: true });

export default mongoose.connection;
