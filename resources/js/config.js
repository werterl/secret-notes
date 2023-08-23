// Configuration settings, including web and API addresses, and form filling rules
const config = {
    APP_NAME: 'Secret Notes',
    APP_LOGO: '/logo.png',
    WEB_URL: 'http://localhost/',
    API_URL: 'http://localhost/api/',
    requestTimeout: 10,
    passwordLengthLimits: {
        min: 8,
        max: 16
    },
    keyLength: 10, // Length of the private key
    noteMaxLength: 5000, // Maximum length of a note
    languages: [
        {
            label: 'English',
            code: 'en'
        },
        {
            label: 'Українська',
            code: 'uk'
        },
        {
            label: 'Deutsch',
            code: 'de'
        },
        {
            label: 'Русский',
            code: 'ru'
        },
        {
            label: 'Polski',
            code: 'pl'
        },
    ]
}

export default config;
