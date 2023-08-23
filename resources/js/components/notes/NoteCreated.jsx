import React, {useContext, useEffect, useRef, useState} from "react";
import {Row, Col, InputGroup, Container, Form, Button, Alert} from "react-bootstrap";

import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

import useTitle from "../../hooks/useTitle";
import useBeforeUnload from "../../hooks/useBeforeUnload";
import useTimeAgo from "../../hooks/useTimeAgo";

import ErrorAlert from "../ErrorAlert";
import NoteDeleteButton from "./NoteDeleteButton";

import NoteContext from "../../contexts/NoteContext";

import config from "../../config";

// Component to display information about the created note
export default function NoteCreated() {
    const {t} = useTranslation();
    useTitle('caption_note_created');
    // State to store the caption for the copy link button
    // Will change to "copied" after clicking, indicating successful copying
    const [copyCaption, setCopyCaption] = useState(t('note_created_copy'));
    // States to handle loading and errors during manual link deletion by the user
    // State changing functions are passed to the NoteDeleteButton component, where the state changes occur
    const [error, setError] = useState(false);
    const [errors, setErrors] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Get information about the created note from the context
    const {noteInfo} = useContext(NoteContext);

    const navigate = useNavigate();

    // Create a ref for the field containing the note link
    const noteInputRef = useRef(null);

    const {getFormattedTime} = useTimeAgo();

    // If there's no note information, redirect to the new note creation page
    useEffect(() => {
        if (!noteInfo) {
            navigate('/');
        }
    }, [noteInfo, navigate]);

    // Function to copy link from input
    const handleNoteCopy = () => {
        navigator
            .clipboard
            .writeText(noteInputRef.current.value)
            .then(() => setCopyCaption(t('note_created_copied')))
            .catch(() => setCopyCaption(t('note_created_copied_error')));
    }

    // Display a warning when refreshing or closing the window
    useBeforeUnload()

    // If there's no note information, don't display anything
    if (!noteInfo)
        return null;

    // Extract note information from noteInfo
    const {
        id,
        delete_token,
        isUser,
        key,
        expiration_date,
        server_date
    } = noteInfo;

    return (
        <Container className="p-3">
            <Row className="mt-2">
                <Col>
                    <h3>{t('note_created_h3')}</h3>
                </Col>
            </Row>

            {/* Display note link and copy button */}
            <Row className="mt-2">
                <Col>
                    <InputGroup className="mb-2">
                        {/* Input field to display the link */}
                        <Form.Control
                            ref={noteInputRef}
                            placeholder={t('note_created_url_placeholder')}
                            aria-label={t('note_created_url_placeholder')}
                            // If isUser=true, user has set a password
                            // Otherwise, add a hash containing the secret key to the link
                            defaultValue={`${config.WEB_URL}show/${id}${!isUser ? `#${key}` : ""}`}
                            onClick={(event) => event.target.select()} // Select link text on click
                            readOnly={true}
                        />
                        {/* Button to copy the link */}
                        <Button variant="outline-secondary" onClick={handleNoteCopy}>
                            {copyCaption}
                        </Button>
                    </InputGroup>
                </Col>
            </Row>

            {/* Display password if set by the user */}
            {isUser && (
                <Row className="mt-2">
                    <Col>
                        <Alert variant="success">
                            {t('note_created_alert_save_pass')}: <strong>{key}</strong>
                        </Alert>
                    </Col>
                </Row>
            )}

            <Row className="mt-2">
                <Col>
                    {/* Display a warning about link deletion */}
                    <Alert variant="warning">
                        {
                            !expiration_date ? (
                                t('note_created_alert_remove_after_read')
                            ) : (
                                `${t('note_created_alert_remove_period')} ${getFormattedTime(expiration_date, server_date)}`
                            )
                        }
                    </Alert>
                </Col>
            </Row>

            <Row className="mt-2">
                <Col>
                    {/* Button to create a new note */}
                    <Button
                        onClick={() => navigate('/')}
                        disabled={isLoading}
                        variant="dark"
                    >
                        {t('note_created_button_new_note')}
                    </Button>
                </Col>
                <Col className="d-flex justify-content-end">
                    {/* Display button to delete the created note, passing state-changing functions,
                     note id, and delete token to initiate the deletion request */}
                    <NoteDeleteButton
                        note_id={id}
                        delete_token={delete_token}
                        setError={setError}
                        setErrors={setErrors}
                        setIsLoading={setIsLoading}
                    />
                </Col>
            </Row>
            {/* Display an error alert if the server returns an error during deletion */}
            <ErrorAlert error={error} errors={errors} closeHandler={() => {}}/>

        </Container>
    )
}
