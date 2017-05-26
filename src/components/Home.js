import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.css';
import DriverCard from './DriverCard';
import * as driversActionCreators from '../actions/drivers';
import './Home.css';

class Home extends React.Component {
  componentWillMount() {
    this.props.driveActions.getAllDrivers();
  }

  render() {
    return (
      <div>
        <div className="carouselContainer">
        <Carousel showThumbs={false} >

            <img
              height={300}
               src="http://kazzit.com/custom/domain_1/image_files/Custom_State_Page_Image/PRO_STATE_IMAGES/Portland_Oregon_Wineries_RESIZED.jpg" />
  <img src="http://kazzit.com/custom/domain_1/image_files/Custom_State_Page_Image/PRO_STATE_IMAGES/Portland_Oregon_Wineries_RESIZED.jpg" />
        </Carousel>
        </div>
        <div className="driver-card-contianer">
          {
            this.props.drivers.map((driver, index) => <DriverCard driver={driver} key={index} />)
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    drivers: state.drivers.data,
    loading: state.drivers.loading
  });
};

const mapDispatchToProps = dispatch => ({
  driveActions: bindActionCreators(driversActionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
