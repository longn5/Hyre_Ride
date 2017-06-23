import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import './DriverCard.css';
import * as checkoutActionCreators from '../actions/checkout';
import DriverCard from './DriverCard';
import './Checkout.css';
import { withRouter } from 'react-router-dom';


let Drivers = [{name: 1}, {name: 2}, {name: 3}, {name: 4}];

class Checkout extends React.Component {
  state = {
    selectedDriverId: null
  }

 selectedDriver = (id) => {
     console.log(id);
    this.setState({
      selectedDriverId: id
    });
  }

  render() {
    let drivers = Drivers.map((data, value) => {
     
       return( <DriverCard
            key={data.name}
            onClickFn={this.selectedDriver} 
            selectedDriverId={this.state.selectedDriverId}
            driverInfo={data}
        />);
    })

    return (
      <div className="checkout-page">
        <div className="drivers-info">
             {drivers}
        </div>
        <div className="checkout-info">
            {this.props.passengerInfo.toString()}
            {this.props.visiting.toString()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    passengerInfo: state.passengerInfo.fields,
    visiting: state.destinations.visitingLocations,
    drivers: state.drivers.data,
    loading: state.drivers.loading
  });
};

const mapDispatchToProps = dispatch => ({
  checkoutActions: bindActionCreators(checkoutActionCreators, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Checkout));
