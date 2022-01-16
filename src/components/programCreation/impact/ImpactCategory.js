import {
  BookOutlined,
  MoneyCollectOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Col, Divider, notification, Row, Space } from "antd";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import React, { useEffect, useState } from "react";
import Droppable from "../../common/drag-n-drop/Droppable";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Draggable from "../../common/drag-n-drop/Draggable";
import { useHistory } from "react-router-dom";
import appRoutes from "../../../constants/app-routes";
import ProgramcreationAPI from "../../../api/programcreationAPI";
import { setImpactCatgeories } from "../../../redux/program-creation/programActions";
import { useDispatch } from "react-redux";
import Icon from "../../common/Icon";
import TitleSection from "../common/TitleSection";

const ImpactCategory = () => {
  const history = useHistory();
  const [allItems, setAllItems] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
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
        setAllItems(items);
      }
    };
    fetchData();
  }, []);
  
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="impact-category">
        <Row justify="center" className="py-2 py-lg-5 header-area">
          <Col xs={16}>
            <Row gutter={[16, 16]} justify="space-between" align="middle">
              <Col lg={10} xs={24}>
                <TitleSection
                  step={"STEP 1 OF 4"}
                  title={"Impact Category"}
                  description={
                    "Drag and drop one primary and upto two secondary impact categories"
                  }
                />
              </Col>
              <Col lg={8} xs={24}>
                <Row gutter={[16, 16]}>
                  <Col xs={6} className="d-flex justify-content-center">
                    <Space direction="vertical" className="width-70px">
                      <div className="text-center">Primary</div>
                      <Droppable
                        allItems={allItems}
                        setAllItems={setAllItems}
                        priorityIndex={1}
                      />
                    </Space>
                  </Col>
                  <Divider type="vertical" />
                  <Col xs={16} className="">
                    <Space direction="vertical">
                      <div className="text-center">Secondary</div>
                      <Row gutter={[16, 16]} align="middle">
                        <Col xs={12}>
                          <Space direction="vertical" className="width-70px">
                            <Droppable
                              allItems={allItems}
                              setAllItems={setAllItems}
                              priorityIndex={2}
                            />
                          </Space>
                        </Col>
                        <Col xs={12}>
                          <Space direction="vertical" className="width-70px">
                            <Droppable
                              allItems={allItems}
                              setAllItems={setAllItems}
                              priorityIndex={3}
                            />
                          </Space>
                        </Col>
                      </Row>
                    </Space>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row justify="center" className="category-list-row py-5">
          <Col xs={24} lg={16}>
            <Row gutter={[16, 16]} justify="space-between">
              <Col xs={24} lg={16}>
                <Row gutter={[16, 16]}>
                  {allItems.map((item, index) => {
                    return (
                      <Col xs={6} lg={4} key={index}>
                        <Draggable
                          draggedItem={item}
                          allItems={allItems}
                          setAllItems={setAllItems}
                        />
                      </Col>
                    );
                  })}
                </Row>
              </Col>
              <Col xs={24} lg={8} className="d-flex justify-content-end">
                <Icon name="/program-creation/impact-category" />
              </Col>
            </Row>
          </Col>
        </Row>

        <Row gutter={[16, 16]} justify="center" className="px-5">
          <Col xs={24} lg={4}>
            <div className="formStyles">
              <Button
                onClick={() => {
                  const selected = allItems.filter(
                    (item) => item.added === true
                  );
                  if (selected.length < 1) {
                    notification.error({ message: "Please atleast one item" });
                    return;
                  } else {
                    const primaryItem = selected.find(
                      (item) => item.priorityIndex === 1
                    );
                    if (!primaryItem) {
                      notification.error({
                        message: "Please drop primary item",
                      });
                      return;
                    }
                  }
                  dispatch(setImpactCatgeories(selected));
                  history.push(
                    `${appRoutes.PROGRAM_CREATION}${appRoutes.PRG_IMPACT_PRIORITIES}`
                  );
                }}
                type="primary"
                className="program-creation-form steps-action impactStyles nextbutton"
              >
                NEXT: IMPACT PRIORITIES
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </DndProvider>
  );
};

export default ImpactCategory;
