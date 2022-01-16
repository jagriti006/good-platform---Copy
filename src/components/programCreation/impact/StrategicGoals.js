import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Checkbox,
  Col,
  Collapse,
  Divider,
  Row,
  Space,
  notification,
} from "antd";
import Text from "antd/lib/typography/Text";
import { property } from "lodash-es";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import programcreationAPI from "../../../api/programcreationAPI";
import appRoutes from "../../../constants/app-routes";
import { setFinalStrategicGoals } from "../../../redux/program-creation/programActions";
import Icon from "../../common/Icon";
import TitleSection from "../common/TitleSection";

const StrategicGoals = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const impactPriorities = useSelector(
    (state) => state.program.impactPriorities
  );
  const [strategicGoals, setStrategicGoals] = useState({});
  const [selectedStrategicGoals, setSelectedStrategicGoals] = useState({});
  useEffect(() => {
    const fetchData = () => {
      let requests = {};
      let startegicResponse = {};
      Object.keys(impactPriorities).forEach((priority) => {
        impactPriorities[priority].forEach((item) => {
          if (requests[`${item.impactPriorityId}`]) {
            requests[`${item.impactPriorityId}`].push(
              programcreationAPI().getStartegicGoals(item.impactPriorityId)
            );
          } else {
            requests[`${item.impactPriorityId}`] = [
              programcreationAPI().getStartegicGoals(item.impactPriorityId),
            ];
          }
        });
      });
      Object.keys(requests).forEach(async (priority) => {
        const responseList = await Promise.all(requests[priority]);
        responseList.forEach((response) => {
          if (response.data && response?.data[0]) {
            startegicResponse = {
              ...startegicResponse,
              [`${response.data[0].impactPrioritiesId}`]:
                response?.data[0]?.impactStrategicGoals,
            };
          }
        });
        setStrategicGoals(startegicResponse);
      });
    };
    fetchData();
  }, []);

  const renderStrategicGolas = (impactPriorityId) => {
    return strategicGoals?.[`${impactPriorityId}`]?.map((goal) => {
      return (
        <div key={goal.impactStrategicGoalId}>
          <Checkbox
            onChange={(event) => {
              if (event.target.checked) {
                if (selectedStrategicGoals[impactPriorityId]) {
                  setSelectedStrategicGoals({
                    ...selectedStrategicGoals,
                    [impactPriorityId]: [
                      ...selectedStrategicGoals[impactPriorityId],
                      goal,
                    ],
                  });
                } else {
                  if (selectedStrategicGoals) {
                    setSelectedStrategicGoals({
                      ...selectedStrategicGoals,
                      [`${impactPriorityId}`]: [goal],
                    });
                  } else {
                    setSelectedStrategicGoals({
                      [`${impactPriorityId}`]: [goal],
                    });
                  }
                }
              } else {
                const typeArr = selectedStrategicGoals[`${impactPriorityId}`];
                const index =
                  selectedStrategicGoals[`${impactPriorityId}`].indexOf(goal);
                if (index > -1) {
                  typeArr.splice(index, 1);
                  setSelectedStrategicGoals({
                    ...selectedStrategicGoals,
                    [`${impactPriorityId}`]: typeArr,
                  });
                }
              }
            }}
          >
            {goal.impactStrategicGoalString}
          </Checkbox>
        </div>
      );
    });
  };
  const validateGoalsSelection = () => {
    let isValid = true;
    const priorityIds = Object.keys(impactPriorities).map((priority) => {
      return impactPriorities[`${priority}`].map((item) => {
        return item.impactPriorityId;
      });
    });
    const allPriorityIds = [].concat.apply([], priorityIds);
    const allSelected = Object.keys(selectedStrategicGoals);

    if (allSelected.length === 0) isValid = false;
    allPriorityIds.forEach((item) => {
      if (allSelected.indexOf(item) < 0) {
        isValid = false;
      } else if (selectedStrategicGoals[item].length === 0) {
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
            <Col lg={13} xs={24}>
              <TitleSection
                step={"STEP 3 OF 4"}
                title={"Choose your Strategic Goals"}
                description={
                  "These goals will help us understand what your program focuses on, hence helping create a curated experience"
                }
              />
            </Col>
          </Row>
        </Col>
      </Row>

      <Row justify="center" className="category-list-row py-5">
        <Col xs={24} lg={16}>
          <Row gutter={[16, 16]} justify="space-between">
            <Col xs={24} lg={16}>
              <Collapse
                expandIconPosition={"right"}
                expandIcon={({ isActive }) =>
                  isActive ? <MinusOutlined /> : <PlusOutlined />
                }
                className="custom-collapse prime"
              >
                <Text className="panel-title">PRIMARY</Text>
                {Object.keys(impactPriorities).map((priority) => {
                  if (priority === "1") {
                    return impactPriorities[priority].map((item) => {
                      return (
                        <Collapse.Panel
                          header={
                            <>
                              <Text className="panel-header-regular">
                                {"Select goals For "}
                              </Text>
                              <Text className="panel-header">{`${item.impactPriorityString}`}</Text>
                            </>
                          }
                          className="custom-panel"
                        >
                          {renderStrategicGolas(item.impactPriorityId)}
                        </Collapse.Panel>
                      );
                    });
                  }
                })}

                {(impactPriorities[2] || impactPriorities[3]) && (
                  <Text className="panel-title">SECONDARY</Text>
                )}
                {Object.keys(impactPriorities).map((priority) => {
                  if (priority === "2" || priority === "3") {
                    return impactPriorities[priority].map((item) => {
                      return (
                        <Collapse.Panel
                          header={
                            <>
                              <Text className="panel-header-regular">
                                {"Select goals For "}
                              </Text>
                              <Text className="panel-header">{`${item.impactPriorityString}`}</Text>
                            </>
                          }
                          className="custom-panel"
                        >
                          {renderStrategicGolas(item.impactPriorityId)}
                        </Collapse.Panel>
                      );
                    });
                  }
                })}
              </Collapse>
            </Col>
            <Col xs={24} lg={8} className="d-flex justify-content-end">
              <Icon name="/program-creation/strategic-goals" />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row gutter={[16, 16]} justify="center" className="px-5">
        <Col xs={24} lg={8}>
          <div className="formStyles d-flex">
            <Button
              className="ant-btn-back"
              onClick={() =>
                history.push(
                  `${appRoutes.PROGRAM_CREATION}${appRoutes.PRG_IMPACT_PRIORITIES}`
                )
              }
            >
              <FontAwesomeIcon icon={faAngleLeft} />
              &nbsp; Previous Step
            </Button>
            <Button
              onClick={() => {
                if (validateGoalsSelection()) {
                  dispatch(setFinalStrategicGoals(selectedStrategicGoals));
                  history.push(
                    `${appRoutes.PROGRAM_CREATION}${appRoutes.PRG_PROGRAM_NAME}`
                  );
                } else {
                  notification.error({
                    message: "Please select strategic goals for all priorities",
                  });
                }
              }}
              type="primary"
              className="program-creation-form steps-action impactStyles nextbutton"
            >
              NEXT: PROJECT NAME
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default StrategicGoals;
