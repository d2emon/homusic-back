import mongoose, {
    Document,
    Model,
    Schema,
} from 'mongoose';

export interface ISongDocument extends Document {
    title: string;
    author: Schema.Types.ObjectId,
    album: Schema.Types.ObjectId,
    slug: string;
    text: string;
}

export interface ISongModel extends Model<ISongDocument> {
}

const SongSchema = new Schema({
    title: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Artist'
    },
    album: {
        type: Schema.Types.ObjectId,
        ref: 'Album'
    },
    slug: String,
    text: String,
});

SongSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
});

const Song: ISongModel = mongoose.model<ISongDocument, ISongModel>('Song', SongSchema);

export default Song;
