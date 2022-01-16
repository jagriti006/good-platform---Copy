import React, { Fragment, useEffect, useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import { Col, Button, Row, Divider, notification } from "antd";
import { Collapse } from "antd";
import Switch from "../FormikComponents/Switch/Switch";
import { Checkbox } from "antd";
import Input from "../FormikComponents/Input/Input";
import beneficiaryAPI from "../../api/beneficiaryAPI";
import { useHistory, useParams } from "react-router-dom";
import "./BeneficiaryStyles.scss";
import appRoutes from "../../constants/app-routes";
import { getNextStepLink, useQuery } from "../../utils/utils";

const BeneficiaryHealth = () => {
  const history = useHistory();
  const { beneficiaryId } = useParams();
  const projectId = useQuery().get("projectId");
  const [initialState, setInitialState] = useState("");

  useEffect(() => {
    const fetchBeneficiaryHealth = async () => {
      if (beneficiaryId) {
        const response = await beneficiaryAPI().fetchBeneficiaryHealth(beneficiaryId);
        if (response.data && response.data.healthDetails !== null) {
          setInitialState(formikFormatter(response.data.healthDetails));
        }
      }
    };
    fetchBeneficiaryHealth();
  }, []);

  const saveBeneficiaryHealth = async (values) => {
    
    if (initialState && initialState.id) values["id"] = initialState.id;
    values["otherDisability"] = values["otherDisability"].toString();
    const response = await beneficiaryAPI().saveBeneficiaryHealth(values);
    if (response.data) {
      notification.success({ message: "Health Details Saved..!" });
      history.push(`${getNextStepLink()}/${beneficiaryId}?projectId=${projectId}`);
    }
  };
  return (
    <Formik
      initialValues={{
        beneficiaryId: beneficiaryId ? beneficiaryId : "",
        preVaccinationQuestionanireId: initialState ? initialState.preVaccinationQuestionanireId : false,
        austisticDisability: initialState ? initialState.austisticDisability : false,
        blindPartialSight: initialState ? initialState.blindPartialSight : false,
        deafPartialHearing: initialState ? initialState.deafPartialHearing : false,
        learningDifficulty: initialState ? initialState.learningDifficulty : false,
        mentalHealth: initialState ? initialState.mentalHealth : false,
        wheelchairMobility: initialState ? initialState.wheelchairMobility : false,
        chronicHeadaches: initialState ? initialState.chronicHeadaches : false,
        otherDisability: initialState ? JSON.parse(initialState.otherDisability) : false,
        backInjuries: initialState ? initialState.backInjuries : false,
        seizuresFaintingDizziness: initialState ? initialState.seizuresFaintingDizziness : false,
        allergies: initialState ? initialState.allergies : false,
        tuberculosis: initialState ? initialState.tuberculosis : false,
        nervousDisorder: initialState ? initialState.nervousDisorder : false,
        respiratoryDisease: initialState ? initialState.respiratoryDisease : false,
        highBloodPressure: initialState ? initialState.highBloodPressure : false,
        arthritisGoutJointDisease: initialState ? initialState.arthritisGoutJointDisease : false,
        cancer: initialState ? initialState.cancer : false,
        permanentDefects: initialState ? initialState.permanentDefects : false,
        stomachBladderTrouble: initialState ? initialState.stomachBladderTrouble : false,
        isSmoker: initialState ? initialState.isSmoker : false,
        cigarettesPerWeek: initialState ? initialState.cigarettesPerWeek : 0,
        drinkAlcohol: initialState ? initialState.drinkAlcohol : false,
        glassesPerWeek: initialState ? initialState.glassesPerWeek : 0,
        jobInjury: initialState ? initialState.jobInjury : false,
        isPregnant: initialState ? initialState.isPregnant : false,
        visionDifficulty: initialState ? initialState.visionDifficulty : false,
        medicalTreatmentSixMonths: initialState ? initialState.medicalTreatmentSixMonths : false,
        medicationAllergies: initialState ? initialState.medicationAllergies : false,
        childhoodChickenPox: initialState ? initialState.childhoodChickenPox : "NOT_HAVE_NOT_IMMUNIZED",
        childhoodMumps: initialState ? initialState.childhoodMumps : "NOT_HAVE_NOT_IMMUNIZED",
        childhoodGermanMeasles: initialState ? initialState.childhoodGermanMeasles : "NOT_HAVE_NOT_IMMUNIZED",
        childhoodRedMeasles: initialState ? initialState.childhoodRedMeasles : "NOT_HAVE_NOT_IMMUNIZED",
        familyDiabetes: initialState ? initialState.familyDiabetes : false,
        familyCancer: initialState ? initialState.familyCancer : false,
        familyHeartDisease: initialState ? initialState.familyHeartDisease : false,
        familyTuberculosis: initialState ? initialState.familyTuberculosis : false,
        hasTestedPositiveOrIll90Days: initialState ? initialState.hasTestedPositiveOrIll90Days : false,
        hasFamilyTestedPositiveLast14Days: initialState ? initialState.hasFamilyTestedPositiveLast14Days : false,
        hasFamilyIllness: initialState ? initialState.hasFamilyIllness : false,
        isPregnantOrLactating: initialState ? initialState.isPregnantOrLactating : false,
        isAllergicToFoodMedication: initialState ? initialState.isAllergicToFoodMedication : false,
        latitude: initialState ? initialState.latitude : 0,
        longitude: initialState ? initialState.longitude : 0,
        heartDisease: initialState ? initialState.heartDisease : false,
        kidneyDisease: initialState ? initialState.kidneyDisease : false,
        muscularDisease: initialState ? initialState.muscularDisease : false,
        diabetes: initialState ? initialState.diabetes : false,
        hernia: initialState ? initialState.hernia : false,
        rheumaticFever: initialState ? initialState.rheumaticFever : false,
        anyTypeHepatitisJaundice: initialState ? initialState.anyTypeHepatitisJaundice : false,
        earNoseThroatSinusColds: initialState ? initialState.earNoseThroatSinusColds : false,
        hasDisability: initialState ? initialState.hasDisability : false,
        hadAnyInjury: initialState ? initialState.hadAnyInjury : false,
        sufferingFromDiseases: initialState ? initialState.sufferingFromDiseases : false,
        familyHealth: initialState ? initialState.familyHealth : false,
        declaration: initialState ? initialState.declaration : false,
        allergyMedicationDetails: initialState ? initialState.allergyMedicationDetails : "",
      }}
      enableReinitialize={true}
      onSubmit={saveBeneficiaryHealth}
    >
      {({ values, setFieldValue }) => {
        return (
          <Form className="beneficiaryForms beneficiaryHealthForm">
            <Collapse defaultActiveKey={["1"]}>
              <Collapse.Panel header="Personal Health History" key="1">
                <Row justify="space-between">
                  {/* 1. Do you have any disablity starts */}
                  <Col span={24}>
                    <div className="formSection">
                      <Row>
                        <Col span="22">
                          <label htmlFor="">1. Do you have any disability ?</label>
                        </Col>
                        <Col span="2">
                          <Field
                            checked={values.hasDisability}
                            name="hasDisability"
                            component={Switch}
                            onChange={(checked) => {
                              if (!checked) {
                                disabilityCheckBoxOptions.forEach((item) => setFieldValue(item.value, false));
                              }
                            }}
                          />
                        </Col>
                      </Row>
                    </div>
                  </Col>

                  {values.hasDisability && (
                    <Col span={24}>
                      {disabilityCheckBoxOptions.map((disabilityItem, index) => {
                        const fieldName = disabilityItem.value;
                        return (
                          <Checkbox
                            key={index}
                            checked={values[fieldName] || false}
                            onChange={(e) => setFieldValue(disabilityItem.value, e.target.checked)}
                          >
                            {disabilityItem.label}
                          </Checkbox>
                        );
                      })}
                    </Col>
                  )}

                  {/* 1. Do you have any disablity ends */}

                  {/* 2. Do you suffer from any diseases */}
                  <Col span={24}>
                    <div className="formSection">
                      <Row>
                        <Col span="22">
                          <label htmlFor="">2. Have you had any injury ?</label>
                        </Col>
                        <Col span="2">
                          <Field
                            name="hadAnyInjury"
                            component={Switch}
                            onChange={(checked) => {
                              if (!checked) {
                                injuryCheckBoxOptions.forEach((item) => setFieldValue(item.value, false));
                              }
                            }}
                          />
                        </Col>
                      </Row>
                    </div>
                  </Col>
                  {values.hadAnyInjury && (
                    <Col span={24}>
                      {injuryCheckBoxOptions.map((injuryItem, index) => {
                        const fieldName = injuryItem.value;
                        return (
                          <Checkbox
                            checked={values[fieldName] || false}
                            onChange={(e) => setFieldValue(injuryItem.value, e.target.checked)}
                            key={index}
                          >
                            {injuryItem.label}
                          </Checkbox>
                        );
                      })}
                    </Col>
                  )}
                  {/*  2. Have you had any injury ends */}

                  {/* 3. Do you suffer from any diseases starts starts */}
                  <Col span={24}>
                    <div className="formSection">
                      <Row>
                        <Col span="22">
                          <label htmlFor="">3. Do you suffer from any diseases starts ?</label>
                        </Col>
                        <Col span="2">
                          <Field
                            name="sufferingFromDiseases"
                            component={Switch}
                            onChange={(checked) => {
                              if (!checked) {
                                diseaseCheckBoxOptions.forEach((item) => setFieldValue(item.value, false));
                              }
                            }}
                          />
                        </Col>
                      </Row>
                    </div>
                  </Col>

                  {values.sufferingFromDiseases && (
                    <Col span={24}>
                      {diseaseCheckBoxOptions.map((diseaseItem, index) => {
                        const fieldName = diseaseItem.value;
                        return (
                          <Checkbox
                            checked={values[fieldName] || false}
                            onChange={(e) => setFieldValue(diseaseItem.value, e.target.checked)}
                            key={index}
                          >
                            {diseaseItem.label}
                          </Checkbox>
                        );
                      })}
                    </Col>
                  )}
                  {/* 3. Do you suffer from any diseases starts ends */}

                  {/*  4. Do you smoke or drink ? starts */}
                  <Col span={24}>
                    <div className="formSection">
                      <Row>
                        <Col span="22">
                          <label htmlFor="">4. Do you smoke or drink ?</label>
                        </Col>
                        <Col span="2">
                          <Field name="doYouSMokeOrDrink" component={Switch} />
                        </Col>
                      </Row>
                    </div>
                  </Col>

                  {values.isSmoker && (
                    <Col span={24}>
                      <Row>
                        <Col span={12}>
                          <Checkbox
                            checked={values.isSmoker}
                            onChange={(e) => {
                              const { checked } = e.target;
                              setFieldValue("isSmoker", checked);
                            }}
                            className="checkBoxGroupItem"
                          >
                            Smoker
                          </Checkbox>
                          {values.isSmoker && (
                            <Col span={24}>
                              <label htmlFor="">Cigarets per week</label>
                              <Field name="cigarettesPerWeek" component={Input} type="number" />
                            </Col>
                          )}
                        </Col>

                        <Col span={24}>
                          <Checkbox
                            checked={values.drinkAlcohol}
                            onChange={(e) => {
                              const { checked } = e.target;
                              setFieldValue("drinkAlcohol", checked);
                            }}
                            className="checkBoxGroupItem"
                          >
                            Drink Alcohol
                          </Checkbox>
                          {values.drinkAlcohol && (
                            <Col span={24}>
                              <label htmlFor="">Glasses per week</label>
                              <Field name="glassesPerWeek" component={Input} type="number" />
                            </Col>
                          )}
                        </Col>
                      </Row>
                    </Col>
                  )}

                  {/*  4. Do you smoke or drink ? ends */}

                  {/* 5. Do you suffer from any other medical condition or are you pregnant starts */}
                  <Col span={24}>
                    <div className="formSection">
                      <Row>
                        <Col span="22">
                          <label htmlFor="">
                            5. Do you suffer from any other medical condition or are you pregnant ?
                          </label>
                        </Col>
                        <Col span="2">
                          <Field
                            name="medicalConditions"
                            component={Switch}
                            onChange={(checked) => {
                              if (!checked) {
                                medicalConditionCheckboxOptions.forEach((item) => setFieldValue(item.value, false));
                              }
                            }}
                          />
                        </Col>
                      </Row>
                    </div>
                  </Col>

                  {values.medicalConditions && (
                    <Col span={24}>
                      {medicalConditionCheckboxOptions.map((medicalConditionItem, index) => {
                        const fieldName = medicalConditionItem.value;
                        return (
                          <Checkbox
                            checked={values[fieldName] || false}
                            onChange={(e) => setFieldValue(medicalConditionItem.value, e.target.checked)}
                            key={index}
                          >
                            {medicalConditionItem.label}
                          </Checkbox>
                        );
                      })}
                    </Col>
                  )}
                  {/* 5. Do you suffer from any other medical condition or are you pregnant ends */}

                  <Col span={24}>
                    <div className="formSection">
                      <Row>
                        <Col span="22">
                          <label htmlFor="">
                            6. Receiving medical treatment at the present time or in the past 6 months ?{" "}
                          </label>
                        </Col>
                        <Col span="2">
                          <Field name="medicalTreatmentSixMonths" component={Switch} />
                        </Col>
                      </Row>
                    </div>
                  </Col>
                  {/*  Missing  */}
                  <Col span={24}>
                    <Row>
                      <Col span="22">
                        <label htmlFor="">
                          7. Ever been turned down for life insurance, military service, or employment for physical
                          reasons ?
                        </label>
                      </Col>
                      <Col span="2">
                        <Field name="turnedDown" component={Switch} />
                      </Col>
                    </Row>
                  </Col>

                  {/*  Missing  */}
                  <Col span={24}>
                    <div className="formSection">
                      <Row>
                        <Col span="22">
                          <label htmlFor="">8. Do you have any allergies ?</label>
                        </Col>
                        <Col span="2">
                          <Field
                            name="allergies"
                            component={Switch}
                            onChange={(checked) => {
                              if (!checked) {
                                setFieldValue("allergyList", []);
                              }
                            }}
                          />
                        </Col>
                      </Row>
                    </div>
                  </Col>
                  {values.allergies && (
                    <Col span={24}>
                      <FieldArray
                        name="allergyList"
                        render={(arrayHelpers) => (
                          <div>
                            {values.allergyList && values.allergyList.length > 0 ? (
                              values.allergyList.map((friend, index) => (
                                <Fragment key={index}>
                                  <Row span={12}>
                                    <Col span={18}>
                                      <Field name={`allergyList.${index}`} component={Input} placeholder="Allergy" />
                                    </Col>
                                    <Col span={3}>
                                      <Button htmlType="button" onClick={() => arrayHelpers.remove(index)}>
                                        -
                                      </Button>
                                    </Col>
                                    <Col span={3}>
                                      <Button htmlType="button" onClick={() => arrayHelpers.push()}>
                                        +
                                      </Button>
                                    </Col>
                                  </Row>
                                </Fragment>
                              ))
                            ) : (
                              <Button htmlType="button" onClick={() => arrayHelpers.push("")}>
                                {/* show this when user has removed all friends from the list */}
                                Add allergies
                              </Button>
                            )}
                          </div>
                        )}
                      />
                    </Col>
                  )}
                  <Col span={24}></Col>
                </Row>
              </Collapse.Panel>

              <Collapse.Panel header="Childhood Diseases" key="2" style={{ display: "none" }}>
                <Row justify="space-between">
                  {/* 3. Do you suffer from any diseases starts starts */}
                  <Col span={24}>
                    {childHoodDiseases.map((childhoodItem, index) => {
                      return (
                        <div className="formSection" key={index}>
                          <Row justify="space-between">
                            <Col span="20">
                              <label htmlFor="">{childhoodItem.label}</label>
                            </Col>
                            <Col span="4">
                              <Field
                                checked={values[`${childhoodItem.value}`] === "HAD"}
                                name={childhoodItem.value}
                                component={Switch}
                                checkedChildren="Had"
                                unCheckedChildren="Never Had"
                                onChange={(checked) => {
                                  const value = checked ? "HAD" : "NOT_HAVE_NOT_IMMUNIZED";
                                  setFieldValue(childhoodItem.value, value);
                                }}
                              />
                            </Col>
                          </Row>
                        </div>
                      );
                    })}
                  </Col>
                  {/* 3. Do you suffer from any diseases starts ends */}
                </Row>
              </Collapse.Panel>

              <Collapse.Panel header="Family Health" key="3" style={{ display: "none" }}>
                <Row justify="space-between">
                  {/* 3. Do you suffer from any diseases starts starts */}
                  <Col span={24}>
                    <Row>
                      <Col span="22">
                        <label htmlFor="">
                          3. Has a family member ( parent, sublings, grandparents) had any of the conditions listed ?
                        </label>
                      </Col>
                      <Col span="2">
                        <Field
                          name="familyHealth"
                          component={Switch}
                          onChange={(checked) => {
                            if (!checked) {
                              familyHealthOptions.forEach((item) => setFieldValue(item.value, false));
                            }
                          }}
                        />
                      </Col>
                    </Row>
                  </Col>
                  {values.familyHealth && (
                    <Col span={24}>
                      {familyHealthOptions.map((familyHealthItem, index) => {
                        const fieldName = familyHealthItem.value;
                        return (
                          <Checkbox
                            checked={values[fieldName] || false}
                            onChange={(e) => setFieldValue(familyHealthItem.value, e.target.checked)}
                            key={index}
                          >
                            {familyHealthItem.label}
                          </Checkbox>
                        );
                      })}
                    </Col>
                  )}
                  {/* 3. Do you suffer from any diseases starts ends */}
                </Row>
              </Collapse.Panel>

              <Collapse.Panel header="Pre Vaccination Questionnaire" key="4">
                <Row justify="space-between" gutter={[16, 16]}>
                  <Col span="22">
                    <label htmlFor="">
                      1. Have you tested COVID positive or had any serious illness in last 90 days?
                    </label>
                  </Col>
                  <Col span="2">
                    <Field name="hasTestedPositiveOrIll90Days" component={Switch} />
                  </Col>

                  <Col span="22">
                    <label htmlFor="">
                      2. Has any member of your family/your recent contact tested COVID positive in last 14 days?
                    </label>
                  </Col>
                  <Col span="2">
                    <Field name="hasFamilyTestedPositiveLast14Days" component={Switch} />
                  </Col>

                  <Col span="22">
                    <label htmlFor="">
                      3. Do you/your family member have fever, cough, breathlessness, malaise, myalgia, and/or diarrhea?
                    </label>
                  </Col>
                  <Col span="2">
                    <Field name="hasFamilyIllness" component={Switch} />
                  </Col>

                  <Col span="22">
                    <label htmlFor="">4. Are you pregnant/unsure of your pregnancy/lactating?</label>
                  </Col>
                  <Col span="2">
                    <Field name="isPregnantOrLactating" component={Switch} />
                  </Col>

                  <Col span="22">
                    <label htmlFor="">
                      5. Are you suffering from any allergy (isAllergicToFoodMedto food/medication or any other vaccine?
                    </label>
                  </Col>
                  <Col span="2">
                    <Field name="isAllergicToFoodMedication" component={Switch} />
                  </Col>

                  {values.isAllergicToFoodMedication && (
                    <Col xs={24}>
                      <Field
                        name="allergyMedicationDetails"
                        placeholder="Allergy Medication Details"
                        component={Input}
                        autoSize={{ minRows: 3, maxRows: 6 }}
                      />
                    </Col>
                  )}
                  <Col xs={24}>
                    <Checkbox
                      checked={values.declaration}
                      name="checked"
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setFieldValue("declaration", checked);
                      }}
                    >
                      I declare that the above information is true. I have also been informed about the risks involved
                      basis the information provided by me above.
                    </Checkbox>
                  </Col>
                </Row>
                <Divider />

                <Row>
                  <Col span="20">
                    <label htmlFor="">Location of screening</label>
                  </Col>
                  <Col span={24} className="formCol">
                    <Field name="latitude" component={Input} placeholder="Latitude" />
                  </Col>
                  <Col span={24} className="formCol">
                    <Field name="longitude" component={Input} placeholder="Longitude" />
                  </Col>
                </Row>
              </Collapse.Panel>
            </Collapse>

            <Row justify="end">
              <Col xs={12} lg={6}>
                <Button type="primary" htmlType="submit">
                  Next
                </Button>
              </Col>
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};

const disabilityCheckBoxOptions = [
  { value: "austisticDisability", label: "Austistic Disorder" },
  { value: "blindPartialSight", label: "Blind / partial sight" },
  { value: "deafPartialHearing", label: "Deaf/Partial Hearing" },
  { value: "learningDifficulty", label: "Learning difficulty" },
  { value: "mentalHealth", label: "Mental Health" },
  { value: "wheelchairMobility", label: "Wheelchair/Mobility" },
  { value: "chronicHeadaches", label: "Chronic Headaches" },
  { value: "otherDisability", label: "Other Disabilities" },
];

const injuryCheckBoxOptions = [
  { value: "backInjuries", label: "Back injuries" },
  {
    value: "permanentDefects",
    label: "Permanent defect from illness, disease, injury",
  },
  { value: "jobInjury", label: "Injured on the job" },
];

const diseaseCheckBoxOptions = [
  { value: "cancer", label: "Cancer" },
  { value: "heartDisease", label: "Heart Disease" },
  { value: "kidneyDisease", label: "Kidney Disease" },
  { value: "muscularDisease", label: "Muscular Disease" },
  { value: "diabetes", label: "Diabetes" },
  { value: "hernia", label: "Hernia" },
  { value: "respiratoryDisease", label: "Respiratory Disease" },
  { value: "tuberculosis", label: "Tuberculosis" },
  { value: "rheumaticFever", label: "Rheumatic fever" },
  {
    value: "anyTypeHepatitisJaundice",
    label: "Any type of Hepatitis, Jaundice",
  },
  { value: "highBloodPressure", label: "High Blood Pressure" },
  {
    value: "arthritisGoutJointDisease",
    label: "Arthritis, Gout, Joint Disease",
  },
  { value: "visionDifficulty", label: "Vision Difficulty, Eye Disease" },
];

const medicalConditionCheckboxOptions = [
  {
    value: "seizuresFaintingDizziness",
    label: "Seizures, Fainting, Dizziness",
  },
  { value: "nervousDisorder", label: "Nervous Disorder" },
  { value: "stomachBladderTrouble", label: "Stomach, Gall bladder trouble" },
  {
    value: "earNoseThroatSinusColds",
    label: "Ear, Nose, Throat trouble-sinus, Colds",
  }, // missing
  { value: "isPregnant", label: "Pregnant" },
];

const childHoodDiseases = [
  { value: "childhoodChickenPox", label: "Chicken pox" },
  { value: "childhoodRedMeasles", label: "Red Measles (Rubeola)" },
  { value: "childhoodMumps", label: "Mumps" },
  { value: "childhoodGermanMeasles", label: "German Measles (Rubella)" },
];

const familyHealthOptions = [
  { value: "familyDiabetes", label: "Diabetes" },
  { value: "familyCancer", label: "Cancer" },
  { value: "familyHeartDisease", label: "Heart Disease" },
  { value: "highBloodPressure", label: "High Blood Pressure" }, // missing
  { value: "familyTuberculosis", label: "Tuberculosis" },
];

const formikFormatter = (data) => {
  const response = { ...data };
  const disabilityCheckBoxArray = disabilityCheckBoxOptions.map((item) => item.value);
  const injuryCheckBoxArray = injuryCheckBoxOptions.map((item) => item.value);
  const diseaseCheckBoxArray = diseaseCheckBoxOptions.map((item) => item.value);
  const medicalConditionCheckboxArray = medicalConditionCheckboxOptions.map((item) => item.value);
  const familyHealthCheckBoxArray = familyHealthOptions.map((item) => item.value);
  for (const property in response) {
    if (disabilityCheckBoxArray.includes(property) && response[property] === true) {
      response["hasDisability"] = true;
    }
    if (injuryCheckBoxArray.includes(property) && response[property] === true) {
      response["hadAnyInjury"] = true;
    }
    if (diseaseCheckBoxArray.includes(property) && response[property] === true) {
      response["sufferingFromDiseases"] = true;
    }
    if (medicalConditionCheckboxArray.includes(property) && response[property] === true) {
      response["medicalConditions"] = true;
    }
    if (familyHealthCheckBoxArray.includes(property) && response[property] === true) {
      response["familyHealth"] = true;
    }
  }
  return response;
};
// formikFormatter(dummyResponse);

export default BeneficiaryHealth;
