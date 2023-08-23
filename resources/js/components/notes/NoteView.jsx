import {Alert, Button, Col, Row} from "react-bootstrap";
import PropTypes from "prop-types";

import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

import useTitle from "../../hooks/useTitle";
import useBeforeUnload from "../../hooks/useBeforeUnload";
import useTimeAgo from "../../hooks/useTimeAgo";

import ErrorAlert from "../ErrorAlert";
import {InputCustom} from "../CustomInputs";
import NoteDeleteButton from "./NoteDeleteButton";

import NoteCrypto from "../../modules/crypto";

// Component for displaying decrypted note content
function NoteView({note_id, note, note_hash, expiration, delete_token, server_date}) {
    const {t} = useTranslation();

    useTitle('caption_note_view');
    // States responsible for displaying errors and loading status during note deletion by the user
    const [deleteError, setDeleteError] = useState(false);
    const [deleteErrors, setDeleteErrors] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    // States responsible for decryption error (if hash is incorrect)
    const [errorDecrypt, setErrorDecrypt] = useState(false);
    // Decrypted content of the note
    const [noteDecrypt, setNoteDecrypt] = useState('');

    const navigate = useNavigate();

    // Display a warning when the window is refreshed or closed
    useBeforeUnload();

    const {getFormattedTime} = useTimeAgo();

    // Attempt to decrypt the note
    // In case of failure, an error will be displayed.
    // In case of success, the decrypted content will be stored in noteDecrypt
    useEffect(() => {
        try {
            const crypto = new NoteCrypto(note, note_hash);
            const note_body = crypto.decrypt();

            if (!note_body) {
                setErrorDecrypt(true);
            } else {
                setNoteDecrypt(note_body);
            }
        } catch (e) {
            console.log(e);
        }
    }, [note_hash, note]);

    return (
        <>
            {errorDecrypt ? ( // If the hash is incorrect, display an error
                <ErrorAlert
                    error={errorDecrypt}
                    errors={{status: 'decrypt'}}
                />
            ) : ( // If the hash is correct and the note is decrypted
                <>
                    {!expiration && ( // If the note is deleted, display a warning
                        <Alert variant="info">
                            {t('note_view_copy_alert')}
                        </Alert>
                    )}

                    <Row className="mt-2">
                        <Col>
                            {/* Field for displaying decrypted content */}
                            <InputCustom
                                as="textarea"
                                readOnly={true}
                                label={t('note_view_textarea_label')}
                                value={noteDecrypt}
                                description={expiration && `${t('note_view_will_remove')} ${getFormattedTime(
                                    expiration,
                                    server_date
                                )}`}
                                onClick={event => event.target.select()} // Select content on textarea click
                                rows="8"
                            />
                        </Col>
                    </Row>

                    <Row className="mt-2">
                        <Col>
                            {/* Button to create a new note */}
                            <Button
                                onClick={() => navigate('/')}
                                disabled={deleteLoading} // Disable button during note deletion request
                                variant="dark"
                            >
                                {t('note_view_button_new_note_label')}
                            </Button>
                        </Col>
                        {expiration && ( // If the note has an expiration time, display a button to delete it from the server
                            <Col className="d-flex justify-content-end">
                                <NoteDeleteButton
                                    note_id={note_id}
                                    delete_token={delete_token}
                                    setError={setDeleteError}
                                    setErrors={setDeleteErrors}
                                    setIsLoading={setDeleteLoading}
                                />
                            </Col>
                        )}
                    </Row>
                    {/* Display an error if the deletion request was unsuccessful */}
                    <ErrorAlert
                        error={deleteError}
                        errors={deleteErrors}
                    />
                </>
            )}
        </>
    );
}

NoteView.propTypes = {
    note_id: PropTypes.string.isRequired,
    note: PropTypes.string.isRequired,
    note_hash: PropTypes.string.isRequired,
    expiration: PropTypes.string,
    delete_token: PropTypes.string.isRequired,
    server_date: PropTypes.string.isRequired
};

export default NoteView;
