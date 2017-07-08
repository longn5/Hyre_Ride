import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import './Navbar.css';

class AppNavBar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="app-navbar-container">
        <div className="navbar-contents">
          <span className="navbar-brandName navbar-settings" onClick={() => this.props.history.push('/')}>Hyre Ride</span>
          <div style={{marginTop: '10px'}}>
            <span className="navbar-settings" onClick={() => window.location.replace(`${window.location.origin}/packages`)}>Book Now</span>
            <span className="navbar-settings" onClick={() => this.props.history.push('/driver')}>Drive With Us</span>
            <span className="navbar-settings" onClick={() => this.props.history.push('/about')}>About Us</span>
            <span className="navbar-settings" onClick={() => this.props.history.push('/contact')}>Contact Us</span>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(AppNavBar);
