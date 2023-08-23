import React, {createContext, useState} from "react";

// Creating a context for working with note data
const NoteContext = createContext(null);

// Context provider that provides the note state and a function to update it
// noteInfo includes {id, delete_token, expiration_date, server_date, key - secret key, isUser - whether user password was used)
export function NoteProvider({children}) {
    const [noteInfo, setNoteInfo] = useState(null);

    return (
        <NoteContext.Provider value={{noteInfo, setNoteInfo}}>
            {children}
        </NoteContext.Provider>
    );
}

export default NoteContext;
