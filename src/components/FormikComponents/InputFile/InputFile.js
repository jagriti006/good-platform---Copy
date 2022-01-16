import { Upload, message, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const Input = ({
  field: { name, value, ...otherFieldProps },
  form: { touched, errors, status },
  id,
  className,
  label,
  ...props
}) => {
  return (
    <Upload name={name} id={id} className={className} maxCount={1} {...props}>
      <Button style={{ marginBottom: "0.5rem" }}  className="d-flex justify-content-between align-items-center">
        {label}
        <UploadOutlined />
      </Button>
    </Upload>
  );
};

export default Input;
