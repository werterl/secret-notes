import {describe, it, expect} from "vitest";
import {render} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";

import NoteCreate from "../../../components/notes/NoteCreate";
import {LanguageProvider} from "../../../contexts/LanguageContext";
import {NoteProvider} from "../../../contexts/NoteContext";

describe('NoteCreate Component', () => {
    it('should render the NoteCreate component', () => {
        const {getByText} = render(
            <MemoryRouter>
                <NoteProvider>
                    <LanguageProvider>
                        <NoteCreate/>
                    </LanguageProvider>
                </NoteProvider>
            </MemoryRouter>
        );
        expect(getByText('note_create_h3')).toBeInTheDocument();
    });

});
