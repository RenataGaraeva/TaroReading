import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
    locales: ['en', 'ru'],
    defaultLocale: 'ru',
    localePrefix: {
        mode: 'always',
        prefixes: {
            en: '/en',
            ru: '/ru',
        },
    },
    pathnames: {
            '/': '/',
            '/card-of-day': '/card-of-day',
            '/money': '/money',
            '/love': '/love',
            '/career': '/career',
        }

});