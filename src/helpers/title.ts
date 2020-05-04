export const capitalize = (text: string) => text && text
    .split(' ')
    .map(word => word[0].toUpperCase() + word.substring(1))
    .join(' ');

export const slugToTitle = (slug: string): string => capitalize(slug.replace('-', ' '));
