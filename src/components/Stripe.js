import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { withRouter} from 'react-router-dom';

class Stripe extends React.Component {
  onToken = (token) => {
    this.props.close();
    this.props.history.push('/thankyou');
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

export default withRouter(Stripe);
