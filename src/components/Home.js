import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.css';
import DriverCard from './DriverCard';
import * as driversActionCreators from '../actions/drivers';
import './Home.css';

// <Carousel showThumbs={false} >
//
//     <img
//       height={300}
//        src="http://wineryhunt.com/wp-content/uploads/2015/12/Wine_Vineyard-Large-File-1-1_2000x1000-2000x1200.jpg" />
// <img src="http://bendoregonstock.com/wp-content/uploads/edd/2015/07/Broken-Top-Trail-1560x1045.jpg" />
// </Carousel>
class Home extends React.Component {
  componentWillMount() {
    this.props.driveActions.getAllDrivers();
  }

  render() {
    return (
      <div>
        <div className="carouselContainer">
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
