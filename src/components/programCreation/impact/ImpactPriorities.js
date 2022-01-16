import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Checkbox,
  Col,
  Collapse,
  Divider,
  notification,
  Row,
  Space,
} from "antd";
import Text from "antd/lib/typography/Text";
import { property } from "lodash-es";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import programcreationAPI from "../../../api/programcreationAPI";
import appRoutes from "../../../constants/app-routes";
import { setFinalImpactPriorities } from "../../../redux/program-creation/programActions";
import Icon from "../../common/Icon";
import TitleSection from "../common/TitleSection";

const ImpactPriorities = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const impactCategories = useSelector(
    (state) => state.program.impactCategories
  );
  const sortedCategories = impactCategories.sort(
    (a, b) => a.priorityIndex - b.priorityIndex
  );

  const [impactPriorities, setImpactPriorities] = useState({});
  const [selectedPriorities, setSelectedPriorities] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      let requests = [];
      sortedCategories.forEach((item) => {
        requests.push(programcreationAPI().getImpactPriorities(item.id));
      });
      const responses = await Promise.all(requests);
      if (responses.length > 0) {
        if (responses[0].isAxiosError) return;
        const arr = {};
        for (let i = 0; i < responses.length; i++) {
          arr[`${i + 1}`] = responses[i]?.data[0]?.impactPriorities;
        }
        setImpactPriorities(arr);
      }
    };
    fetchData();
  }, []);

  const handlePriorityChange = (event, type, priority) => {
    if (event.target.checked) {
      if (selectedPriorities[`${type}`]) {
        setSelectedPriorities({
          ...selectedPriorities,
          [`${type}`]: [...selectedPriorities[`${type}`], priority],
        });
      } else {
        if (selectedPriorities)
          setSelectedPriorities({
            ...selectedPriorities,
            [`${type}`]: [priority],
          });
        else {
          setSelectedPriorities({
            [`${type}`]: [priority],
          });
        }
      }
    } else {
      const typeArr = selectedPriorities[`${type}`];
      const index = selectedPriorities[`${type}`].indexOf(priority);
      if (index > -1) {
        typeArr.splice(index, 1);
        setSelectedPriorities({
          ...selectedPriorities,
          [`${type}`]: typeArr,
        });
      }
    }
  };
  const getPrioroties = (type) => {
    return impactPriorities?.[`${type}`]?.map((priority) => {
      return (
        <div key={priority.impactPriorityId}>
          <Checkbox
            onChange={(event) => handlePriorityChange(event, type, priority)}
          >
            {priority.impactPriorityString}
          </Checkbox>
        </div>
      );
    });
  };

  const hasSelectedPriorities = () => {
    let isValid = true;
    if (Object.keys(selectedPriorities).length === 0) isValid = false;
    Object.keys(impactPriorities).forEach((priorityType) => {
      if (!selectedPriorities[priorityType]) {
        isValid = false;
      } else if (selectedPriorities[priorityType].length === 0) {
        isValid = false;
      }
    });
    return isValid;
  };
  return (
    <div className="impact-category">
      <Row justify="center" className="py-2 py-lg-5 header-area">
        <Col xs={16}>
          <Row gutter={[16, 16]} justify="space-between" align="middle">
            <Col lg={11} xs={24} className="impactpriorityheading">
              <TitleSection
                step={"STEP 2 OF 4"}
                title={"Choose your Impact priorities"}
                description={
                  "Streamline your priorities as per your impact category"
                }
              />
            </Col>
            <Col lg={8} xs={24}>
              <Row gutter={[16, 16]}>
                <Col xs={6} className="width-70px">
                  <Space direction="vertical">
                    <div className="text-center">Primary</div>
                    {sortedCategories[0] && (
                      <Row justify="center" align="middle" className="w-100">
                        <Col
                          xs={24}
                          className="w-100 d-flex justify-content-center"
                        >
                          <Button
                            shape="circle"
                            icon={
                              <img
                                src={sortedCategories[0].icon}
                                style={{ width: 70 }}
                              />
                            }
                            size="large"
                            className={"dropped-button"}
                            role={"Dustbin"}
                          />
                        </Col>
                        <Col xs={24}>
                          <div
                            className="text-center item-text py-1"
                            style={{ wordBreak: "break-all" }}
                          >
                            {sortedCategories[0].title}
                          </div>
                        </Col>
                      </Row>
                    )}
                  </Space>
                </Col>
                {(sortedCategories[1] || sortedCategories[2]) && (
                  <>
                    <Divider type="vertical" />
                    <Col xs={16} className="">
                      <Space direction="vertical">
                        <div className="text-center">Secondary</div>
                        <Row gutter={[16, 16]} align="middle">
                          <Col xs={12}>
                            <Space direction="vertical" className="width-70px">
                              {sortedCategories[1] && (
                                <Row
                                  justify="center"
                                  align="middle"
                                  className="w-100"
                                >
                                  <Col xs={24} className="w-100">
                                    <Button
                                      shape="circle"
                                      icon={
                                        <img
                                          src={sortedCategories[1].icon}
                                          style={{ width: 70 }}
                                        />
                                      }
                                      size="large"
                                      className={"dropped-button"}
                                      role={"Dustbin"}
                                    />
                                  </Col>
                                  <Col xs={24}>
                                    <div
                                      className="text-center item-text py-1"
                                      style={{ wordBreak: "break-all" }}
                                    >
                                      {sortedCategories[1].title}
                                    </div>
                                  </Col>
                                </Row>
                              )}
                            </Space>
                          </Col>
                          <Col xs={12}>
                            <Space direction="vertical" className="width-70px">
                              {sortedCategories[2] && (
                                <Row
                                  justify="center"
                                  align="middle"
                                  className="w-100"
                                >
                                  <Col xs={24} className="w-100">
                                    <Button
                                      shape="circle"
                                      icon={
                                        <img
                                          src={sortedCategories[2].icon}
                                          style={{ width: 70 }}
                                        />
                                      }
                                      size="large"
                                      className={"dropped-button"}
                                      role={"Dustbin"}
                                    />
                                  </Col>
                                  <Col xs={24}>
                                    <div
                                      className="text-center item-text py-1"
                                      style={{ wordBreak: "break-all" }}
                                    >
                                      {sortedCategories[2].title}
                                    </div>
                                  </Col>
                                </Row>
                              )}
                            </Space>
                          </Col>
                        </Row>
                      </Space>
                    </Col>
                  </>
                )}
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row justify="center" className="category-list-row py-5">
        <Col xs={24} lg={16}>
          <Row gutter={[16, 16]} justify="space-between">
            <Col xs={24} lg={16}>
              <Collapse
                defaultActiveKey={["primary"]}
                expandIconPosition={"right"}
                expandIcon={({ isActive }) =>
                  isActive ? <MinusOutlined /> : <PlusOutlined />
                }
                className="custom-collapse prime"
              >
                <Text className="panel-title">PRIMARY</Text>
                {sortedCategories[0] && (
                  <Collapse.Panel
                    header={sortedCategories[0].title}
                    className="custom-panel"
                    key="primary"
                  >
                    {getPrioroties(1)}
                  </Collapse.Panel>
                )}
                {(sortedCategories[1] || sortedCategories[2]) && (
                  <Text className="panel-title">SECONDARY</Text>
                )}

                {sortedCategories[1] && (
                  <Collapse.Panel
                    header={sortedCategories[1].title}
                    className="custom-panel"
                    key="secondary1"
                  >
                    {getPrioroties(2)}
                  </Collapse.Panel>
                )}
                {sortedCategories[2] && (
                  <Collapse.Panel
                    header={sortedCategories[2].title}
                    className="custom-panel"
                    key="secondary2"
                  >
                    {getPrioroties(3)}
                  </Collapse.Panel>
                )}
              </Collapse>
            </Col>
            <Col xs={24} lg={8} className="d-flex justify-content-end">
              <Icon name="/program-creation/impact-priority" />
            </Col>
          </Row>
        </Col>
      </Row>

      <Row gutter={[16, 16]} justify="center" className="px-5">
        <Col xs={24} lg={8}>
          <div className="formStyles d-flex">
            <Button
              className="ant-btn-back"
              onClick={() => history.push(`${appRoutes.PROGRAM_CREATION}`)}
            >
              <FontAwesomeIcon icon={faAngleLeft} />
              &nbsp; Previous Step
            </Button>
            <Button
              onClick={() => {
                if (hasSelectedPriorities()) {
                  dispatch(setFinalImpactPriorities(selectedPriorities));
                  history.push(
                    `${appRoutes.PROGRAM_CREATION}${appRoutes.PRG_STRATEGIC_GOALS}`
                  );
                } else {
                  notification.error({
                    message: "Please select priority items for all categories",
                  });
                }
              }}
              type="primary"
              className="program-creation-form steps-action impactStyles nextbutton"
            >
              NEXT: STRATEGIC GOALS
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ImpactPriorities;
