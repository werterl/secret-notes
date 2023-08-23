import React from "react";
import {Row, Col, Alert} from "react-bootstrap";
import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";

import {serverErrors} from "../error_messages.js";

// Component for displaying error messages
function ErrorAlert({error, errors, closeHandler = null, variant = 'danger'}) {
    const {t} = useTranslation();

    // If there is no error, the component is not displayed
    if (!error) {
        return null;
    }

    // Getting error messages from the 'errors' object from axios
    const errors_messages = errors?.data?.errors;
    // Contains the text status of the error
    // 'errors.status' contains the server response code
    // Error text is retrieved from 'serverErrors' based on the status
    const status = errors?.status
        ? serverErrors[errors.status] ? t(serverErrors[errors.status]) : `${t('server_code')}: ${errors.status}`
        : t('error_unknown');

    return (
        <Row className="mt-3">
            <Col>
                {/* If 'closeHandler' is passed, display the close button */}
                <Alert variant={variant} onClose={closeHandler} dismissible={!!closeHandler}>
                    <Alert.Heading>{status}</Alert.Heading>
                    {errors_messages ? (
                        // Displaying errors returned by the server
                        Object.values(errors_messages).map((error, index) => (
                            <div key={index}>{t(error)}</div>
                        ))
                    ) : (
                        ""
                    )}
                </Alert>
            </Col>
        </Row>
    );
}

ErrorAlert.propTypes = {
    error: PropTypes.bool.isRequired,
    errors: PropTypes.object,
    closeHandler: PropTypes.func,
    variant: PropTypes.string
};

export default ErrorAlert;
