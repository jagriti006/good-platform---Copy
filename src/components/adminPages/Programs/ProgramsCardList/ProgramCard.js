import {DotChartOutlined, DownOutlined, ProjectFilled, RightOutlined} from "@ant-design/icons";
import {Button, Col, Row, Progress, Table} from "antd";
import Avatar from "antd/lib/avatar/avatar";
import Text from "antd/lib/typography/Text";
import React from "react";
import {PROGRAM_STATUS} from "../../../../constants/strings";
import forwardIcon from "../../../../assets/images/preview/vector.png";
import Energy from "../../../../assets/images/Energy.png";
import Registration from "../../../../assets/images/Registration.png";
import {useHistory} from "react-router-dom";

const { Column } = Table;

const columns = [
  {
    title: "",
    dataIndex: "key",
    key: "key",
  },
  {
    title: "NAME",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "IMPLEMENTATION PARTNERS",
    dataIndex: "organisationName",
    key: "organisationName",
  },
  {
    title: "PROGRESS",
    dataIndex: "progress",
    key: "progress",
  },
  {
    title: "DATE CREATED",
    dataIndex: "createdOn",
    key: "createdOn",
    sorter: {
      compare: (a, b) => a.date - b.date,
    },
  },
  {
    title: "MILESTONES",
    dataIndex: "milestones",
    key: "milestones",
  },
  {
    title: "",
    dataIndex: "option",
    key: "option",
  },
  {
    title: "",
    dataIndex: "action",
    key: "action",
  },
];

// const programCard = ({program, categories, description, status, logoUrl, percentage, createdOn, onProgramClick}) => (
const ProgramCard = (props) => {
  const history = useHistory();
  const data = props.data;

  return (
    <Col span={24} className={"mt-2"}>
      <Table dataSource={data} className={"beneficieryTable"} onRow={(record, recordIndex) => {
        return {
          onClick: () => {
            history.push({
              pathname: `/program-creation/preview-project/${record.id}`,
              state: {
                tabIndex: 1
              }
            });
          }
        }
      }}>
        <Column
          title={columns[1].title}
          dataIndex={columns[1].dataIndex}
          key={columns[1].key}
          sorter={{compare: (a, b) => a.name - b.name}}
        />
        <Column
          title={columns[2].title}
          dataIndex={columns[2].dataIndex}
          key={columns[2].key}
          sorter={{compare: (a, b) => a.organisationName - b.organisationName}}
        />
        {/*<Column*/}
        {/*  title={columns[3].title}*/}
        {/*  dataIndex={columns[3].dataIndex}*/}
        {/*  key={columns[3].key}*/}
        {/*  render={(text, row, index) => {*/}
        {/*    return (*/}
        {/*      <div className="col">*/}
        {/*        <div className="row flex-column">*/}
        {/*          <div className="col">{text ? text : 0}% Completed</div>*/}
        {/*          <div className="col pr-5">*/}
        {/*            <Progress strokeColor="#3A8D9D" strokeWidth={8} percent={text ? text : 0} size="small" showInfo={false} />*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*    );*/}
        {/*  }}*/}
        {/*/>*/}
        <Column
          title={columns[4].title}
          dataIndex={columns[4].dataIndex}
          key={columns[4].key}
          sorter={{compare: (a, b) => a.dateAdded - b.dateAdded}}
        />
        {/*<Column*/}
        {/*  title={columns[5].title}*/}
        {/*  dataIndex={columns[5].dataIndex}*/}
        {/*  key={columns[5].key}*/}
        {/*/>*/}
        {/*<Column*/}
        {/*  title={columns[6].title}*/}
        {/*  dataIndex={columns[6].dataIndex}*/}
        {/*  key={columns[6].key}*/}
        {/*  render={(text, record) => {*/}
        {/*    return (*/}
        {/*      <p style={{*/}
        {/*        background: text === 'Set up Tasks' ? '#ffeeb5' : '#ffe0e0',*/}
        {/*        display: 'flex',*/}
        {/*        justifyContent: 'center',*/}
        {/*        alignItems: 'center',*/}
        {/*        padding: '0.5rem 1rem',*/}
        {/*        borderRadius: '5px',*/}
        {/*        width: 'fit-content'*/}
        {/*      }}>*/}
        {/*        <span><img src={text === 'Set up Tasks' ? Energy : Registration} alt={""}/></span>*/}
        {/*        {text}*/}
        {/*      </p>*/}
        {/*    );*/}
        {/*  }}*/}
        {/*/>*/}
        <Column
          title={columns[7].title}
          dataIndex={columns[7].dataIndex}
          key={columns[7].key}
          render={(text, record) => <RightOutlined/>}
        />
      </Table>
    </Col>
  );
}
export default ProgramCard;
