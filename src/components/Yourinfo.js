import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import './Yourinfo.css';

const Hours = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const TimesAM = Hours.map(value => `${value}:00AM`);
const TimesPM = Hours.map(value => `${value}:00PM`);
const AllTimes = TimesPM.concat(TimesAM);

const StartDate = moment().add(24, 'hours');

const ListVisitingLocations = ({locations}) => {
  let locationsInfo = [];
  for (let i in locations) {
    locationsInfo.push(
      <div key={i}>
         <span>At,&nbsp;&nbsp;{i}</span>
           <span>&nbsp; you will spend&nbsp;</span>
           <span>{locations[i]}&nbsp;{locations[i] == 1 ? 'hour' : 'hours'}.</span>
      </div>
  )
  }
  return (
    <div className="box-border" style={{marginBottom: '10px'}}>
      <div style={{marginBottom: '10px'}}>Locations You Are Visiting:</div>
      {locationsInfo}
    </div>
  );
};
// <Carousel showThumbs={false} >
//
//     <img
//       height={300}
//        src="http://wineryhunt.com/wp-content/uploads/2015/12/Wine_Vineyard-Large-File-1-1_2000x1000-2000x1200.jpg" />
// <img src="http://bendoregonstock.com/wp-content/uploads/edd/2015/07/Broken-Top-Trail-1560x1045.jpg" />
// </Carousel>
class Yourinfo extends React.Component {
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
      {value: 'OR', display: 'Oregon'}
    ]
  }

  onSelectChange = (event) => {
    this.setState({
      state: event.target.value
    });
  }

  saveInfo = () => {
    var directionsService = new window.google.maps.DirectionsService();

    // let datavalidation = true;
    // const data = {
    //   time: this.state.time,
    //   date: this.state.date,
    //   number: this.state.number,
    //   paddress: this.state.paddress,
    //   pcity: this.state.pcity,
    //   pzip: this.state.pzip,
    //   pstate: this.state.pstate,
    //   daddress: this.state.daddress,
    //   dcity: this.state.dcity,
    //   dzip: this.state.dzip,
    //   dstate: this.state.dstate
    // };
    // console.log(data);
    // for (const i in data) {
    //   if (!data[i]) {
    //     datavalidation = false;
    //   }
    // }
    // console.log(datavalidation);
    // if (datavalidation) {
    //   this.setState({
    //     validate: true
    //   });
    // } else {
    //   this.setState({
    //     validate: false
    //   });
    // }

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
    return (
      <div className="yourinfo-container">
        <div className="yourinfo">
          <div className="flex">
            <div className="box-border" style={{marginBottom: '10px'}}>
              <div style={{marginBottom: '5px'}}>Your Information:</div>
              <div style={{marginBottom: '5px'}}>
                <span style={{marginRight: '5px'}}>
                First Name:
                </span>
                <span>
                  <input
                    style={{width: '150px'}}
                    value={this.state.paddress}
                    onChange={event => this.setState({paddress: event.target.value})} />
                </span>
              </div>
              <div style={{marginBottom: '5px'}}>
                <span style={{marginRight: '5px'}}>
                Last Name:
                </span>
                <span>
                  <input
                    style={{width: '150px'}}
                    value={this.state.paddress}
                    onChange={event => this.setState({paddress: event.target.value})} />
                </span>
              </div>
              <div style={{marginBottom: '5px'}}>
                <span style={{marginRight: '5px'}}>
                Email:
                </span>
                <span>
                  <input
                    style={{width: '150px'}}
                    value={this.state.paddress}
                    onChange={event => this.setState({paddress: event.target.value})} />
                </span>
              </div>
              <div style={{marginBottom: '5px'}}>
                <span style={{marginRight: '5px'}}>
                Phone:
                </span>
                <span>
                  <input
                    style={{width: '80px'}}
                    maxLength={10}
                    value={this.state.paddress}
                    onChange={event => this.setState({paddress: event.target.value})} />
                </span>
              </div>
            </div>
            <div className="box-border" style={{marginBottom: '10px', marginLeft: '10px'}}>
              <div style={{marginBottom: '5px'}}>Date/Time:</div>
              <div style={{marginBottom: '8px'}}>
                <span style={{marginTop: '8px'}}>
                  Select Pickup Date:
                </span>
                <span style={{marginTop: '8px', marginLeft: '10px'}}>
                  <DatePicker selected={this.state.date} onChange={this.onDateChange} />
                </span>
              </div>
              <div>
                <span style={{marginTop: '8px'}}>
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
            </div>
          </div>

          <div className="flex">

            <div className="box-border" style={{marginBottom: '10x', marginRight: '10px'}}>
              <div style={{marginBottom: '5px'}}>Pickup Address</div>
              <div style={{marginBottom: '5px'}}>
                <span style={{marginRight: '5px'}}>
                  Address:
                </span>
                <span>
                  <input
                    value={this.state.paddress}
                    onChange={event => this.setState({paddress: event.target.value})} />
                </span>
              </div>
              <div style={{marginBottom: '5px'}}>
              <span style={{marginRight: '5px'}}>
                State:
              </span>
              <span>
                <select value={this.state.pstate} onChange={this.onSelectChange}>
                  {this.state.states.map(state => (
                    <option key={state.value} value={state.value}>{state.display}</option>)
                  )}
                </select>
              </span>
              </div>
              <div style={{marginBottom: '5px'}}>
                <span style={{marginRight: '5px'}}>
                City:
                </span>
                <span>
                  <input
                    style={{marginRight: '5px'}}
                    value={this.state.paddress}
                    onChange={event => this.setState({paddress: event.target.value})} />
                </span>
                <span style={{marginRight: '5px'}}>
                Zip:
                </span>
                <span>
                  <input
                    style={{width: '50px'}}
                    value={this.state.paddress}
                    onChange={event => this.setState({paddress: event.target.value})} />
                </span>
              </div>
            </div>

            <div className="box-border" style={{marginBottom: '10x', marginRight: '10px'}}>
              <div style={{marginBottom: '5px'}}>Dropoff Address</div>
              <div style={{marginBottom: '5px'}}>
                <span style={{marginRight: '5px'}}>
                  Address:
                </span>
                <span>
                  <input
                    value={this.state.paddress}
                    onChange={event => this.setState({paddress: event.target.value})} />
                </span>
              </div>
              <div style={{marginBottom: '5px'}}>
                <span style={{marginRight: '5px'}}>
                  State:
                </span>
                <span>
                <select value={this.state.pstate} onChange={this.onSelectChange}>
                  {this.state.states.map(state => (
                    <option key={state.value} value={state.value}>{state.display}</option>)
                  )}
                </select>
              </span>
              </div>
              <div style={{marginBottom: '5px'}}>
                <span style={{marginRight: '5px'}}>
                City:
                </span>
                <span>
                  <input
                    style={{marginRight: '5px'}}
                    value={this.state.paddress}
                    onChange={event => this.setState({paddress: event.target.value})} />
                </span>
                <span style={{marginRight: '5px'}}>
                Zip:
                </span>
                <span>
                  <input
                    style={{width: '50px'}}
                    value={this.state.paddress}
                    onChange={event => this.setState({paddress: event.target.value})} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Yourinfo;
