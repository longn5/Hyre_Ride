import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Navbar from './Navbar';
import DriverCard from './DriverCard';
import * as driversActionCreators from '../actions/drivers';
import './Home.css';

class Home extends React.Component {
  componentWillMount() {
    this.props.driveActions.getAllDrivers();
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="driver-card-contianer">
          {
            this.props.drivers.map((driver, index) => <DriverCard driver={driver} key={index} />)
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return ({
    drivers: state.drivers.data,
    loading: state.drivers.loading
  });
};

const mapDispatchToProps = dispatch => ({
  driveActions: bindActionCreators(driversActionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
