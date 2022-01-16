import { Input as AntInput } from "antd";
import {formErrorTextStyle, preventCopyPaste} from "../../../utils/utils";
import FloatLabel from "../../common/float-label";

function onlyNumberKey(evt) {
  // Only ASCII character in that range allowed
  var ASCIICode = evt.which ? evt.which : evt.keyCode;
  if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) return false;
  return true;
}

const Input = ({
  visible = true,
  field: { name, value, ...otherFieldProps },
  id,
  className,
  placeholder,
  pattern,
  onKeyPress,
  onChange = () => null,
  type = "text",
  inputType = "input",
  inputPlaceholder,
  ...otherProps
}) => {
  const FieldType = inputType === "input" ? AntInput : AntInput.TextArea;
  return (
    visible && (
      <>
        
        <FloatLabel
          label={inputPlaceholder ? "" : placeholder}
          name={name}
          value={value}
          prefix={otherProps.prefix}
        >
          <FieldType
            name={name}
            id={id}
            className={className}
            className={otherProps.errortext && otherProps.errortext.length > 0 ? " bordererror" : "invalid"}
            value={value}
            onChange={(e) => {
              otherFieldProps.onChange(e);
              if (onChange) {
                onChange(e);
              }
            }}
            placeholder={placeholder ? "" : inputPlaceholder}
            pattern={pattern}
            onBlur={otherFieldProps.onBlur}
            type={type}
            onkeydown={onkeydown}
            inputprops={{ shrink: true }}
            {...otherProps}
            onCopy={(e) => preventCopyPaste(e)}

            onCut={(e) => preventCopyPaste(e)}
          />
        </FloatLabel>
        {(otherProps.errortext || otherProps.errorText) && (
          <span style={formErrorTextStyle()}>{otherProps.errortext || otherProps.errorText}</span>
        )}
      </>
    )
  );
};

export default Input;
