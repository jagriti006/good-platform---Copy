import React, {useState} from "react";
import {Tabs, Steps} from "antd";
import "../../../assets/css/previewcreation.scss";
import Alert from "../../layouts/alert";
// import Detailview from "./detailview";
import Detailview from "./detailviewClone";
import "../../../assets/css/style.css";
import QuickInfo from "../quickinfo";
import PreviewRightContent from "../common/previewRightContent";
import "./previewProject.scss"
import {useHistory} from "react-router-dom";

const fallBackMessage = "No Data";
const {TabPane} = Tabs;

const { Step } = Steps;

const PreviewProject = (props) => {
  const [cartIsShow, setCartIsShow] = useState(false);
  const [tab, setTab] = useState(0);
  const history = useHistory();

  useState(() => {
    if (history.location.state){
      setTab(history.location.state.tabIndex);
    }
  },[])

  const hideCartHandler = () => {
    setCartIsShow(false);
  };

  const steps = [
    {
      title: "Quick View",
      id: 1,
      link: "quickview",
      icon: <img alt="" />,
      iconInactive: <img alt="" />,
    },
    {
      title: "Detailed View",
      id: 2,
      link: "detailview",
      icon: <img alt="" />,
      iconInactive: <img alt="" />,
    },
  ];

  const onChangeStepper = (itemIndex) => {
    setTab(itemIndex)
  };

  return (
    <div className="container-fluid previewbgcoloroverview soStyle" style={{margin: 0}}>
      {cartIsShow && <Alert onpress={hideCartHandler}/>}
      <div className='row' style={{ paddingTop: '1rem'}}>
        <div className='col-md-8 bgcoloroverview previewbgcoloroverview'>
          <div className="row">
            <div className="col-md-9"></div>
            <Steps className="col-md-3" direction="horizontal" current={tab} onChange={onChangeStepper}>
              {steps.map((step) => {
                return (
                  <Step
                    key={step.id}
                    title={step.title}
                    icon={step.icon}
                  />
                )
              })}
            </Steps>
          </div>
          {tab === 1 ? <Detailview /> : <QuickInfo />}
        </div>
        <PreviewRightContent />
      </div>
    </div>
  );
};

export default PreviewProject;
