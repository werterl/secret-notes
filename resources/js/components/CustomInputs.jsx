import React from "react";
import {Form} from "react-bootstrap";
import PropTypes from "prop-types";
import {v4 as uuidv4} from 'uuid';

// Component to display a switch with a customizable label
const SwitchCustom = ({label, ...rest}) => {
    return (
        <Form.Group>
            <Form.Check
                {...rest}
                type="switch"
                label={label}
            />
        </Form.Group>
    );
}

SwitchCustom.propTypes = {
    label: PropTypes.string.isRequired,
};

// Component for text fields with an embedded label, displaying error and description if needed
const InputCustom = ({label, value = '', className = '', description = '', error = '', onChange = () => {}, ...rest}) => {
    const id = uuidv4();
    return (
        <Form.Group className={className}>
            <Form.Label htmlFor={id}>{label}</Form.Label>
            <Form.Control id={id} value={value} onChange={onChange} {...rest} />

            {description && (
                <Form.Text muted>
                    {description}
                </Form.Text>
            )}

            {error && (
                <Form.Control.Feedback type="invalid">
                    {error}
                </Form.Control.Feedback>
            )}
        </Form.Group>
    );
}

InputCustom.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    className: PropTypes.string,
    description: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func
};

// Component to display a dropdown list with a customizable label, description, and options list
// - options: an array of objects [{ value, label }]
const SelectCustom = ({label, options = [], value = '', className = '', description = '', onChange = () => {}, ...rest}) => {
    const id = uuidv4();

    return (
        <Form.Group className={className}>
            <Form.Label htmlFor={id}>{label}</Form.Label>
            <Form.Select value={value} id={id} onChange={onChange} {...rest}>
                {options.map(({value: optionValue, label: optionLabel}, index) => (
                    <option value={optionValue} key={index}>
                        {optionLabel}
                    </option>
                ))}
            </Form.Select>

            {description && (
                <Form.Text muted>
                    {description}
                </Form.Text>
            )}
        </Form.Group>
    );
}

SelectCustom.propTypes = {
    label: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string,
            label: PropTypes.string.isRequired,
        })
    ),
    value: PropTypes.string,
    className: PropTypes.string,
    description: PropTypes.string,
};

export {InputCustom, SwitchCustom, SelectCustom};
