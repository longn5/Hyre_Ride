import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as driverActionCreators from '../actions/driver';

class Stripe extends React.Component {
  onToken = (token) => {
    this.props.driverActions.addTrip(token, this.props.driverId).then(() => {
        window.location.replace(`${window.location.origin}/thankyou/customer`);
    });
  }
  render() {
    return (
      <StripeCheckout
        token={this.onToken}
        stripeKey="pk_test_6pRNASCoBOKtIshFeQd4XMUh"
      />
    );
  }
}
const mapStateToProps = () => {};

const mapDispatchToProps = dispatch => ({
  driverActions: bindActionCreators(driverActionCreators, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Stripe));
