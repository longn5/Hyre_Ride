import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Redirect } from 'react-router-dom';
import * as authActionCreators from '../actions/auth';
import './Navbar.css';

class Navbar extends React.Component {
  render() {
    if (!this.props.user) {
      return <Redirect to={'/'} />;
    }
    return (
      <div className="navbar-container">
        <div className="navbar-contents">
          <span className="navbar-brandName">BrandName</span>
          <div style={{marginTop: '10px'}}>
            <span className="navbar-settings">Profile Picture</span>
            <span className="navbar-settings" onClick={this.props.logout}>Logout</span>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.auth.user,
  loading: state.auth.loading
});

const mapDispatchToProps = dispatch => ({
  logout: bindActionCreators(authActionCreators, dispatch).signOut
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
