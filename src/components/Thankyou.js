import React from 'react';
import './Thankyou.css';

class ThankYou extends React.Component {
  render() {
    return (
      <div className="thankyou">
        <div className="thankyouhere">
          <div style={{paddingLeft: '20px'}}>Thank You For Booking Your Trip With Us!</div>
          <div>Your driver will be in concat with you in few hours.</div>
        </div>
      </div>
    );
  }
}
export default ThankYou;
