import {Suspense} from "react";
import {Spinner} from "react-bootstrap";
import PropTypes from "prop-types";

// Loading spinner component
const LoaderLine = () => {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
            <Spinner animation="grow"/>
        </div>
    );
}

// Wrapper function that adds loading spinner around the provided component
const Loader = (Component) => (props) => {
    return (
        <Suspense fallback={<LoaderLine/>}>
            <Component {...props} />
        </Suspense>
    );
}

Loader.propTypes = {
    Component: PropTypes.elementType.isRequired,
};

export default Loader;
