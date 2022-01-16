import { CloseCircleFilled, PlusOutlined } from "@ant-design/icons";
import { Badge, Button, Col, notification, Row } from "antd";
import { findIndex } from "lodash-es";
import { useEffect, useRef, useState } from "react";
import { useDrop } from "react-dnd";

const usePrevious = (data) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = data;
  });
  return ref.current;
};
const Droppable = ({ allItems, setAllItems, priorityIndex }) => {
  const [draggedItem, setDraggedItem] = useState("");
  const prevDraggedItem = usePrevious(draggedItem);

  useEffect(() => {
    addOrRemove("add");
  }, [draggedItem]);

  const addOrRemove = (op) => {
    var index = findIndex(allItems, { title: draggedItem.title });
    if (index > -1) {
      let newArr = [...allItems];
      newArr.splice(index, 1, {
        ...draggedItem,
        priorityIndex,
        added: op === "add" ? true : false,
      });
      removeExisting(newArr);
      if (op === "remove") {
        setDraggedItem("");
      }
    }
  };

  const removeExisting = (modifiedArr) => {
    if (prevDraggedItem) {
      const item = prevDraggedItem;
      var index = findIndex(modifiedArr, { title: item.title });
      if (index > -1) {
        let newArr = [...modifiedArr];
        newArr.splice(index, 1, {
          ...item,
          priorityIndex: "",
          added: false,
        });
        setAllItems(newArr);
      }
    } else {
      setAllItems(modifiedArr);
    }
  };
  const onDrop = (item) => {
    if (!item.added) {
      setDraggedItem(item);
      return { name: "Dustbin" };
    } else {
      notification.warn({ message: "Alreay added" });
    }
  };

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "ROUNDED-BUTTON",
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  const isActive = canDrop && isOver;

  return (
    <>
      {!draggedItem.title && (
        <Button
          type="dashed"
          shape="circle"
          ref={drop}
          role={"Dustbin"}
          icon={<PlusOutlined />}
          size="large"
          className={
            isActive
              ? "drop-active dashed-circular-button"
              : "dashed-circular-button"
          }
        />
      )}
      {draggedItem.title && (
        <div className="w-100">
          <Badge
            count={
              <CloseCircleFilled
                style={{
                  color: "#E6E5E5",
                  backgroundColor: "#39364F",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  addOrRemove("remove");
                }}
              />
            }
            className="w-100"
            offset={[-10, 10]}
          >
            <Row justify="center" align="middle" className="w-100">
              <Col xs={24} className="w-100">
                <Button
                  shape="circle"
                  icon={<img src={draggedItem.icon} style={{ width: 70 }}/>}
                  size="large"
                  className={
                    isActive
                      ? "drop-active dashed-circular-button"
                      : "dropped-button"
                  }
                  ref={drop}
                  role={"Dustbin"}
                />
              </Col>
              <Col xs={24}>
                <div
                  className="text-center item-text py-1"
                  style={{ wordBreak: "break-all" }}
                >
                  {draggedItem.title}
                </div>
              </Col>
            </Row>
          </Badge>
        </div>
      )}
    </>
  );
};

export default Droppable;
