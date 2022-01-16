import { PlusOutlined } from "@ant-design/icons";
import { Button, Input, Typography } from "antd";
import { useState } from "react";
import { preventCopyPaste } from "../../../utils/utils";
import "./filterModal.scss";

const { Text } = Typography;
const FilterModal = ({ onClose, onSubmit, filters }) => {
  const [category, setCategory] = useState(filters.category);

  const onSubmitHandler = () => {
    onSubmit({
      category,
    });
  };

  return (
    <div className={"p-3 mt-2 filterModalContainer"} style={{}}>
      <div className={"mb-3 filterModalHeading"}>
        <Text style={{ color: "#808080" }}>FILTERS:</Text>
        <PlusOutlined rotate={45} style={{ fontSize: "1.5rem" }} onClick={onClose} />
      </div>
      <div className={"my-2 filterModalContent"}>
        <Text className={"font-weight-bold filterLabel"}>Categories</Text>
        <Input
          placeholder={"Search"}
          className={"mt-3 filterLocation"}
          style={{ borderRadius: 8 }}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          onCopy={(e) => preventCopyPaste(e)}
          onCut={(e) => preventCopyPaste(e)}
        />

        <Button className={"my-3 px-5 py-3 filterApplyButton"} onClick={onSubmitHandler}>
          APPLY
        </Button>
      </div>
    </div>
  );
};

export default FilterModal;
