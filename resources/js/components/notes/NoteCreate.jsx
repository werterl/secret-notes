import React, {useContext, useEffect, useState} from "react";
import {Row, Col, Container, Form, Button, Spinner} from "react-bootstrap";

import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

import useTitle from "../../hooks/useTitle";
import useApi from "../../hooks/useApi";

import {SelectCustom, InputCustom, SwitchCustom} from "../CustomInputs";
import ErrorAlert from "../ErrorAlert";

import NoteContext from "../../contexts/NoteContext";

import NoteCrypto from "../../modules/crypto";
import Help from "../../modules/help";

import {clientErrors} from "../../error_messages";
import config from "../../config";

// Component for creating a new note
export default function NoteCreate() {
    const {t} = useTranslation();
    useTitle('caption_note_create');

    const [note, setNote] = useState(''); // Note content
    const [sendEmail, setSendEmail] = useState(false); // Option to send read report via email
    const [usePassword, setUsePassword] = useState(false); // Option to use a user-defined password
    const [password, setPassword] = useState(''); // Password
    const [confirmPassword, setConfirmPassword] = useState(''); // Confirm password
    const [email, setEmail] = useState(''); // Email for report
    const [expiration, setExpiration] = useState(''); // Selected deletion period
    const [validated, setValidated] = useState(false); // Validation form flag
    const [secretKey, setSecretKey] = useState({key: '', isUser: false}); // Object containing secret key
    // If isUser=true, a password is used instead of a generated key

    // List of error flags
    const [errors, setErrors] = useState({
        noteLength: false, // Note length exceeds the limit
        passwordLength: false, // Password length
        passwordMismatch: false // Passwords don't match
    });

    // List of possible expiration periods
    const expiration_periods = [
        {value: '', label: t('exp_period_after_read')},
        {value: 'hour', label: t('exp_period_hour')},
        {value: 'day', label: t('exp_period_day')},
        {value: 'week', label: t('exp_period_week')},
        {value: 'month', label: t('exp_period_month')},
    ];

    // Context function to store information about the created note
    const {setNoteInfo} = useContext(NoteContext);

    const navigate = useNavigate();

    // Using the hook to form a request
    const {response, requestErrors, isLoading, doRequest} = useApi();

    // If the request is successful, store information about the created note and redirect to /created page
    useEffect(() => {
        if (!!response) {
            setNoteInfo({...response, ...secretKey});
            navigate('/created');
        }
    }, [response, navigate, setNoteInfo, secretKey]);

    // Check for errors
    // If there are no errors, set the validation flag to true
    useEffect(() => {
        const hasErrors = !errors.noteLength && (!usePassword || (!errors.passwordLength && !errors.passwordMismatch));
        setValidated(hasErrors);
    }, [errors, usePassword]);

    // Handler for changing note content
    const noteChange = (event) => {
        const note_content = event.target.value;
        setErrors(prev => ({
            ...prev,
            'noteLength': note_content.length >= config.noteMaxLength
        }));

        setNote(note_content);
    }

    // Handler for password input
    const passwordChange = (event) => {
        const pass = event.target.value;
        setErrors(prev => ({
            ...prev,
            'passwordLength': (pass.length < config.passwordLengthLimits.min) || (pass.length > config.passwordLengthLimits.max),
            'passwordMismatch': pass !== confirmPassword
        }));

        setPassword(pass);
    }

    // Handler for confirming password input
    const confirmPasswordChange = (event) => {
        const passConfirm = event.target.value;
        setErrors(prev => ({
            ...prev,
            'passwordMismatch': passConfirm !== password
        }));

        setConfirmPassword(passConfirm);
    }

    // Form submission
    const noteFormSubmit = (event) => {
        event.preventDefault();
        // If the user entered a password, use it; if not, use a generated key
        const random_key = usePassword ? password : Help.randomKey(config.keyLength);
        const crypto = new NoteCrypto(note, random_key);
        // Encrypt the note, and if successful, create a request to save it on the server
        try {
            const note_encrypt = crypto.encrypt();
            setSecretKey({key: random_key, isUser: usePassword});

            const fields = {
                data: note_encrypt,
                ...(expiration ? {expiration} : {}),
                ...(email && sendEmail ? {email} : {}),
            };

            doRequest({endpoint: 'notes', postData: fields, method: 'POST'});
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Container className="p-3">
            <Row className="mt-2">
                <Col>
                    <h3>{t('note_create_h3')}</h3>
                </Col>
            </Row>

            <Row className="mt-2">
                <Col>
                    <Form onSubmit={noteFormSubmit}>
                        <Row>
                            {/* Field for note content */}
                            <InputCustom
                                required
                                value={note}
                                label={t('note_create_textarea_label')}
                                className="mb-3"
                                description={t('note_create_textarea_description')}
                                as="textarea"
                                onChange={noteChange}
                                isInvalid={errors.noteLength} // Highlight and display an error if length exceeds the limit
                                error={errors.noteLength ? t('error_note_length', {max: config.noteMaxLength}) : ""}
                                rows={8}
                            />
                        </Row>

                        <Row className="mb-4">
                            <Col>
                                {/* Select for choosing note expiration time */}
                                <SelectCustom
                                    className="mb-2"
                                    options={expiration_periods}
                                    label={t('note_create_periods_label')}
                                    value={expiration}
                                    onChange={event => setExpiration(event.target.value)}
                                />
                                {/* Email input field */}
                                <InputCustom
                                    required
                                    label={t('note_create_email_label')}
                                    className="mb-2"
                                    type="email"
                                    disabled={!sendEmail}
                                    value={email}
                                    onChange={event => setEmail(event.target.value)}
                                />
                                {/* Checkbox for sending read report via email */}
                                <SwitchCustom
                                    label={t('note_create_send_email_label')}
                                    onChange={() => setSendEmail(prev => !prev)}
                                />
                            </Col>

                            <Col>
                                {/* Password input field */}
                                <InputCustom
                                    required
                                    label={t('note_create_password_label')}
                                    className="mb-2"
                                    type="password"
                                    disabled={!usePassword} // Disabled if checkbox is not selected
                                    value={password}
                                    name="password"
                                    onChange={passwordChange}
                                    isInvalid={usePassword && errors.passwordLength} // Highlight and display an error if selected and length is not valid
                                    error={usePassword && errors.passwordLength ?
                                        t(clientErrors.passwordLength, {
                                            min: config.passwordLengthLimits.min,
                                            max: config.passwordLengthLimits.max
                                        }) : ""}
                                />
                                {/* Confirm password input field */}
                                <InputCustom
                                    required
                                    label={t('note_create_password_confirm_label')}
                                    className="mb-2"
                                    type="password"
                                    disabled={!usePassword}
                                    value={confirmPassword}
                                    name="confirmPassword"
                                    onChange={confirmPasswordChange}
                                    isInvalid={usePassword && errors.passwordMismatch} // Highlight and display an error if selected and passwords don't match
                                    error={usePassword && errors.passwordMismatch ? t(clientErrors.passwordMismatch) : ""}
                                />
                                {/* Checkbox for using a password */}
                                <SwitchCustom
                                    label={t('note_create_use_password_label')}
                                    onChange={() => setUsePassword(prev => !prev)}
                                />
                            </Col>
                        </Row>
                        {/* Form submit button
                        Disabled during form validation errors or while a request is being executed */}
                        <Button type="submit" disabled={!validated || isLoading} variant="outline-dark">
                            {/* Spinner, displayed during server request */}
                            {isLoading ? (<Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />) : ''} {' '}
                            {t('note_create_button_label')}
                        </Button>

                    </Form>

                </Col>
            </Row>
            {/* Display an error alert if the server returns an error */}
            <ErrorAlert error={!!requestErrors} errors={requestErrors} closeHandler={() => {
            }}/>

        </Container>
    )
}
