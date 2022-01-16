import React, { useEffect, useState } from "react";
import {useHistory} from "react-router-dom";
import { Row, Col, Typography, Input, Popover, Button, Table, Tag } from "antd";
import {
  SearchOutlined,
  SlidersOutlined,
  EllipsisOutlined,
  RightOutlined,
  SafetyCertificateTwoTone,
  PlusOutlined,
  DownOutlined
} from "@ant-design/icons";
import "./index.scss";
import FilterActions from "./FilterAction/FilterActions";
import FilterModal from "./FilterModal/FilterModal";
import userAPI from "../../../api/userAPI";

const { Column } = Table;

const { Text, Title, Link } = Typography;

const ImplementationPartners = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [actionVisible, setActionVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState({
    gender: "",
    locations: [],
    locationLabel: "",
    occupation: "",
    verification: "",
  });
  const history = useHistory();

  const toggleVisible = () => {
    setFilterOpen(!filterOpen);
  };

  const hide = () => {
    setActionVisible(false);
  };

  const handleVisibleChange = (visible) => {
    setActionVisible(visible);
  };

  const [data, setData] = useState([]);

  const columns = [
    {
      title: "",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "IMPLEMENTATION PARTNERS",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "DATE ADDED",
      dataIndex: "createdOn",
      key: "createdOn",
      sorter: {
        compare: (a, b) => a.date - b.date,
      },
    },
    {
      title: "STATUS",
      dataIndex: "approvalStatus",
      key: "approvalStatus",
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
    },
  ];

  const partnerStatus = ["APPROVED", "Submitted", "REVIEW", "REJECTED"];
  const partnerStatusColor = ["#78e3a9", "#a9a9a9", "#ffd447", "#ff0000"];

  useEffect(() => {
    // setData(
    //   [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => {
    //     return {
    //       key: item,
    //       id: "AB123456",
    //       name: `Implementation Partners ${item}`,
    //       createdOn: "23.08.2020",
    //       approvalStatus: partnerStatus[Math.floor(Math.random() * partnerStatus.length)],
    //     };
    //   })
    // );

    userAPI()
      .getAdminOrganisationData()
      .then((res) => {
        const {data} = res;
        if (data) {
          setData(data.data);
        }
      });
  }, []);

  const filterSubmitHandler = (filterData) => {
    setFilterOpen(false);
    setSelectedFilter(filterData);
  };

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

  const clearSelectedFilter = () => {
    setSelectedFilter({
      gender: "",
      locations: [],
      locationLabel: "",
      occupation: "",
      verification: "",
    });
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

  return (
    <Row className={"beneficieryContainer"}>
      <Col span={22} offset={1}>
        <Title className={"beneficieryHeading"}>Implementation Partners</Title>
        <Row
          className={"beneficieryFilterContainer mt-3 py-4 px-4 align-center"}
        >
          <Col span={24} className=" beneficieryFilterContainer">
            <Col span={8}>
              <Input
                placeholder="Search by name"
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
            <Table dataSource={data} className={"beneficieryTable"} onRow={(record, recordIndex) => {
              return {
                onClick: () => {
                  history.push(`/organisation/preview/${record.id}`);
                }
              }
            }}>
              <Column
                title={columns[1].title}
                dataIndex={columns[1].dataIndex}
                key={columns[1].key}
                sorter={{ compare: (a, b) => a.name - b.name }}
              />
              <Column
                title={columns[2].title}
                dataIndex={columns[2].dataIndex}
                key={columns[2].key}
                sorter={{ compare: (a, b) => a.createdOn - b.createdOn }}
              />
              <Column
                title={columns[3].title}
                dataIndex={columns[3].dataIndex}
                key={columns[3].key}
                render={(text, row, index) => {
                  return (
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-evenly',
                      alignItems: 'center',
                      background: partnerStatus.includes(text) ? partnerStatusColor[partnerStatus.indexOf(text)] : '#faebd7',
                      borderRadius: '1rem',
                      width: '10rem'
                    }}>
                      <Text>
                        {text}
                      </Text>
                      <DownOutlined />
                    </div>
                  );
                }}
              />
              <Column
                title={columns[4].title}
                dataIndex={columns[4].dataIndex}
                key={columns[4].key}
                render={(text, record) => <RightOutlined />}
              />
            </Table>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ImplementationPartners;
