import React, {useEffect} from "react";
import {Button, Spinner} from "react-bootstrap";
import PropTypes from "prop-types";

import {useTranslation} from "react-i18next";

import useNoteDelete from "../../hooks/useNoteDelete";

// Component for the delete note button
function NoteDeleteButton({note_id, delete_token, setError, setErrors, setIsLoading}) {
    const {t} = useTranslation();
    // Use the useNoteDelete hook to get functions and states related to note deletion
    const {
        remove,
        isLoading,
        requestErrors
    } = useNoteDelete({note_id});

    // Pass errors to the parent component when they occur
    useEffect(() => {
        setError(!!requestErrors);
        setErrors(requestErrors);
        setIsLoading(isLoading);
    }, [requestErrors, isLoading, setError, setErrors, setIsLoading]);

    // Handler for the note deletion button click
    const handleNoteRemove = () => {
        // Display a confirmation window before deleting the note
        const shouldRemove = window.confirm(t('note_del_confirm'));
        if (shouldRemove) {
            // Call the remove function from the useNoteDelete hook to delete the note and pass delete_token
            remove(delete_token);
        }
    };

    return (
        <>
            <Button onClick={handleNoteRemove} disabled={isLoading} variant="danger">
                {isLoading && (
                    // Display a loading spinner during the deletion process
                    <>
                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>{" "}
                    </>
                )}
                {t('note_del_button')}
            </Button>
        </>
    );
}

NoteDeleteButton.propTypes = {
    note_id: PropTypes.string.isRequired,
    delete_token: PropTypes.string.isRequired,
    setError: PropTypes.func.isRequired,
    setErrors: PropTypes.func.isRequired,
    setIsLoading: PropTypes.func.isRequired,
};

export default NoteDeleteButton;
