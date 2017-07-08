import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import * as packageActionCreators from '../actions/packages';
import './Navbar.css';
import Logo from '../images/favicon.png';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props.location);
    let defaultClass = 'navbar-container',
        defaultCircle = 'circle-logo',
        defaultInitials = 'initials';
    if (this.props.location.pathname != '/') {
      defaultClass = 'app-navbar-container';
    }
    return (
      <div className={defaultClass}>
        <div className="navbar-contents">
          <span className="navbar-settings"
            style={{marginLeft: '10px'}}
            onClick={() => this.props.history.push('/')}>
            <span className={defaultCircle}>
              <span className={defaultInitials}>HR</span>
            </span>
           <span>Hyre Ride</span>  
          </span>
          <div style={{marginTop: '10px'}}>
            <span className="navbar-settings"
              onClick={() => window.location.replace(`${window.location.origin}/packages`)}>
              Book Now
            </span>
            <span className="navbar-settings">Drive With Us</span>
            <span className="navbar-settings"
              onClick={() => window.location.replace(`${window.location.origin}/about`)}>
              About Us</span>
            <span className="navbar-settings">Contact Us</span>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Navbar);
