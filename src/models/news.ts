import mongoose, {
    Document,
    Model,
    Schema,
} from 'mongoose';

export interface INewsDocument extends Document {
    date: Date,
    text: string;
}

export interface INewsModel extends Model<INewsDocument> {
}

const NewsSchema = new Schema({
    date: Date,
    text: String,
});

NewsSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
});

const News: INewsModel = mongoose.model<INewsDocument, INewsModel>('News', NewsSchema);

export default News;
