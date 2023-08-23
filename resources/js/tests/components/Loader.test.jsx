import {describe, it, expect} from "vitest";
import {render} from "@testing-library/react";

import Loader from "../../components/Loader"

describe('Loader Component', () => {
    it('should render the wrapped component within Suspense', () => {
        const MockComponent = () => <div>MockComponent</div>;
        const WrappedComponent = Loader(MockComponent);

        const {getByText} = render(<WrappedComponent />);
        const mockContent = getByText('MockComponent');

        expect(mockContent).toBeInTheDocument();
    });
});
