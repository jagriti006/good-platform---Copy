import React from "react";
import { Spin } from "antd";
import { useSelector } from "react-redux";

const Spinner = ({ children }) => {
  const showLoader = useSelector((state) => state.ui.showLoader);
  return (
    <Spin tip="Loading..." spinning={showLoader} size="large" style={{ height: '100%' }}>
      {children}
    </Spin>
  );
};

export default Spinner;
