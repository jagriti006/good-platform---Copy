import React, { Component, useState, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Typography } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./index.scss";

const { Text, Link } = Typography;

const Step3 = (props) => {
  const inputFile = useRef(null);

  const [parameters, setParameters] = useState([
    {
      id: 1,
      name: "search",
      placeholder: "",
      labelName: "Registration Number or Company name",
      type: "text",
      spacing: "12",
      background: "none",
    },
  ]);

  const [trimmedDataURL, setTrimmedDataURL] = useState(null);
  const [image, setImage] = useState("");

  let sigPad = {};

  const clear = () => {
    sigPad.clear();
  };

  const handleFileUpload = (e) => {
    const { files } = e.target;
    if (files && files.length) {
      const filename = files[0].name;

      var parts = filename.split(".");
      const fileType = parts[parts.length - 1];
      console.log("File", files[0].name); //ex: zip, rar, jpg, svg etc.

      setImage(files[0]);
    }
  };

  const onButtonClick = () => {
    inputFile.current.click();
  };

  return (
    <>
      <SignatureCanvas
        penColor="black"
        canvasProps={{ width: 400, height: 150, className: "sigCanvas" }}
        ref={(ref) => {
          sigPad = ref;
        }}
        onEnd={() => {
          props.signature(sigPad.toDataURL("image/png", 0.5));
        }}
      />
      <button className="btn-btn-clear" onClick={clear}>
        Clear
      </button>
      <div className="marginTop5 step3Upload" onClick={onButtonClick}>
        <input
          style={{ display: "none" }}
          ref={inputFile}
          onChange={handleFileUpload}
          type="file"
        />
        <Text style={{ fontSize: "0.8rem", fontWeight: "bold" }}>
          Upload Board Resolution
        </Text>
        <UploadOutlined style={{ fontSize: "1.5rem" }} />
      </div>
    </>
  );
};

export default Step3;
