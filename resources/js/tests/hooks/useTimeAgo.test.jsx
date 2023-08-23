import {describe, it, expect} from "vitest";
import {renderHook} from "@testing-library/react";

import {LanguageProvider} from "../../contexts/LanguageContext";
import useTimeAgo from "../../hooks/useTimeAgo";

describe('useTimeAgo hook', () => {
    it('should format time correctly', () => {

        const expiration = '2023-08-15 10:00:00';
        const serverDate = '2023-08-14 08:00:00';

        const wrapper = ({children}) => (
            <LanguageProvider>
                {children}
            </LanguageProvider>
        );

        const {result} = renderHook(() => useTimeAgo(), {wrapper});
        const {getFormattedTime} = result.current;

        const formattedTime = getFormattedTime(expiration, serverDate);
        expect(formattedTime).toBe('in 1 day');
    });
});
