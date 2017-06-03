import React from 'react';
import './DriverCard.css';
import { withRouter } from 'react-router-dom';

class DriverCard extends React.Component {
  render() {
    const {driver, history} = this.props;
    return (
      <div>
        <div className="card-container">
          <div className="card-container-visible" onClick={() => history.push(`/profile/${driver.id}`)}>
            <div className="driver-name">
              Drive with <span className="highlighted-word">{driver.name} </span>in
              <span className="highlighted-word"> {driver.vehicle}</span> for <span className="highlighted-word">{driver.rate}/hr</span>
            </div>
            <div className="driver-name">
              The vehicle has capacity for <span className="highlighted-word">{driver.capacity} people</span>
            </div>
            <div className="card-information">
              <div >
                <img
                  className="image-container"
                  height={150}
                  src={driver.photoURL} />
              </div>
              <div className="profile-information">
              {`"${driver.shortDescription}..."`}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(DriverCard);
