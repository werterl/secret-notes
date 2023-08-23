import {useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";

import NoteContext from "../contexts/NoteContext";
import useApi from "./useApi";

// Hook for sending a request to delete a note
function useNoteDelete({note_id, redirect = true}) {
    // Using the useApiQuery hook to form the request
    const {
        response,
        isLoading,
        requestErrors,
        doRequest
    } = useApi();

    const {setNoteInfo} = useContext(NoteContext); // Context containing note information

    const navigate = useNavigate();

    useEffect(() => {
        if (!!response) {
            setNoteInfo(null); // Removing note data from the context
            if (redirect) {
                navigate('/deleted'); // Redirecting to the page after deletion (if redirect flag is set)
            }
        }
    }, [response, redirect]);

    // Function for deleting a note
    // - delete_token - token for deleting the note, obtained from the API response after note creation or retrieval
    const remove = (delete_token) => {
        doRequest({endpoint: `notes/${note_id}`, postData: {delete_token}, method: 'DELETE'});
    };

    return {remove, isLoading, requestErrors};
}

export default useNoteDelete;
