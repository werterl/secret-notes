import React from "react";
import { Link } from 'react-router-dom';
import { Row, Col, Container, Alert } from "react-bootstrap";

import { useTranslation } from "react-i18next";
import useTitle from "../../hooks/useTitle";

// NoteDeleted component, designed to be displayed after a user deletes a note
export default function NoteDeleted() {
    const { t } = useTranslation();

    useTitle('caption_note_deleted');

    return (
        <Container className="p-3">
            <Row className="mt-2">
                <Col>
                    <h3>{t('note_deleted_h3')}</h3>
                </Col>
            </Row>

            <Row className="mt-2">
                <Col>
                    <Alert variant="warning">
                        {t('note_deleted_alert_1')} {' '}
                        {t('note_deleted_alert_2')} {' '}
                        <Link
                            to="/"
                            className="alert-link"
                        >
                            {t('note_deleted_alert_link')}
                        </Link>
                    </Alert>
                </Col>
            </Row>
        </Container>
    );
}
