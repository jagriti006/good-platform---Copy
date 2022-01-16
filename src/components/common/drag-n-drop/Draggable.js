import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Row, Space } from "antd";
import Text from "antd/lib/typography/Text";
import { find, findIndex, remove } from "lodash-es";
import { useDrag } from "react-dnd";
import CategoryButton from "../../programCreation/common/CategoryButton";
const style = {
  border: "1px dashed gray",
  backgroundColor: "white",
  padding: "0.5rem 1rem",
  marginRight: "1.5rem",
  marginBottom: "1.5rem",
  cursor: "move",
  float: "left",
};
export default function Draggable({ draggedItem, allItems, setAllItems }) {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "ROUNDED-BUTTON",
      item: draggedItem,
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult();
        if (item && dropResult) {
          console.log(`You dropped ${item.title} into ${dropResult.name}!`);
        }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        handlerId: monitor.getHandlerId(),
      }),
    }),
    [draggedItem]
  );
  return (
    <CategoryButton
      icon={<img src={draggedItem.icon} style={{ width: 70 }} />}
      text={draggedItem.title}
      added={draggedItem.added}
      ref={drag}
      role="ROUNDED-BUTTON"
    />
  );
}
