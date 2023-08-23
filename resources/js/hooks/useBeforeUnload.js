import {useEffect} from "react";

// Hook for displaying a warning before closing or refreshing the window
function useBeforeUnload() {
    useEffect(() => {
        const unloadCallback = (event) => {
            event.preventDefault();
            event.returnValue = '';
            return '';
        };

        window.addEventListener('beforeunload', unloadCallback);

        return () => {
            window.removeEventListener('beforeunload', unloadCallback);
        };
    }, []);
}

export default useBeforeUnload;
