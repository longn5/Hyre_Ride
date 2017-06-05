import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import './DriverCard.css';
import * as driverActionCreators from '../actions/driver';
import { withRouter } from 'react-router-dom';
//              for <span  // className="highlighted-word">{driver.rate}/hr</span>

class DriverCard extends React.Component {
  state = {
    selectedid: null
  }

  selectDriver = (id) => {
    this.setState({
      selectedid: id
    });
    this.props.driveActions.selectDriver(id);
  }

  render() {
    const {packageDispaly, history, selectedId, onClickFn} = this.props;
    let driverClass = selectedId === packageDispaly ? 'driver-button-selected' : 'driver-button';

    return (
      <div>
        <div className="card-container">
          <div className="driver-info">
            <div>Drive with John Doe in Corolla, Toyota 2010</div>
            <div>This vehicle holds upto 4 people</div>
          </div>
          <div className="profile-image-container">
            <div className="profile-image-holder">
              <img
                width={200}
                src="https://firebasestorage.googleapis.com/v0/b/driversforhire-37d4f.appspot.com/o/dan_image.jpg?alt=media&token=5ae57756-f8da-438e-9dfe-fc0e11e20ca9" />
            </div>
            <div className="total-other-info">
              <div className="grand-total">
                <h3>Dan's Total: $139.00</h3>
              </div>
              <div onClick={() => onClickFn(packageDispaly)} className={driverClass}>
                Select Dan
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
    drivers: state.drivers.data,
    loading: state.drivers.loading
  });
};

const mapDispatchToProps = dispatch => ({
  destinationActions: bindActionCreators(driverActionCreators, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DriverCard));
