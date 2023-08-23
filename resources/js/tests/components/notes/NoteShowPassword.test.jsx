import {describe, it, expect} from "vitest";
import {act, fireEvent, render} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";

import NoteShowPassword from "../../../components/notes/NoteShowPassword";
import {LanguageProvider} from "../../../contexts/LanguageContext";
import {NoteProvider} from "../../../contexts/NoteContext";

describe('NoteShowPassword Component', () => {
    const mockedProps = {
        note_id: 'noteID',
        note: 'U2FsdGVkX1/AcuoDLAAj7RKGIQuQgeBFyyuGr0oCaZc=',
        expiration: '2023-08-31T12:00:00Z',
        delete_token: 'delete_token',
        server_date: '2023-08-31T10:00:00Z',
    };

    it('should render password input and decrypt button', () => {
        const {getByLabelText, getByText} = render(
            <LanguageProvider>
                <NoteShowPassword {...mockedProps} />
            </LanguageProvider>
        );

        const passwordInput = getByLabelText('note_password_pass_label');
        expect(passwordInput).toBeInTheDocument();

        const decryptButton = getByText('note_password_button_label');
        expect(decryptButton).toBeInTheDocument();
    });

    it('should show error message on incorrect password', async () => {
        const {getByLabelText, getByText} = render(
            <LanguageProvider>
                <NoteShowPassword {...mockedProps} />
            </LanguageProvider>
        );

        const passwordInput = getByLabelText('note_password_pass_label');
        const decryptButton = getByText('note_password_button_label');

        await act(async () => fireEvent.change(passwordInput, {target: {value: 'some_password'}}));
        await act(async () => fireEvent.click(decryptButton));

        const errorMessage = getByText('note_password_pass_error');
        expect(errorMessage).toBeInTheDocument();
    });

    it('should show decrypted note on correct password', async () => {
        const {getByLabelText, getByText} = render(
            <MemoryRouter>
                <LanguageProvider>
                    <NoteProvider>
                        <NoteShowPassword {...mockedProps} />
                    </NoteProvider>
                </LanguageProvider>
            </MemoryRouter>
        );

        const passwordInput = getByLabelText('note_password_pass_label');
        const decryptButton = getByText('note_password_button_label');

        await act(async () => fireEvent.change(passwordInput, {target: {value: 'correct_password'}}));
        await act(async () => fireEvent.click(decryptButton));

        const noteTextarea = getByLabelText('note_view_textarea_label');
        expect(noteTextarea).toBeInTheDocument();
        expect(noteTextarea.value).toBe('data');
    });

});
