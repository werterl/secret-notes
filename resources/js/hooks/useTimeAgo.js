import {useCallback, useContext, useMemo} from "react";
import TimeAgo from "javascript-time-ago";

import LanguageContext from "../contexts/LanguageContext";

// Hook for formatting time
const useTimeAgo = () => {
    const {langCode} = useContext(LanguageContext);

    // Creating a cached instance of TimeAgo for a specific language
    const timeAgoInstance = useMemo(() => new TimeAgo(langCode), [langCode]);

    // Generating formatted time text, considering server time
    // Arguments are passed in Y-m-d H:i:s format
    // - expiration - note expiration date
    // - server_date - server date
    const getFormattedTime = useCallback((expiration, server_date) => {
        return timeAgoInstance.format(new Date(expiration), null, {
            now: new Date(server_date),
        });
    }, [timeAgoInstance]);

    return {getFormattedTime};
};

export default useTimeAgo;
