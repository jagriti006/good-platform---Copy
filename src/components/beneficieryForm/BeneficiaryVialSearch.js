import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Input as AntInput, List, Row } from "antd";
import { useState } from "react";
import beneficiaryAPI from "../../api/beneficiaryAPI";
import FloatLabel from "../common/float-label";

const BeneficiaryVialSearch = () => {
  const [vialNumber, setVailNumber] = useState("");
  const [listByVail, setListByVail] = useState([]);

  const serachByVailNumber = async () => {
    if (vialNumber) {
      const response = await beneficiaryAPI().getBeneficiariesByVialNumber(vialNumber);
      if (response.data) {
        setListByVail(response.data);
      }
    }
  };
  return (
    <Row gutter={[16, 16]} className="p-5 bg-white" justify="center">
      <Col xs={24}>
        <h4
          style={{
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize: "25px",
            lineHeight: "37px",
            letterSpacing: "0.01em",
            color: "#39364F",
            textAlign: "center",
          }}
        >
          Beneficiary Vial
        </h4>
      </Col>
      <Col xs={24} lg={12}>
        <h3>Search By Vial Number</h3>
        <Row gutter={[8, 8]}>
          <Col xs={16}>
            <FloatLabel label="Enter Vail Number" value={vialNumber}>
              <AntInput onChange={(e) => setVailNumber(e.target.value)} value={vialNumber} />
            </FloatLabel>
          </Col>
          <Col xs={8}>
            <Button type="primary" className="w-100 mt-1" onClick={serachByVailNumber}>
              Search
            </Button>
          </Col>
          <Col
            xs={24}
            style={{
              height: 500,
              overflow: "auto",
            }}
          >
            <List
              itemLayout="horizontal"
              dataSource={listByVail}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<UserOutlined />} />}
                    title={item.firstName}
                    description={
                      <div className="d-flex justify-content-between">
                        <div>{item.gender}</div>
                        <div>Dose {item?.vaccinationAppointments?.dose}</div>
                        <div>{item?.vaccinationAppointments?.status}</div>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default BeneficiaryVialSearch;
