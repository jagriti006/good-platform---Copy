import { CheckOutlined, DeleteOutlined, EditOutlined, EllipsisOutlined, RedoOutlined } from "@ant-design/icons";
import { Button, Dropdown, Input, Popconfirm, Select, Menu, Typography } from "antd";
import { useEffect, useState } from "react";
import { STATUS } from "../../constants/strings";
import { camelCased } from "../../utils/utils";
import FloatLabel from "../common/float-label";
import { getStatusIcon } from "./ValidatorFinalSection";

const options = [
  { label: STATUS.APPROVED, value: STATUS.APPROVED },
  { label: "REWORK", value: STATUS.REJECTED },
];

const ApproveCard = ({
  icon,
  title,
  name,
  checklist,
  current,
  reWorkComment,
  setReWorkComment,
  sectionStatuses,
  getApprovalCardData,
  componentArr,
  onApprove,
  onRework,
}) => {

  const verificationStatus = sectionStatuses[`${camelCased(name)}Status`] || "";
  const verificationComment = sectionStatuses[`${camelCased(name)}Comment`] || "";
  const [showSendButton, setShowSendButton] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState();

  useEffect(() => {
    setSelectedStatus(verificationStatus);
  }, [verificationStatus]);

  const getComponents = () => {
    const components = [...componentArr];
    components.pop();
    return components;
  };

  const onUpdate = () => {
    if (selectedStatus === STATUS.APPROVED) onApprove();
    else if (selectedStatus === STATUS.REJECTED) onRework();
    setShowSendButton(false);
  };

  return (
    <>
      {current !== "#validator_final" ? (
        <div className="approval-card p-3 d-flex flex-column formStyles my-5 mx-1">
          <div className="d-flex align-items-center my-2 justify-content-between">
            <div className="d-flex align-items-center">
              <div className="mr-1">{icon}</div>
              <h6 className="mb-0">{title}</h6>
            </div>

            {verificationStatus && (
              <div className={`px-1 status-selector-${selectedStatus === STATUS.APPROVED ? "green" : "red"}`}>
                <Select
                  options={options}
                  value={selectedStatus}
                  style={{ width: 125 }}
                  onChange={(val) => {
                    setSelectedStatus(val);
                    setShowSendButton(true);
                  }}
                  suffixIcon={getStatusIcon(selectedStatus)}
                />
              </div>
            )}
          </div>
          {showSendButton && (
            <>
              {selectedStatus === STATUS.REJECTED && (
                <FloatLabel label="Rework Comments" value={reWorkComment}>
                  <Input onChange={(e) => setReWorkComment(e.target.value)} value={reWorkComment} />
                </FloatLabel>
              )}
              {verificationStatus && (
                <Button type="primary" className="align-self-end" onClick={onUpdate}>
                  SEND
                </Button>
              )}
            </>
          )}
          {verificationStatus === STATUS.REJECTED && !showSendButton && (
            <div className="py-3 px-1 mb-2">
              {verificationComment && (
                <>
                  <h6>Reason for rework : </h6>
                  <div className="d-flex justify-content-between align-items-center">
                    <span>{verificationComment}</span>
                    <Dropdown overlay={menu} trigger={["click"]}>
                      <EllipsisOutlined style={{ fontSize: 30 }} />
                    </Dropdown>
                  </div>
                </>
              )}
            </div>
          )}
          {!verificationStatus && (
            <>
              Validation Checklist
              <div className="py-2">{checklist}</div>
              <p>Choosen to</p>
              <Button type="primary" icon={<CheckOutlined />} onClick={onApprove}>
                Approve
              </Button>
              <Popconfirm
                placement="top"
                icon={<></>}
                title={
                  <FloatLabel label="Rework Comments" value={reWorkComment}>
                    <Input onChange={(e) => setReWorkComment(e.target.value)} value={reWorkComment} />
                  </FloatLabel>
                }
                onConfirm={onRework}
                okText="Update Status"
                cancelText="Close"
              >
                <Button className="my-1" icon={<RedoOutlined />}>
                  Rework
                </Button>
              </Popconfirm>
            </>
          )}
        </div>
      ) : (
        <div className="mt-5 mx-1">
          {getComponents().map((item) => {
            const link = item.link;
            return (
              <div className="approval-card p-4 d-flex flex-column formStyles rounded my-3">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <div className="mr-1">{getApprovalCardData(link)?.icon}</div>
                    <p className="font-weight-bold m-0">{getApprovalCardData(link)?.title}</p>
                  </div>

                  <div
                    className={`px-1 status-selector-${
                      sectionStatuses[`${camelCased(getApprovalCardData(link)?.name)}Status`] === STATUS.APPROVED
                        ? "green"
                        : "red"
                    }`}
                  >
                    <Select
                      options={options}
                      disabled={true}
                      value={sectionStatuses[`${camelCased(getApprovalCardData(link)?.name)}Status`]}
                      style={{ width: 125 }}
                      suffixIcon={getStatusIcon(selectedStatus)}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default ApproveCard;

const menu = (
  <Menu>
    <Menu.Item key="0" icon={<RedoOutlined />}>
      <Typography.Text>Resolve Comment</Typography.Text>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="1" icon={<EditOutlined />}>
      <Typography.Text>Edit Comment</Typography.Text>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3" icon={<DeleteOutlined />}>
      <Typography.Text>Delete Comment</Typography.Text>
    </Menu.Item>
  </Menu>
);
