import { CheckSquareOutlined, ExclamationCircleOutlined, StopOutlined } from "@ant-design/icons";
import { Button, Col, Input, Modal, notification, Result, Row } from "antd";
import { Select } from "antd";
import React, { useState } from "react";
import { useHistory, useParams } from "react-router";
import validatorAPI from "../../api/validatorAPI";
import appRoutes from "../../constants/app-routes";
import { STATUS } from "../../constants/strings";

const options = [
  { label: STATUS.APPROVED, value: STATUS.APPROVED },
  { label: "Not Recommented", value: STATUS.REJECTED },
];

export const getStatusIcon = (status) => {
  return status === STATUS.APPROVED ? <CheckSquareOutlined /> : <StopOutlined />;
};
const ValidatorFinalSection = () => {
  const { organisationId } = useParams();
  const { programId } = useParams();
  const { push } = useHistory();
  const [selectedStatus, setSelectedStatus] = useState("");
  const isOrganisation = !!organisationId;

  const doFinalApproval = async () => {
    const formData = {
      status: selectedStatus,
      comment: "",
    };

    let response;
    if (organisationId) response = await validatorAPI().finalApproval(organisationId, formData);
    if (programId) response = await validatorAPI().finalProjectApproval(programId, formData);

    if (response.data) {
      Modal.success({
        content: <Result status="success" title="Congratulations!" subTitle="You just completed your validation!" />,
        okText: "Go Back to Dashboard",
        onOk: () => {
          isOrganisation
            ? push(`${appRoutes.VALIDATOR}${appRoutes.ORGANISATIONS}`)
            : push(`${appRoutes.VALIDATOR}${appRoutes.PROPOSALS}`);
        },
        icon: null,
        width: 600,
      });
    }
  };

  return (
    <div id="validator_final">
      <Row gutter={[16, 16]} className="py-5">
        <Col xs={24}>
          <h6 className="font-weight-bold">
            The overall proposal rating and notes will help donors make better decisions with their funding.
          </h6>
        </Col>
        <Col xs={24}>
          <div className="overall-proposal-rating rounded p-3">
            <h5 className="font-weight-bold">Overall proposal rating</h5>
            <p>{`Based on your recommendation, assign a rating for this ${
              isOrganisation ? "Organisation" : "Proposal"
            }.`}</p>
            {!selectedStatus ? (
              <div className="d-flex">
                <Button
                  type="primary"
                  icon={<CheckSquareOutlined />}
                  onClick={() => setSelectedStatus(STATUS.APPROVED)}
                >
                  Approve
                </Button>
                <Button
                  type="default"
                  icon={<StopOutlined />}
                  className="not-recommended-button"
                  onClick={() => setSelectedStatus(STATUS.REJECTED)}
                >
                  Not Recommended
                </Button>
              </div>
            ) : (
              <div className={`px-1 status-selector-${selectedStatus === STATUS.APPROVED ? "green" : "red"}`}>
                <Select
                  options={options}
                  value={selectedStatus}
                  style={{ width: 200 }}
                  onChange={(val) => {
                    setSelectedStatus(val);
                  }}
                  suffixIcon={getStatusIcon(selectedStatus)}
                />
              </div>
            )}
          </div>
        </Col>

        {selectedStatus && (
          <>
            <Col xs={24}>
              <h6 className="font-weight-bold">Add your personal notes or recommendation for this program</h6>
              <Input.TextArea
                rows={4}
                placeholder={`Add your reasons for ${
                  selectedStatus === STATUS.APPROVED ? "" : "not"
                } recommending this program here`}
              />
            </Col>
            <Col xs={24} className="d-flex justify-content-end">
              <Button type="primary" className="align-self-end" onClick={doFinalApproval}>
                SAVE AND SUBMIT
              </Button>
            </Col>
          </>
        )}
      </Row>
    </div>
  );
};

export default ValidatorFinalSection;
