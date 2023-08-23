import {describe, it, expect, vi} from "vitest";
import {renderHook, act, waitFor} from "@testing-library/react";
import i18n from "i18next";

import {LanguageProvider} from "../../contexts/LanguageContext";
import useLangSwitch from "../../hooks/useLangSwitch";

const wrapper = ({children}) => (
    <LanguageProvider>{children}</LanguageProvider>
);

describe('useLangSwitch hook', () => {
    it('should switch language and label', async () => {
        vi.mock('../../i18n-init', () => {
            return {import_promises: [Promise.resolve()]}
        });

        i18n.changeLanguage = vi.fn();

        const {result} = renderHook(() => useLangSwitch(), {
            wrapper
        });

        await waitFor(() => result.current.languagesLoaded === true)

        act(() => {
            result.current.switchLang('pl');
        });

        expect(result.current.langCode).toBe('pl');
        expect(result.current.selectedLangLabel).toBe('Polski');
    });
});
