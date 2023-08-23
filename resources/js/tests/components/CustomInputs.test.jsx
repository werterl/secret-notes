import {describe, it, expect} from "vitest";
import {render} from "@testing-library/react";

import {InputCustom, SelectCustom} from "../../components/CustomInputs";

describe('InputCustom Component', () => {
    it('should render with value', () => {
        const valueText = 'description';
        const {getByDisplayValue} = render(<InputCustom label="" value={valueText}/>);

        const inputControl = getByDisplayValue(valueText);
        expect(inputControl).toBeInTheDocument();
    });

    it('should render with description', () => {
        const descriptionText = 'description text';
        const {getByText} = render(<InputCustom label="" description={descriptionText}/>);

        const descriptionElement = getByText(descriptionText);
        expect(descriptionElement).toBeInTheDocument();
    });

    it('should render with error', () => {
        const errorText = 'error_message';
        const {getByText} = render(<InputCustom label="" error={errorText}/>);

        const errorElement = getByText(errorText);
        expect(errorElement).toBeInTheDocument();
    });
});

describe('SelectCustom component', () => {
    const options = [
        {value: 'value1', label: 'Option 1'},
        {value: 'value2', label: 'Option 2'},
    ];

    it('should render with description', () => {
        const descriptionText = 'description text';
        const {getByText} = render(<SelectCustom label="" description={descriptionText}/>);

        const descriptionElement = getByText(descriptionText);
        expect(descriptionElement).toBeInTheDocument();
    });

    it('should render with options', () => {
        const {getByText} = render(<SelectCustom label="" options={options}/>);

        options.forEach((option) => {
            const optionElement = getByText(option.label);
            expect(optionElement).toBeInTheDocument();
        });
    });

    it('should render with selected value', () => {
        const selectedValue = 'value2';

        const {getByRole} = render(
            <SelectCustom label="" options={options} value={selectedValue}/>
        );

        const selectControl = getByRole('combobox');
        expect(selectControl).toHaveValue(selectedValue);
    });

});
