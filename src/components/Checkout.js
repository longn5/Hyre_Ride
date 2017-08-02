import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import './DriverCard.css';
import Stripe from './Stripe';
import * as checkoutActionCreators from '../actions/checkout';
import * as driversActionCreators from '../actions/drivers';
import DriverCard from './DriverCard';
import './Checkout.css';
import { withRouter } from 'react-router-dom';

class Checkout extends React.Component {
  state = {
    selectedDriverId: null
  }

  componentWillMount() {
    this.props.driversActions.getAllDrivers();
  }
  selectedDriver = (id) => {
    this.setState({
      selectedDriverId: id
    });
  }

  render() {
    const {passengerInfo, visiting} = this.props;
    const locations = visiting.parent.locations;
    const packageName = visiting.parent.name.split('_').join(' ').toUpperCase();
    const transformedLocations = [];
    const drivers = this.props.drivers.map((data) => {
      return (
        <DriverCard
          key={data.id}
          onClickFn={this.selectedDriver}
          selectedDriverId={this.state.selectedDriverId}
          driverInfo={data}
        />);
    });
    Object.entries(locations).forEach(([key, value]) => {
      const hours = value.split('++')[0];
      transformedLocations.push(`At, ${key.toUpperCase()} you will spend ${hours.toUpperCase()} hour/s`);
    });
    if (!drivers.length && !this.props.loading) {

        return (
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div style={{fontSize: '80px'}}>🙁</div>
            <div style={{fontSize: '40px'}}>No Drivers are available at this date</div>
            <div style={{fontSize: '40px'}}>Please go back and try a different date</div>
        </div>
      );
    }
    return (
      <div className="checkout-page">
        <div className="drivers-info">
          {drivers}
        </div>

        <div className="checkout-info">
          {this.state.selectedDriverId &&
            <div>
            <Stripe driverId={this.state.selectedDriverId} />
          </div>
         }
          <h3>Please Review your information:</h3>
          <div className="checkout-locations">Locations you will visit:</div>
          {
            transformedLocations.map((value, index) =>
            <div style={{paddingLeft: '20px'}} key={value}>{index + 1}) {value}</div>)
          }
          <div><h3>Your Information:</h3></div>
          <div style={{paddingBottom: '10px'}}>
            {passengerInfo.firstName.toUpperCase()}&nbsp;
            {passengerInfo.lastName.toUpperCase()}
          </div>
          <div style={{paddingBottom: '20px'}}>
            <div style={{fontWeight: 'bold', paddingBottom: '10px'}}>Pickup information:</div>
            <div style={{paddingLeft: '20px'}}>
              <div>{passengerInfo.pAddress.toUpperCase()}</div>
              <div>{passengerInfo.pCity.toUpperCase()}&nbsp;
                {passengerInfo.pState.toUpperCase()}&nbsp;
                {passengerInfo.pZip}</div>
            </div>
          </div>
          <div style={{paddingBottom: '20px'}}>
            <div style={{fontWeight: 'bold', paddingBottom: '10px'}}>Dropoff information:</div>
            <div style={{paddingLeft: '20px'}}>
              <div>{passengerInfo.dAddress.toUpperCase()}</div>
              <div>{passengerInfo.dCity.toUpperCase()}&nbsp;
                {passengerInfo.dState.toUpperCase()}&nbsp;
                {passengerInfo.dZip}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    passengerInfo: state.passengerInfo.fields,
    visiting: state.destinations.visitingLocations,
    loading: state.drivers.loading
  });
};

const mapDispatchToProps = dispatch => ({
  driversActions: bindActionCreators(driversActionCreators, dispatch),
  checkoutActions: bindActionCreators(checkoutActionCreators, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Checkout));
