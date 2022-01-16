import { Button, Col, Row, Checkbox, Collapse, notification } from "antd";
import Modal from "antd/lib/modal/Modal";
import Text from "antd/lib/typography/Text";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProgramcreationAPI from "../../../api/programcreationAPI";
import { METRICS } from "../../../constants/strings";
import CategoryButton from "../common/CategoryButton";
import TitleSection from "../common/TitleSection";

const CategoryModal = ({ step, setStep, fetchMetricsData }) => {
  const { programId } = useParams();
  const { categoryItem, view } = step;
  const [allCategories, setAllCategories] = useState([]);
  const [categoryId, setCategoryId] = useState();
  const [impactPriorities, setImpactPriorities] = useState([]);
  const [selectedPriorities, setSelectedPriorities] = useState([]);
  const [strategicGoals, setSterategicGoals] = useState({});
  const [selectedGoals, setSelectedGoals] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      if (view === METRICS.CATEGORY) {
        setCategoryId(categoryItem?.categoryId);
        await fetchCategories();
      }
      if (view === METRICS.PRIORITY) {
        await fetchPriorities();
      }

      if (view === METRICS.STRATEGIC_GOALS) {
        if (step.priorityId)
          setSelectedPriorities(categoryItem.impactPriorities.filter((item) => item.priorityId === step.priorityId));
      }
    };

    fetchData();
  }, [step]);

  const fetchCategories = async () => {
    const response = await ProgramcreationAPI().getImpactCategories();
    if (response.data) {
      const { impactCategories } = response.data;
      const items = impactCategories.map((item) => {
        return {
          id: item.impactCategoryId,
          title: item.impactCategoryName,
          icon: `data:image/svg+xml;base64,${item.categoryLogo}`,
          added: false,
          priorityIndex: "",
        };
      });
      setAllCategories(items);
    }
  };
  const fetchPriorities = async () => {
    const response = await ProgramcreationAPI().getImpactPriorities(categoryId || categoryItem.categoryId);
    if (response.data[0]) {
      setImpactPriorities(response.data[0].impactPriorities);
    }
  };
  const fetchStrategicGoals = async (impactPriorityId) => {
    const response = await ProgramcreationAPI().getStartegicGoals(impactPriorityId);
    if (response.data) {
      setSterategicGoals({
        ...strategicGoals,
        [impactPriorityId]: response.data[0],
      });
    }
  };
  const onPriorityChange = (selected) => {
    setSelectedPriorities(selected);
  };

  const onGoalChangeChange = (selected, impactPriorityId) => {
    setSelectedGoals({ ...selectedGoals, [impactPriorityId]: selected });
  };

  const isCategorySelected = (selectedCategoryId) => {
    let selected;
    if (categoryItem.categoryId === selectedCategoryId) selected = true;
    if (selected) return true;
    else return false;
  };
  const isPrioritySelected = (priorityId) => {
    let selected;
    selected = categoryItem.impactPriorities.find((item) => item.priorityId === priorityId);
    if (selected) return true;
    else return false;
  };

  const isGoalSelected = (impactStrategicGoalId, impactPriorityId) => {
    let selected;
    const priorityItem = categoryItem.impactPriorities.find((item) => item.priorityId === impactPriorityId);
    if (priorityItem)
      selected = priorityItem.strategicGoals.find((item) => item.strategicGoalId === impactStrategicGoalId);
    if (selected) return true;
    else return false;
  };
  // console.log("selectedPriorities", selectedPriorities);
  console.log("categoryId", categoryId);
  console.log("categoryItem", categoryItem);
  const getPrioroties = () => {
    return (
      <Checkbox.Group style={{ width: "100%" }} onChange={onPriorityChange}>
        {impactPriorities?.map((priority) => {
          return (
            <Col xs={24} key={priority.impactPriorityId}>
              {!isPrioritySelected(priority.impactPriorityId) && (
                <Checkbox value={priority}>{priority.impactPriorityString}</Checkbox>
              )}
            </Col>
          );
        })}
      </Checkbox.Group>
    );
  };

  const renderStrategicGolas = (impactPriorityId) => {
    return (
      <Checkbox.Group style={{ width: "100%" }} onChange={(selected) => onGoalChangeChange(selected, impactPriorityId)}>
        {strategicGoals[impactPriorityId]?.impactStrategicGoals.map((goal) => {
          return (
            !isGoalSelected(goal.impactStrategicGoalId, impactPriorityId) && (
              <Col xs={24} key={goal.impactStrategicGoalId}>
                <Checkbox value={goal}>{goal.impactStrategicGoalString}</Checkbox>
              </Col>
            )
          );
        })}
      </Checkbox.Group>
    );
  };
  const getContentByStep = () => {
    switch (view) {
      case METRICS.CATEGORY: {
        return (
          <>
            <TitleSection step={"STEP 1/4"} title={"Impact Category"} />
            <Row gutter={[16, 16]}>
              {allCategories.map((item, index) => {
                return (
                  !isCategorySelected(item.id) && (
                    <Col xs={6} lg={4} key={index}>
                      <CategoryButton
                        icon={
                          <img
                            src={item.icon}
                            style={{
                              width: 70,
                              border: item.id === categoryId ? "5px solid #3a8d9d" : "",
                              borderRadius: "50%",
                            }}
                          />
                        }
                        text={item.title}
                        added={item.id === categoryId}
                        onClick={() => setCategoryId(item.id)}
                      />
                    </Col>
                  )
                );
              })}
            </Row>
            <Row justify="center">
              <Col xs={24} lg={12}>
                <div className="formStyles">
                  <Button
                    onClick={() => {
                      if (categoryItem.categoryId !== categoryId)
                        setStep({ ...step, view: METRICS.PRIORITY, categoryItem });
                      else notification.error({ message: "Please Select one category" });
                    }}
                    type="primary"
                  >
                    NEXT: Impact Priorities
                  </Button>
                </div>
              </Col>
            </Row>
          </>
        );
      }
      case METRICS.PRIORITY: {
        return (
          <>
            <TitleSection step={"STEP 2/4"} title={"Choose your Impact priorities"} />
            <Row gutter={[16, 16]}>{getPrioroties()}</Row>
            <Row justify="center">
              <Col xs={24} lg={12}>
                <div className="formStyles">
                  <Button
                    onClick={() => {
                      if (selectedPriorities.length !== 0)
                        setStep({ ...step, view: METRICS.STRATEGIC_GOALS, categoryItem });
                      else notification.error({ message: "Please select atleast one Priority" });
                    }}
                    type="primary"
                  >
                    NEXT: Strategic Goals
                  </Button>
                </div>
              </Col>
            </Row>
          </>
        );
      }

      case METRICS.STRATEGIC_GOALS: {
        return (
          <>
            <TitleSection step={"STEP 1/4"} title={"Choose your Strategic Goals "} />
            <Collapse
              expandIconPosition={"right"}
              className="custom-collapse"
              onChange={async (key) => {
                if (key.length > 0) await fetchStrategicGoals(key[key.length - 1]);
              }}
            >
              {selectedPriorities &&
                selectedPriorities.map((priority) => {
                  return (
                    <Collapse.Panel
                      key={priority.impactPriorityId || priority.priorityId}
                      header={
                        <>
                          <Text className="panel-header-regular">{"Select goals For "}</Text>
                          <Text className="panel-header">{`${
                            priority.impactPriorityString || priority.priorityName
                          }`}</Text>
                        </>
                      }
                      className="custom-panel"
                    >
                      {renderStrategicGolas(priority.impactPriorityId || priority.priorityId)}
                    </Collapse.Panel>
                  );
                })}
            </Collapse>
            <Row justify="center">
              <Col xs={24} lg={12}>
                <div className="formStyles">
                  <Button
                    onClick={() => {
                      if (selectedGoals.length !== 0) {
                        if (step.operation === METRICS.CHANGE_CATGORY) updateCatgory();
                        if (step.operation === METRICS.CHANGE_PRIORITY) updateImpactPriority();
                        if (step.operation === METRICS.CHANGE_GOALS) updateGoals();
                      }else {
                        notification.error({ message: "Please select atleast one Goal" });
                      }
                    }}
                    type="primary"
                  >
                    Save Changes
                  </Button>
                </div>
              </Col>
            </Row>
          </>
        );
      }
    }
  };

  const goals = (priorityId) => {
    const strategicGoalsArr = [];
    Object.keys(selectedGoals).forEach((item) => {
      if (priorityId === item) {
        selectedGoals[priorityId].forEach((goal) => {
          strategicGoalsArr.push({
            strategicGoalId: goal.impactStrategicGoalId,
          });
        });
      }
    });
    return strategicGoalsArr;
  };
  const priorities = () => {
    const projectPriorities = [];
    selectedPriorities.forEach((item) => {
      projectPriorities.push({
        priorityId: item.impactPriorityId,
        strategicGoals: goals(item.impactPriorityId),
      });
    });
    return projectPriorities;
  };

  const updateCatgory = () => {
    console.log(categoryId, selectedPriorities, selectedGoals);

    const payload = [
      {
        categoryId: categoryId,
        categoryType: categoryItem.categoryType,
        projectPriorities: priorities(),
      },
    ];
    if (programId && payload) {
      const saveCahnges = async () => {
        //Delete Existing
        const deleteCat = await ProgramcreationAPI().deleteImpactCategory(categoryItem.categoryRefId);
        if (deleteCat.success) {
          const response = await ProgramcreationAPI().changeImpactCategory(programId, payload);
          if (response.data) {
            notification.success({ message: "Changes Saved" });
            fetchMetricsData();
            handleClose();
          }
        }
      };
      saveCahnges();
    }
  };

  const updateImpactPriority = () => {
    const payload = [{ ...priorities()[0] }];

    if (programId && payload) {
      const saveCahnges = async () => {
        const response = await ProgramcreationAPI().changeImpactPriority(
          programId,
          categoryItem.categoryRefId,
          payload
        );
        if (response.data) {
          notification.success({ message: "Changes Saved" });
          fetchMetricsData();
          handleClose();
        }
      };
      saveCahnges();
    }
  };
  const updateGoals = () => {
    const payload = [...goals(step.priorityId)];
    if (step.priorityRefId && payload) {
      const saveCahnges = async () => {
        const response = await ProgramcreationAPI().changeImpactPriorityGolas(
          programId,
          categoryItem.categoryRefId,
          step.priorityRefId,
          payload
        );
        if (response.data) {
          notification.success({ message: "Changes Saved" });
          fetchMetricsData();
          handleClose();
        }
      };
      saveCahnges();
    }
  };

  const handleClose = () => {
    setStep({ view: "", categoryItem: {} });
    setCategoryId();
  };
  return (
    <Modal
      title={[]}
      visible={!!view}
      onCancel={handleClose}
      destroyOnClose
      centered
      width={800}
      okText="Invite User"
      cancelText="Cancel"
      footer={[]}
      className="category-modal"
      destroyOnClose
    >
      {getContentByStep()}
    </Modal>
  );
};
export default CategoryModal;
