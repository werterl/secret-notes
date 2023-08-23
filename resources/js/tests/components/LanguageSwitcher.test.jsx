import {describe, it, expect, vi} from "vitest";
import {render, fireEvent, act} from "@testing-library/react";

import LanguageSwitcher from "../../components/LanguageSwitcher";
import {LanguageProvider} from "../../contexts/LanguageContext";

const switchLang = vi.fn();

vi.mock('../../hooks/useLangSwitch', () => ({
    default: () => {

        return {
            switchLang: switchLang,
            selectedLangLabel: 'English',
            langCode: 'en',
            languagesLoaded: true,
        }
    }
}));

describe('LanguageSwitcher Component', () => {
    it('should render and switch languages', async() => {

        const {getByText} = render(
            <LanguageProvider>
                <LanguageSwitcher/>
            </LanguageProvider>
        );

        const dropdownToggle = getByText('English');
        await act(async () => {
            fireEvent.click(dropdownToggle);
        });

        const languageOption = getByText('Polski');
        await act(async () => {
            fireEvent.click(languageOption);
        });

        expect(switchLang).toHaveBeenCalledWith('pl');
    });
});
