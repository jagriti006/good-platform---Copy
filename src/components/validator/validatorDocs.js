import React, { useState } from 'react';
import { Button, notification } from 'antd';
import CommonFileUpload from './../common/common-file-upload';
import validatorAPI from './../../api/validatorAPI';
import { Formik } from 'formik';
import { Form } from 'formik';
import docImg from "../../assets/images/illustrators/document2.png";
import beneficiaryAPI from './../../api/beneficiaryAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useHistory, useParams } from "react-router";
import appRoutes from "../../constants/app-routes";
import { isUrl } from '../../utils/utils';
import userAPI from './../../api/userAPI';

const apiMethod = beneficiaryAPI().uplaodImageAndGetURL;

const ValidatorDocs = () => {
    const [doc, setDoc] = useState({});
    const { push } = useHistory();

    const setName = (id, value) => {
        if (!isUrl(value)) {
            setDoc({...doc, [id]: value});
        }
      };

      const backClick = () => {
        push(`${appRoutes.VALIDATOR}${appRoutes.VALIDATOR_REGISTRATION}`);
    };

      const submit = async (values) => {
        const userId = sessionStorage.getItem("userId");
        const data = {
            document1Url: values.document1,
            document2Url: values.document2,
            document1Name: doc?.document1Name,
            document2Name: doc?.document2Name
        };
        const response = await validatorAPI().registrationDocs(userId, data);
        if (response.success) {
          notification.success({message: response.message});
          userAPI().updateStatusById(userId).then(res => {
            push(`${appRoutes.SO_SUBMIT}`);
          });
        }
    };

    return (
        <div className="p-5 mx-3">
            <div className="col" style={{marginLeft: "5.5rem"}}>
            <h3 className="reg-heading">Documents</h3>
            <p >The following details are required to complete your registration as <br/> a validator</p>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <Formik
                    initialValues={{}}
                    enableReinitialize={false}
                    onSubmit={(values) => submit(values)}
                >
                     {({values, touched, submitForm, errors, setFieldValue}) => {
                return (
                  <Form className="formStyles">
                      <CommonFileUpload
                        label="Document 1"
                        id="document1"
                        fileName={doc?.document1Name}
                        setFieldValue={setFieldValue}
                        uploadApiService={apiMethod}
                        setState={setName}
                        fileProp="document1Name"
                      />
                      <CommonFileUpload
                        label="Document 2"
                        id="document2"
                        fileName={doc?.document2Name}
                        setFieldValue={setFieldValue}
                        uploadApiService={apiMethod}
                        setState={setName}
                        fileProp="document2Name"
                      />
                      
                      <div className="row">
                      <div className="col-md-7">
                      <div className="steps-actions floatRight displayFlex previous">
                    <Button
                      className="ant-btn-back"
                      onClick={() => backClick()}
                    >
                      <FontAwesomeIcon icon={faAngleLeft}/>
                      &nbsp; Previous Step
                    </Button>
                  </div>
                      </div>
                      <div className="col-md-5 floatRight displayFlex">
                      <Button
                          onClick={submitForm}
                          className="steps-action formStyles nextbutton"
                          disabled={!(doc?.document1Name && doc?.document2Name)}
                        >
                          SUBMIT
                        </Button>
                      </div>
                    </div>
                  </Form>
                );
              }}
            </Formik>
                </div>
                <div className="col-md-5">
                <img src={docImg} alt="" />
                </div>
            </div>
        </div>
    );
}

export default ValidatorDocs;
