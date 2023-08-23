import {useContext, useEffect} from "react";
import {useTranslation} from "react-i18next";
import LanguageContext from "../contexts/LanguageContext";

// Hook for changing document.title
function useTitle(title) {
    const {t} = useTranslation();
    const {langCode} = useContext(LanguageContext);

    useEffect(() => {
        const previousTitle = document.title;
        document.title = t(title);
        return () => {
            document.title = previousTitle;
        }
    }, [langCode, title, t]);
}

export default useTitle;
