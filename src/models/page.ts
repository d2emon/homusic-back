import config from '../config';
import {
    getFile,
    getFiles,
} from '../helpers/folders';

export interface PageInterface {
    title: string;
    link: string;
    text?: string;
}

export interface PageResponse {
    sort: (options: {}) => Promise<PageInterface[]>;
}

const wiki = config.get('FOLDERS:WIKI');
const pageTitles: { [k: string]: string } = {};

const pageData = (link: string, text?: string): PageInterface => ({
    title: pageTitles[link] || link,
    link: `/${link}`,
    text,
});

const Page = {
    all: (): Promise<PageInterface[]> => getFiles(wiki)
        .then((files: string[]) => files
            // files = files.filter(file => !file.startsWith('.'));
            // files = files.filter(file => slugs.indexOf(file) < 0);
            // files = files.filter(file => fs.lstatSync(`${dataFolder}/${file}`).isDirectory());
            // files.filter(file => file.startsWith(letter))
            .map((filename) => pageData(
                filename
                    .split('.')
                    .slice(0, -1)
                    .join('.'),
            ))),
    find: (filename: string): Promise<PageInterface> => getFile(`${wiki}/${filename}.md`)
        .then(file => pageData(file.filename, file.text)),
}

export default Page;
