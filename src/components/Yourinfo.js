import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Yourinfo.css';
import * as passengerInfoActionCreator from '../actions/passengerInfo';

const Hours = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const TimesAM = Hours.map(value => `${value}:00AM`);
const TimesPM = Hours.map(value => `${value}:00PM`);
const AllTimes = TimesPM.concat(TimesAM);

const InputField = ({label, value, saveState, id}) => {
  return (
    <div style={{marginBottom: '5px'}}>
      <span style={{marginRight: '5px'}}>
        {label}:
      </span>
      <span>
        <input
          type="text"
          style={{width: '150px'}}
          value={value}
          onChange={event => saveState({id, value: event.target.value})} />
      </span>
    </div>
  );
};


class Yourinfo extends React.Component {

  onSelectChange = (event) => {
    this.setState({
      state: event.target.value
    });
  }

  onDateChange = (value) => {
    this.props.passgerInfoActions.savePassengerInfo({id: 'pDate', value});
  }

  onTimeChange = (value) => {
    this.props.passgerInfoActions.savePassengerInfo({id: 'pTime', value});
  }

  render() {
    const {firstName, lastName, email, phoneNumber, pDate,
      pTime, pAddress, pState, pCity, pZip, dAddress, dState,
      dCity, dZip} = this.props.passengerInfo;
    const {savePassengerInfo} = this.props.passgerInfoActions;
    console.log(this.props)
    return (
      <div className="yourinfo-container">
        <div className="yourinfo">
          <div className="flex">
            <div className="box-border" style={{marginBottom: '10px'}}>
              <div style={{marginBottom: '5px'}}>Your Information:</div>
              <InputField label={'First Name'} id="firstName" value={firstName} saveState={savePassengerInfo} />
              <InputField label={'Last Name'} id="lastName" value={lastName} saveState={savePassengerInfo} />
              <InputField label={'Email'} id="email" value={email} saveState={savePassengerInfo} />
              <InputField label={'Phone Number'} id="phoneNumber" value={phoneNumber} saveState={savePassengerInfo} />
            </div>
            <div className="box-border" style={{marginBottom: '10px', marginLeft: '10px'}}>
              <div style={{marginBottom: '5px'}}>Date/Time:</div>
              <div style={{marginBottom: '8px'}}>
                <span style={{marginTop: '8px'}}>
                  Select Pickup Date:
                </span>
                <span style={{marginTop: '8px', marginLeft: '10px'}}>
                  <DatePicker selected={pDate} onChange={this.onDateChange} />
                </span>
              </div>
              <div>
                <span style={{marginTop: '8px'}}>
                  Select Pickup Time:
                </span>
                <span style={{marginLeft: '10px', marginTop: '8px'}}>
                  <select value={pTime} onChange={this.onTimeChange}>
                    {AllTimes.map(value => (
                      <option key={value} value={value}>{value}</option>)
                    )}
                  </select>
                </span>
              </div>
            </div>
          </div>

          <div className="flex">
            <div className="box-border" style={{marginBottom: '10x', marginRight: '10px', width: '280px'}}>
              <div style={{marginBottom: '5px'}}>Pickup Address</div>
              <InputField label={'Address'} id="pAddress" value={pAddress} saveState={savePassengerInfo} />
              <InputField label={'City'} id="pCity" value={pCity} saveState={savePassengerInfo} />
              <div>State: {pState}</div>
              <InputField label={'Zip'} id="pZip" value={pZip} saveState={savePassengerInfo} />
            </div>
            <div className="box-border" style={{marginBottom: '10x', marginRight: '10px', width: '280px'}}>
              <div style={{marginBottom: '5px'}}>Dropoff Address</div>
              <InputField label={'Address'} id="dAddress" value={dAddress} saveState={savePassengerInfo} />
              <InputField label={'City'} id="dCity" value={dCity} saveState={savePassengerInfo} />
              <div>State: {dState}</div>
              <InputField label={'Zip'} id="dZip" value={dZip} saveState={savePassengerInfo} />
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
