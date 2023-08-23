import React from "react";
import {Dropdown} from "react-bootstrap";

import useLangSwitch from "../hooks/useLangSwitch";
import config from "../config";

// Language switcher component
export default function LanguageSwitcher() {
    const {switchLang, selectedLangLabel} = useLangSwitch();

    const handleSwitchLang = (lang_code) => {
        switchLang(lang_code);
    };

    return (
        <Dropdown>
            <Dropdown.Toggle variant="secondary" id="language-dropdown">
                {selectedLangLabel}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {
                    config.languages.map(({label, code}) => (
                        <Dropdown.Item onClick={() => handleSwitchLang(code)} key={code}>
                            {label}
                        </Dropdown.Item>
                    ))
                }
            </Dropdown.Menu>
        </Dropdown>
    );
}
