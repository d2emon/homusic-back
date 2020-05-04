import mongoose from 'mongoose';
import config from '../config';
import debug from '../debug';
// import wiki from '../helpers/wiki';
import { slugToTitle } from '../helpers/title';
import {
    getFiles,
    getFoldersByLetter,
    getFile, FileData,
} from '../helpers/folders';

export interface ArtistInterface {
    name: string,
    slug: string,
    description: string,
    pages: string[],
    unprocessed: boolean,
}

const artistsPages = config.get('FOLDERS:ARTISTS');

const artistSchema = new mongoose.Schema({
    name: String,
    slug: String,
    description: String,
    pages: [String],
});

/*
artistSchema.virtual('albums', {
    ref: 'Album',
    localField: '_id',
    foreignField: 'author',
});
*/

/*
artistSchema.virtual('songs', {
    ref: 'Song',
    localField: '_id',
    foreignField: 'author',
});
*/

artistSchema.static('findByLetter', function (letter: string): ArtistInterface[] {
    if (!letter) return this.find();
    return this.find({
        name: {
            $regex: `^${letter}`,
            $options: 'i',
        },
    });
});

artistSchema.static('findSlugByLetter', function (letter: string): ArtistInterface[] {
    if (!letter) return this.find();
    return this.find({
        slug: {
            $regex: `^${letter}`,
            $options: 'i',
        },
    });
});

artistSchema.static('getUnprocessed', function (letter: string): Promise<string[]> {
    if (letter === '') return Promise.resolve([]);
    return getFoldersByLetter(artistsPages, letter)
        .then(files => (
            this.findSlugByLetter(letter)
                .then((artists: ArtistInterface[]) => artists.map(artist => artist.slug))
                .then((artists: string[]) => files.filter(file => artists.indexOf(file) < 0))
        ));
});

artistSchema.static('slugToName', slugToTitle);

/*
artistSchema.static('findInWikipedia', ({ name, slug }) => wiki
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
                ...props,
                name: page.raw.title,
                wikiLink: page.raw.fullurl,
                // title,
                description,
                image,
                genre,
                genres,
                // info,
                // raw: page.raw,
                unprocessed: true,
            }));
    }));
 */

artistSchema.static('files', (slug: string): Promise<string[]> => getFiles(
    `${artistsPages}/${slug}`,
)
    .catch((error: Error): string[] => {
        debug(error)
        return [];
    }));

artistSchema.static('file', (slug: string, filename: string): Promise<FileData | null> => getFile(
    `${artistsPages}/${slug}/${filename}`,
)
    .catch((error: Error): null => {
        debug(error);
        return null;
    }));

artistSchema.static('descriptionFile', function (slug: string) {
    return this.file(slug, 'about.md');
});

artistSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
});

export default mongoose.model('Artist', artistSchema);
