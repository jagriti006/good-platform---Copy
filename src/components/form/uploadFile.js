import React from "react";
import { Upload, Button, message, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export const UploadFile = ({ id, name, labelName, placeholder, spacing, value, accept, onChange }) => {
  const props = {
    beforeUpload: (file) => {
      if (file.type !== "image/png") {
        message.error(`${file.name} is not a png file`);
      }
      return file.type === "image/png" ? true : Upload.LIST_IGNORE;
    },
    onChange: (info) => {
      console.log(info.fileList);
    },
  };

  const fileUpload = (file, upload) => {
    const axios = require("axios");
    const token = sessionStorage.getItem("access_token");

    const config = {
      method: "POST",
      url: `http://3.108.162.127:8081/file-upload/v1/file/upload`,
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
      },
      params: {
        file: `${file.fileList}`,
        fileCategory: "SOCIAL_ORGANISATION",
      },
    };
    axios(config)
      .then(function (response) {
        console.log(response.data.object);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const spacingClass = `marginBottom3 ${spacing} formStyles`;
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const imageUpload = (e) => {
    const file = e.target.files[0];
    // getBase64(file).then(base64 => {
    //     localStorage["fileBase64"] = base64;
    //     console.debug("file stored", base64);
    // });
    let formData = new FormData();
    formData.set("fileCategory", "SOCIAL_ORGANISATION");
    formData.set("file", file);
    const axios = require("axios");
    const token = sessionStorage.getItem("access_token");
    // const filedata = file;
    console.log(file);
    const config = {
      method: "POST",
      url: `http://3.108.162.127:8081/file-upload/v1/file/upload`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
      },
      // params: {
      //     file: `${formData}`, fileCategory: "SOCIAL_ORGANISATION"
      // }
    };
    axios(config)
      .then(function (response) {
        sessionStorage.setItem([e.target.name], response.data.data);
        console.log("sdasdasdasd", response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    // <div className="col-md-12">
    <div className={spacingClass}>
      <label>{labelName}</label>
      {/* <Upload {...props} value="">
                <Button icon={<UploadOutlined />} onClick={fileUpload}>Upload png only</Button>
            </Upload> */}
      <input type="file" className="ant-input none upload" id={id} name={name} onChange={imageUpload} accept={accept} />
    </div>
    // </div>
  );
};
