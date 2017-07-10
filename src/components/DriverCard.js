import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { withRouter } from 'react-router-dom';
import './DriverCard.css';
import * as driverActionCreators from '../actions/driver';

class DriverCard extends React.Component {
  state = {
    selectedid: null
  }

  getCosts = () => {
    let costs = 0;
    if (this.props.totals) {
      const {totalDistanceMiles, totalDurationMinutes} = this.props.totals;
      const totalMiles = totalDistanceMiles * this.props.driverInfo.mileRate;
      const totalDuration = (totalDurationMinutes / 60) * this.props.driverInfo.hourRate;
      costs = totalMiles + totalDuration;
    }

    return costs;
  }

  render() {
    const {driverInfo, selectedDriverId, onClickFn} = this.props;
    const driverClass = selectedDriverId === driverInfo ? 'driver-button-selected' : 'driver-button';
    return (
      <div>
        <div className="card-container">
          <div className="driver-info">
            <div>Drive with {driverInfo.name} in {driverInfo.vehicle}</div>
            <div>This vehicle holds upto {driverInfo.capacity} people</div>
          </div>
          <div className="profile-image-container">
            <div className="profile-image-holder">
              <img
                alt="driver"
                width={200}
                src={driverInfo.photoURL} />
            </div>
            <div className="total-other-info">
              <div className="grand-total">
                <h3>{driverInfo.name}&#39;s Total: ${Math.ceil(this.getCosts())}</h3>
              </div>
              <div onClick={() => onClickFn(driverInfo)} className={driverClass}>
                Select {driverInfo.firstName}
              </div>
              <div onClick={() => window.open(`${window.location.origin}/profile/${driverInfo.id}`, '_blank')} className="driver-button">
                  View Profile
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
    totals: state.checkout.totals,
    drivers: state.drivers.data,
    loading: state.drivers.loading
  });
};

const mapDispatchToProps = dispatch => ({
  driverActions: bindActionCreators(driverActionCreators, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DriverCard));
