import React, { useState, useEffect } from "react";
import { notification, Progress } from "antd";
import uploadIcon from "../../assets/images/uploadIcon.png";
import beneficiaryAPI from "./../../api/beneficiaryAPI";
import { bytesToSize } from "../../utils/utils";
import { Typography } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import trash from "../../assets/images/Delete.png";

const { Text } = Typography;

const CommonFileUpload = (props) => {
  const [progress, setProgress] = useState(0);
  const [fileError, setFileError] = useState(null);
  const [fileName, setFileName] = useState(props.fileName);
  const [fileUrl, setFileUrl] = useState(props.fileUrl);
  const [isUploading, setisUploading] = useState(null);
  const maxFileSizeInBytes = "10485760"; // 10MB
  const defaultExt = "image/*,application/pdf,.doc,.docx";
  const defaultAcceptedFormats = "jpg, jpeg, png, pdf, docx";

  useEffect(() => {
    setFileName(props.fileName);
    setFileUrl(props.fileUrl);
  }, [props]);

  const validateFileFormat = (file) => {
    const extension = file.lastIndexOf(".") + 1;
    if (extension === undefined || extension === "" || extension == null) return false;
    const extFile = file.substr(extension, file.length).toLowerCase();
    if ((props.acceptedFileFormats || defaultAcceptedFormats).includes(extFile)) {
      return true;
    }
    return false;
  };

  const validateFileSize = (file) => {
    const currentFileSize = file.size;
    if (currentFileSize > (props.maxSize || maxFileSizeInBytes)) {
      // file size in bytes
      return false;
    }
    return true;
  };

  const upload = async (file) => {
    const response = await props.uploadApiService(file, (uploadEvent) => {
      setisUploading(true);
      setProgress(Math.round((100 * uploadEvent.loaded) / uploadEvent.total));
    });
    if (response?.data) {
      props.setFieldValue && props.setFieldValue(props.id, response.data);
      props.setState ? props.setState(props.id, response.data) : props.setUrl(response.data);
      setFileUrl(response.data);
    } else {
      setisUploading(false);
      setFileError("Failed to upload the file");
    }
  };

  const handleFile = (e) => {
    if (typeof props.uploadApiService != "function") {
      notification.error({ message: "Api method not set!" });
      return;
    }
    const pathValue = e.target.value;
    const file = e.target.files?.[0];
    if (!file || !pathValue) return;
    setFileName(file.name);
    props.setState && props.setState(props.fileProp, file.name);
    const isFileFormatValid = validateFileFormat(pathValue);
    const isFileSizeValid = isFileFormatValid ? validateFileSize(file) : false;
    setProgress(0);
    if (isFileFormatValid && isFileSizeValid) {
      setFileError(null);
      upload(file, props.id);
    } else {
      props.setFieldValue(props.id, null);
      const errorMessage = `Please check selected file, allowed files are: ${
        props.acceptedFileFormats || defaultAcceptedFormats
      }. and max file size is ${bytesToSize(props.maxSize || maxFileSizeInBytes)}.`;
      setFileError(errorMessage);
    }
  };

  const deleteDoc = async () => {
    await beneficiaryAPI()
      .deleteFile(fileUrl)
      .then((res) => {
        props.setFieldValue && props.setFieldValue(props.id, null);
        if (props.setState) {
          props.setState(props.id, null);
          props.setState(props.fileProp, null);
        }
        setFileName(null);
        setFileUrl(null);
        setisUploading(false);
        setProgress(0);
      });
  };

  return (
    <>
      <div className="row formStyles p-15">
        <div
          className="col-md-12 col-sm-12 uploadFile"
          style={{
            backgroundColor: fileName || fileUrl ? "#F4F8F8" : "#fff",
            padding: props.padding,
          }}
        >
          <label className={"beneficiaryFormsLabel pointer"} for={props.id}>
            {props.label}
            {!(props.fileName || progress > 0 || fileUrl) && <img src={uploadIcon} alt="" />}
            {!isUploading && fileUrl && (
              // <CloseCircleOutlined
              //   style={{ fontSize: 21 }}
              //   className="pointer float-right"
              //   onClick={deleteDoc}
              // />
              <img src={trash} alt="" className="pointer float-right" onClick={deleteDoc} />
            )}
          </label>
          <input
            ref={props.ref}
            id={props.id}
            type="file"
            class="form-control"
            className="fileUploadInput ant-input pointer"
            onChange={(e) => handleFile(e)}
            accept={props.fileExt || defaultExt}
            disabled={props.fileName || progress > 0 || fileUrl}
          />
          <div className="row flex-column mt-2">
            {isUploading && (
              <div className="col">
                <div className="row">
                  <div className="col-10">
                    <Progress strokeColor="#3A8D9D" percent={progress} showInfo={false} strokeWidth={6} />
                  </div>
                  <div className="col-2 d-flex justify-content-end align-items-center">
                    {/* <CloseCircleOutlined
                      style={{ fontSize: 21 }}
                      className="pointer"
                      onClick={deleteDoc}
                    /> */}
                    <img src={trash} alt="" className="pointer float-right" onClick={deleteDoc} />
                  </div>
                </div>
              </div>
            )}
            <div className="col">
              <div className="row">
                <div className="col-8">
                  <Text style={{ fontSize: 14, fontWeight: "normal" }}>{fileName}</Text>
                </div>
                <div className="col-2 d-flex justify-content-end">
                  {isUploading && <Text style={{ fontSize: 14, fontWeight: "normal" }}>{progress}%</Text>}
                </div>
              </div>
            </div>
          </div>
          {fileError && (
            <Text style={{ fontSize: 12, fontWeight: "normal" }} type="danger">
              {fileError}
            </Text>
          )}
        </div>
      </div>
    </>
  );
};

export default CommonFileUpload;
