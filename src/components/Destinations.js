import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.css';
import {capitalizeArrayStrings} from '../utils/utils';
import Destination from './Destination';
import DriverCard from './DriverCard';
import WrappedRowPackages from './WrappedRowPackages';
import Yourinfo from './Yourinfo';
import * as destinationsActionCreator from '../actions/destinations';
import * as passengerInfoActionCreator from '../actions/passengerInfo';
import './Packages.css';
import './PackageDisplay.css';
import './Destinations.css';

const States = {
  pickLocations: 1,
  pickDrivers: 2,
  yourinfo: 3,
  checkout: 4
};

class Destinations extends React.Component {
  state = {
    appState: States.yourinfo,
    selectedDriverId: null,
    passengersInformation: null
  }

  componentWillMount() {
    this.props.destinationsActions.getDestinations(this.props.match.params.packageid);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.passengerErrors) {
      this.setState({
        appState: States.pickDrivers
      });
      this.props.passengerInfoActions.resetValidation();
    }
  }

  selectedDriver = (id) => {
    this.setState({
      selectedDriverId: id
    });
  }

  render() {
    const locationLength = Object.keys(this.props.visitingLocations.parent.locations).length;
    return (
      <div style={{paddingTop: '50px'}}>
        <div className="destinations-header">
          <div className="breadcrumbs" style={{marginLeft: '40px'}}>
            {
              this.state.appState === States.pickLocations &&
                <span>
                  <span><Link to="/">Packages</Link></span>
                  <span> &gt; </span>
                  <span>{this.props.packageName}</span>
                </span>
            }
            {
              this.state.appState === States.yourinfo &&
                <span>
                  <span><Link to="/">Packages</Link></span>
                  <span> &gt; </span>
                  <span onClick={() => this.setState({appState: States.pickLocations})}>
                    {this.props.packageName}
                  </span>
                  <span> &gt; </span>
                  Your information
                </span>
            }
            {
              this.state.appState === States.pickDrivers &&
                <span>
                  <span><Link to="/">Packages</Link></span>
                  <span> &gt; </span>
                  <span onClick={() => this.setState({appState: States.pickLocations})}>
                    {this.props.packageName}
                  </span>
                  <span> &gt; </span>
                  <span onClick={() => this.setState({appState: States.yourinfo})}>
                  Your information
                  </span>
                  <span> &gt; </span>
                  <span>Select Drivers</span>
                </span>
            }
            {
              this.state.appState === States.checkout &&
                <span>
                  <span><Link to="/">Packages</Link></span>
                  <span> &gt; </span>
                  <span onClick={() => this.setState({appState: States.pickLocations})}>
                    {this.props.packageName}
                  </span>
                  <span> &gt; </span>
                  <span onClick={() => this.setState({appState: States.yourinfo})}>
                  Your information
                  </span>
                  <span> &gt; </span>
                  <span onClick={() => this.setState({appState: States.pickDrivers})}>
                  Select Drivers
                  </span>
                </span>
            }
          </div>
          <div className="errorMessage">{this.props.errorMessage}</div>
          <div className="cartinformation" style={{marginRight: '40px'}}>
            {
            this.state.appState === States.pickLocations &&
            <div>
              {
              locationLength ?
                <span
                  onClick={() => this.setState({
                    appState: States.yourinfo})}
                >
                  Next
                </span> :
                <span>Please select a location</span>
              }
            </div>
            }
            {
              this.state.appState === States.yourinfo &&
              <div onClick={() => this.props.passengerInfoActions.validateAndSubmit()}>
                Select Drivers
              </div>
            }
            {
              this.state.appState === States.pickDrivers &&
              <div onClick={() => this.setState({appState: States.checkout})}>
                Checkout
              </div>
            }
          </div>
        </div>
        <div style={{paddingTop: '50px'}}>
          <div style={{display: this.state.appState === States.pickLocations ? 'block' : 'none'}}>
            <WrappedRowPackages
              packages={this.props.destinaitons}
              Component={Destination}
            />
          </div>
          <div style={{display: this.state.appState === States.yourinfo ? 'block' : 'none'}}>
            <Yourinfo />
          </div>
          <div style={{display: this.state.appState === States.pickDrivers ? 'block' : 'none'}}>
            <WrappedRowPackages
              packages={[{name: 1}, {name: 2}, {name: 3}, {name: 4}]}
              selectedId={this.state.selectedDriverId}
              Component={DriverCard}
              onClickFn={this.selectedDriver} />
          </div>
          <div style={{display: this.state.appState === States.checkout ? 'block' : 'none'}}>
             all checkout information
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    passengerErrors: state.passengerInfo.validated,
    errorMessage: state.destinations.error,
    visitingLocations: state.destinations.visitingLocations,
    destinaitons: state.destinations.data,
    packageName: state.destinations.data.length ? capitalizeArrayStrings(state.destinations.data[0].package.split('_')) : '',
    loading: state.destinations.loading
  });
};

const mapDispatchToProps = dispatch => ({
  destinationsActions: bindActionCreators(destinationsActionCreator, dispatch),
  passengerInfoActions: bindActionCreators(passengerInfoActionCreator, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Destinations);
