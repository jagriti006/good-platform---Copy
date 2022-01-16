import React, { useEffect, useState } from "react";
import { Modal, Typography } from "antd";

const { Text, Title } = Typography;

function DeleteCenter(props) {
  const [isVisible, setIsVisible] = useState(false);

  const handleCancel = () => {
    setIsVisible(false);
    props.closeModal();
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <Modal
      visible={isVisible}
      onCancel={handleCancel}
      destroyOnClose
      centered
      footer={null}
    >
      <div className="d-flex flex-column align-items-center justify-content-center p-4">
        <div className="row">
          <div className="col">
            <Title level={2}>Delete Center</Title>
          </div>
        </div>
        <div className="row mb-4">
          <div className="col">
            <Text>You're about to delete a center detail.</Text>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <button className="signbutton" onClick={() => {
              props.onDeleteCenter()
              handleCancel()
            }}>
              YES I'M SURE
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteCenter;
