import React from 'react';
import {Typography, Divider} from "antd";
import {PlusOutlined} from '@ant-design/icons';
import './filterActions.scss';

const {Text} = Typography;

const FilterActions = ({onClose}) => {
  return (
    <div className={'p-2 filterActionContainer'} style={{}}>
      <div className={'mb-3 filterActionHeading'}>
        <Text style={{color: '#808080'}}>MORE ACTIONS:</Text>
        <PlusOutlined rotate={45} style={{fontSize: '1.5rem'}} onClick={onClose}/>
      </div>
      <div className={'actionItem'}>Import CSV</div>
      <Divider className={'m-0 my-2'} style={{ background: '#c0bfbf' }}/>
      <div className={'actionItem'}>Export CSV</div>
      <Divider className={'m-0 my-2'} style={{ background: '#c0bfbf' }}/>
      <div className={'actionItem'}>Refresh</div>
    </div>
  );
};

export default FilterActions;