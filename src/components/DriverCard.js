import React from 'react';
import './DriverCard.css';

class DriverCard extends React.Component {
  render() {
    const {driver} = this.props;
    console.log(driver);
    return (
      <div className="card-container">
        <div className="card-container-visible">
          <div className="card-information">
            <div className="image-container">
              <img
                height={200}
                width={250}
                src={driver.photoURL} />
            </div>
            <div className="profile-information">
              <div>Name: {driver.name}</div>
              <div>Places I can drive you: {driver.areaServed}</div>
              <div>Capacity: {driver.capacity}</div>
              <div>Vehicle: {driver.vehicle}</div>
              <div>Rate: ${driver.rate}/hr</div>
            </div>
          </div>
          <div className="driver-short">
            {driver.shortDescription}...
        </div>
        </div>
      </div>
    );
  }
}

export default DriverCard;
