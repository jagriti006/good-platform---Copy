import { Select as AntSelect } from "antd";
import { getError } from "../../../utils/formik";
import {formErrorTextStyle, preventCopyPaste} from "../../../utils/utils";
import FloatLabel from "../../common/float-label";
import "./SelectBox.scss";

const SelectBox = ({
  visible = true,
  field: { name, value },
  form: { setFieldValue, setFieldTouched, touched, errors, status },
  onChange: customOnChange,
  placeholder,
  options = [],
  className = "",
  optionLabel = "label",
  valueLabel = "value",
  showSearch = true,
  ...otherProps
}) => {
  //const errorText = getError(name, { touched, errors, status });
  return (
    visible && (
      <div className="customSelectWrapper">
        <FloatLabel label={placeholder} name={name} value={value}>
          <AntSelect
            showSearch={showSearch}
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
            filterOption={(input, option) => (
              option.props.children.toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            )}
            getPopupContainer={trigger => trigger.parentNode}
            onBlur={() => setFieldTouched(name, true)}
            {...otherProps}
            onCopy={(e) => preventCopyPaste(e)}

            onCut={(e) => preventCopyPaste(e)}
          >
            {options &&
              options.map((item) => {
                const value = item[valueLabel];
                const optionName = item[optionLabel];
                return (
                  <AntSelect.Option id={value} value={value} key={`${value}+${Math.random()*101|0}`}>
                    {optionName}
                  </AntSelect.Option>
                );
              })}
          </AntSelect>
        </FloatLabel>
        {(otherProps.errorText || otherProps.errortext) ? <span style={formErrorTextStyle()}>{otherProps.errorText || otherProps.errortext}</span> : ""}

      </div>
    )
  );
};

export default SelectBox;
