import React, { useEffect, useState } from "react";
import { Modal, Typography,notification } from "antd";
import userAPI from "../../../api/userAPI";

const { Text, Title } = Typography;

function EnableVolunteer(props) {
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState([]);
  const [paginationData, setPaginationData] = useState({
    totalcount: "",
  });
  const [volunteerList, setVolunteerList] = useState([]);


  const handleCancel = () => {
    setIsVisible(false);
    props.closeModal();
  };

  const savedocument = async (userIdpId) => {
    const disableid = localStorage.getItem("disableid")
    console.log(disableid)
    const response = await userAPI().updateEnableDetail(disableid);
    console.log(response)
    if (response) {
      props.closeModal();
      // notification.success({ message: "Legal Details Saved..!" });
    }
  };

  const removeVolunteer = () => {
    console.log("enabled");
    savedocument();
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
            <Title level={2}>Enable Volunteer</Title>
          </div>
        </div>
        <div className="row mb-4">
          <div className="col">
            <Text>You're about to enable a volunteer contact detail.</Text>
          </div>
        </div>
        
        <div className="row">
          <div className="col">
            <button className="signbutton" onClick={removeVolunteer}>
              YES I'M SURE
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default EnableVolunteer;
