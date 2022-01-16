import React, {useState} from 'react';
import {Typography, Radio, Divider, Checkbox, Input, Button} from "antd";
import {PlusOutlined} from '@ant-design/icons';
import './filterModal.scss';
import {preventCopyPaste} from "../../../../utils/utils";

const {Text} = Typography;

const options = ['District', 'Taluka', 'City'];

const FilterModal = ({onClose, onSubmit, filters}) => {

  const [gender, setGender] = useState(filters.gender);
  const [locations, setLocations] = useState(filters.locations);
  const [locationLabel, setLocationLabel] = useState(filters.locationLabel);
  const [occupation, setOccupation] = useState(filters.occupation);
  const [verification, setVerification] = useState(filters.verification);

  const onChange = e => {
    setGender(e.target.value);
  };

  const onSubmitHandler = () => {
    onSubmit({
      gender, locations, locationLabel, occupation, verification
    });
  };

  return (
    <div className={'p-3 mt-2 filterModalContainer'} style={{}}>
      <div className={'mb-3 filterModalHeading'}>
        <Text style={{color: '#808080'}}>FILTERS:</Text>
        <PlusOutlined rotate={45} style={{fontSize: '1.5rem'}} onClick={onClose}/>
      </div>
      <div className={'my-2 filterModalContent'}>
        <Text className={'font-weight-bold filterLabel'}>Gender</Text>
        <Radio.Group onChange={onChange} value={gender} className={'mt-2'}>
          <Radio value={'male'}>Male</Radio>
          <Radio value={'female'}>Female</Radio>
          <Radio value={'other'}>Other</Radio>
        </Radio.Group>
        <Divider className={'m-0 my-3'} style={{background: '#f3f3f3'}}/>
        <Text className={'font-weight-bold filterLabel'}>Location</Text>
        <Checkbox.Group options={options} value={locations} onChange={setLocations} className={'mt-2'}/>
        <Input
          placeholder={'Input Field Label'}
          className={'mt-3 filterLocation'}
          style={{borderRadius: 8}}
          value={locationLabel}
          onChange={(e) => setLocationLabel(e.target.value)}
          onCopy={(e) => preventCopyPaste(e)}

          onCut={(e) => preventCopyPaste(e)}
        />
        <Divider className={'m-0 my-3'} style={{background: '#f3f3f3'}}/>
        <Text className={'font-weight-bold filterLabel'}>Occupation</Text>
        <Radio.Group
          onChange={(e) => setOccupation(e.target.value)}
          value={occupation}
          className={'mt-2'}
          style={{display: 'flex', flexWrap: 'wrap'}}
        >
          <Radio value={'farmer'}>Farmer</Radio>
          <Radio value={'store_owner'}>Store Owner</Radio>
          <Radio value={'gardener'}>Gardener</Radio>
          <Radio value={'worker'}>Domestic Worker</Radio>
          <Radio value={'teacher'}>School Teacher</Radio>
        </Radio.Group>
        <Divider className={'m-0 my-3'} style={{background: '#f3f3f3'}}/>
        <Text className={'font-weight-bold filterLabel'}>Verification Status</Text>
        <Radio.Group onChange={(e) => setVerification(e.target.value)} value={verification} className={'mt-2'}>
          <Radio value={'verified'}>Verified</Radio>
          <Radio value={'unverified'}>Unverified</Radio>
        </Radio.Group>
        <Button className={'my-3 px-5 py-3 filterApplyButton'} onClick={onSubmitHandler}>APPLY</Button>
      </div>
    </div>
  );
};

export default FilterModal;