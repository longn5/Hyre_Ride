import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getHoursFromLocations} from './../utils/utils';
import * as destinationsActionCreator from '../actions/destinations';
import './Destination.css';

class Destinations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      value: `${props.packageDispaly.package},${props.packageDispaly.name},1`
    };
  }

  onSubmit = () => {
    const setValue = !this.state.selected;

    const maxHoursExceeded = getHoursFromLocations(
        this.props.locations,
        parseInt(this.state.value.split(',')[2], 10)
    );
    if (!maxHoursExceeded) {
      if (!setValue) {
        this.props.destinationActions.removeDestinations(this.state.value);
      } else {
        this.props.destinationActions.addSelectedDestination(this.state.value);
      }
      this.setState({
        selected: setValue
      });
    }
  }

  render() {
    const {packageDispaly} = this.props;
    return (
      <div className="packageBox">
        <div>{this.props.locationsError}</div>
        <div className="packageHeader">
          <span>
            <div className="coolWinery">
              <div style={{color: 'black'}}>{packageDispaly.name}</div>
            </div>
            <span>Time you want spend: </span>
            <span>
              <select
                value={this.state.value}
                className={this.state.selected ? 'selected-select' : ''}
                disabled={this.state.selected}
                onChange={event => this.setState({value: event.target.value})}>
                {
                  packageDispaly && packageDispaly.timetospend.map((value) => {
                    return <option key={value} value={`${packageDispaly.package},${packageDispaly.name},${value}`}>{value}</option>
                  })
                }
              </select>
            </span>
          </span>
          <span>
            <span
              onClick={this.onSubmit}
              className={this.state.selected ? 'package-button-selected' : 'package-button'}>
              Select
            </span>
          </span>
        </div>
        <img
          style={{paddingRight: '10px'}}
          width={400}
          src={packageDispaly.image} />
        <div className="short-description">
          <span>{packageDispaly.description}</span>
          <div className="websiteLink">
            <a target="_blank" href={packageDispaly.website}>Click here to learn more.</a></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    locationsError: state.destinations.error,
    locations: state.destinations.visitingLocations.parent.locations
  });
};

const mapDispatchToProps = dispatch => ({
  destinationActions: bindActionCreators(destinationsActionCreator, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Destinations);
