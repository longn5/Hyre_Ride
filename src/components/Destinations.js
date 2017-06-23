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

  goToYourInfo  = () => {
    this.props.destinationsActions.resetError();
    this.setState({appState: States.yourinfo})
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
          </div>
          <div className="errorMessage">{this.props.errorMessage}</div>
          <div className="cartinformation" style={{marginRight: '40px'}}>
            {
            this.state.appState === States.pickLocations &&
            <div>
              {
              locationLength ?
                <span
                  onClick={this.goToYourInfo}
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
            <Checkout />
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
