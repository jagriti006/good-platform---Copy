import React, {useState} from 'react';
import { Field, Form, Formik } from "formik";
import SelectBox from "../FormikComponents/SelectBox/SelectBox";
import { useSelector } from 'react-redux';
import { Button, Typography, Table } from 'antd';
import DatePicker from './../FormikComponents/Date/Date';
import moment  from 'moment';
import { Popover } from 'antd';
import {
    EllipsisOutlined
  } from "@ant-design/icons";
import CsvDownload from 'react-json-to-csv';
import beneficiaryAPI from '../../api/beneficiaryAPI';

const { Title } = Typography;
const { Column } = Table;

const DailyReport = () => {
    const [data, setData] = useState([]);
    const userDetails = useSelector((state) => state.user.userDetails);
    const orgId = sessionStorage.getItem("organisationId");
    const projects = userDetails.projects;

    const renderProjects = () => {
        const project = [];
    
        projects && projects.map((data) => {
          project.push({
            label: data.project,
            value: data.id
          });
        });
    
        return project;
      };

      const columns = [
        {
          title: "Agent Name",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "Email Id",
          dataIndex: "email",
          key: "email",
        },
        {
          title: "Benefeciary Count",
          dataIndex: "count",
          key: "count",
        },
        {
          title: "Date",
          dataIndex: "date",
          key: "date",
        },
      ];
      
    return (
        <div style={{backgroundColor: "#fff"}}>
            <div className="row mt-2">
                <div className="col ml-4">
                <Title level={2}>Daily Report</Title>
                </div>
            </div>
            <Formik
          initialValues={{
            projectId: "",
            date: null,
          }}
          onSubmit={async (values) => {
            const newValues = { ...values, projectId: [values.projectId], date: moment(values.date).format("YYYY-MM-DD") };
            const res = await beneficiaryAPI().getAgentBeneficiaries(orgId, newValues.projectId, newValues.date);
            if (res && res.data) {
              const data = res.data?.map(agent => {
                return {
                  name: `${agent.firstName} ${agent.lastName ? agent.lastName : ""}`,
                  email: agent.email,
                  count: agent.beneficiaryCount,
                  date: agent.date
                };
              });
              setData(data);
            }
          }}
        >
          {({ values, touched, errors, setFieldValue }) => {
            return (
              <Form>
                <div className="row px-5">
                <div className="col">
                <Field
                      name="projectId"
                      component={SelectBox}
                      placeholder="Program"
                      options={renderProjects()}
                    />
                </div>
                <div className="col">
                <Field
                        name="date"
                        component={DatePicker}
                        placeholder="Date"
                        format="DD-MM-YYYY"
                        disabledDate={(d) => !d || d.isAfter(new Date())}
                        errortext={touched.dob ? errors.dob : ""}
                      />
                </div>
                <div className="col px-5 d-flex justify-content-center">
                <Button key="back" htmlType="submit" type="primary">
                      Submit
                    </Button>
                </div>
                </div>
              </Form>
            );
          }}
        </Formik>
        <div className="row flex-column px-5">
            <div className="col">
                <div style={{backgroundColor: "#f4f8f8"}} className="p-2 my-3 rounded">
                    <div className="d-flex justify-content-end" style={{right: 0}}>
                    <Popover
                    content={<CsvDownload filename="daily-report.csv" data={data} style={{backgroundColor: "none",
                    borderRadius:"6px",
                    border:"none",
                    fontSize:"15px",
                    padding:"6px 24px",
                    }}>Export CSV</CsvDownload>}
                    trigger="click"
                    placement={"bottomRight"}
                >
                <EllipsisOutlined
                  style={{ fontSize: "2rem", color: "#39364f" }}
                />
              </Popover>
                    </div>
                </div>
            </div>
            <div className="col">
            <Table dataSource={data}>
              <Column
                title={columns[0].title}
                dataIndex={columns[0].dataIndex}
                key={columns[0].key}
              />
              <Column
                title={columns[1].title}
                dataIndex={columns[1].dataIndex}
                key={columns[1].key}
              />
              <Column
                title={columns[2].title}
                dataIndex={columns[2].dataIndex}
                key={columns[2].key}
              />
              <Column
                title={columns[3].title}
                dataIndex={columns[3].dataIndex}
                key={columns[3].key}
              />
            </Table>
            </div>
        </div>
        </div>
    );
};

export default DailyReport;
