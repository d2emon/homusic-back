import mongoose, {
    Document,
    Model,
    Schema,
} from 'mongoose';
import {ISongDocument} from "./song";

export interface IAlbumDocument extends Document {
    title: string;
    author: Schema.Types.ObjectId,
    slug: string;
    description: string;
    songs: ISongDocument[];
}

export interface IAlbumModel extends Model<IAlbumDocument> {
}

const AlbumSchema = new Schema({
    title: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Artist'
    },
    slug: String,
    description: String,
});

AlbumSchema.virtual('songs', {
    ref: 'Song',
    localField: '_id',
    foreignField: 'album',
});

AlbumSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
});

const Album: IAlbumModel = mongoose.model<IAlbumDocument, IAlbumModel>('Album', AlbumSchema);

export default Album;
