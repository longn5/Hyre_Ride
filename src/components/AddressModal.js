import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import DatePicker from 'react-simple-datepicker';
import 'react-simple-datepicker/dist/index.css';
import { Link} from 'react-router-dom';
import './Address.css';
import Stripe from './Stripe';

const Hours = [8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7];
const TimesAM = Hours.map(value => `${value}:00AM`);
const TimesPM = Hours.map(value => `${value}:00PM`);
const AllTimes = TimesAM.concat(TimesPM);

const AddressDateTimePicker = () => {
  return (
    <div className="addressDatePicker">
      <span style={{color: 'white', marginTop: '8px'}}>
        Select Pickup Date:
      </span>
      <DatePicker date={new Date()} />
      <span style={{color: 'white', marginLeft: '10px', marginTop: '8px'}}>
      Select Pickup Time:
      </span>
      <span style={{marginLeft: '10px', marginTop: '8px'}}>
        <select value="8:00am" onChange={Function.prototype}>
          {AllTimes.map(value => (
            <option key={value} value={value}>{value}</option>)
          )}
        </select>
      </span>
    </div>
  );
};

class AddressModal extends React.Component {
  state = {
    address: '',
    city: '',
    zip: '',
    number: '',
    state: 'OR',
    time: '',
    costs: false,
    states: [
      {value: 'OR', display: 'Oregon'},
      {value: 'WA', display: 'Washington'},
      {value: 'NV', display: 'Nevada'},
      {value: 'CA', display: 'California'}
    ]
  }

  onSelectChange = (event) => {
    this.setState({
      state: event.target.value
    });
  }

  saveInfo = () => {
    const data = {
      address: this.state.address,
      city: this.state.city,
      zip: this.state.zip,
      number: this.state.number,
      state: this.state.state
    };

    if (data.address) {
      this.props.onSave(data);
    }
  }


  render() {
    return (
      <div className="addressmodal-container">
        <div className="addressmodal">
          {this.state.costs &&
          <div className="totals">
            <div style={{color: 'white'}}>Drive Time: $99.00</div>
            <div style={{color: 'white'}}>Idle Time: $30.00</div>
            <div style={{color: 'white'}}>Total: $129.00</div>
            <div style={{marginTop: '10px'}}><Stripe close={this.props.close}/></div>
          </div>
        }
          <div className="visitlocations">
            <span style={{paddingRight: '10px'}}>You will visit:</span>
            <span style={{paddingRight: '10px'}}>Winery1,</span><span style={{paddingRight: '10px'}}>Winery2</span>
          </div>
          <div style={{color: 'white'}}>Pickup Address:</div>
          <AddressDateTimePicker />
          <div className="addressmodalContent">
            <div className="addressBottomMargin">
              <span className="addressLeftPadding">
                Address:
              </span>
              <span>
                <input
                  value={this.state.address}
                  onChange={event => this.setState({address: event.target.value})} />
              </span>
            </div>
            <div className="addressBottomMargin">
              <span className="addressLeftPadding">State:</span>
              <span className="addressLeftPadding" >
                <select value={this.state.state} onChange={this.onSelectChange}>
                  {this.state.states.map(state => (
                    <option key={state.value} value={state.value}>{state.display}</option>)
                  )}
                </select>
              </span>
              <span className="addressLeftPadding">City:</span>
              <span className="addressLeftPadding">
                <input
                  value={this.state.city}
                  onChange={event => this.setState({city: event.target.value})} />
              </span>
            </div>
            <div className="addressBottomMargin">
              <span className="addressLeftPadding">Zip Code:</span>
              <span className="addressLeftPadding">
                <input
                  value={this.state.zip}
                  maxLength="5"
                  onChange={event => this.setState({zip: event.target.value})} />
              </span>
                <span>
                  <span className="addressLeftPadding" >Phone Number:</span>
                  <span>
                    <input
                      value={this.state.number}
                      maxLength="10"
                      onChange={event => this.setState({number: event.target.value})} />
                  </span>
                </span>
            </div>
          </div>
          <div style={{color: 'white', marginTop: '30px', marginBottom: '10px'}}>Dropoff Address:</div>
          <div className="addressmodalContent">
            <div className="addressBottomMargin">
              <span className="addressLeftPadding">
                Address:
              </span>
              <span>
                <input
                  value={this.state.address}
                  onChange={event => this.setState({address: event.target.value})} />
              </span>
            </div>
            <div className="addressBottomMargin">
              <span className="addressLeftPadding">State:</span>
              <span className="addressLeftPadding" >
                <select value={this.state.state} onChange={this.onSelectChange}>
                  {this.state.states.map(state => (
                    <option key={state.value} value={state.value}>{state.display}</option>)
                  )}
                </select>
              </span>
              <span className="addressLeftPadding">City:</span>
              <span className="addressLeftPadding">
                <input
                  value={this.state.city}
                  onChange={event => this.setState({city: event.target.value})} />
              </span>
            </div>
            <div className="addressBottomMargin">
              <span className="addressLeftPadding">Zip Code:</span>
              <span className="addressLeftPadding">
                <input
                  value={this.state.zip}
                  maxLength="5"
                  onChange={event => this.setState({zip: event.target.value})} />
              </span>
            </div>
          </div>
          <div>
            <div className="address-buttons">
              <span onClick={this.props.close} className="address-button" >Cancel</span>
              <span style={{marginRight: '10px'}} onClick={() => this.setState({costs: true})} className="address-button" >Calculate Costs</span>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default AddressModal;
