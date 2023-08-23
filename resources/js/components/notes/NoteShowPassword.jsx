import {Col, Row, Alert, Button} from "react-bootstrap";
import PropTypes from "prop-types";

import NoteView from "./NoteView";
import {InputCustom} from "../CustomInputs";

import {useTranslation} from "react-i18next";
import {useState} from "react";
import useTitle from "../../hooks/useTitle";
import useBeforeUnload from "../../hooks/useBeforeUnload";

import NoteCrypto from "../../modules/crypto";

// Component for the password input form
// Validates the password entered by the user
function NoteShowPassword({note_id, note, expiration, delete_token, server_date}) {
    const {t} = useTranslation();

    useTitle('caption_note_show_password');
    // Stores the user-entered password
    const [password, setPassword] = useState('');
    // State responsible for displaying note content upon correct password entry
    const [showNote, setShowNote] = useState(false);
    // State responsible for displaying an error on incorrect password
    const [errorPassword, setErrorPassword] = useState(false);

    // Display a warning when the window is refreshed or closed
    useBeforeUnload();

    // Handler for decrypting the note button click
    const handleDecryptNote = event => {
        event.preventDefault();
        // Attempt to decrypt the note. If the password is correct and content is obtained, enable note display
        try {
            setErrorPassword(false);
            const crypto = new NoteCrypto(note, password);
            const note_body = crypto.decrypt();

            if (note_body) {
                setShowNote(true);
            } else {
                setErrorPassword(true);
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        // If showNote = true, the password is correct
        // Pass all note information to NoteView.
        // Instead of passing a hash for decryption, pass the user's password
        showNote ? (
            <NoteView
                note={note}
                note_id={note_id}
                expiration={expiration}
                server_date={server_date}
                delete_token={delete_token}
                note_hash={password}
            />
        ) : (
            <>{/* If there is no expiration date for the note, it means it was deleted and a warning is shown */}
                {!expiration && (
                    <Alert variant="danger">
                        {t('note_password_alert_remove_1')}
                        <br/>
                        {t('note_password_alert_remove_2')}
                    </Alert>
                )}

                <Row className="mt-2">
                    <Col>
                        {/* Password input field */}
                        <InputCustom
                            type="password"
                            label={t('note_password_pass_label')}
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                        />
                    </Col>
                </Row>

                <Row className="mt-2">
                    <Col>
                        <Button
                            disabled={password.length === 0} // Disable button if password field is empty
                            variant="outline-dark"
                            onClick={handleDecryptNote}
                        >
                            {t('note_password_button_label')}
                        </Button>
                    </Col>
                </Row>

                {errorPassword && ( // Display an error if the password is incorrect
                    <Row className="mt-2">
                        <Col>
                            <Alert variant="warning">
                                {t('note_password_pass_error')}
                            </Alert>
                        </Col>
                    </Row>
                )}
            </>
        )
    );
}

NoteShowPassword.propTypes = {
    note_id: PropTypes.string.isRequired,
    note: PropTypes.string.isRequired,
    expiration: PropTypes.string,
    delete_token: PropTypes.string.isRequired,
    server_date: PropTypes.string.isRequired
};

export default NoteShowPassword;
