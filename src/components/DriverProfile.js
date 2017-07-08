import React from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import Lightbox from 'react-image-lightbox';
import {bindActionCreators} from 'redux';
import * as driverActionCreators from '../actions/driver';
import './DriverProfile.css';

class DriverProfile extends React.Component {
  state = {
    pickupAddressModal: false,
    dropoffAddressModal: false,
    pickupAddress: null,
    dropoffAddress: null,
    lightboxModal: false,
    packages: false,
    photoIndex: 0
  }

  componentWillMount() {
    const id = this.props.match.params.driverid;
    this.props.driverActions.getDriver(id);
  }

  onClose = () => {
    this.setState({
      pickupAddressModal: false,
      dropoffAddressModal: false
    });
  }

  pickupAddress = (address) => {
    this.setState({
      pickupAddress: address
    });
    this.onClose();
  }

  dropoffAddress = (address) => {
    this.setState({
      dropoffAddress: address
    });
    this.onClose();
  }

  render() {
    const driver = this.props.driver || null;
    return (
      <div>
        <div className="driver-profile-information">
          <div className="profile-image">
            <div>
              <img width={250} height={200} src={driver ? driver.photoURL : ''} alt='' />
            </div>
            <div className="vehicle-info" onClick={() => this.setState({lightboxModal: true})}>
              <div><h3>Vehicle Description</h3></div>
              <div>{driver ? driver.vehicle : ''}</div>
              <div style={{paddingBottom: '30px'}}>This vehicle has capacity for {driver ? driver.capacity : 0} people</div>
              <div className="vehicle-images-thumbnail">

                <div className="vehicle-image-main">
                  {driver ? <img height={125} src={driver.carImages[0]} alt="" /> : null }
                </div>
                <div className="vehicle-image-sides">
                  {driver ? <img height={60} style={{paddingBottom: '5px'}}src={driver.carImages[1]} alt="" /> : null }
                  {driver ? <img height={60} src={driver.carImages[2]} alt="" /> : null }
                </div>
              </div>
            </div>
          </div>
          <div className="driver-profile-long-description">
            <div className="name-city-information">
              <div className="name-header">
                <span style={{color: 'green'}}>
                  <span style={{color: 'black', paddingRight: '10px'}}>
                    {driver ? driver.name : ''} ${driver ? driver.rate : ''}/hr</span>Verified
                    <i style={{paddingLeft: '5px', fontStyle: 'italic'}} className="fa fa-check" />
                </span>
              </div>
              <div>
              </div>
            </div>
            <div className="driver-profile-bio-text">
              {driver ? driver.fullDescription : ''}
            </div>
          </div>
        </div>
        { this.state.lightboxModal &&
        <Lightbox
          mainSrc={driver.carImages[this.state.photoIndex]}
          nextSrc={driver.carImages[(this.state.photoIndex + 1) % driver.carImages.length]}
          prevSrc={driver.carImages[(this.state.photoIndex +
            driver.carImages.length - 1) % driver.carImages.length]}
          onCloseRequest={() => this.setState({ lightboxModal: false })}
          onMovePrevRequest={() => this.setState({
            photoIndex: (this.state.photoIndex + driver.carImages.length -
              1) % driver.carImages.length
          })}
          onMoveNextRequest={() => this.setState({
            photoIndex: (this.state.photoIndex + 1) % driver.carImages.length
          })}
          />
      }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    driver: state.driver.data
  });
};

const mapDispatchToProps = dispatch => ({
  driverActions: bindActionCreators(driverActionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DriverProfile));
