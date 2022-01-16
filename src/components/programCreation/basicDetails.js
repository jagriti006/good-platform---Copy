import { Button, Col, Row, Checkbox, Radio, notification, Divider, Typography, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Formik, Form, Field, FieldArray, getIn } from "formik";
import moment from "moment";
import Input from "../FormikComponents/Input/Input";
import SelectBox from "../FormikComponents/SelectBox/SelectBox";
import DatePicker from "../FormikComponents/Date/Date";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { isEmpty } from "lodash";
import ProgramcreationAPI from "../../api/programcreationAPI";
import appRoutes from "../../constants/app-routes";
import Icon from "../common/Icon";
import LargeTolltip from "../common/large-tooltip";
import { Fragment } from "react";
import * as Yup from "yup";

const { Text, Link } = Typography;
const themeoption = [
  { value: "Agriculture", label: "Agriculture" },
  { value: "Air", label: "Air" },
  {
    value: "Biodiversity and Ecosystems",
    label: "Biodiversity and Ecosystems",
  },
  { value: "Climate", label: "Climate" },
  { value: "Education", label: "Education" },
  { value: "Energy", label: "Energy" },
  { value: "Financial Services", label: "Financial Services" },
  { value: "Health", label: "Health" },
  { value: "Real Estate", label: "Real Estate" },
  { value: "Land", label: "Land" },
  { value: "Oceans & Coastal Zones", label: "Oceans & Coastal Zones" },
  { value: "Pollution", label: "Pollution" },
  { value: "Waste", label: "Waste" },
  { value: "Water", label: "Water" },
  { value: "SDGs", label: "SDGs" },
  { value: "Beneficiaries", label: "Beneficiaries" },
  { value: "Employment", label: "Employment" },
  { value: "Operational Impact", label: "Operational Impact" },
  { value: "Financials", label: "Financials" },
  { value: "Investment Lens", label: "Investment Lens" },
  { value: "Impact Category", label: "Impact Category" },
  { value: "Diversity and Inclusion", label: "Diversity and Inclusion" },
  { value: "SDG Target", label: "SDG Target" },
  { value: "Focus", label: "Focus" },
  { value: "Dimensions of Impact", label: "Dimensions of Impact" },
  { value: "IRIS Reports", label: "IRIS Reports" },
  { value: "Product Service Impact", label: "Product Service Impact" },
  { value: "Infrastructure", label: "Infrastructure" },
  { value: "Joint Impact Indicators", label: "Joint Impact Indicators" },
];

const Duration = [
  { value: "Days", label: "Days" },
  { value: "Month", label: "Month" },
  { value: "Year", label: "Year" },
];

const BasicDetails = (props) => {
  const history = useHistory();
  const { programId } = useParams();
  const [initialState, setInitialState] = useState("");
  const [isToolTipVisible, setIsToolTipVisible] = useState(false);

  useEffect(() => {
    const fetchProjectbasicdetail = async () => {
      if (programId) {
        const response = await ProgramcreationAPI().fetchProjectbasicdetail(programId);
        if (response.data) {
          setInitialState(response.data);
          sessionStorage.setItem("basicUpdate", true);
          sessionStorage.setItem("basicId", response.data.id);
        }
      } else {
        sessionStorage.setItem("basicUpdate", false);
      }
    };
    fetchProjectbasicdetail();
  }, []);

  const getAgeRange = () => {
    return [
      { value: "0", label: "0" },
      { value: "1", label: "1" },
      { value: "2", label: "2" },
      { value: "3", label: "3" },
      { value: "4", label: "4" },
      { value: "5", label: "5" },
      { value: "6", label: "6" },
      { value: "7", label: "7" },
      { value: "8", label: "8" },
      { value: "9", label: "9" },
      { value: "10", label: "10" },
      { value: "11", label: "11" },
      { value: "12", label: "12" },
      { value: "13", label: "13" },
      { value: "14", label: "14" },
      { value: "15", label: "15" },
      { value: "16", label: "16" },
      { value: "17", label: "17" },
      { value: "18", label: "18" },
      { value: "19", label: "19" },
      { value: "20", label: "20" },
      { value: "21", label: "21" },
      { value: "22", label: "22" },
      { value: "23", label: "23" },
      { value: "24", label: "24" },
      { value: "25", label: "25" },
      { value: "26", label: "26" },
      { value: "27", label: "27" },
      { value: "28", label: "28" },
      { value: "29", label: "29" },
      { value: "30", label: "30" },
      { value: "31", label: "31" },
      { value: "32", label: "32" },
      { value: "33", label: "33" },
      { value: "34", label: "34" },
      { value: "35", label: "35" },
      { value: "36", label: "36" },
      { value: "37", label: "37" },
      { value: "38", label: "38" },
      { value: "39", label: "39" },
      { value: "40", label: "40" },
      { value: "41", label: "41" },
      { value: "42", label: "42" },
      { value: "43", label: "43" },
      { value: "44", label: "44" },
      { value: "45", label: "45" },
      { value: "46", label: "46" },
      { value: "47", label: "47" },
      { value: "48", label: "48" },
      { value: "49", label: "49" },
      { value: "50", label: "50" },
      { value: "51", label: "51" },
      { value: "52", label: "52" },
      { value: "53", label: "53" },
      { value: "54", label: "54" },
      { value: "55", label: "55" },
      { value: "56", label: "56" },
      { value: "57", label: "57" },
      { value: "58", label: "58" },
      { value: "59", label: "59" },
      { value: "60", label: "60" },
      { value: "61", label: "61" },
      { value: "62", label: "62" },
      { value: "63", label: "63" },
      { value: "64", label: "64" },
      { value: "65", label: "65" },
      { value: "66", label: "66" },
      { value: "67", label: "67" },
      { value: "68", label: "68" },
      { value: "69", label: "69" },
      { value: "70", label: "70" },
      { value: "71", label: "71" },
      { value: "72", label: "72" },
      { value: "73", label: "73" },
      { value: "74", label: "74" },
      { value: "75", label: "75" },
      { value: "76", label: "76" },
      { value: "77", label: "77" },
      { value: "78", label: "78" },
      { value: "79", label: "79" },
      { value: "80", label: "80" },
      { value: "81", label: "81" },
      { value: "82", label: "82" },
      { value: "83", label: "83" },
      { value: "84", label: "84" },
      { value: "85", label: "85" },
      { value: "86", label: "86" },
      { value: "87", label: "87" },
      { value: "88", label: "88" },
      { value: "89", label: "89" },
      { value: "90", label: "90" },
      { value: "91", label: "91" },
      { value: "92", label: "92" },
      { value: "93", label: "93" },
      { value: "94", label: "94" },
      { value: "95", label: "95" },
      { value: "96", label: "96" },
      { value: "97", label: "97" },
      { value: "98", label: "98" },
      { value: "99", label: "99" },
      { value: "100", label: "100" },
    ];
  };

  const saveBasicdetails = async (values) => {
    const response = await ProgramcreationAPI().addOrUpdateBasicDetail(values);
    if (response.success) {
      notification.success({ message: "Basic Details Saved..!" });
      history.push(`${appRoutes.PROGRAM_CREATION}${appRoutes.PRG_TEAM}/${response.data.id}`);
    }
  };

  return (
    <Row justify="center">
      <Col xs={24} lg={20}>
        <Row gutter={[16, 16]}>
          <Col sm={12} lg={16}>
            <Formik
              initialValues={getInitialValues(programId, initialState)}
              enableReinitialize={true}
              onSubmit={(values) => saveBasicdetails(values)}
              validationSchema={Yup.object().shape({
                name: Yup.string()
                  .max(248, "Maximum 248 characters allowed.")
                  .matches(/^[a-zA-Z0-9@^._\s]+$/i, "Allow only alphabets, digits, @, _, . and ^."),
                description: Yup.string()
                  .max(248, "Maximum 248 characters allowed.")
                  .matches(/^[a-zA-Z0-9@^._\s]+$/i, "Allow only alphabets, digits, @, _, . and ^."),
                geographyModel: Yup.array().of(
                  Yup.object().shape({
                    city: Yup.string()
                      .max(248, "Maximum 248 characters allowed.")
                      .matches(/^[a-zA-Z\s]+$/i, "Allow only alphabets."),
                    state: Yup.string()
                      .max(248, "Maximum 248 characters allowed.")
                      .matches(/^[a-zA-Z\s]+$/i, "Allow only alphabets.")
                      .notOneOf([Yup.ref('city'), null], "State and City must not be same!"),
                  })
                ),
                problemFacedByTarget: Yup.string()
                  .max(248, "Maximum 248 characters allowed.")
                  .matches(/^[a-zA-Z0-9@^._\s]+$/i, "Allow only alphabets, digits, @, _, . and ^."),
                uniqueProgramApproach: Yup.string()
                  .max(248, "Maximum 248 characters allowed.")
                  .matches(/^[a-zA-Z0-9@^._\s]+$/i, "Allow only alphabets, digits, @, _, . and ^."),
                highlights: Yup.array().of(
                  Yup.string()
                    .max(248, "Maximum 248 characters allowed.")
                    .matches(/^[a-zA-Z0-9\s]+$/i, "Allow only alphabets and digits.")
                ),
                minAge: Yup.number().lessThan(Yup.ref("maxAge"), "Minimum Age must be less than Maximum Age"),
                maxAge: Yup.number().moreThan(Yup.ref("minAge"), "Maximum Age must be greater than Minimum Age"),
                durationFrom: Yup.date(),
              durationTo: Yup.date().min(Yup.ref('durationFrom'),"end date can't be before start date")
              })}
            >
              {({ values, touched, errors, setFieldValue }) => {
                return (
                  <Form>
                    <Space size="middle" direction="vertical">
                      <Row gutter={[16, 16]}>
                        <Col xs={24}>
                          <Field
                            name="name"
                            placeholder="Program Name"
                            component={Input}
                            errortext={getIn(touched, `name`) && getIn(errors, `name`) && getIn(errors, `name`)}
                          />
                        </Col>
                        <Col xs={24}>
                          <Field
                            name="description"
                            placeholder="Description"
                            inputType="textarea"
                            component={Input}
                            autoSize={{ minRows: 3, maxRows: 6 }}
                            errortext={
                              getIn(touched, `description`) &&
                              getIn(errors, `description`) &&
                              getIn(errors, `description`)
                            }
                          />
                        </Col>
                      </Row>
                      <Row gutter={[16, 8]}>
                        <Col xs={24}>
                          <h5 className="basictitle">What is the duration for this program?</h5>
                        </Col>
                        <Col xs={24}>
                          <Text className="subTitle subtitleTextAlign">
                            You can also add tentative dates and change them later
                          </Text>
                        </Col>
                        <Col xs={12}>
                          <Field
                            name="durationFrom"
                            component={DatePicker}
                            placeholder="Start Date"
                            format="DD/MM/YYYY"
                            errortext={getIn(touched,'durationFrom' ) && getIn( errors,'durationFrom') && getIn( errors,'durationFrom')}
                            // disabledDate={(d) => !d || d.isBefore(new Date().setDate(new Date().getDate() - 1))}
                          />
                        </Col>
                        <Col xs={12}>
                          <Field
                            name="durationTo"
                            component={DatePicker}
                            placeholder="End Date"
                            format="DD/MM/YYYY"
                            errortext={getIn(touched,'durationTo' ) && getIn( errors,'durationTo') && getIn( errors,'durationTo')}
                            defaultValue={moment()}
                            // disabledDate={(d) => !d || d.isBefore(new Date().setDate(new Date().getDate() - 1))}
                          />
                        </Col>
                      </Row>
                      <Divider>OR</Divider>
                      <Row gutter={[16, 8]}>
                        <Col xs={20} className="pr-0">
                          <Field name="duration" component={Input} type="number" inputPlaceholder="0" />
                        </Col>
                        <Col xs={4} className="pl-0">
                          <Field name="durationIn" placeholder="Months" component={SelectBox} options={Duration} />
                        </Col>
                      </Row>

                      <Row gutter={[16, 8]}>
                        <Col xs={24}>
                          <h5 className="basictitle">Who or what are the primary beneficiaries of this program?</h5>
                        </Col>
                        <Col xs={24}>
                          <Text className="subTitle">Beneficiary type</Text>
                          <br />
                        </Col>
                        <Col xs={24}>
                          <Radio.Group
                            name="memberType"
                            // className="drop"
                            defaultValue="a"
                            buttonStyle="solid"
                            value={values.memberType}
                            onChange={(e) => setFieldValue("memberType", e.target.value)}
                          >
                            <Row className="w-100">
                              <Col xs={12}>
                                <Radio.Button value={"people"}>People</Radio.Button>
                              </Col>
                              <Col xs={12}>
                                <Radio.Button value={"Other"}>Infrastructure</Radio.Button>
                              </Col>
                            </Row>
                          </Radio.Group>
                        </Col>

                        {values.memberType === "people" && (
                          <Row gutter={[16, 8]}>
                            <Col xs={24}>
                              <Text className="subTitle">Target audience</Text>
                            </Col>
                            <Col xs={24}>
                              <Checkbox.Group
                                name="typesOfBeneficiaries"
                                value={values.typesOfBeneficiaries}
                                className="target-cat"
                                onChange={(checkedValues, e) => setFieldValue("typesOfBeneficiaries", checkedValues)}
                              >
                                <Row gutter={[16, 8]} style={{ marginleft: "10px" }}>
                                  <Checkbox value={"Children"}>
                                    <Icon name="/program-creation/child" className="ant-radio-icon" />
                                    Children
                                  </Checkbox>
                                  <Checkbox value={"Youth"}>
                                    <Icon name="/program-creation/team-static" className="ant-radio-icon" />
                                    Youth
                                  </Checkbox>
                                  <Checkbox value={"Women"}>
                                    <Icon name="/program-creation/female empowerment" className="ant-radio-icon" />
                                    Women
                                  </Checkbox>
                                  <Checkbox value={"Transgender"}>
                                    <Icon name="/program-creation/transgender" className="ant-radio-icon" />
                                    Transgender
                                  </Checkbox>
                                </Row>
                                <Row gutter={[16, 8]}>
                                  <Checkbox value={"Elderly"}>
                                    <Icon name="/program-creation/elderly" className="ant-radio-icon" />
                                    Elderly
                                  </Checkbox>
                                  <Checkbox value={"Veterans"}>
                                    <Icon name="/program-creation/veteran" className="ant-radio-icon" />
                                    Veterans
                                  </Checkbox>
                                  <Checkbox value={"Specially Abled"}>
                                    <Icon name="/program-creation/specially-abled" className="ant-radio-icon" />
                                    Specially Abled
                                  </Checkbox>
                                </Row>
                              </Checkbox.Group>
                            </Col>
                          </Row>
                        )}
                      </Row>

                      <Row gutter={[16, 8]} vgutter={16} align="middle" justify="space-between">
                        <Col xs={24}>
                          <Text className="subTitle">Age range</Text>
                        </Col>

                        <Col xs={8} className="limitclass">
                          <Field
                            name="minAge"
                            placeholder="Lower Limit"
                            component={SelectBox}
                            options={getAgeRange()}
                            showSearch={false}
                            errortext={touched.minAge ? errors.minAge : ""}
                          />
                        </Col>
                        <Col xs={8} className="limitclass">
                          <Field
                            name="maxAge"
                            placeholder="Upper Limit"
                            component={SelectBox}
                            options={getAgeRange()}
                            showSearch={false}
                            errortext={touched.maxAge ? errors.maxAge : ""}
                          />
                        </Col>
                        <Col xs={8} style={{ textAlign: "right" }}>
                          <Text strong>0-100 Years</Text>
                        </Col>
                        <Col xs={24}>
                          <Field
                            name="totalNumberOfBeneficiaries"
                            component={Input}
                            type="number"
                            placeholder="Total Number Planned"
                          />
                        </Col>
                      </Row>

                      <Row gutter={[16, 8]} align="middle">
                        <Col xs={24}>
                          <Text className="subTitle">Location</Text>
                        </Col>
                        <Col xs={24} lg={16}>
                          <Radio.Group
                            buttonStyle="solid"
                            name="locationType"
                            className="drop basix"
                            value={values.locationType}
                            onChange={(e) => setFieldValue("locationType", e.target.value)}
                          >
                            <Radio value="Rural">Rural</Radio>
                            <Radio value="Peri-Urban">Peri-Urban</Radio>
                            <Radio value="Urban">Urban</Radio>
                          </Radio.Group>
                        </Col>
                        <Col xs={24} lg={8} style={{ textAlign: "right" }}>
                          <Link
                            href="https://developers.google.com/maps/documentation/api-picker"
                            className="pin-via-link"
                          >
                            <u className="labelText">Pin via Google maps</u>
                          </Link>
                        </Col>
                        <Col xs={12} style={{ minHeight: "100px" }}>
                          <Field
                            name={`geographyModel.0.city`}
                            placeholder="City"
                            component={Input}
                            errortext={
                              getIn(touched, `geographyModel.0.city`) &&
                              getIn(errors, `geographyModel.0.city`) &&
                              getIn(errors, `geographyModel.0.city`)
                            }
                          />
                        </Col>
                        <Col xs={12} style={{ minHeight: "100px" }}>
                          <Field
                            name={`geographyModel.0.state`}
                            placeholder="State"
                            component={Input}
                            errortext={
                              getIn(touched, `geographyModel.0.state`) &&
                              getIn(errors, `geographyModel.0.state`) &&
                              getIn(errors, `geographyModel.0.state`)
                            }
                          />
                        </Col>
                      </Row>
                      <Row gutter={[16, 16]}>
                        <Col xs={24}>
                          <h5 className="basictitle">How do you plan to bring change? </h5>
                        </Col>

                        <Col xs={24}>
                          <label className="subTitle subtitleTextAlign">
                            Tell us about the problems faced by the community/individual targetted and their needs?
                          </label>
                          <Field
                            name="problemFacedByTarget"
                            inputType="textarea"
                            placeholder="Type here"
                            component={Input}
                            errortext={
                              getIn(touched, `problemFacedByTarget`) &&
                              getIn(errors, `problemFacedByTarget`) &&
                              getIn(errors, `problemFacedByTarget`)
                            }
                          />
                        </Col>

                        <Col xs={24}>
                          <label className="subTitle subtitleTextAlign">
                            What is unique about this program’s approach with regards to the forementioned needs?
                          </label>
                          <Field
                            name="uniqueProgramApproach"
                            inputType="textarea"
                            placeholder="Type here"
                            component={Input}
                            errortext={
                              getIn(touched, `uniqueProgramApproach`) &&
                              getIn(errors, `uniqueProgramApproach`) &&
                              getIn(errors, `uniqueProgramApproach`)
                            }
                          />
                        </Col>
                      </Row>

                      <Row gutter={[16, 16]}>
                        <Col xs={24}>
                          <h5 className="basictitle">What are the key highlights? </h5>
                        </Col>
                        <Col xs={24}>
                          <Text className="subTitle subtitleTextAlign">
                            Tell us about some of the key features, highlights, approaches and goals that this program
                            aims to achieve
                          </Text>
                        </Col>
                        <Col xs={24}>
                          <FieldArray
                            name="highlights"
                            render={(arrayHelpers) => (
                              <Row gutter={[4, 4]} align="middle">
                                {values.highlights.map((friend, index) => {
                                  const currentNumberOfItems = values.highlights.length;
                                  return (
                                    <Fragment>
                                      <Col xs={23} key={index}>
                                        <Field
                                          name={`highlights.${index}`}
                                          component={Input}
                                          placeholder="Enter highlight"
                                          errortext={
                                            getIn(touched, `highlights.${index}`) &&
                                            getIn(errors, `highlights.${index}`) &&
                                            getIn(errors, `highlights.${index}`)
                                          }
                                        />
                                      </Col>
                                      <Col xs={1}>
                                        <MinusOutlined
                                          onClick={() =>
                                            currentNumberOfItems !== 1 ? arrayHelpers.remove(index) : null
                                          }
                                        />
                                      </Col>
                                    </Fragment>
                                  );
                                })}
                                <Col xs={24}>
                                  <Button
                                    type="dashed"
                                    block
                                    className="addcontent highliht"
                                    icon={<PlusOutlined />}
                                    onClick={() => arrayHelpers.push("")}
                                  >
                                    Add another highlight
                                  </Button>
                                </Col>
                              </Row>
                            )}
                          />
                        </Col>
                      </Row>

                      <Row gutter={[16, 16]} justify="end">
                        <div className="steps-action floatRight displayFlex formStyles">
                          <Button type="primary" htmlType="submit" className="steps-action formStyles nextbutton">
                            NEXT: TEAM
                          </Button>
                        </div>
                      </Row>
                    </Space>
                  </Form>
                );
              }}
            </Formik>
          </Col>
          <Col sm={12} lg={8}>
            <Space size={48} direction="vertical">
              <div style={{ marginTop: "7rem", paddingLeft: "1rem" }}></div>
              <Icon name="/program-creation/reading-woman" />
            </Space>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

const getInitialValues = (programId, initialState) => {
  if (!isEmpty(initialState)) {
    const startdate = initialState?.durationFrom ? moment(initialState.durationFrom) : undefined;
    const enddate = initialState?.durationTo ? moment(initialState.durationTo) : undefined;
    const organisationId = sessionStorage.getItem("organisationId");

    return {
      organisationId: organisationId ? organisationId : "",
      id: programId,
      name: initialState ? initialState.name : "",
      description: initialState ? initialState.description : "",
      durationFrom: startdate,
      durationTo: enddate,
      duration: initialState ? initialState.duration : "",
      durationIn: initialState ? initialState.durationIn : "",
      locationType: initialState ? initialState.locationType : "",
      logoUrl: "string",
      problemFacedByTarget: initialState ? initialState.problemFacedByTarget : "",
      uniqueProgramApproach: initialState ? initialState.uniqueProgramApproach : "",
      teamApprovalStatus: "string",
      adminApprovalStatus: "string",
      minAge: initialState ? initialState.minAge : "",
      maxAge: initialState ? initialState.maxAge : "",
      totalNumberOfBeneficiaries: initialState ? initialState.totalNumberOfBeneficiaries : "",
      typesOfBeneficiaries: initialState ? initialState.typesOfBeneficiaries : ["", ""],
      geographyModel: initialState
        ? initialState.geographyModel
        : [
            {
              city: "",
              state: "",
              latitude: "",
              longitude: "",
            },
          ],
      highlights: initialState ? initialState.highlights : [""],
    };
  } else {
    const startdate = initialState?.durationFrom ? moment(initialState.durationFrom) : null;
    const enddate = initialState?.durationTo ? moment(initialState.durationTo) : null;
    const organisationId = sessionStorage.getItem("organisationId");

    return {
      organisationId: organisationId ? organisationId : "",
      id: programId,
      name: initialState ? initialState.name : "",
      description: initialState ? initialState.description : "",
      durationFrom: startdate,
      durationTo: enddate,
      duration: initialState ? initialState.duration : "",
      durationIn: initialState ? initialState.durationIn : "",
      locationType: initialState ? initialState.locationType : "",
      logoUrl: "string",
      problemFacedByTarget: initialState ? initialState.problemFacedByTarget : "",
      uniqueProgramApproach: initialState ? initialState.uniqueProgramApproach : "",
      teamApprovalStatus: "string",
      adminApprovalStatus: "string",
      minAge: initialState ? initialState.minAge : "",
      maxAge: initialState ? initialState.maxAge : "",
      totalNumberOfBeneficiaries: initialState ? initialState.totalNumberOfBeneficiaries : "",
      typesOfBeneficiaries: initialState ? initialState.typesOfBeneficiaries : ["", ""],
      geographyModel: initialState
        ? initialState.geographyModel
        : [
            {
              city: "",
              state: "",
              latitude: "",
              longitude: "",
            },
          ],
      highlights: initialState ? initialState.highlights : [""],
    };
  }
};

export default BasicDetails;
