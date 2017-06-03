import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import 'react-responsive-carousel/lib/styles/carousel.css';
import {capitalizeArrayStrings} from '../utils/utils';
import Destination from './Destination';
import WrappedRowPackages from './WrappedRowPackages';
import * as destinationsActionCreator from '../actions/destinations';
import './Packages.css';
import './PackageDisplay.css';

class Destinations extends React.Component {
  componentWillMount() {
    this.props.destinationsActions.getDestinations(this.props.match.params.packageid);
  }
  render() {
    console.log(this.props.destinaitons);
    return (
      <div className="package-container">
        <WrappedRowPackages packages={this.props.destinaitons} Component={Destination} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return ({
    destinaitons: state.destinations.data,
    packagedestination: state.destinations.data.length ? capitalizeArrayStrings(state.destinations.data[0].package.split('_')) : '',
    loading: state.destinations.loading
  });
};

const mapDispatchToProps = dispatch => ({
  destinationsActions: bindActionCreators(destinationsActionCreator, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Destinations);
