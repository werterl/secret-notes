import React, { createContext, useState } from "react";

import Help from "../modules/help";
import config from "../config";

// Creating a context for working with localization
const LanguageContext = createContext(null);

// Context provider that provides the current locale
export function LanguageProvider({ children }) {
    // Setting the language from storage
    // If not present, using the browser's language
    // If not in the list, default to English
    const [langCode, setLangCode] = useState(
        localStorage.getItem('selected_language') ||
        (
            config.languages.some(lang => Help.filterLang(lang, navigator.language.split("-")[0]))
                ? navigator.language.split('-')[0]
                : 'en'
        )
    );

    return (
        <LanguageContext.Provider value={{ langCode, setLangCode }}>
            {children}
        </LanguageContext.Provider>
    );
}

export default LanguageContext;
