import {
  PlusOutlined,
  RightOutlined,
  SafetyCertificateTwoTone,
  SearchOutlined,
  SlidersOutlined,
} from "@ant-design/icons";
import { Button, Col, Input, Row, Table, Tag, Typography } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import validatorAPI from "../../api/validatorAPI";
import appRoutes from "../../constants/app-routes";
import { sidebarActions } from "../../redux/ui/uiActions";
import FilterModal from "./FilterModal/FilterModal";
import "../beneficieryList/index.scss";
import moment from "moment";

const { Column } = Table;

const { Text, Title, Link } = Typography;

const OrganisationList = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState({
    category: "",
  });
  const [data, setData] = useState([]);
  const [paginationData, setPaginationData] = useState({
    total: "",
  });
  const [currenPage, setCurrentPage] = useState(1);
  const { push } = useHistory();
  const dispatch = useDispatch();
  const toggleVisible = () => {
    setFilterOpen(!filterOpen);
  };

  const columns = [
    {
      title: "ORGANISATION NAME",
      dataIndex: "name",
      sorter: {
        compare: (a, b) => a.name - b.name,
      },
    },
    {
      title: "STATUS",
      dataIndex: "status",
      render: (text, row, index) => {
        return (
          <div>
            <Text className={"font-weight-bold"}>{text}</Text>
          </div>
        );
      },
    },
    {
      title: "DATE ADDED",
      dataIndex: "createdAt",
      render: (text) => moment(text).format("DD-MM-YYYY"),
    },
    {
      title: "",
      dataIndex: "action",
      render: (text, record) => <RightOutlined onClick={() => onOrganisationClick(record.id)} />,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const response = await validatorAPI().fetchOrganisationList(currenPage);
      if (response.data?.data) {
        setPaginationData({
          total: response.data.totalElements,
          defaultPageSize: response.data.pageSize,
          current: currenPage,
          onChange: (pageNumber) => setCurrentPage(pageNumber),
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          pageSizeOptions: [],
          hideOnSinglePage: true,
        });
        setData(
          response.data.data.map((item, index) => {
            return {
              key: index,
              id: item.id,
              name: item.name,
              createdAt: item.createdOn,
              status: item.approvalStatus,
            };
          })
        );
      }
    };
    fetchData();
    dispatch(sidebarActions.showSidebar());
  }, [currenPage]);

  const filterSubmitHandler = (filterData) => {
    setFilterOpen(false);
    setSelectedFilter(filterData);
  };

  const getFilterCount = () => {
    let count = 0;
    if (selectedFilter.category) {
      count += 1;
    }

    return count > 0 ? `(${count})` : "";
  };

  const clearSelectedFilter = () => {
    setSelectedFilter({
      setCategory: "",
    });
  };

  const onTagClickHandler = (field) => {
    const clonedSelectedFilter = { ...selectedFilter };
    switch (field) {
      case "category": {
        clonedSelectedFilter.category = "";
        break;
      }
      default:
        break;
    }
    setSelectedFilter(clonedSelectedFilter);
  };

  const onOrganisationClick = async (organisationId) => {
    const formData = {
      organisationId,
      validatorId: sessionStorage?.userId,
    };
    const response = await validatorAPI().startReview(formData);
    if (response.data) {
      push(`${appRoutes.VALIDATOR}${appRoutes.ORGANISATIONS}/${organisationId}`);
    }
  };

  return (
    <Row className={"beneficieryContainer"}>
      <Col span={22} offset={1}>
        <Title className={"beneficieryHeading"}>Organisations</Title>
        <Row className={"beneficieryFilterContainer mt-3 py-4 px-4 align-center"}>
          <Col span={24} className=" beneficieryFilterContainer">
            <Col span={8}>
              <Input
                placeholder="Search by organisation, date etc"
                prefix={<SearchOutlined style={{ fontSize: "1.2rem" }} className={"mx-2"} />}
                className={"beneficieryFilterInput"}
                style={{
                  borderRadius: 8,
                }}
              />
            </Col>
            <Col span={6} className={"pl-2"}>
              <Button
                icon={<SlidersOutlined rotate={90} style={{ fontSize: "1rem" }} />}
                size={"large"}
                className={`px-4 font-weight-bold beneficieryFilterButton ${filterOpen ? "buttonActive" : ""}`}
                onClick={toggleVisible}
              >
                {`FILTERS ${getFilterCount()}`}
              </Button>
              {filterOpen && (
                <FilterModal onClose={toggleVisible} onSubmit={filterSubmitHandler} filters={selectedFilter} />
              )}
            </Col>
          </Col>
          {getFilterCount() !== "" && (
            <Col span={24} className={"mt-3 justify-content-between"} style={{ display: "flex" }}>
              <Col span={20} style={{ display: "flex", flexWrap: "wrap" }}>
                {selectedFilter.gender && (
                  <Tag color="#fdeeb5" className={"py-1 px-3 filterTag"} onClick={() => onTagClickHandler("gender")}>
                    Category: {selectedFilter.category}
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
            <Table dataSource={data} className={"beneficieryTable"} pagination={paginationData}>
              {columns.map((column, idx) => {
                return (
                  <Column
                    title={column.title}
                    dataIndex={column.dataIndex}
                    key={idx}
                    render={column.render}
                  />
                );
              })}
            </Table>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default OrganisationList;
