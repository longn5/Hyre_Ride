import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { withRouter} from 'react-router-dom';
import './Address.css';
import Stripe from './Stripe';

const Hours = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const TimesAM = Hours.map(value => `${value}:00AM`);
const TimesPM = Hours.map(value => `${value}:00PM`);
const AllTimes = TimesPM.concat(TimesAM);

const StartDate = moment().add(24, 'hours');

const ListVisitingLocations = ({locations}) => {
  let locationsInfo = [];
  for (let i in locations) {
    locationsInfo.push(
    <li className="locationName" key={i}>
      <div>
         <span>At,&nbsp;&nbsp;</span>
         <a href="www.google.com">{i}</a>
           <span>&nbsp; you will spend&nbsp;</span>
           <span>{locations[i]}&nbsp;{locations[i] == 1 ? 'hour' : 'hours'}.</span>
      </div>
    </li>
  )
  }
  return <ul>{locationsInfo}</ul>
}

class AddressModal extends React.Component {
  state = {
    date: StartDate,
    number: '',
    time: '12pm',
    paddress: '',
    pcity: '',
    pzip: '',
    pstate: 'OR',
    daddress: '',
    dcity: '',
    dzip: '',
    dstate: 'OR',
    costs: false,
    validate: true,
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
    var directionsService = new window.google.maps.DirectionsService();

const googleMapTest = {
  origin: '5671 SW remington Dr, Beaverton, OR, 97007',
  destination: '5671 SW remington Dr, Beaverton, OR, 97007',
  waypoints: [
    {
      location: '35040 Southwest Unger Road, Cornelius, OR 97113',
      stopover: true
    }
  ],
  provideRouteAlternatives: false,
  travelMode: 'DRIVING',
  optimizeWaypoints: true,
  drivingOptions: {
    departureTime: new Date(),
    trafficModel: 'pessimistic'
  }
};

directionsService.route(googleMapTest, function(result, status) {
  if (status === 'OK') {
    console.log(result);
  }
});

  }

  onDateChange = (value) => {
    this.setState({date: value});
  }

  render() {
    console.log(this.state.date);
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
            {!this.state.validate && <div style={{color: 'red'}}>*Please fill out all the fields to calculate costs</div>}
            <span style={{paddingRight: '10px'}}>You will be visiting the following locations:</span>
            <ListVisitingLocations locations={this.props.visitinglocations} />
          </div>
          <div style={{color: 'white'}}>Pickup Address:</div>
            <div className="addressDatePicker">
              <span style={{color: 'white', marginTop: '8px'}}>
                Select Pickup Date:
              </span>
              <span style={{color: 'white', marginTop: '8px', marginLeft: '8px'}}>
              <DatePicker selected={this.state.date} onChange={this.onDateChange} />
              </span>
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
            <div className="addressmodalContent">
            <div className="addressBottomMargin">
              <span className="addressLeftPadding">
                Address:
              </span>
              <span>
                <input
                  value={this.state.paddress}
                  onChange={event => this.setState({paddress: event.target.value})} />
              </span>
            </div>
            <div className="addressBottomMargin">
              <span className="addressLeftPadding">State:</span>
              <span className="addressLeftPadding" >
                <select value={this.state.pstate} onChange={this.onSelectChange}>
                  {this.state.states.map(state => (
                    <option key={state.value} value={state.value}>{state.display}</option>)
                  )}
                </select>
              </span>
              <span className="addressLeftPadding">City:</span>
              <span className="addressLeftPadding">
                <input
                  value={this.state.pcity}
                  onChange={event => this.setState({pcity: event.target.value})} />
              </span>
            </div>
            <div className="addressBottomMargin">
              <span className="addressLeftPadding">Zip Code:</span>
              <span className="addressLeftPadding">
                <input
                  value={this.state.pzip}
                  maxLength="5"
                  onChange={event => this.setState({pzip: event.target.value})} />
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
                  value={this.state.daddress}
                  onChange={event => this.setState({daddress: event.target.value})} />
              </span>
            </div>
            <div className="addressBottomMargin">
              <span className="addressLeftPadding">State:</span>
              <span className="addressLeftPadding" >
                <select value={this.state.dstate} onChange={this.onSelectChange}>
                  {this.state.states.map(state => (
                    <option key={state.value} value={state.value}>{state.display}</option>)
                  )}
                </select>
              </span>
              <span className="addressLeftPadding">City:</span>
              <span className="addressLeftPadding">
                <input
                  value={this.state.dcity}
                  onChange={event => this.setState({dcity: event.target.value})} />
              </span>
            </div>
            <div className="addressBottomMargin">
              <span className="addressLeftPadding">Zip Code:</span>
              <span className="addressLeftPadding">
                <input
                  value={this.state.dzip}
                  maxLength="5"
                  onChange={event => this.setState({dzip: event.target.value})} />
              </span>
            </div>
          </div>
          <div>
            <div className="address-buttons">
              <span onClick={this.props.close} className="address-button" >Cancel</span>
              <span style={{marginRight: '10px'}} onClick={this.saveInfo} className="address-button" >Calculate Costs</span>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default withRouter(AddressModal);
