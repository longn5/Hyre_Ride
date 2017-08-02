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
    let defaultClass = 'navbar navbar-default navbar-fixed-top';
    if (this.props.location.pathname != '/') {
      defaultClass = 'navbar navbar-default navbar-fixed-top app-navbar';
    }
    return (
      <nav className={defaultClass}>
      <div className="container-fluid">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" >
            <span style={{color: 'white'}} className="glyphicon glyphicon-menu-hamburger"></span>
          </button>
          <a className="navbar-brand" href={window.location.origin}>Hyre Ride</a>
        </div>
        <div id="navbar" className="navbar-collapse collapse">
          <ul className="nav navbar-nav navbar-right">
            <li className=''><a href={`${window.location.origin}/packages`}>Book Now</a></li>
            <li className=''><a href={`${window.location.origin}/driver`}>Drive With Us</a></li>
            <li className=''><a href={`${window.location.origin}/about`}>About Us</a></li>
            <li className=''><a href={`${window.location.origin}/contact`}>Contact Us</a></li>
          </ul>
        </div>
      </div>
    </nav>
    );
  }
}
export default withRouter(Navbar);
