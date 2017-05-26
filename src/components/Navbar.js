import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import Modal from 'react-modal';
import AddressModal from './AddressModal';
import * as packageActionCreators from '../actions/packages';
import './Navbar.css';

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
  }
  render() {
    console.log(this.props);
    return (
      <div className="navbar-container">
        <div className="navbar-contents">
          <span className="navbar-brandName" onClick={() => this.props.history.push('/')}>Chauffr</span>
          <div style={{marginTop: '10px'}}>
            { !isEmpty(this.props.destinations.parent.locations) &&
            <span className="navbar-settings" onClick={() => this.setState({modal: true})}>
              <i className="fa fa-shopping-cart" style={{paddingRight: '8px'}} />
              Click here to checkout ({isEmpty(this.props.destinations.parent.locations) ? 0 : Object.keys(this.props.destinations.parent.locations).length
              })
            </span> }
            <span className="navbar-settings">About Us</span>
          </div>
        </div>
        <Modal
            isOpen={this.state.modal}
            contentLabel="Modal"
            >
              <AddressModal close={() => this.setState({modal: false})}visitinglocations={this.props.destinations.parent.locations} />
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  destinations: state.packages.destinations
});

const mapDispatchToProps = dispatch => ({
  packageActions: bindActionCreators(packageActionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar));
