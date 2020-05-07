import mongoose, {
    Document,
    Model,
    Schema,
} from 'mongoose';

export interface IImageDocument extends Document {
    image: string;
}

export interface IImageModel extends Model<IImageDocument> {
}

const ImageSchema = new Schema({
    image: String,
});

ImageSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
});

const Image: IImageModel = mongoose.model<IImageDocument, IImageModel>('Image', ImageSchema);

export default Image;
