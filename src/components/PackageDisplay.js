import React from 'react';
import { withRouter } from 'react-router-dom';
import './PackageDisplay.css';

class PackageDispaly extends React.Component {
  render() {
    const {packageDispaly, history} = this.props;
    const url = `url(${packageDispaly.picture})`;
    return (
      <div>
        <div style={{display: 'flex'}}>
          <div
            className="packageBox-display"
            onClick={() => history.push(`/package/${packageDispaly.rawValue}`)}
            style={{ backgroundImage: url, backgroundSize: 'cover'}} >
            <div className="package-display-header">
              <h1>{packageDispaly.name}</h1>
            </div>
            <div className="short-description-display">
              {packageDispaly.description}
            </div>
          </div>
          <div style={{marginRight: '10px'}} />
        </div>
        <div style={{marginBottom: '10px'}} />
      </div>
    );
  }
}

export default withRouter(PackageDispaly);
