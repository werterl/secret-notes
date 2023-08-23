import React from "react";
import {Container, Navbar} from 'react-bootstrap';
import PropTypes from "prop-types";

import LanguageSwitcher from "./LanguageSwitcher";

// Displaying the header title and logo
function Header({caption, image}) {
    return (
        <Navbar bg="secondary" expand="lg" variant="dark">
            <Container>
                <Navbar.Brand href="/" style={{fontSize: '26px'}}>
                    <img
                        alt=""
                        src={image}
                        width="40"
                        height="40"
                        className="d-inline-block align-top"
                    />{' '}
                    {caption}
                </Navbar.Brand>
                <LanguageSwitcher/>
            </Container>
        </Navbar>
    );
}

Header.propTypes = {
    caption: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
};

export default Header;
