import {stringify} from "querystring";

export interface PageInterface {
    text: string;
}

export interface PageResponse {
    sort: (options: {}) => Promise<PageInterface[]>;
}

const Page = {
    all: (): Promise<PageInterface[]> => Promise.resolve([]),
    findByLetter: (letter: string): PageResponse => ({
        sort: (options: {}) => Promise.resolve([]),
    }),
    find: (filename: string): Promise<PageInterface> => Promise.resolve({
        text: filename,
    }),
    getUnprocessed: (letter: string): Promise<string[]> => Promise.resolve([]),
}

export default Page;
