import mongoose, {
    Document,
    DocumentQuery,
    Model,
    Schema,
} from 'mongoose';
import config from '../config';
import debug from '../debug';
// import wiki from '../helpers/wiki';
import { slugToTitle } from '../helpers/title';
import {
    getFiles,
    getFoldersByLetter,
    getFile,
    FileData,
} from '../helpers/folders';
import exp from "constants";

export interface IArtistDocument extends Document {
    name: string;
    slug: string;
    description: string;
    pages: string[];
    unprocessed: boolean;
    albums: [];
    songs: [];
}

export interface IArtistModel extends Model<IArtistDocument> {
    descriptionFile: (slug: string) =>  Promise<FileData | null>;
    file: (slug: string, filename: string) => Promise<FileData | null>;
    files: (slug: string) => Promise<string[]>;
    findByLetter: (letter: string) => DocumentQuery<IArtistDocument[], IArtistDocument>;
    findInWikipedia: (query: WikiQuery) => Promise<WikiAnswer>,
    findSlugByLetter: (letter: string) => DocumentQuery<IArtistDocument[], IArtistDocument>;
    getUnprocessed: (letter: string) => Promise<string[]>;
    slugToName: (slug: string) => string;
}

interface WikiQuery {
    name?: string;
    slug?: string;
}

interface WikiAnswer {
    // ...props,
    name: string;
    wikiLink: string;
    // title,
    description: string;
    image: string;
    genre: string;
    genres: string;
    // info,
    // raw: page.raw,
    unprocessed: boolean;
}

const artistsPages = config.get('FOLDERS.ARTISTS');

const ArtistSchema = new Schema({
    name: String,
    slug: String,
    description: String,
    pages: [String],
});

ArtistSchema.virtual('albums', {
    ref: 'Album',
    localField: '_id',
    foreignField: 'author',
});

ArtistSchema.virtual('songs', {
    ref: 'Song',
    localField: '_id',
    foreignField: 'author',
});

ArtistSchema.static('findByLetter', function (letter: string): DocumentQuery<IArtistDocument[], IArtistDocument> {
    if (!letter) return this.find();
    return this.find({
        name: {
            $regex: `^${letter}`,
            $options: 'i',
        },
    });
});

ArtistSchema.static('findSlugByLetter', function (letter: string): DocumentQuery<IArtistDocument[], IArtistDocument> {
    if (!letter) return this.find();
    return this.find({
        slug: {
            $regex: `^${letter}`,
            $options: 'i',
        },
    });
});

ArtistSchema.static('getUnprocessed', function (letter: string): Promise<string[]> {
    if (letter === '') return Promise.resolve([]);
    return getFoldersByLetter(artistsPages, letter)
        .then(files => (
            this.findSlugByLetter(letter)
                .then((artists: IArtistDocument[]) => artists.map(artist => artist.slug))
                .then((artists: string[]) => files.filter(file => artists.indexOf(file) < 0))
        ));
});

ArtistSchema.static('slugToName', slugToTitle);

ArtistSchema.static('findInWikipedia', (query: WikiQuery): Promise<WikiAnswer> => {
    /*
    wiki
    .page(name)
    .then(page => ({
        name,
        slug,
        page,
        unprocessed: true,
    }))
    .catch(() => ({
        name,
        slug,
        unprocessed: true,
    }))
    .then((artist) => {
        const {
            page,
            ...props
        } = artist;
        if (!page) return artist;
        return Promise.all([
            // page.info('название'),
            page.summary(),
            page.mainImage(),
            page.info('жанр'),
            page.info('жанры'),
            // page.fullInfo(),
        ])
    });
     */
    return Promise.resolve([
        '',
        '',
        '',
        '',
    ])
        .then((
            [
                // title,
                description,
                image,
                genre,
                genres,
                // info,
            ],
        ) => ({
            // ...props,
            name: 'page.raw.title',
            wikiLink: 'page.raw.fullurl',
            // title,
            description,
            image,
            genre,
            genres,
            // info,
            // raw: page.raw,
            unprocessed: true,
        }));
});

ArtistSchema.static('files', (slug: string): Promise<string[]> => getFiles(
    `${artistsPages}/${slug}`,
)
    .catch((error: Error): string[] => {
        debug(error)
        return [];
    }));

ArtistSchema.static('file', (slug: string, filename: string): Promise<FileData | null> => getFile(
    `${artistsPages}/${slug}/${filename}`,
)
    .catch((error: Error): null => {
        debug(error);
        return null;
    }));

ArtistSchema.static('descriptionFile', function (slug: string): Promise<FileData | null> {
    return this.file(slug, 'about.md');
});

ArtistSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
});

const Artist: IArtistModel = mongoose.model<IArtistDocument, IArtistModel>('Artist', ArtistSchema);

export default Artist;
