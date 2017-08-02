import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.css';
import {capitalizeArrayStrings} from '../utils/utils';
import Destination from './Destination';
import WrappedRowPackages from './WrappedRowPackages';
import Yourinfo from './Yourinfo';
import Checkout from './Checkout';
import * as destinationsActionCreator from '../actions/destinations';
import * as passengerInfoActionCreator from '../actions/passengerInfo';
import * as checkoutActionCreator from '../actions/checkout';
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
    appState: States.pickLocations,
    passengersInformation: null
  }

  goToYourInfo = () => {
    this.props.destinationsActions.resetError();
    this.setState({appState: States.yourinfo});
  }

  componentWillMount(){
    this.props.destinationsActions.getDestinations(this.props.match.params.packageid);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.validated) {
      this.props.checkoutActions.getInfoFromGoogle();
      this.setState({
        appState: States.pickDrivers
      });
      this.props.passengerInfoActions.resetValidation();
    }
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
                  <span className="span-link" onClick={() => window.location.replace(`${window.location.origin}/packages`)}>Packages</span>
                  <span> &gt; </span>
                  <span>{this.props.packageName}</span>
                </span>
            }
            {
              this.state.appState === States.yourinfo &&
                <span>
                  <span className="span-link" onClick={() => window.location.replace(`${window.location.origin}/packages`)}>Packages</span>
                  <span> &gt; </span>
                  <span className="span-link" onClick={() => this.setState({appState: States.pickLocations})}>
                    {this.props.packageName}
                  </span>
                  <span> &gt; </span>
                  Your information
                </span>
            }
            {
              this.state.appState === States.pickDrivers &&
                <span>
                  <span className="span-link"  onClick={() => window.location.replace(`${window.location.origin}/packages`)}>Packages</span>
                  <span> &gt; </span>
                  <span className="span-link" onClick={() => this.setState({appState: States.pickLocations})}>
                    {this.props.packageName}
                  </span>
                  <span> &gt; </span>
                  <span className="span-link"  onClick={() => this.setState({appState: States.yourinfo})}>
                  Your information
                  </span>
                  <span> &gt; </span>
                  <span>Select Drivers</span>
                </span>
            }
          </div>
          <div className="errorMessage">
            {this.props.errorMessage}
            {(this.state.appState === States.yourinfo && this.props.validated === false) && 'Make sure you fill out all the field before you can select your driver.'}
          </div>
          <div className="cartinformation" style={{marginRight: '40px'}}>
            {
            this.state.appState === States.pickLocations &&
            <div>
              {
              locationLength ?
                <span
                  onClick={this.goToYourInfo}
                  className="span-button-header "
                >
                  Next
                </span> :
                <span>Please select a location</span>
              }
            </div>
            }
            {
              this.state.appState === States.yourinfo &&
              <span className="span-button-header " onClick={() => this.props.passengerInfoActions.validateAndSubmit()}>
                Select Drivers
              </span>
            }
          </div>
        </div>
        <div style={{paddingTop: '50px'}}>
          <div style={{display: this.state.appState === States.pickLocations ? 'block' : 'none'}}>
            <WrappedRowPackages
              packages={this.props.destinaitons}
              instructions="Select the places you want to visit. You can pick and choose the time you want to spend at each location."
              Component={Destination}
            />
          </div>
          <div style={{display: this.state.appState === States.yourinfo ? 'block' : 'none'}}>
            <Yourinfo />
          </div>
          <div style={{display: this.state.appState === States.pickDrivers ? 'block' : 'none'}}>
            { this.state.appState === States.pickDrivers &&
              <Checkout drivers={this.props.drivers} /> }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    validated: state.passengerInfo.validated,
    errorMessage: state.destinations.error,
    visitingLocations: state.destinations.visitingLocations,
    destinaitons: state.destinations.data,
    drivers: state.drivers.data,
    packageName: state.destinations.data.length ? capitalizeArrayStrings(state.destinations.data[0].package.split('_')) : '',
    loading: state.destinations.loading
  });
};

const mapDispatchToProps = dispatch => ({
  checkoutActions: bindActionCreators(checkoutActionCreator, dispatch),
  destinationsActions: bindActionCreators(destinationsActionCreator, dispatch),
  passengerInfoActions: bindActionCreators(passengerInfoActionCreator, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Destinations);
