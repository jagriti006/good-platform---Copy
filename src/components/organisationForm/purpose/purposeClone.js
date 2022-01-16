import { Button, notification, Timeline } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Collapse, message, AutoComplete, Input } from "antd";
import { MinusOutlined, PlusOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import Organisationapi from "../../../api/organizationapi";
import appRoutes from "../../../constants/app-routes";
import purpose from "../../../assets/images/illustrators/purposepage.png";
import agriculture from "../../../assets/images/agriculture.png";
import skill from "../../../assets/images/skill.png";
import health from "../../../assets/images/health-care.png";
import nutrition from "../../../assets/images/nutrition.png";
import empowerment from "../../../assets/images/female-empowerment.png";
import "./purpose.scss";
import removeIcon from "../../../assets/images/remove.png";
import upperArrow from "../../../assets/images/UpperArrow.png";
import downArrow from "../../../assets/images/arrow.png";
import {preventCopyPaste} from "../../../utils/utils";
import * as Yup from 'yup';

const renderLabel = (label, icon) => {
  return (
    <div style={{ display: "flex", padding: "0.8rem 0" }}>
      <img src={icon} style={{ width: "1.5rem", height: "1.5rem" }} />
      <p style={{ margin: "0 0 0 0.8rem" }}>{label}</p>
    </div>
  );
};

const radioOptions = [
  {
    value: "Health and FamilyWelfare",
    label: renderLabel("Health and FamilyWelfare", health),
    icon: health,
  },
  {
    value: "Agriculture",
    label: renderLabel("Agriculture", agriculture),
    icon: agriculture,
  },
  {
    value: "Microfinance",
    label: renderLabel("Microfinance", agriculture),
    icon: agriculture,
  },
  {
    value: "Labour and Employment",
    label: renderLabel("Labour and Employment", agriculture),
    icon: agriculture,
  },
  {
    value: "Micro Small & Medium Enterprises",
    label: renderLabel("Micro Small & Medium Enterprises", agriculture),
    icon: agriculture,
  },
  {
    value: "Information and Communication Technology",
    label: renderLabel("Information and Communication Technology", agriculture),
    icon: agriculture,
  },
  {
    value: "Disaster Management",
    label: renderLabel("Disaster Management", agriculture),
    icon: agriculture,
  },
  {
    value: "Biotechnology",
    label: renderLabel("Biotechnology", agriculture),
    icon: agriculture,
  },
  {
    value: "Nutrition",
    label: renderLabel("Nutrition", nutrition),
    icon: nutrition,
  },
  {
    value: "Rural Development and Poverty Alleviation",
    label: renderLabel("Health and Family Welfare", agriculture),
    icon: agriculture,
  },
  {
    value: "Skill Development",
    label: renderLabel("Skill Development", skill),
    icon: skill,
  },
  {
    value: "Sports",
    label: renderLabel("Sports", agriculture),
    icon: agriculture,
  },
  {
    value: "Vocational Training",
    label: renderLabel("Vocational Training", agriculture),
    icon: agriculture,
  },
  {
    value: "Women's Development and Empowerment",
    label: renderLabel("Women's Development and Empowerment", empowerment),
    icon: empowerment,
  },
  {
    value: "Art and Culture",
    label: renderLabel("Art and Culture", agriculture),
    icon: agriculture,
  },
  {
    value: "Differently Abled",
    label: renderLabel("Health and Family Welfare", agriculture),
    icon: agriculture,
  },
  {
    value: "Aged/Elderly",
    label: renderLabel("Aged/Elderly", agriculture),
    icon: agriculture,
  },
  {
    value: "Education and Literacy",
    label: renderLabel("Education and Literacy", agriculture),
    icon: agriculture,
  },
  {
    value: "New and Renewable Energy",
    label: renderLabel("New and Renewable Energy", agriculture),
    icon: agriculture,
  },
  {
    value: "Scientific and Industrial Research",
    label: renderLabel("Scientific and Industrial Research", agriculture),
    icon: agriculture,
  },
  {
    value: "Urban Development and Proverty Alleviation",
    label: renderLabel("Urban Development and Proverty Alleviation", agriculture),
    icon: agriculture,
  },
  {
    value: "Youth Affairs",
    label: renderLabel("Youth Affairs", agriculture),
    icon: agriculture,
  },
];

const sectorIcons = [
  { name: "Health and FamilyWelfare", icon: health },
  { name: "Agriculture", icon: agriculture },
  { name: "Microfinance", icon: agriculture },
  { name: "Labour and Employment", icon: agriculture },
  { name: "Micro Small & Medium Enterprises", icon: agriculture },
  { name: "Information and Communication Technology", icon: agriculture },
  { name: "Disaster Management", icon: agriculture },
  { name: "Biotechnology", icon: agriculture },
  { name: "Nutrition", icon: nutrition },
  { name: "Rural Development and Poverty Alleviation", icon: agriculture },
  { name: "Skill Development", icon: skill },
  { name: "Sports", icon: agriculture },
  { name: "Vocational Training", icon: agriculture },
  { name: "Women's Development and Empowerment", icon: empowerment },
  { name: "Art and Culture", icon: agriculture },
  { name: "Differently Abled", icon: agriculture },
  { name: "Aged/Elderly", icon: agriculture },
  { name: "Education and Literacy", icon: agriculture },
  { name: "New and Renewable Energy", icon: agriculture },
  { name: "Scientific and Industrial Research", icon: agriculture },
  { name: "Urban Development and Proverty Alleviation", icon: agriculture },
  { name: "Youth Affairs", icon: agriculture },
];

const { Panel } = Collapse;
const Purpose = (props) => {
  const history = useHistory();
  const organisationId = sessionStorage.getItem("organisationId");
  // const organisationId = "2c9f92237c168170017c16ccb246000f";
  const [initialState, setInitialState] = useState(null);
  const [primarySectorType, setPrimarySectorType] = useState(null);
  const [secondarySectorType, setSecondarySectorType] = useState([]);
  const [searchPrimarySector, setPrimarySearchSector] = useState("");
  const [searchSecondarySector, setSecondarySearchSector] = useState("");
  const [sectorTypeData, setSectorTypeData] = useState([]);
  const [missionStatements, setMissionStatements] = useState([]);
  const [about, setAbout] = useState("");
  const [statement, setStatement] = useState("");

  useEffect(() => {
    const fetchPurpose = async () => {
      if (organisationId) {
        const response = await Organisationapi().fetchPurpose(organisationId);
        if (response.data) {
          setInitialState(response.data);

          if (response.data.sectors.length > 0 || response.data.missionStatements || response.data.about) {
            sessionStorage.setItem("purposeUpdate", true);
          }

          if (response.data.sectors.length > 0) {
            const primarySectorData = response.data.sectors.filter((data) => data.type === "PRIMARY");
            const secondarySectorData = response.data.sectors.filter((data) => data.type === "SECONDARY");

            const secondarySectorIds = [];
            secondarySectorData && secondarySectorData.map((data) => secondarySectorIds.push(data.sectorId));

            setPrimarySectorType(primarySectorData.length ? primarySectorData[0].sectorId : null);
            setSecondarySectorType(secondarySectorIds);
          }

          if (response.data.missionStatements) {
            setMissionStatements(response.data.missionStatements);
          }

          if (response.data.about) {
            setAbout(response.data.about);
          }
        }
      }
    };

    const fetchSectors = async () => {
      const response = await Organisationapi().fetchSectors();
      if (response.data) {
        setSectorTypeData(customStructure(response.data));
      }
    };

    fetchPurpose();
    fetchSectors();
  }, []);

  const OverviewSchema = Yup.object().shape({
    about: Yup.string().max(246, 'Too Long Allowed 246 Charctors.!').matches(/^[A-Za-z.\/@_]*$/, "Only Alphabits!"),
  });
  
  const backClick = () => {
    if (organisationId) history.push(`${appRoutes.ORGANISATION}${appRoutes.LOCATION}/${organisationId}`);
  };

  const saveBeneficiary = async () => {
    const purposeUpdate = sessionStorage.getItem("purposeUpdate");

    const newSectorData = [];
    const cloneMissionStatement = missionStatements;

    if (statement){
      cloneMissionStatement.push({
        id: `NEW_${Math.random()}`,
        statement: statement,
      });
    }

    if (primarySectorType) {
      newSectorData.push({
        id:
          initialState?.sectors.filter(
            (sectorData) => sectorData.type === "PRIMARY" && sectorData.sectorId === primarySectorType
          )[0]?.id || "NEW_",
        sectorId: primarySectorType,
        type: "PRIMARY",
      });
    }

    secondarySectorType &&
      secondarySectorType.map((sec_data) => {
        newSectorData.push({
          id:
            initialState?.sectors.filter(
              (sectorData) => sectorData.type === "SECONDARY" && sectorData.sectorId === sec_data
            )[0]?.id || "NEW_",
          sectorId: sec_data,
          type: "SECONDARY",
        });
      });

    const data = {
      organisationId: organisationId,
      sectors: newSectorData.map((sectorsData) => {
        if (sectorsData.id.includes("NEW_")) delete sectorsData.id;
        if (purposeUpdate === "true") delete sectorsData?.sector;

        return sectorsData;
      }),
      missionStatements: cloneMissionStatement.map((missionData) => {
        if (missionData.id.includes("NEW_")) {
          delete missionData.id;
          return missionData;
        } else {
          return missionData;
        }
      }),
      about: about,
    };

    const response = await Organisationapi().addorPurpose(data);
    if (response.success) {
      notification.success({ message: "Purpose Details Saved..!" });
      history.push(`${appRoutes.ORGANISATION}${appRoutes.TRACK_RECORDS}/${organisationId}`);
    } else {
      notification.error({ message: `${response.error}` });
    }
  };

  const changeSecondarySectorType = (value) => {
    if (secondarySectorType.length !== 2) {
      setSecondarySectorType([...secondarySectorType, sectorTypeData.filter((data) => data.value === value)[0].id]);
    } else {
      notification.error({
        message: "Please first deselect any secondary sector then try again to select secondary sector",
      });
    }
  };

  const renderOptions = (sectorType) => {
    if (sectorType === 1) {
      //  Primary
      if (searchPrimarySector) {
        return primarySectorType
          ? sectorTypeData
              .filter((data) => data.id !== primarySectorType)
              .filter((searchData) => searchData.value.toLowerCase().includes(searchPrimarySector.toLowerCase()))
          : sectorTypeData.filter((data) => data.value.toLowerCase().includes(searchPrimarySector.toLowerCase()));
      } else {
        return primarySectorType ? sectorTypeData.filter((data) => data.id !== primarySectorType) : sectorTypeData;
      }
    } else {
      //  Secondary
      if (searchSecondarySector) {
        return secondarySectorType.length > 0
          ? sectorTypeData
              .filter((data) => !secondarySectorType.includes(data.id))
              .filter((searchData) => searchData.value.toLowerCase().includes(searchSecondarySector.toLowerCase()))
          : sectorTypeData.filter((data) => data.value.toLowerCase().includes(searchSecondarySector.toLowerCase()));
      } else {
        return secondarySectorType.length > 0
          ? sectorTypeData.filter((data) => !secondarySectorType.includes(data.id))
          : sectorTypeData;
      }
    }
  };

  const customStructure = (data) => {
    const newData = [];

    data.map((sectorData) => {
      newData.push({
        id: sectorData.id,
        value: sectorData.title,
        shortTitle: sectorData.shortTitle,
        image: sectorData.image,
        label: renderLabel(
          sectorData.title,
          sectorIcons.filter((iconData) => iconData.name === sectorData.title)[0]?.icon
        ),
        icon: sectorIcons.filter((iconData) => iconData.name === sectorData.title)[0]?.icon,
      });
    });

    return newData;
  };

  const addStatement = () => {
    if (statement) {
      const newData = missionStatements;
      newData.push({
        id: `NEW_${Math.random()}`,
        statement: statement,
      });

      setMissionStatements(newData);
      setStatement("");
    }
  };

  const updateStatement = (value, fetchId) => {
    const newData = missionStatements.map((data) => {
      if (data.id === fetchId) {
        return {
          ...data,
          statement: value,
        };
      } else {
        return data;
      }
    });

    setMissionStatements(newData);
  };

  const removeStatement = async (removeId) => {
    const findLocalId = missionStatements.filter((data) => data.id === removeId);

    if (findLocalId && findLocalId[0].id.includes("NEW_")) {
      const newData = missionStatements.filter((data) => data.id !== removeId);
      setMissionStatements(newData);
    } else {
      const response = await Organisationapi().deleteMissionStatement(removeId, organisationId);

      if (response.data) {
        const newData = missionStatements.filter((data) => data.id !== removeId);
        setMissionStatements(newData);
      }
    }
  };

  return (
    <div className="Purposepage">
       <div className="row">
        <p className="formInfo pl-3">
        Tell us about your organization’s sector, mission and purpose
        </p>
      </div>
      <div className="row">
        <div className="col-md-7 ">
          
          <Collapse
            defaultActiveKey={["1"]}
            className="formStyles"
            expandIconPosition={"right"}
            expandIcon={({ isActive }) =>
              isActive ? <img src={upperArrow} alt={""} /> : <img src={downArrow} alt={""} />
            }
          >
            <p className="missionheading">Sector</p>

            <Panel header="Primary Sector" key="1" className="purpan1 sectionPanel">
              <p className="seconddescription">Click to select <b>one</b> Primary Sector</p>
              {primarySectorType ? (
                <div className="row mb-3 empty_row">
                  <div className="fill_row_div">
                    <div>
                      <img
                        src={sectorTypeData.filter((optionData) => optionData.id === primarySectorType)[0]?.icon}
                        alt=""
                        className="radioimage"
                      />
                      {sectorTypeData.filter((data) => data.id === primarySectorType)[0]?.value}
                    </div>
                    <img className="remove_div" src={removeIcon} alt="" onClick={() => setPrimarySectorType(null)} />
                  </div>
                </div>
              ) : (
                <div className="row mb-3 empty_row">
                  <div className="empty_row_div" />
                </div>
              )}

              <div className="row">
                <div className="col-md-12 mb-3">
                  <AutoComplete
                    placeholder="Choose Primary Sector"
                    dropdownClassName="certain-category-search-dropdown"
                    dropdownMatchSelectWidth={500}
                    style={{
                      width: "100%",
                    }}
                    options={renderOptions(1)}
                    onSelect={(value) => {
                      setPrimarySearchSector("");
                      setPrimarySectorType(sectorTypeData.filter((data) => data.value === value)[0].id);
                    }}
                    onSearch={(e) => setPrimarySearchSector(e)}
                    value={searchPrimarySector}
                    onCopy={(e) => preventCopyPaste(e)}
                    
                    onCut={(e) => preventCopyPaste(e)}
                  />
                </div>
              </div>
            </Panel>
            <br />

            <Panel header="Secondary Sectors" className="purpan1 sectionPanel">
              <p className="seconddescription">Click to select <b>two</b> secondary sectors</p>

              <div className="row mb-3 empty_row">
                {secondarySectorType.length > 0 ? (
                  secondarySectorType.map((data, index) => (
                    <>
                      <div className="fill_row_div">
                        <div>
                          <img
                            src={sectorTypeData.filter((optionData) => optionData.id === data)[0]?.icon}
                            alt=""
                            className="radioimage"
                          />
                          {sectorTypeData.filter((sdata) => sdata.id === data)[0]?.value}
                        </div>
                        <img
                          className="remove_div"
                          src={removeIcon}
                          alt=""
                          onClick={() =>
                            setSecondarySectorType(
                              secondarySectorType.filter((secondaryData) => secondaryData !== data)
                            )
                          }
                        />
                      </div>
                    </>
                  ))
                ) : (
                  <>
                    <div className="empty_row_div" />
                    <div className="empty_row_div" />
                  </>
                )}

                {secondarySectorType.length === 1 && <div className="empty_row_div" />}
              </div>

              <div className="row">
                <div className="col-md-12 mb-3">
                  <AutoComplete
                    placeholder="Choose Secondary Sector"
                    dropdownClassName="certain-category-search-dropdown"
                    dropdownMatchSelectWidth={500}
                    style={{
                      width: "100%",
                    }}
                    options={renderOptions(2)}
                    onSelect={(value) => {
                      setSecondarySearchSector("");
                      changeSecondarySectorType(value);
                    }}
                    onSearch={(e) => setSecondarySearchSector(e)}
                    value={searchSecondarySector}
                    onCopy={(e) => preventCopyPaste(e)}
                    
                    onCut={(e) => preventCopyPaste(e)}
                  />
                </div>
              </div>
            </Panel>
            <p className="missionheading mt-5">Mission Statement</p>
            <div className="timeline_data">
              <Timeline>
                {missionStatements.map((statementData, index) => (
                  <Timeline.Item>
                    <div
                      className="row"
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "1rem",
                      }}
                      key={index}
                    >
                      <div className="col-sm-11">
                        <div key={"1"}>
                          <Input
                            className="form-control"
                            name="update_statement"
                            id="update_statement"
                            placeholder="Mission Statement"
                            value={statementData.statement}
                            onChange={(e) => updateStatement(e.target.value, statementData.id)}
                            onCopy={(e) => preventCopyPaste(e)}
                            
                            onCut={(e) => preventCopyPaste(e)}
                          />
                        </div>
                      </div>
                      <div className="col-sm-1" style={{ paddingLeft: "0rem" }}>
                        <MinusOutlined onClick={() => removeStatement(statementData.id)} />
                      </div>
                    </div>
                  </Timeline.Item>
                ))}
                <Timeline.Item>
                  <div className="row" style={{ justifyContent: "center", alignItems: "center" }}>
                    <div className="col-sm-12">
                      <div key={"1"}>
                        <Input
                          className="form-control"
                          name="statement"
                          id="statement"
                          placeholder="Mission Statement"
                          value={statement}
                          onChange={(e) => setStatement(e.target.value)}
                          onCopy={(e) => preventCopyPaste(e)}
                          
                          onCut={(e) => preventCopyPaste(e)}
                        />
                      </div>
                    </div>
                  </div>
                </Timeline.Item>
                <Timeline.Item>
                  <div className="row formStyles">
                    <div className=" col-md-12 formStyles">
                      <Button
                        type="dashed"
                        block
                        className="addcontent missstate"
                        icon={<PlusOutlined />}
                        onClick={() => addStatement()}
                        disabled={!statement}
                      >
                        Add another mission statement
                      </Button>
                    </div>
                  </div>
                </Timeline.Item>
              </Timeline>
            </div>
            <br />
            <p className="missionheading">About</p>
            <div className="row">
              <div className="col-sm-12">
                <textarea
                  type="textarea"
                  className="form-control"
                  name="about"
                  id="about"
                  placeholder="About the Organisation"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  onCopy={(e) => preventCopyPaste(e)}
                  // pattern="[A-Za-z]"
                  onCut={(e) => preventCopyPaste(e)}
                />
              </div>
            </div>
          </Collapse>
          <div style={{display: 'flex',justifyContent: 'flex-end',alignItems: 'center'}}>
            <div className="previous">
              <Button
                className="ant-btn-back"
                // style={{ margin: "0 8px" }}
                onClick={() => backClick()}
              >
                <FontAwesomeIcon icon={faAngleLeft} />
                &nbsp; Previous Step
              </Button>
            </div>
            <div>
              <Button onClick={() => saveBeneficiary()} className="steps-action formStyles nextbutton">
                NEXT: TRACK RECORD
              </Button>
            </div>
          </div>
          
        </div>
        <div className="col-md-3">
          <img src={purpose} alt="" className="leadership-image" />
        </div>
      </div>
    </div>
  );
};

export default Purpose;
