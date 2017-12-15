import React from 'react';
import './Thankyou.css';

class ThankYou extends React.Component {
  render() {
    let defaultText = (
      <div>
        <div>Thank You For Booking Your Trip With Us!</div>
          <div>
            If you have any cocerns please get in
            <a href={`${window.location.origin}/contact`}>contact</a>
            with us.
          </div>
      </div>

    );

    if (this.props.match.params.client === 'driver') {
      defaultText = (
        <div>
          <div>
            Thank you for your interest in driving with us.
          </div>
          <div style={{paddingLeft: '40px'}}>
            We will be in contact with you ASAP.
          </div>
        </div>
      );
    }

    if (this.props.match.params.client === 'form') {
      defaultText = (
        <div>
          <div>
            Your information has been submitted.
          </div>
          <div style={{paddingLeft: '40px'}}>
            We will be in contact with you ASAP.
          </div>
        </div>
      );
    }
    return (
      <div className="thankyou">
        <div className="thankyouhere">
          <div style={{paddingLeft: '20px'}}></div>
          <div>{defaultText}</div>
        </div>
      </div>
    );
  }
}
export default ThankYou;
