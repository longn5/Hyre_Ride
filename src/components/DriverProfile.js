import React from 'react';
import Modal from 'react-modal';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authActionCreators from '../actions/auth';
import Lightbox from 'react-image-lightbox';
import './DriverProfile.css';
import AddressModal from './AddressModal';
import Packages from './Package';


const IMGURL = 'http://media.gettyimages.com/photos/friendly-face-of-modern-business-picture-id531315207?s=170667a';

const imgSrces = [
  'http://www.samarins.com/reviews/photos/corolla_2012_dashboard.jpg',
  'http://blog.toyotaofnorthcharlotte.com/wp-content/uploads/2012/06/2012-Toyota-Corolla.png',
  'http://www.cstatic-images.com/stock/900x600/1376492695353.jpg'
];

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
  }

  dropoffAddress = (address) => {
    this.setState({
      dropoffAddress: address
    });
  }


  render() {
    return (
      <div>
        <div className="driver-profile-information">
          <div className="profile-image">
            <img width={250} height={200} src={IMGURL} />
            <div className="vehicle-info" onClick={() => this.setState({lightboxModal: true})}>
              <div>Detailed Vehicle Description</div>
              <div className="vehicle-images-thumbnail">
                <div className="vehicle-image-main">
                  <img height={125} src={imgSrces[0]} />
                </div>
                <div className="vehicle-image-sides">
                  <img height={60} style={{paddingBottom: '5px'}}src={imgSrces[1]} />
                  <img height={60} src={imgSrces[2]} />
                </div>
              </div>
              <div>Toyota Corrolla, 2015</div>
              <div>4 passengers</div>
            </div>
          </div>
          <div className="driver-profile-long-description">
            <div className="name-city-information">
              <div className="name-header">
                <span style={{color: 'green'}}>
                  <span style={{color: 'black', paddingRight: '10px'}}>Sudesh Banskota $15/hr</span>Verified
                    <i style={{paddingLeft: '5px', fontStyle: 'italic'}} className="fa fa-check" />
                </span>
              </div>
              <div>
              <div className="driver-profile-book">
                <div onClick={() => this.setState({pickupAddressModal: true})}>
                  <Modal
                    style={{
                      overlay: {
                      },
                      content: {
                        border: 0,
                        backgroundColor: 'transparent'
                      }
                    }}
                    isOpen={this.state.pickupAddressModal}
                    onRequestClose={() => this.setState({pickupAddressModal: false})}
                    contentLabel="Booking Details"
                  >
                    <AddressModal title="Pickup Location" number onSave={this.pickupAddress} onClose={this.onClose} />
                  </Modal>
                  <div>
                    {this.state.pickupAddress &&
                      <div>
                        <div>{this.state.pickupAddress.address}</div>
                        <div>
                          {this.state.pickupAddress.state}&nbsp;
                          {this.state.pickupAddress.city}, {this.state.pickupAddress.zip}
                        </div>
                        <div>{this.state.pickupAddress.number}</div>
                      </div>
                    }
                  </div>
                  <div className="link-address">
                    {!this.state.pickupAddress && 'Enter Pickup Address'}
                  </div>
                </div>
                <div onClick={() => this.setState({dropoffAddressModal: true})}>
                  <Modal
                    style={{
                      overlay: {
                      },
                      content: {
                        border: 0,
                        backgroundColor: 'transparent'
                      }
                    }}
                    isOpen={this.state.dropoffAddressModal}
                    onRequestClose={() => this.setState({dropoffAddressModal: false})}
                    contentLabel="Dropoff Location"
                  >
                    <AddressModal title="Dropoff Location" onSave={this.dropoffAddress} onClose={this.onClose} />
                  </Modal>
                  <div>
                    {this.state.dropoffAddress &&
                      <div>
                        <div>{this.state.dropoffAddress.address}</div>
                        <div>
                          {this.state.dropoffAddress.state}&nbsp;
                          {this.state.dropoffAddress.city}, {this.state.dropoffAddress.zip}
                        </div>
                      </div>
                    }
                  </div>
                  <div className="link-address">
                    {!this.state.dropoffAddress && 'Enter Dropoff Address'}
                  </div>
                </div>
              </div>
              </div>
            </div>
            <div className="driver-profile-bio-text">
            Two hundred words description of you goes
            here Two hundred words description of you
            goes here Two hundred words description of
            you goes here Two hundred words description
            of you goes here Two hundred words description
            of you goes here Two hundred words description
            of you goes here Two hundred words description
            of you goes hereription of you goes here Two
            hundred words description of you goes here Two
            hundred words description of you goes here
            </div>
            <div onClick={() => this.setState({packages: true})}>
              <Modal
                style={{
                  overlay: {
                  },
                  content: {
                    border: 0,
                    backgroundColor: 'transparent'
                  }
                }}
                isOpen={this.state.packages}
                onRequestClose={() => this.setState({packages: false})}
                contentLabel="Booking Details"
              >
                <Packages onClose={() => this.setState({packages: false})} />
              </Modal>
              Pick your destinations
            </div>
          </div>
        </div>
        { this.state.lightboxModal &&
        <Lightbox
          mainSrc={imgSrces[this.state.photoIndex]}
          nextSrc={imgSrces[(this.state.photoIndex + 1) % imgSrces.length]}
          prevSrc={imgSrces[(this.state.photoIndex + imgSrces.length - 1) % imgSrces.length]}
          onCloseRequest={() => this.setState({ lightboxModal: false })}
          onMovePrevRequest={() => this.setState({
            photoIndex: (this.state.photoIndex + imgSrces.length - 1) % imgSrces.length
          })}
          onMoveNextRequest={() => this.setState({
            photoIndex: (this.state.photoIndex + 1) % imgSrces.length
          })}
          />
      }
      </div>
    );
  }
}

export default DriverProfile;
