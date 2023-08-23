import React, {useEffect, useState} from "react";
import {Row, Col, Container, Button, Spinner, Alert} from "react-bootstrap";
import PropTypes from "prop-types";

import {useParams, useLocation} from 'react-router-dom';
import {useTranslation} from "react-i18next";

import useTitle from "../../hooks/useTitle";
import useApi from "../../hooks/useApi";

import ErrorAlert from "../ErrorAlert";
import NoteShowStart from "./NoteShowStart";

// Component to confirm viewing the note before deletion
// - handlerNoteVisible - function to change the noteVisible state to true
//   in the parent component, which will then control the display of the note component
function NoteShowConfirm({handlerNoteVisible}) {
    const {t} = useTranslation();

    return (
        <>
            <div className="d-grid gap-2 mt-4">
                <Button onClick={() => handlerNoteVisible(true)} variant="outline-dark" size="lg">
                    {t('note_confirmation_button_caption')}
                </Button>
            </div>

            <Row className="mt-2">
                <Col>
                    <Alert variant="danger">
                        {t('note_confirmation_alert_remove')}
                    </Alert>
                </Col>
            </Row>
        </>
    )
}

NoteShowConfirm.propTypes = {
    handlerNoteVisible: PropTypes.func.isRequired,
};

// Component displays either NoteShowFull or NoteShowConfirm, depending on whether confirmation is required
// It makes a request to get brief information about the note, excluding the actual content
export default function NoteShowConfirmation() {
    const {t} = useTranslation();

    useTitle('caption_note_confirmation');
    // State for displaying the note
    const [noteVisible, setNoteVisible] = useState(false);

    // Get the id parameter from the route and assign it to the note_id variable
    const {id: note_id} = useParams();

    // Get location.hash and remove the '#' character from the beginning of the string
    let {hash: note_hash} = useLocation();
    note_hash = note_hash.slice(1);

    // Use the hook to load note information
    const {
        isLoading,
        response,
        requestErrors,
    } = useApi(`notes/${note_id}/info`);

    // If the result is loaded and expiration_date is present, it can be displayed without confirmation
    useEffect(() => {
        if (!!response && response.expiration_date) {
            setNoteVisible(true);
        }
    }, [response]);

    return (
        <Container className="p-3">
            <Row className="mt-2">
                <Col>
                    <h3>{t('note_confirmation_h3')}</h3>
                </Col>
            </Row>

            <>
                {isLoading ? (
                    <>
                        <Spinner animation="border" variant="dark"/>
                    </>
                ) : (requestErrors ? ( // If the request fails, display an error
                            <ErrorAlert
                                error={!!requestErrors}
                                errors={requestErrors}
                            />
                        ) :
                        noteVisible ? ( // If noteVisible is set to true, display the NoteShowFull component,
                            // otherwise display the confirmation component
                            <NoteShowStart
                                note_id={note_id}
                                note_hash={note_hash}
                            />
                        ) : (
                            <NoteShowConfirm handlerNoteVisible={setNoteVisible}/>
                        )
                )}
            </>
        </Container>
    )
}
