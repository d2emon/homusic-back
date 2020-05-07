import express from 'express';
import {
    successResponse,
    errorResponse,
} from './response';

interface News {
    date: Date,
    text: string,
}

interface Event {
    date: Date,
    description: string,
}

interface Tour extends Event {
    place: string,
    tickets: string,
    phone: string,
}

interface Track {
    trackId: number;
    title: string;
}

interface Album {
    title: string,
    year: number,
    description: string,
    tracks: Track[],
    image: string,
}

interface Video {
    link: string,
    title: string,
    rating: number,
}

export default {
    getAbout: (req: express.Request, res: express.Response) => {
        try {
            const news: News[] = [
                {
                    date: new Date(2020, 11, 9),
                    text: 'Lorem ipsum dolor',
                },
                {
                    date: new Date(2020, 11, 9),
                    text: 'Lorem ipsum dolor',
                },
                {
                    date: new Date(2020, 11, 9),
                    text: 'Lorem ipsum dolor',
                },
            ];

            const tours: Tour[] = [
                {
                    date: new Date(2020, 11, 9),
                    place: 'New York',
                    description: 'Lorem ipsum dolor',
                    tickets: 'http://example.com',
                    phone: '123456',
                },
                {
                    date: new Date(2020, 11, 9),
                    place: 'New York',
                    description: 'Lorem ipsum dolor',
                    tickets: 'http://example.com',
                    phone: '123456',
                },
                {
                    date: new Date(2020, 11, 9),
                    place: 'New York',
                    description: 'Lorem ipsum dolor',
                    tickets: 'http://example.com',
                    phone: '123456',
                },
            ];

            const album: string = 'image.jpg';

            const events: Event[] = [
                {
                    date: new Date(2020, 11, 9),
                    description: 'Lorem ipsum dolor',
                },
                {
                    date: new Date(2020, 11, 9),
                    description: 'Lorem ipsum dolor',
                },
                {
                    date: new Date(2020, 11, 9),
                    description: 'Lorem ipsum dolor',
                },
            ];

            const video: Video = {
                link: 'image.jpg',
                title: 'Video',
                rating: 5,
            };

            const about = 'Lorem ipsum dolor';

            const gallery: string[] = [
                'image1.jpg',
                'image1.jpg',
                'image1.jpg',
            ]
            return successResponse(res, {
                gallery,
                news,
                tours,
                album,
                events,
                video,
                about,
            })
        } catch (error) {
            return errorResponse(res, error);
        }
    },

    getAudio: (req: express.Request, res: express.Response) => {
        try {
            const albums: Album[] = [
                {
                    title: 'Album',
                    year: 2020,
                    description: 'Lorem ipsum dolor',
                    image: 'image.jpg',
                    tracks: [
                        {
                            trackId: 1,
                            title: 'Track',
                        },
                        {
                            trackId: 2,
                            title: 'Track',
                        },
                        {
                            trackId: 3,
                            title: 'Track',
                        },
                        {
                            trackId: 4,
                            title: 'Track',
                        },
                    ],
                },
                {
                    title: 'Album',
                    year: 2020,
                    description: 'Lorem ipsum dolor',
                    image: 'image.jpg',
                    tracks: [
                        {
                            trackId: 1,
                            title: 'Track',
                        },
                        {
                            trackId: 2,
                            title: 'Track',
                        },
                        {
                            trackId: 3,
                            title: 'Track',
                        },
                        {
                            trackId: 4,
                            title: 'Track',
                        },
                    ],
                },
            ];
            return successResponse(res, {
                albums,
            })
        } catch (error) {
            return errorResponse(res, error);
        }
    },

    getVideo: (req: express.Request, res: express.Response) => {
        try {
            const videos: Video[] = [
                {
                    link: 'image.jpg',
                    title: 'Video',
                    rating: 5,
                },
                {
                    link: 'image.jpg',
                    title: 'Video',
                    rating: 5,
                },
                {
                    link: 'image.jpg',
                    title: 'Video',
                    rating: 5,
                },
            ];
            return successResponse(res, {
                videos,
            })
        } catch (error) {
            return errorResponse(res, error);
        }
    },

    getGallery: (req: express.Request, res: express.Response) => {
        try {
            const gallery: string[] = [
                'image1.jpg',
                'image1.jpg',
                'image1.jpg',
            ]
            return successResponse(res, {
                gallery,
            })
        } catch (error) {
            return errorResponse(res, error);
        }
    },

    getTours: (req: express.Request, res: express.Response) => {
        try {
            const tours: Tour[] = [
                {
                    date: new Date(2020, 11, 9),
                    place: 'New York',
                    description: 'Lorem ipsum dolor',
                    tickets: 'http://example.com',
                    phone: '123456',
                },
                {
                    date: new Date(2020, 11, 9),
                    place: 'New York',
                    description: 'Lorem ipsum dolor',
                    tickets: 'http://example.com',
                    phone: '123456',
                },
                {
                    date: new Date(2020, 11, 9),
                    place: 'New York',
                    description: 'Lorem ipsum dolor',
                    tickets: 'http://example.com',
                    phone: '123456',
                },
            ];
            const pastTours: string[] = [
                'Lorem ipsum dolor',
                'Lorem ipsum dolor',
                'Lorem ipsum dolor',
                'Lorem ipsum dolor',
            ];
            return successResponse(res, {
                tours,
                pastTours,
            })
        } catch (error) {
            return errorResponse(res, error);
        }
    },

    getContacts: (req: express.Request, res: express.Response) => {
        try {
            return successResponse(res, {
                address: 'My address',
                phone: 'My address',
                mail: 'My address',
            })
        } catch (error) {
            return errorResponse(res, error);
        }
    },
}
