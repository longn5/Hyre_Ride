import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as packageActionCreators from '../actions/packages';
import './Destination.css';

class Locations extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: false,
      value: `${props.packageDispaly.package},${props.packageDispaly.name},1`
    }
  }

  onSubmit = () => {
    let setValue = !this.state.selected;
    if (!setValue) {
      this.props.packageActions.removeDestinations(this.state.value);
    } else {
      this.props.packageActions.addSelectedDestination(this.state.value);
    }
    this.setState({selected: setValue});
  }

  render() {
    const {packageDispaly} = this.props;
    console.log('packageDispaly');
  return (
    <div className="packageBox">
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
                onChange={(event) => this.setState({value: event.target.value})}>
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
        <div className="websiteLink"><a target="_blank" href={packageDispaly.website}>Click here to learn more.</a></div>
      </div>
    </div>
  );
}
};

export default Locations;
