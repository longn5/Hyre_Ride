import React from 'react';
import {withRouter} from 'react-router-dom';
import './Landing.css';

class Landing extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {

    return (
      <div>
      <div style={{position: 'relative'}} className="container-fluid backgroundimage">
        <div className="container" style={{marginBottom: '50px'}}>
        <div className="row">
          <h1 className="visible-sm visible-md visible-lg landing-text-lg">
            Explore Oregon
          </h1>
          <h1 className="visible-xs landing-text-sm">
            Explore Oregon
          </h1>
        </div>
          <div className="plan-your-adventure">
            <span className="plan-your-adventure-button"onClick={() => window.location.replace(`${window.location.origin}/packages`)}>
              Plan your adventure
            </span>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="landing-how-it-works-container">
        <div className="landing-how-it-work">
          <div className="landing-destinations">
            <h4 className="landing-destinations-header">
              Pick your destinations

            </h4>
            <p className="landing-destinations-data">
Pick from multitude of destinations in Oregon, tell us how much time you want to spend at each of them, as well as the pick-up and drop-off addresses.
            </p>
          </div>
        </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="landing-how-it-works-container">
      <div className="landing-how-it-work">
        <div className="landing-destinations">
          <h4 className="landing-destinations-header">
            Get your quote

          </h4>
          <p className="landing-destinations-data">
            Get instant quotes of service fee from multiple drivers with car, for your trip. You can check out the driver profiles containing their info as well as the car info and pictures. Pick the one that’s best for you.
          </p>
        </div>
      </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="landing-how-it-works-container">
    <div className="landing-how-it-work">
      <div className="landing-destinations">
        <h4 className="landing-destinations-header">
   Book and Go!
        </h4>
        <p className="landing-destinations-data">
          Book the trip and pay only a small booking fee during booking. You pay the service fee directly to the driver at the end of the trip.
        </p>
      </div>
    </div>
        </div>
      </div>
      </div>
    </div>
    <footer className="footer">
      <div style={{color: '#571717'}}>Pick your destinations, Pick your ride</div>
      <div style={{color: 'red'}}>Made with ❤️ in Portalnd, Oregon</div>
    </footer>
    </div>
    </div>
    );
  }
}


export default withRouter(Landing);
