import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import DateTime from 'react-datetime';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css';
import './Yourinfo.css';
import * as passengerInfoActionCreator from '../actions/passengerInfo';

const InputField = ({label, value, saveState, id, readOnly, placeholder}) => {
  return (
    <div style={{marginBottom: '10px'}}>
      <div style={{marginRight: '20px', fontSize: '18px'}}>
        {label}:
      </div>
      <div>
        <input
          className="yourinfo-input"
          type="text"
          readOnly={readOnly || false}
          placeholder={placeholder}
          value={value}
          onChange={event => saveState({id, value: event.target.value})} />
      </div>
    </div>
  );
};

const today = moment();
const valid = (current) => {
  return current.isAfter(today);
};

class Yourinfo extends React.Component {

  state = {
    openDatePicker: false
  }

  onSelectChange = (event) => {
    this.setState({
      state: event.target.value
    });
  }

  onDateChange = (value) => {
    this.props.passgerInfoActions.savePassengerInfo({id: 'pDateTime', value});
  }

  render() {
    const {firstName, lastName, email, phoneNumber, pDateTime,
       pAddress, pCity, pZip, dAddress,
      dCity, dZip} = this.props.passengerInfo;
    const {savePassengerInfo} = this.props.passgerInfoActions;
    return (
      <div className="yourinfo-container">
        <div className="yourinfo">
          <div className="flex">
            <div className="yourinfo-margin-right">
              <div style={{marginBottom: '5px', fontSize: '22px'}}>Your Information:</div>
                <div className="box-border">

              <InputField label={'First Name'} id="firstName" value={firstName} saveState={savePassengerInfo} />
              <InputField label={'Last Name'} id="lastName" value={lastName} saveState={savePassengerInfo} />
              <InputField label={'Email'} id="email" value={email} saveState={savePassengerInfo} />
              <InputField label={'Phone Number'} id="phoneNumber" value={phoneNumber} saveState={savePassengerInfo} />
              </div>
            </div>
            <div >
              <div style={{marginBottom: '5px', fontSize: '22px'}}>Select Date And Time:</div>
              <div className="box-border">
                <div className="date-time-picker">
                  <div style={{fontSize: '18px', marginBottom: '10px'}}>
                    Selected: {pDateTime.format('dddd, MMMM, h:mm a')}
                  </div>
                  <DateTime
                    input={false}
                    value={pDateTime}
                    isValidDate={valid}
                    onChange={this.onDateChange} />

                </div>

              </div>
            </div>
            </div>
            <div className="flex">
              <div>
                <div style={{marginBottom: '5px', fontSize: '22px'}}>Pickup Information:</div>
                <div className="box-border" style={{minHeight: '250px'}}>
                  <InputField label={'Address'} id="pAddress" value={pAddress} saveState={savePassengerInfo} />
                  <InputField label={'City'} id="pCity" value={pCity} saveState={savePassengerInfo} />
                  <InputField label={'State'} id="dCity" value={'OR'} readOnly saveState={savePassengerInfo} />
                  <InputField label={'Zip'} id="pZip" value={pZip} saveState={savePassengerInfo} />
                </div>
              </div>
              <div>
                <div style={{marginBottom: '5px', fontSize: '22px'}}>Dropoff Information:</div>
                <div className="box-border" style={{minHeight: '250px'}}>
                  <InputField label={'Address'} id="dAddress" value={dAddress} saveState={savePassengerInfo} />
                  <InputField label={'City'} id="dCity" value={dCity} saveState={savePassengerInfo} />
                  <InputField label={'State'} id="dCity" value={'OR'} readOnly saveState={savePassengerInfo} />
                  <InputField label={'Zip'} id="dZip" value={dZip} saveState={savePassengerInfo} />
                </div>
              </div>
            </div>
          </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    passengerInfo: state.passengerInfo.fields
  });
};

const mapDispatchToProps = dispatch => ({
  passgerInfoActions: bindActionCreators(passengerInfoActionCreator, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Yourinfo);
export {InputField}
