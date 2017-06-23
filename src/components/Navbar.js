import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import * as packageActionCreators from '../actions/packages';
import './Navbar.css';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
  }
  render() {
    return (
      <div className="navbar-container">
        <div className="navbar-contents">
          <span className="navbar-brandName" onClick={() => this.props.history.push('/')}>Chauffr</span>
          <div style={{marginTop: '10px'}}>
            <span className="navbar-settings">About Us</span>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  destinations: state
});

const mapDispatchToProps = dispatch => ({
  packageActions: bindActionCreators(packageActionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar));
