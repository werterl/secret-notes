import {describe, it, expect} from "vitest";
import {render} from "@testing-library/react";

import ErrorAlert from "../../components/ErrorAlert";

describe('ErrorAlert Component', () => {
    it('should render nothing when there is no error', () => {
        const {container} = render(<ErrorAlert error={false}/>);
        expect(container.firstChild).toBeNull();
    });

    it('should render the error message', () => {
        const {getByText} = render(
            <ErrorAlert error={true} errors={{data: {errors: {message: 'Test Error'}}}} closeHandler={() => {
            }}/>
        );

        const errorMessage = getByText('Test Error');
        expect(errorMessage).toBeInTheDocument();
    });

    it("should render close button", () => {
        const {getByRole} = render(
            <ErrorAlert error={true} errors={{data: {errors: {message: 'Test Error'}}}} closeHandler={() => {
            }}/>
        );

        const closeButton = getByRole('button');
        expect(closeButton).toBeInTheDocument();
    });

    it('should not render close button when handler is not passed', () => {
        const {queryByRole} = render(
            <ErrorAlert error={true} closeHandler={null}/>
        );

        const closeButton = queryByRole('button');
        expect(closeButton).not.toBeInTheDocument();
    });

    it('should render the server status as unknown when no status is provided', () => {
        const {getByText} = render(<ErrorAlert error={true} errors={{}} closeHandler={() => {
        }}/>);
        const unknownStatus = getByText('error_unknown');
        expect(unknownStatus).toBeInTheDocument();
    });
});
