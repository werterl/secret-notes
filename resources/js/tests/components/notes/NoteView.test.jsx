import {describe, it, expect} from "vitest";
import {render} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";

import {LanguageProvider} from "../../../contexts/LanguageContext";
import {NoteProvider} from "../../../contexts/NoteContext";

import NoteView from "../../../components/notes/NoteView";

const mockedProps = {
    note_id: 'noteID',
    note: 'U2FsdGVkX1/AcuoDLAAj7RKGIQuQgeBFyyuGr0oCaZc=',
    note_hash: 'correct_password',
    expiration: '2023-08-31T12:00:00Z',
    delete_token: 'delete_token',
    server_date: '2023-08-31T10:00:00Z',
};

describe('NoteView Component', () => {
    const DefaultComponent = (props = {}) => {
        const merged = {...mockedProps, ...props};

        return (
            <MemoryRouter>
            <LanguageProvider>
                <NoteProvider>
                    <NoteView {...merged} />
                </NoteProvider>
            </LanguageProvider>
        </MemoryRouter>
        )
    }

    it('should render decrypted note content', async () => {
        const {getByLabelText, getByText} = render(<DefaultComponent/>);

        const noteTextarea = getByLabelText('note_view_textarea_label');
        const newNoteButton = getByText('note_view_button_new_note_label');
        const deleteButton = getByText('note_del_button');

        expect(noteTextarea).toBeInTheDocument();
        expect(newNoteButton).toBeInTheDocument();
        expect(deleteButton).toBeInTheDocument();
        expect(noteTextarea.value).toBe('data');
    });

    it('should show expiration alert if note is deleted', async () => {
        const propsWithoutExpiration = {
            ...mockedProps,
            expiration: undefined,
        };

        const {getByText} = render(<DefaultComponent {...propsWithoutExpiration}/>);

        const expirationAlert = getByText('note_view_copy_alert');
        expect(expirationAlert).toBeInTheDocument();
    });

    it('should show error alert on decryption failure', async () => {
        const propsWithDecryptionError = {
            ...mockedProps,
            note_hash: 'some_password',
        };

        const {getByText} = render(
            <DefaultComponent {...propsWithDecryptionError} />
        );

        const decryptionErrorAlert = getByText('error_decrypt');
        expect(decryptionErrorAlert).toBeInTheDocument();
    });

});
