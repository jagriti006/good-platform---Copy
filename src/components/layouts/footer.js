import React from "react";
import { Typography, Space } from "antd";

const { Text, Link } = Typography;

function Footer() {
  return (
    <div className="row p-4 mr-0 text-center">
      <div className="col">
        <Text type="secondary" style={{ fontSize: 14 }}>
          We have updated our Privacy Policy effective 21 August 2021. Please{" "}
          <a className="privacy-btn" href="/privacy-policy">
            click here
          </a>{" "}
          to read our updated Policy.
        </Text>
      </div>
    </div>
  );
}

export default Footer;
