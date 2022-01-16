import React, { useEffect, useState } from "react";
import { Col, Row, Steps } from "antd";
import { matchPath, useHistory, useLocation } from "react-router-dom";
import appRoutes from "../../constants/app-routes";
import Icon from "../common/Icon";
import { useQuery } from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
const { Step } = Steps;

const BeneficiaryStepper = ({ children }) => {
  const history = useHistory();
  const location = useLocation();
  const projectId = useQuery().get("projectId");
  const dispatch = useDispatch();
  const benefeiciarySteps = useSelector((state) => state.ui.beneficiarySteps);
  const [current, setcurrent] = useState(0);

  // Parent does not have access to child's params
  // So useParams dont work here to get beneficiary Id
  // But this does the trick
  const getBeneficiryId = () => {
    const getStringFromUrl = (path) => {
      return path.substring(
        path.indexOf(`${appRoutes.BENEFICIARY}/`) +
          `${appRoutes.BENEFICIARY}/`.length,
        path.lastIndexOf("/")
      );
    };
    const match = matchPath(location.pathname, {
      path: `${appRoutes.BENEFICIARY}/${getStringFromUrl(
        location.pathname
      )}/:beneficiaryId`,
    });

    return match && match.params.beneficiaryId
      ? match.params.beneficiaryId
      : "";
  };
  useEffect(() => {
    const index = benefeiciarySteps.find(
      (item) => location.pathname.indexOf(item.link) > -1
    );

    if (index) setcurrent(benefeiciarySteps.indexOf(index));
  }, [location.pathname]);

  const onChangeStepper = (itemIndex) => {
    const step = benefeiciarySteps[itemIndex];
    if (getBeneficiryId())
      history.push(`${step.link}/${getBeneficiryId()}?projectId=${projectId}`);
    else if (itemIndex === 0)
      history.push(`${step.link}?projectId=${projectId}`);
  };

  const isActive = (link) => {
    return benefeiciarySteps[current]?.link === link ? true : false;
  };

  
  return projectId ? (
    <div className="benefeiciary-creation-form">
      <Row justify="center" className="pt-2 beneficiary-stepper">
        <Col sm={24} lg={20}>
          <Steps
            direction="horizontal"
            current={current}
            onChange={onChangeStepper}
          >
            {benefeiciarySteps.map((step) => {
              return (
                <Step
                  key={step.id}
                  title={step.title}
                  icon={
                    <Icon
                      name={
                        isActive(step.link)
                          ? `/program-creation/${step?.icon}-active`
                          : `/program-creation/${step?.icon}-static`
                      }
                    />
                  }
                  disabled={getBeneficiryId() && projectId ? false : true}
                />
              );
            })}
          </Steps>
        </Col>
      </Row>
      <Row justify="space-between" gutter={[16, 16]} className="form-container">
        <Col sm={24} className="pt-2">
          <Row justify="center">
            <Col xs={24} lg={20}>
              {children}
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  ) : null;
};

export default BeneficiaryStepper;
