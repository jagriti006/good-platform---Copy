import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faEdit, faPhone, faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col, Typography, Input, Popover, Button, Table, Badge, Card, Pagination, Tag, Tooltip } from "antd";
import {
  SearchOutlined,
  SlidersOutlined,
  EllipsisOutlined,
  RightOutlined,
  SafetyCertificateTwoTone,
  PlusOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import beneficiaryAPI from "../../api/beneficiaryAPI";
import { projectIdorName } from "../../api/config";
import appRoutes from "../../constants/app-routes";
import { PROJECT } from "../../constants/strings";
import { useQuery } from "../../utils/utils";
import FilterActions from "./FilterAction/FilterActions";
import FilterModal from "./FilterModal/FilterModal";
import { ROLES } from "../../constants/strings";

const { Column } = Table;
const { Text, Title, Link } = Typography;

const BeneficiaryList = () => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const filter = useQuery();
  const projectId = useQuery().get("projectId");
  const projectName = projectIdorName("", projectId);
  const [perPage, setPerpage] = useState(10);
  const [currenPage, setCurrentPage] = useState(1);
  const [paginationData, setPaginationData] = useState({total: "",});
  const [filterOpen, setFilterOpen] = useState(false);
  const [actionVisible, setActionVisible] = useState(false);

  const [selectedFilter, setSelectedFilter] = useState({
    gender: "",
    locations: [],
    locationLabel: "",
    occupation: "",
    verification: "",
  });

  const toggleVisible = () => {
    setFilterOpen(!filterOpen);
  };

  const isSocialAdmin = () => {
    return sessionStorage.userRole == [ROLES.SOCIAL_ADMIN];
  };

  const columns = [
    {
      title: "",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "BENEFICIARY ID",
      dataIndex: isSocialAdmin ? "id" : "beneficiaryId",
      key: "id",
    },
    {
      title: "NAME",
      dataIndex: "firstName",
      key: "firstName",
      sorter: {
        compare: (a, b) => a.firstName - b.firstName,
      },
    },
    {
      title: "PHONE NO.",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "EMAIL.",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "GENDER",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
    },
  ];

  const getFilterCount = () => {
    let count = 0;
    if (selectedFilter.gender) {
      count += 1;
    }
    if (selectedFilter.occupation) {
      count += 1;
    }
    if (selectedFilter.verification) {
      count += 1;
    }
    if (selectedFilter.locationLabel) {
      count += 1;
    }

    return count > 0 ? `(${count})` : "";
  };

  const fetchData = async () => {
    const userId = sessionStorage.getItem("userId");
    const orgId = sessionStorage.getItem("organisationId");
    let response;
    if (isSocialAdmin) {
      response = await beneficiaryAPI().getBeneficiariesByOrg(orgId, currenPage - 1, perPage, filter);
      } else {
        response = await beneficiaryAPI().listBeneficiaries(userId, currenPage - 1, projectId, perPage, filter);
    }
    if (response.data) {
      const { data } = response;
      setData(data.data);
      setPaginationData({
        total: data.totalElements
      });
    }
  };

  const filterSubmitHandler = (filterData) => {
    setFilterOpen(false);
    setSelectedFilter(filterData);
  };

  const hide = () => {
    setActionVisible(false);
  };

  const handleVisibleChange = (visible) => {
    setActionVisible(visible);
  };

  const onTagClickHandler = (field) => {
    const clonedSelectedFilter = { ...selectedFilter };
    switch (field) {
      case "gender": {
        clonedSelectedFilter.gender = "";
        break;
      }
      case "locationLabel": {
        clonedSelectedFilter.locationLabel = "";
        clonedSelectedFilter.locations = [];
        break;
      }
      case "occupation": {
        clonedSelectedFilter.occupation = "";
        break;
      }
      case "verification": {
        clonedSelectedFilter.verification = "";
        break;
      }
      default:
        break;
    }
    setSelectedFilter(clonedSelectedFilter);
  };

  
  const clearSelectedFilter = () => {
    setSelectedFilter({
      gender: "",
      locations: [],
      locationLabel: "",
      occupation: "",
      verification: "",
    });
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setCurrentPage(pagination.current);
    setPerpage(pagination.pageSize);
    // fetchData({
    //   sortField: sorter.field,
    //   sortOrder: sorter.order,
    //   pagination,
    //   ...filters,
    // });
  };

  useEffect(() => {
    fetchData(paginationData.activePage);
  }, [currenPage, perPage]);

  const handleJumpToBeneficiaryOverview = ({ beneficiaryId }) => {
    history.push(`${appRoutes.BENEFICIARY}${appRoutes.BENEFICIARY_OVERVIEW}/${beneficiaryId}?projectId=${projectId}`);
  };

  return (
    <Row className={"beneficieryContainer"}>
      <Col span={22} offset={1}>
        <Title className={"beneficieryHeading"}>Beneficiary</Title>
        <Row className={"beneficieryFilterContainer mt-3 py-4 px-4 align-center"} >
          <Col span={24} className=" beneficieryFilterContainer">
            <Col span={8}>
              <Input
                placeholder="Search by name, program etc"
                prefix={
                  <SearchOutlined
                    style={{ fontSize: "1.2rem" }}
                    className={"mx-2"}
                  />
                }
                className={"beneficieryFilterInput"}
                style={{
                  borderRadius: 8,
                }}
              />
            </Col>
            <Col span={6} className={"pl-2"}>
              <Button
                icon={
                  <SlidersOutlined rotate={90} style={{ fontSize: "1rem" }} />
                }
                size={"large"}
                className={`px-4 font-weight-bold beneficieryFilterButton ${
                  filterOpen ? "buttonActive" : ""
                }`}
                onClick={toggleVisible}
              >
                {`FILTERS ${getFilterCount()}`}
              </Button>
              {filterOpen && (
                <FilterModal
                  onClose={toggleVisible}
                  onSubmit={filterSubmitHandler}
                  filters={selectedFilter}
                />
              )}
            </Col>
            <Col span={10} className={"popoverContainer"}>
              <Popover
                content={<FilterActions onClose={hide} />}
                trigger="click"
                visible={actionVisible}
                placement={"bottomRight"}
                onVisibleChange={handleVisibleChange}
                overlayClassName={"popoverOverlay"}
              >
                <EllipsisOutlined
                  style={{ fontSize: "2rem", color: "#39364f" }}
                />
              </Popover>
            </Col>
          </Col>
          {getFilterCount() !== "" && (
            <Col
              span={24}
              className={"mt-3 justify-content-between"}
              style={{ display: "flex" }}
            >
              <Col span={20} style={{ display: "flex", flexWrap: "wrap" }}>
                {selectedFilter.gender && (
                  <Tag
                    color="#fdeeb5"
                    className={"py-1 px-3 filterTag"}
                    onClick={() => onTagClickHandler("gender")}
                  >
                    Gender: {selectedFilter.gender}
                    <span className={"ml-2"}>
                      <PlusOutlined rotate={45} style={{ fontSize: "1rem" }} />
                    </span>
                  </Tag>
                )}
                {selectedFilter.locationLabel && (
                  <Tag
                    color="#b5d9fd"
                    className={"py-1 px-3 filterTag"}
                    onClick={() => onTagClickHandler("locationLabel")}
                  >
                    locationLabel: {selectedFilter.locationLabel}
                    <span className={"ml-2"}>
                      <PlusOutlined rotate={45} style={{ fontSize: "1rem" }} />
                    </span>
                  </Tag>
                )}
                {selectedFilter.occupation && (
                  <Tag
                    color="#b0d1d8"
                    className={"py-1 px-3 filterTag"}
                    onClick={() => onTagClickHandler("occupation")}
                  >
                    Occupation: {selectedFilter.occupation}
                    <span className={"ml-2"}>
                      <PlusOutlined rotate={45} style={{ fontSize: "1rem" }} />
                    </span>
                  </Tag>
                )}
                {selectedFilter.verification && (
                  <Tag
                    color="#fdb5b5"
                    className={"py-1 px-3 filterTag"}
                    onClick={() => onTagClickHandler("verification")}
                  >
                    Verification: {selectedFilter.verification}
                    <span className={"ml-2"}>
                      <PlusOutlined rotate={45} style={{ fontSize: "1rem" }} />
                    </span>
                  </Tag>
                )}
              </Col>
              <Col span={4} style={{ textAlign: "right" }}>
                <Link onClick={clearSelectedFilter}>
                  <span className={"clearFilter"}>Clear all</span>
                </Link>
              </Col>
            </Col>
          )}
        </Row>
        <Row>
          <Col span={24} className={"mt-2"}>
            <Table dataSource={data} className={"beneficieryTable"} pagination={paginationData} onChange={handleTableChange} >
              <Column
                title={columns[1].title}
                dataIndex={columns[1].dataIndex}
                key={columns[1].key}
              />
              <Column
                title={columns[2].title}
                dataIndex={columns[2].dataIndex}
                key={columns[2].key}
                render={(text, row, index) => {
                  return (
                    <div>
                      <Text className={"font-weight-bold"}>
                        {text}
                        {row?.verified ? (
                          <span className={"ml-2"}>
                            <SafetyCertificateTwoTone />
                          </span>
                        ) : null}
                      </Text>
                    </div>
                  );
                }}
                sorter={{ compare: (a, b) => a.name - b.name }}
              />
              <Column
                title={columns[3].title}
                dataIndex={columns[3].dataIndex}
                key={columns[3].key}
              />
              <Column
                title={columns[4].title}
                dataIndex={columns[4].dataIndex}
                key={columns[4].key}
              />
              <Column
                title={columns[5].title}
                dataIndex={columns[5].dataIndex}
                key={columns[5].key}
              />
              {isSocialAdmin && <Column
                title="Program Name"
                key="projectName"
                dataIndex="projectName"
              />}
              <Column
                title={columns[6].title}
                key={columns[6].key}
                render={(text, record) => <RightOutlined />}
              />
            </Table>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default BeneficiaryList;