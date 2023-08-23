import {describe, expect, it} from "vitest";
import {render} from "@testing-library/react";

import LanguageContext, {LanguageProvider} from "../../contexts/LanguageContext"

describe('LanguageProvider', () => {
    const provider = <LanguageProvider>
        <LanguageContext.Consumer>
            {(context) => <div data-testid="langCode">{context.langCode}</div>}
        </LanguageContext.Consumer>
    </LanguageProvider>;

    it('should set the initial language from localStorage', () => {
        localStorage.setItem('selected_language', 'de');

        const {getByTestId} = render(provider);

        const langCode = getByTestId('langCode').textContent;
        expect(langCode).toBe('de');

        localStorage.removeItem('selected_language');
    });

    it('should set the initial language from navigator', () => {
        global.navigator = {
            ...global.navigator,
            get language() {
                return 'de-DE';
            }
        };

        const {getByTestId} = render(provider);

        const langCode = getByTestId('langCode').textContent;
        expect(langCode).toBe('de');
    });

});
