import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProgramcreationAPI from "../../../api/programcreationAPI";

const UNSGDs = ({ primaryCategoryId, secondaryCategory1Id, secondaryCategory2Id }) => {
  const { programId } = useParams();
  const [unsgds, setUnsgds] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await ProgramcreationAPI().fetchUNSDGs(
        primaryCategoryId,
        secondaryCategory1Id,
        secondaryCategory2Id
      );
      if (response.data) {
        setUnsgds(response.data);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="py-5 px-3 unsgds">
      <h6>UNSDGs</h6>
      <p style={{ fontSize: 12 }}>Based on your selection, here are your UNSGDs</p>
      {unsgds && unsgds.primaryUNSDG && (
        <Row gutter={[8, 8]}>
          <Col xs={24}>Primary</Col>
          {unsgds.primaryUNSDG.map((item, index) => {
            return (
              <Col xs={6} key={index}>
                <img src={`data:image/jpeg;base64,${item.image}`} />
              </Col>
            );
          })}
        </Row>
      )}

      {unsgds && unsgds.primaryUNSDG && (
        <Row gutter={[8, 8]} className="pt-2">
          <Col xs={24}>Secondary</Col>
          {unsgds.secondaryUNSDG.map((item, index) => {
            return (
              <Col xs={6} key={index}>
                <img src={`data:image/jpeg;base64,${item.image}`} />
              </Col>
            );
          })}
        </Row>
      )}
    </div>
  );
};

export default UNSGDs;
