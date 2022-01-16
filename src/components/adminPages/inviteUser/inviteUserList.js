import React, {useState, useEffect} from "react";
import {Avatar, Image, Button, notification, Col, Row, Tabs, Pagination} from "antd";
import {Typography} from "antd";
import mail from "../../../assets/images/mail-grey.png";
import edit from "../../../assets/images/edit-grey.png";
import useravatar from "../../../assets/images/header/inviteuser.png";
import trash from "../../../assets/images/trash-grey.png";
import enable from "../../../assets/images/Vectorpreview.png";
import phone from "../../../assets/images/phone-grey.png";
import "../../../assets/css/invite-users.scss";
import UserForm from "./InviteUserModal";
import EditUserModal from "./inviteEditUserModal";
import DeleteConfirmation from "./deleteVolunteer";
import EnableConfirmation from "./enableVolunteer";
import userAPI from "../../../api/userAPI";

const {Text, Title} = Typography;
const dummyStatus = [true,false];
const dummyUserStatus = ["ACCEPTED","PENDING"];
const dummyData = [
  {
    firstName: `${Math.random().toString(36).substr(2)}`,
    lastName: `${Math.random().toString(36).substr(2)}`,
    emailId: `${Math.random().toString(36).substr(2)}@gmail.com`,
    phone: `${Math.random().toString(10).substr(2, 10)}`,
    active: dummyStatus[Math.floor(Math.random() * dummyStatus.length)],
    inviteStatus: `${dummyUserStatus[Math.floor(Math.random() * dummyUserStatus.length)]}`,
    userIdpId: `${Math.random().toString(36).substr(2)}`,
    userId: `${Math.random().toString(36).substr(2)}`,
    organisationId: `${Math.random().toString(36).substr(2)}`,
    projects: [
      {
        projectName: 'Project 1'
      },
      {
        projectName: 'Project 2'
      },
      {
        projectName: 'Project 3'
      }
    ],
  },
  {
    firstName: `${Math.random().toString(36).substr(2)}`,
    lastName: `${Math.random().toString(36).substr(2)}`,
    emailId: `${Math.random().toString(36).substr(2)}@gmail.com`,
    phone: `${Math.random().toString(10).substr(2, 10)}`,
    active: dummyStatus[Math.floor(Math.random() * dummyStatus.length)],
    inviteStatus: `${dummyUserStatus[Math.floor(Math.random() * dummyUserStatus.length)]}`,
    userIdpId: `${Math.random().toString(36).substr(2)}`,
    userId: `${Math.random().toString(36).substr(2)}`,
    organisationId: `${Math.random().toString(36).substr(2)}`,
    projects: [
      {
        projectName: 'Project 1'
      },
      {
        projectName: 'Project 2'
      },
      {
        projectName: 'Project 3'
      }
    ],
  },
  {
    firstName: `${Math.random().toString(36).substr(2)}`,
    lastName: `${Math.random().toString(36).substr(2)}`,
    emailId: `${Math.random().toString(36).substr(2)}@gmail.com`,
    phone: `${Math.random().toString(10).substr(2, 10)}`,
    active: dummyStatus[Math.floor(Math.random() * dummyStatus.length)],
    inviteStatus: `${dummyUserStatus[Math.floor(Math.random() * dummyUserStatus.length)]}`,
    userIdpId: `${Math.random().toString(36).substr(2)}`,
    userId: `${Math.random().toString(36).substr(2)}`,
    organisationId: `${Math.random().toString(36).substr(2)}`,
    projects: [
      {
        projectName: 'Project 1'
      },
      {
        projectName: 'Project 2'
      },
      {
        projectName: 'Project 3'
      }
    ],
  },
  {
    firstName: `${Math.random().toString(5).substr(2)}`,
    lastName: `${Math.random().toString(5).substr(2)}`,
    emailId: `${Math.random().toString(5).substr(2)}@gmail.com`,
    phone: `${Math.random().toString(10).substr(2, 10)}`,
    active: dummyStatus[Math.floor(Math.random() * dummyStatus.length)],
    inviteStatus: `${dummyUserStatus[Math.floor(Math.random() * dummyUserStatus.length)]}`,
    userIdpId: `${Math.random().toString(5).substr(2)}`,
    userId: `${Math.random().toString(5).substr(2)}`,
    organisationId: `${Math.random().toString(5).substr(2)}`,
    projects: [
      {
        projectName: 'Project 1'
      },
      {
        projectName: 'Project 2'
      },
      {
        projectName: 'Project 3'
      }
    ],
  },
  {
    firstName: `${Math.random().toString(36).substr(2)}`,
    lastName: `${Math.random().toString(36).substr(2)}`,
    emailId: `${Math.random().toString(36).substr(2)}@gmail.com`,
    phone: `${Math.random().toString(10).substr(2, 10)}`,
    active: dummyStatus[Math.floor(Math.random() * dummyStatus.length)],
    inviteStatus: `${dummyUserStatus[Math.floor(Math.random() * dummyUserStatus.length)]}`,
    userIdpId: `${Math.random().toString(36).substr(2)}`,
    userId: `${Math.random().toString(36).substr(2)}`,
    organisationId: `${Math.random().toString(36).substr(2)}`,
    projects: [
      {
        projectName: 'Project 1'
      },
      {
        projectName: 'Project 2'
      },
      {
        projectName: 'Project 3'
      }
    ],
  }
];

const InviteUserList = () => {
  const [isPending, setPending] = useState(false);
  const [showInviteModal, setInviteModal] = useState(false);
  const [showInviteEditUserModal, setShowInviteEditUserModal] = useState(false);
  const [showDeleteModal, setDeleteModal] = useState(false);
  const [showEnableModal, setEnableModal] = useState(false);
  const [volunteerList, setVolunteerList] = useState([]);
  const [volunteerPendingList, setVolunteerPendingList] = useState([]);
  const [data, setData] = useState([]);
  const [perPage, setPerpage] = useState(50);
  const [currenPage, setCurrentPage] = useState(1);
  const [paginationData, setPaginationData] = useState({
    totalcount: "",
  });
  const [pendingData, setPendingData] = useState([]);
  const [pendingPerPage, setPendingPerPage] = useState(50);
  const [PendingCurrenPage, setPendingCurrentPage] = useState(1);
  const [pendingPaginationData, setPendingPaginationData] = useState({
    totalcount: "",
  });
  const [editInviteUserId, setEditInviteUserId] = useState("");
  const [editInviteUserOrgId, setEditInviteUserOrgId] = useState("");

  useEffect(() => {
    fetchVolunteerList(currenPage, perPage);
    fetchVolunteerPendingList(currenPage, perPage);
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchVolunteerList(pageNumber, perPage);
  };

  const handlePendingPageChange = (pageNumber) => {
    setPendingCurrentPage(pageNumber);
    fetchVolunteerPendingList(pageNumber, pendingPerPage);
  };

  const reSendLink = async (user) => {
    const newValues = {
      emailId: user.emailId,
      contactNumber: user.phone,
      projectId: [user.projects[0].projectId],
    };

    const response = await userAPI().resendInviteLink(newValues);
    if (response.success) {
      notification.success({
        message: "Reinvitation Sent..!",
      });
    }
  };

  const fetchVolunteerPendingList = async (currenPage, perPage) => {
    setPendingData(dummyData);
    const accepted = dummyData.filter((x) => x.inviteStatus === "ACCEPTED");
    const pending = dummyData.filter((x) => x.inviteStatus === "PENDING");
    setVolunteerPendingList([accepted, pending]);

    // const organisationId = sessionStorage.getItem("organisationId");
    // const projectId = sessionStorage.getItem("projectId");
    // if (organisationId) {
    //   await userAPI()
    //     .getVolunteerList(organisationId, projectId, currenPage - 1, perPage, "PENDING")
    //     .then((res) => {
    //       if (res.data?.data?.length) {
    //         const data = res.data?.data;
    //         setPendingData(data);
    //         setPendingPaginationData({
    //           totalcount: res.data.totalElements,
    //         });
    //         const accepted = data.filter((x) => x.inviteStatus === "ACCEPTED");
    //         const pending = data.filter((x) => x.inviteStatus === "PENDING");
    //         setVolunteerPendingList([accepted, pending]);
    //       }
    //     })
    //     .catch((err) => notification.error({message: "Failed to load Volunteers!"}));
    // }
  };

  const fetchVolunteerList = async (currenPage, perPage) => {
    setData(dummyData);
    const accepted = dummyData.filter((x) => x.inviteStatus === "ACCEPTED");
    const pending = dummyData.filter((x) => x.inviteStatus === "PENDING");
    setVolunteerList([accepted, pending]);

    // const organisationId = sessionStorage.getItem("organisationId");
    // const projectId = sessionStorage.getItem("projectId");
    // if (organisationId) {
    //   await userAPI()
    //     .getVolunteerList(organisationId, projectId, currenPage - 1, perPage, "ACCEPTED")
    //     .then((res) => {
    //       if (res.data?.data?.length) {
    //         const data = res.data?.data;
    //         setData(data);
    //         setPaginationData({
    //           totalcount: res.data.totalElements,
    //         });
    //         const accepted = data.filter((x) => x.inviteStatus === "ACCEPTED");
    //         const pending = data.filter((x) => x.inviteStatus === "PENDING");
    //         setVolunteerList([accepted, pending]);
    //       }
    //     })
    //     .catch((err) => notification.error({message: "Failed to load Volunteers!"}));
    // }
  };

  const setEditData = (data) => {
    localStorage.setItem("disableid", data)
    setDeleteModal(true)
  }

  const setEnableData = (data) => {
    localStorage.setItem("disableid", data)
    setEnableModal(true);
  }

  const editUser = (uid, orgid) => {
    setEditInviteUserId(uid);
    setEditInviteUserOrgId(orgid);
    setShowInviteEditUserModal(true);
  }

  return (
    <div className="row invite-user-list-container px-lg-5">
      <div className="col content-wrapper">
        <div className="row title-area">
          <div className="col">
            <Title level={2}>Volunteers</Title>
          </div>
          <div className="col d-flex justify-content-end">
            <button className="signbutton" onClick={() => setInviteModal(true)}>
              INVITE
            </button>
          </div>
        </div>
        <div className={'row title-area'}>
          <Col xs={24} className="px-2 pl-sm-3">
            <Title level={5}>Accepted ({volunteerList && volunteerList[0] ? volunteerList[0].length : 0})</Title>
          </Col>
          <Col xs={24} className="px-2 pl-sm-3">
            <Row gutter={[16, 16]}>
              {volunteerList && volunteerList[0]
                ? volunteerList[0].map((user) => (
                  <div className="card-body user-card">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex text-center align-items-center">
                        <img src={useravatar} alt="Edit User" width="10%"/>

                        <Title
                          level={4}
                          className="mx-2 mb-0"
                          style={{width: 168, textAlign: "start"}}
                          ellipsis={{
                            tooltip: `${user.firstName} ${user.lastName}`,
                          }}
                        >
                          {`${user.firstName} ${user.lastName}`}
                        </Title>
                        <div className={"d-flex align-items-center mx-2"}>
                          <img src={mail}/>
                          <Text className={"ml-1"} type="secondary">
                            {user.emailId}
                          </Text>
                        </div>
                        <div className={"d-flex align-items-center mx-2"}>
                          <img src={phone} alt="Phone"/>
                          <Text className={"ml-1"} type="secondary">
                            {user.phone}
                          </Text>
                        </div>
                      </div>
                      <div>
                        {user.active == true && (
                          <img
                            src={trash}
                            alt="Delete User"
                            className={"mx-2 pointer"}
                            // onClick={() => setDeleteModal(true)}
                            onClick={() => setEditData(user.userIdpId)}

                          />
                        )}
                        {user.active == false && (
                          <img
                            src={enable}
                            alt="Delete User"
                            className={"mx-2 pointer"}
                            // onClick={() => setDeleteModal(true)}
                            onClick={() => setEnableData(user.userIdpId)}
                          />
                        )}
                        <img src={edit} alt="Edit User" className={"mx-2 pointer"}
                             onClick={() => editUser(user.userId, user.organisationId)}/>
                      </div>
                    </div>
                    <div className="row pb-2">
                      {user.projects &&
                      user.projects.map((project, i) => (
                        <div
                          className="col-auto mr-0"
                          style={{
                            marginLeft: i === 0 ? "17.5rem" : null,
                          }}
                        >
                          <div className="card-chip">
                            <Text ellipsis={{tooltip: project.projectName}} className="mb-0">
                              {project.projectName}
                            </Text>
                          </div>
                        </div>
                      ))}
                      <div className="col pr-0 d-flex justify-content-end">
                        {isPending && <Button type="link customLink">Resend Link</Button>}
                      </div>
                    </div>
                  </div>
                ))
                : ""}
            </Row>
            {data.length > 0 ? (
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
              <h5 style={{textAlign: 'center'}}>Empty list found..!</h5>
            )}
          </Col>
        </div>
        <div className={'row title-area'}>
          <Col xs={24} className="px-2 pl-sm-3">
            <Title level={5}>Pending
              ({volunteerPendingList && volunteerPendingList[1] ? volunteerPendingList[1].length : 0})</Title>
          </Col>
          <Col xs={24} className="px-2 pl-sm-3">
            <Row gutter={[16, 16]}>
              {volunteerPendingList && volunteerPendingList[1]
                ? volunteerPendingList[1].map((user) => (
                  <div className="card-body user-card">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex text-center align-items-center">
                        <img src={useravatar} alt="Edit User" width="10%"/>

                        <Title
                          level={4}
                          className="mx-2 mb-0"
                          style={{width: 168, textAlign: "start"}}
                          ellipsis={{
                            tooltip: `${user.firstName} ${user.lastName}`,
                          }}
                        >
                          {`${user.firstName} ${user.lastName}`}
                        </Title>
                        <div className={"d-flex align-items-center mx-2"}>
                          <img src={mail}/>
                          <Text className={"ml-1"} type="secondary">
                            {user.emailId}
                          </Text>
                        </div>
                        <div className={"d-flex align-items-center mx-2"}>
                          <img src={phone} alt="Phone"/>
                          <Text className={"ml-1"} type="secondary">
                            {user.phone}
                          </Text>
                        </div>
                      </div>
                      <div>
                        {user.active == true && (

                          <img
                            src={trash}
                            alt="Delete User"
                            className={"mx-2 pointer"}
                            // onClick={() => setDeleteModal(true)}
                            onClick={() => setEditData(user.userIdpId)}
                          />
                        )}
                        {user.active == false && (
                          <img
                            src={enable}
                            alt="Delete User"
                            className={"mx-2 pointer"}
                            // onClick={() => setDeleteModal(true)}
                            onClick={() => setEnableData(user.userIdpId)}
                          />
                        )}
                        <img src={edit} alt="Edit User" className={"mx-2 pointer"}
                             onClick={() => editUser(user.userId, user.organisationId)}/>
                      </div>
                    </div>
                    <div className="row pb-2">
                      {user.projects &&
                      user.projects.map((project, i) => (
                        <div
                          className="col-auto mr-0"
                          style={{
                            marginLeft: i === 0 ? "17.5rem" : null,
                          }}
                        >
                          <div className="card-chip">
                            <Text ellipsis={{tooltip: project.projectName}} className="mb-0">
                              {project.projectName}
                            </Text>
                          </div>
                        </div>
                      ))}
                      <div className="col pr-0 d-flex justify-content-end">
                        {
                          <Button type="link customLink" onClick={() => reSendLink(user)}>
                            Resend Link
                          </Button>
                        }
                      </div>
                    </div>
                  </div>
                ))
                : ""}
            </Row>
            {pendingData.length > 0 ? (
              <div className="row justify-content-end">
                <div className="col-12">
                  <Pagination
                    total={pendingPaginationData.totalcount}
                    defaultPageSize={50}
                    current={PendingCurrenPage}
                    onChange={(pageNumber) => handlePendingPageChange(pageNumber)}
                    onShowSizeChange={(index, count) => {
                      setPendingPerPage(count);
                    }}
                    hideOnSinglePage
                  />
                </div>
              </div>
            ) : (
              <h5 style={{textAlign: 'center'}}>Empty list found..!</h5>
            )}
          </Col>
        </div>
      </div>
      {showInviteModal && <UserForm closeModal={() => setInviteModal(false)}/>}
      {showInviteEditUserModal &&
      <EditUserModal closeModal={() => setShowInviteEditUserModal(false)} editInviteUserId={editInviteUserId}
                     editInviteUserOrgId={editInviteUserOrgId}/>}
      {showDeleteModal && <DeleteConfirmation closeModal={() => setDeleteModal(false)}/>}
      {showEnableModal && <EnableConfirmation closeModal={() => setEnableModal(false)}/>}

    </div>
  );
};

export default InviteUserList;
