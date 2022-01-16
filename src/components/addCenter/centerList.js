import React, {useState, useEffect} from "react";
import {Col, Row, Pagination} from "antd";
import {Typography} from "antd";
import edit from "../../assets/images/edit-grey.png";
import useravatar from "../../assets/images/header/inviteuser.png";
import location from "../../assets/images/soOnboardingIcons/locationActive.png";
import trash from "../../assets/images/trash-grey.png";
import "../../assets/css/invite-users.scss";
import CenterForm from "./addCenterModal";
import DeleteConfirmation from "./deleteCenter";
import userAPI from "../../api/userAPI";

const {Text, Title} = Typography;

const CenterList = () => {
  const [showAddModal, setAddModal] = useState(false);
  const [showEditModal, setEditModal] = useState(false);
  const [showDeleteModal, setDeleteModal] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [centerList, setCenterList] = useState([]);
  const [perPage, setPerpage] = useState(50);
  const [currenPage, setCurrentPage] = useState(1);
  const [paginationData, setPaginationData] = useState({
    totalcount: "",
  });
  const [editableData, setEditableData] = useState(null);
  const [deletableId, setDeletableId] = useState(null);

  useEffect(() => {
    fetchAllCenterList(currenPage, perPage);
  }, [isRefresh === true]);

  const fetchAllCenterList = async (currenPage, perPage) => {
    const currentPage = isRefresh ? 1 : currenPage;
    const organisationId = sessionStorage.getItem("organisationId");
    const response = await userAPI().getAllCenter(organisationId, currentPage - 1, perPage);

    if (response.data) {
      const data = response.data?.content;
      setPaginationData({
        totalcount: response.data.totalElements,
      });
      setCenterList(data);
      setIsRefresh(false);
    }
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchAllCenterList(pageNumber, perPage);
  };

  const setEditData = (data) => {
    setEditModal(true);
    setEditableData(data);
  }

  const displayAddress = (village, taluk, district, state, postalCode) => {
    let address = "";

    if (village) {
      address += village + ", ";
    }
    if (taluk) {
      address += taluk + ", ";
    }
    if (district) {
      address += district + ", ";
    }
    if (state) {
      address += state + ", ";
    }

    address = address.substr(0, address.length - 2);

    if (postalCode) {
      address += " - " + postalCode + ", ";
    }

    return address.substr(0, address.length - 2);
  }

  const deleteCenter = async () => {
    const response = await userAPI().deleteCenter(deletableId);

    if (response.success) {
      setIsRefresh(true);
    }
  }

  return (
    <div className="row invite-user-list-container px-lg-5">
      <div className="col content-wrapper">
        <div className="row title-area">
          <div className="col">
            <Title level={2}>Centers</Title>
          </div>
          <div className="col d-flex justify-content-end">
            <button className="signbutton" onClick={() => setAddModal(true)}>
              Add
            </button>
          </div>
        </div>
        
        <Col xs={24} className="px-2 px-lg-5">
          <Row gutter={[16, 16]}>
            {centerList && centerList.map((center, index) => (
              <div className="card-body user-card" key={index}>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex text-center align-items-center">
                    <img src={useravatar} alt="Edit Center" width="10%"/>
                    <Title
                      level={4}
                      className="mx-2 mb-0"
                      style={{width: 168, textAlign: "start"}}
                      ellipsis={{
                        tooltip: `${center.title}`,
                      }}
                    >
                      {center.title}
                    </Title>
                    <div className={"d-flex align-items-center mx-2"}>
                      <img src={location}/>
                      <Text className={"ml-1"} type="secondary">
                        {displayAddress(center.village, center.taluk, center.district, center.state, center.postalCode)}
                      </Text>
                    </div>
                  </div>
                  <div>
                    <img
                      src={trash}
                      alt="Delete Center"
                      className={"mx-2 pointer"}
                      onClick={() => {
                        setDeletableId(center.id)
                        setDeleteModal(true)
                      }}
                    />
                    <img
                      src={edit}
                      alt="Edit Center"
                      className={"mx-2 pointer"}
                      onClick={() => setEditData(center)}
                    />
                  </div>
                </div>
                <div className="row pb-2">
                  <div
                    className="col-auto mr-0"
                    style={{
                      marginLeft: "15.5rem"
                    }}
                  >
                    <div className="card-chip">
                      <Text ellipsis={{tooltip: center.shortTitle}} className="mb-0">
                        {center.shortTitle}
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Row>
          {centerList.length > 0 ? (
            <div className="row justify-content-end">
              <div className="col-12">
                <Pagination
                  total={paginationData.totalcount}
                  defaultPageSize={50}
                  current={currenPage}
                  onChange={(pageNumber) => handlePageChange(pageNumber)}
                  onShowSizeChange={(index, count) => {
                    setPerpage(count);
                  }}
                  hideOnSinglePage
                />
              </div>
            </div>
          ) : (
            <h5 style={{textAlign: "center"}}>Empty list found..!</h5>
          )}
        </Col>
      </div>

      {(showAddModal || showEditModal) &&
      <CenterForm
        closeModal={() => {
          setAddModal(false)
          setEditModal(false)
          setEditableData(null)
        }}
        data={editableData}
        onRefresh={() => setIsRefresh(true)}
      />}

      {showDeleteModal &&
      <DeleteConfirmation
        closeModal={() => setDeleteModal(false)}
        onDeleteCenter={() => deleteCenter()}
      />}
    </div>
  );
};

export default CenterList;
