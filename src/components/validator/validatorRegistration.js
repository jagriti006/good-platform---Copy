import React from 'react';
import { Formik } from 'formik';
import { Form } from 'formik';
import { Field } from 'formik';
import { Button } from 'antd';
import Input from './../FormikComponents/Input/Input';
import computeWoman from "../../assets/images/computeWoman.png";
import "./validator.scss";
import validatorAPI from './../../api/validatorAPI';
import { notification } from 'antd';
import { useHistory, useParams } from "react-router";
import appRoutes from "../../constants/app-routes";

const ValidatorRegistration = () =>  {
  const { push } = useHistory();
  const registerProfile = async (values) => {
    const userId = sessionStorage.getItem("userId");
    const response = await validatorAPI().profileRegistration(userId, values);
    if (response?.success) {
      notification.success({message: response.message});
      push(`${appRoutes.VALIDATOR}${appRoutes.VALIDATOR_REGISTRATION}${appRoutes.VALIDATOR_DOCUMENTS}`);
    }
};
    return (
        <div className="p-5 mx-3">
            <div className="col" style={{marginLeft: "5.5rem"}}>
            <h3 className="reg-heading">Registration</h3>
            <p >The following details are required to complete your registration as <br/> a validator</p>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <Formik
                    initialValues={{name: "", emailId: "", organisation: "", contactNumber: "", }}
                enableReinitialize={true}
                onSubmit={(values) => registerProfile(values)}
                >
                     {({values, touched, submitForm, errors, setFieldValue}) => {
                return (
                  <Form className="formStyles">
                      <div className="row pt-3">
                        <div className="col-sm-12 ">
                          <Field
                            name="name"
                            class="form-control"
                            component={Input}
                            placeholder="Full Name"
                          />
                        </div>
                      </div>
                      <div className="row pt-3">
                        <div className="col-sm-12 ">
                          <Field
                            name="emailId"
                            class="form-control"
                            component={Input}
                            placeholder="Email"
                          />
                        </div>
                      </div>
                      <div className="row pt-3">
                        <div className="col-sm-12 ">
                          <Field
                            name="organisation"
                            class="form-control"
                            component={Input}
                            placeholder="Organisation"
                          />
                        </div>
                      </div>
                      <div className="row pt-3">
                        <div className="col-sm-12 ">
                          <Field
                            name="contactNumber"
                            type="number"
                            class="form-control"
                            component={Input}
                            placeholder="Contact Number"
                          />
                        </div>
                      </div>
                      
                      <div className="floatRight ">
                        <Button
                          onClick={submitForm}
                          className="steps-action formStyles nextbutton"
                        >
                          NEXT: UPLOAD DOCUMENTS
                        </Button>
                      </div>
                  </Form>
                );
              }}
            </Formik>
                </div>
                <div className="col-md-5">
                <img src={computeWoman} alt="" />
                </div>
            </div>
        </div>
    );
}

export default ValidatorRegistration;
