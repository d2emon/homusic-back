import languages, {
    Language,
} from './letters';

const getLetter = (language: string, letter: string): string | undefined => {
    const letters: Language | undefined = languages[language];
    return letters && letters[letter];
}

export default getLetter;
