import { Select as AntSelect } from "antd";
import { getError } from "../../../utils/formik";
import {formErrorTextStyle, preventCopyPaste} from "../../../utils/utils";
import './SelectBox.scss';

const SelectBoxMultiple = ({
    field: { name, value },
    form: { setFieldValue, setFieldTouched, touched, errors, status },
    onChange: customOnChange,
    placeholder,
    options = [],
    className = '',
    optionLabel = 'label',
    valueLabel = 'value'
}) => {
    const errorText = getError(name, { touched, errors, status });
    return (
        <div className="customSelectWrapper">
            <AntSelect
                mode="multiple"
                allowClear
                showSearch
                name={name}
                value={value}
                className={`customSelect ${className}`}
                onChange={(value, option) => {
                    setFieldValue(name, value);
                    // Running the custom on change function if passed
                    if (customOnChange) {
                        customOnChange(value, option);
                    }
                }}
                onBlur={() => setFieldTouched(name, true)}
                placeholder={placeholder}
                onCopy={(e) => preventCopyPaste(e)}

                onCut={(e) => preventCopyPaste(e)}
            >
                {options && options.map((item) => {
                    const value = item[valueLabel];
                    const optionName = item[optionLabel];
                    return (
                        <AntSelect.Option
                            id={value}
                            value={value}
                            key={value}
                        >
                            {optionName}
                        </AntSelect.Option>
                    );
                })}
            </AntSelect>
            {!!errorText && <span style={formErrorTextStyle()}>{errorText}</span>}
        </div>
    );
};

export default SelectBoxMultiple;