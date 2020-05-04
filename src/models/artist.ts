export interface ArtistInterface {
    name: string,
    slug: string,
    unprocessed: boolean,
}

export interface ArtistResponse {
    sort: (options: {}) => Promise<ArtistInterface[]>;
}

const Artist = {
    findByLetter: (letter: string): ArtistResponse => ({
        sort: (options: {}) => Promise.resolve([]),
    }),
    find: (query: {}): ArtistResponse => ({
        sort: (options: {}) => Promise.resolve([]),
    }),
    getUnprocessed: (letter: string): Promise<string[]> => Promise.resolve([]),
}

export default Artist;
