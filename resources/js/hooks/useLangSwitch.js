import {useCallback, useContext, useEffect, useState} from "react";
import i18n from "i18next";

import LanguageContext from "../contexts/LanguageContext";

import config from "../config";
import Help from "../modules/help";

const getLangLabelByCode = (selected_code) => config.languages.find(lang => Help.filterLang(lang, selected_code)).label;

// Hook provides functionality for switching and getting localization
export default function useLangSwitch() {
    const {langCode, setLangCode} = useContext(LanguageContext);
    const [languagesLoaded, setLanguagesLoaded] = useState(false);
    const [selectedLangLabel, setSelectedLangLabel] = useState('');

    useEffect(() => {
        setSelectedLangLabel(
            getLangLabelByCode(langCode)
        );
    }, [langCode]);

    // Wait until translations are loaded
    useEffect(() => {
        const loadTranslations = async () => {
            //await Promise.all(import_promises);
            setLanguagesLoaded(true);
        };

        loadTranslations();
    }, []);

    const switchLang = useCallback((selectedLang) => {
        if (languagesLoaded) {
            i18n.changeLanguage(selectedLang);
            localStorage.setItem('selected_language', selectedLang);
            setLangCode(selectedLang);
        }
    }, [languagesLoaded, setLangCode]);

    return {switchLang, selectedLangLabel, langCode, languagesLoaded};
}
