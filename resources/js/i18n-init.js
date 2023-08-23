import {initReactI18next} from "react-i18next";
import i18n from "i18next";

import Backend from 'i18next-http-backend';

const selected_language = localStorage.getItem('selected_language');
const backendLoadPath = process.env.NODE_ENV === 'production' ? '/locales/{{lng}}/{{ns}}.json' : 'http://localhost:5173/resources/js/locales/{{lng}}/{{ns}}.json';

i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
        backend: {
            loadPath: backendLoadPath
        },
        lng: selected_language || navigator.language.split('-')[0] || 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });
