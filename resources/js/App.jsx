import React from "react";
import ReactDOM from "react-dom/client";
import {ThemeProvider} from "react-bootstrap";
import {BrowserRouter} from "react-router-dom";

import {Routes} from "./Routes";

import "./i18n-init";
import "./time-ago-init";

// Information about the created note
import {NoteProvider} from "./contexts/NoteContext";
// Selected language
import {LanguageProvider} from "./contexts/LanguageContext";

import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";

function App() {
    return (
        <ThemeProvider>
            <NoteProvider>
                <LanguageProvider>
                    <BrowserRouter>
                        <Routes/>
                    </BrowserRouter>
                </LanguageProvider>
            </NoteProvider>
        </ThemeProvider>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <App/>
);
