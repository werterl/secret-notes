import {describe, it, expect} from "vitest";
import {render} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";

import NoteCreated from "../../../components/notes/NoteCreated";
import NoteContext, {NoteProvider} from "../../../contexts/NoteContext";
import {LanguageProvider} from "../../../contexts/LanguageContext";
import config from "../../../config";

describe('NoteCreated Component', () => {
    it('should return null if noteInfo is empty', () => {
        const {container} = render(
            <MemoryRouter>
                <NoteProvider>
                    <LanguageProvider>
                        <NoteCreated/>
                    </LanguageProvider>
                </NoteProvider>
            </MemoryRouter>
        );
        expect(container.firstChild).toBeNull();
    });

    it('should display NoteCreated component and note URL, show user password, show remove button and show warning', async () => {
        const noteInfo = {
            id: 'noteID',
            delete_token: 'delete_token',
            isUser: true,
            key: 'F0OWak12w@',
            expiration_date: null,
            server_date: '2023-08-31T10:00:00Z',
        }

        const {getByText, getByLabelText} = render(
            <MemoryRouter>
                <NoteContext.Provider value={{noteInfo: noteInfo}}>
                    <LanguageProvider>
                        <NoteCreated/>
                    </LanguageProvider>
                </NoteContext.Provider>
            </MemoryRouter>
        );

        const h3 = getByText('note_created_h3');
        const buttonRemove = getByText('note_del_button');
        const inputUrl = getByLabelText('note_created_url_placeholder');
        const userPassword = getByText(noteInfo.key);
        const warningRemove = getByText('note_created_alert_remove_after_read');

        expect(h3).toBeInTheDocument();
        expect(buttonRemove).toBeInTheDocument();
        expect(warningRemove).toBeInTheDocument();
        expect(inputUrl.value).toBe(`${config.WEB_URL}show/${noteInfo.id}`);
        expect(userPassword.tagName).toBe('STRONG');
    });
});
