import {Spinner} from "react-bootstrap";
import PropTypes from "prop-types";

import {useEffect, useState} from "react";

import useApi from "../../hooks/useApi";
import useNoteDelete from "../../hooks/useNoteDelete";

import ErrorAlert from "../ErrorAlert";
import NoteView from "./NoteView";
import NoteShowPassword from "./NoteShowPassword";


// Component that controls either NoteView or NoteShowPassword.jsx
// If the note has no expiration date, a deletion request will be sent upon component mounting
function NoteShowStart({note_id, note_hash}) {
    const [note, setNote] = useState(null);
    const [deleteToken, setDeleteToken] = useState('');
    const [expirationDate, setExpirationDate] = useState(null);
    const [serverDate, setServerDate] = useState(null);

    // Use the hook to load note information
    const {
        response,
        isLoading,
        requestErrors,
    } = useApi(`notes/${note_id}`, 'GET');

    // Extract the note deletion function from the useNoteDelete hook
    const {
        remove
    } = useNoteDelete({note_id, redirect: false});

    // Upon a successful response, set states and initiate a deletion request if expiration_date is absent
    useEffect(() => {
        if (!!response) {
            const {
                data,
                delete_token,
                expiration_date,
                server_date
            } = response;

            setNote(data);
            setDeleteToken(delete_token);
            setExpirationDate(expiration_date);
            setServerDate(server_date);

            if (!expiration_date) {
                remove(delete_token);
            }
        }
    }, [response]);

    return (
        <>
            {isLoading ? (
                <>
                    <Spinner animation="border" variant="dark"/>
                </>
            ) : (requestErrors ? (
                        <ErrorAlert
                            error={!!requestErrors}
                            errors={requestErrors}
                        />
                    ) :
                    (note && ( // If note content is received
                        note_hash ? ( // If there is a hash, control is passed to NoteView
                            <NoteView
                                note={note}
                                note_hash={note_hash}
                                note_id={note_id}
                                expiration={expirationDate}
                                server_date={serverDate}
                                delete_token={deleteToken}
                            />
                        ) : ( // If there is no hash, display the password input form
                            <NoteShowPassword
                                note={note}
                                note_id={note_id}
                                expiration={expirationDate}
                                server_date={serverDate}
                                delete_token={deleteToken}
                            />
                        )
                    ))
            )}
        </>
    );
}

NoteShowStart.propTypes = {
    note_id: PropTypes.string.isRequired,
    note_hash: PropTypes.string.isRequired,
};

export default NoteShowStart;
